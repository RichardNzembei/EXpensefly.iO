const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firestore = require('./firebaseConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
//registration
app.post('/api/register', async (req, res) => {
  const { phone, first_name, last_name, email, password } = req.body;

  if (!phone || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userRef = firestore.collection('users');
    const existingUser = await userRef.doc(phone).get();

    if (existingUser.exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await userRef.doc(phone).set({
      phone,
      first_name,
      last_name,
      email,
      password,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//login
app.post('/api/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const userDoc = await firestore.collection('users').doc(phone).get();

    if (!userDoc.exists || userDoc.data().password !== password) {
      return res.status(400).json({ message: 'Invalid phone number or password' });
    }

    const user = userDoc.data();
    res.json({ user: { id: phone, ...user } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const userDoc = await firestore.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//add-expenses
app.post('/api/add-expense', async (req, res) => {
  const { userId, name, amount, date, category } = req.body;

  try {

    const expensesRef = firestore.collection('users').doc(userId).collection('expenses');


    const expenseRef = expensesRef.doc();
    await expenseRef.set({
      name,
      amount,
      date,
      category,
    }, { merge: true });

    res.status(201).json({ message: 'Expense added/updated successfully', expenseId: expenseRef.id });
  } catch (error) {
    console.error('Error adding/updating expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/expenses/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`Received request to fetch expenses for userId: ${userId}`);


    const expenseSnapshot = await firestore.collection('users').doc(userId).collection('expenses').get();

    console.log(`Query executed for userId: ${userId}`);

    if (expenseSnapshot.empty) {
      console.log(`No expenses found for userId: ${userId}`);
      return res.status(200).json([]);
    }


    const expenses = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(`Expenses fetched for userId ${userId}:`, expenses);

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses for userId:', userId, error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
