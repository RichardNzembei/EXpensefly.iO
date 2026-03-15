const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');

// Add an expense
router.post('/add-expense', async (req, res) => {
    const { userId, name, amount, date, category } = req.body;

    if (!userId || !name || amount == null || !date || !category) {
        return res.status(400).json({ message: 'All fields are required: userId, name, amount, date, category' });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
        return res.status(400).json({ message: 'Amount must be a non-negative number' });
    }

    try {
        const expensesRef = firestore.collection('users').doc(userId).collection('expenses');
        const expenseRef = expensesRef.doc();

        await expenseRef.set({
            name: name.trim(),
            amount: parsedAmount,
            date,
            category: category.trim(),
        });

        res.status(201).json({ message: 'Expense added successfully', expenseId: expenseRef.id });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all expenses for a user
router.get('/expenses/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        console.log(`Received request to fetch expenses for userId: ${userId}`);
        const expenseSnapshot = await firestore.collection('users').doc(userId).collection('expenses').get();

        if (expenseSnapshot.empty) {
            console.log(`No expenses found for userId: ${userId}`);
            return res.status(200).json([]);
        }

        const expenses = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses for userId:', userId, error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
