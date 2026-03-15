const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');

// Add a target
router.post('/add-target', async (req, res) => {
    const { userId, description, amount, deadline } = req.body;

    if (!userId || !description || amount == null || !deadline) {
        return res.status(400).json({ message: 'All fields are required: userId, description, amount, deadline' });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    try {
        const targetsRef = firestore.collection('users').doc(userId).collection('targets');
        const targetRef = targetsRef.doc();

        await targetRef.set({
            description: description.trim(),
            amount: parsedAmount,
            deadline,
            completed: false
        });

        res.status(201).json({ message: 'Target added successfully', targetId: targetRef.id });
    } catch (error) {
        console.error('Error adding target:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all targets for a user
router.get('/targets/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const targetSnapshot = await firestore.collection('users').doc(userId).collection('targets').get();

        if (targetSnapshot.empty) {
            return res.status(200).json({ active: [], completed: [] });
        }

        const activeTargets = [];
        const completedTargets = [];

        targetSnapshot.docs.forEach(doc => {
            const target = { id: doc.id, ...doc.data() };
            if (target.completed) {
                completedTargets.push(target);
            } else {
                activeTargets.push(target);
            }
        });

        res.status(200).json({ active: activeTargets, completed: completedTargets });
    } catch (error) {
        console.error('Error fetching targets:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark a target as completed
router.put('/targets/complete/:targetId', async (req, res) => {
    const { targetId } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    try {
        const targetRef = firestore.collection('users').doc(userId).collection('targets').doc(targetId);
        const targetDoc = await targetRef.get();

        if (!targetDoc.exists) {
            return res.status(404).json({ message: 'Target not found' });
        }

        await targetRef.update({ completed: true });

        res.status(200).json({ message: 'Target marked as completed', targetId });
    } catch (error) {
        console.error('Error marking target as completed:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
