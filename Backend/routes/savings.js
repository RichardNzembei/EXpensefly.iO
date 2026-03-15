const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');

// Add a savings entry
router.post('/add-savings', async (req, res) => {
    const { userId, method, date, amount, duration } = req.body;

    if (!userId || !method || !date || amount == null || !duration) {
        return res.status(400).json({ message: 'All fields are required: userId, method, date, amount, duration' });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    try {
        const savingsRef = firestore.collection('users').doc(userId).collection('savings');
        const savingsDoc = savingsRef.doc();

        await savingsDoc.set({
            method: method.trim(),
            date,
            amount: parsedAmount,
            duration
        });

        res.status(201).json({ message: 'Savings entry added successfully', savingsId: savingsDoc.id });
    } catch (error) {
        console.error('Error adding savings entry:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all savings entries for a user
router.get('/savings/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const savingsSnapshot = await firestore.collection('users').doc(userId).collection('savings').get();

        if (savingsSnapshot.empty) {
            return res.status(200).json({ savings: [] });
        }

        const savings = savingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({ savings });
    } catch (error) {
        console.error('Error fetching savings entries:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
