const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully!');
    connection.release();
  }
});


app.post('/api/register', (req, res) => {
  const { phone, first_name, last_name, email, password } = req.body;


  if (!phone || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  pool.query('SELECT * FROM users WHERE phone = ?', [phone], (err, existingUser) => {
    if (err) {
      console.error('Error during user check:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (existingUser.length) {
      return res.status(400).json({ message: 'User already exists' });
    }


    pool.query(
      'INSERT INTO users (phone, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
      [phone, first_name, last_name, email, password],
      (err) => {
        if (err) {
          console.error('Error during registration:', err);
          return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, user) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (!user.length) return res.status(400).json({ message: 'Invalid email or password' });

    res.json({ user: { id: user[0].id, first_name: user[0].first_name, phone: user[0].phone ,last_name:user[0].last_name,email:user[0].email} });
  });
});

app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;

  pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (!result.length) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(result[0]);
  });
});
app.post('/api/add-expense', async (req, res) => {
  const { userId, name, amount, date, category } = req.body;

  try {
    // Include all fields (user_id, name, amount, date, and category) in the query
    await pool.query(
      'INSERT INTO expenses (user_id, name, amount, date, category) VALUES (?, ?, ?, ?, ?)',
      [userId, name, amount, date, category]
    );
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get('/api/expenses/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM expenses WHERE user_id = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
