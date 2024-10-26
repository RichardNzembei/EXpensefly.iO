const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');

// Add or update an expense
router.post('/add-expense', async (req, res) => {
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
