const express = require('express');
const router = express.Router();
const firestore = require('../firebaseConfig');

// Register a new user
router.post('/register', async (req, res) => {
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

// User login
router.post('/login', async (req, res) => {
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

// Fetch a single user's data
router.get('/user/:id', async (req, res) => {
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

module.exports = router;
