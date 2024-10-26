const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');

// Add a target
router.post('/add-target', async (req, res) => {
    const { userId, description, amount, deadline } = req.body;

    try {
        const targetsRef = firestore.collection('users').doc(userId).collection('targets');
        const targetRef = targetsRef.doc();

        await targetRef.set({
            description,
            amount,
            deadline,
            completed: false
        }, { merge: true });

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

    try {
        const targetRef = firestore.collection('users').doc(userId).collection('targets').doc(targetId);

        await targetRef.update({ completed: true });

        res.status(200).json({ message: 'Target marked as completed', targetId });
    } catch (error) {
        console.error('Error marking target as completed:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
