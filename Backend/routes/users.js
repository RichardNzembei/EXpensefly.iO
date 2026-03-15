const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const firestore = require('../firebaseConfig');

const SALT_ROUNDS = 10;

// Register a new user
router.post('/register', async (req, res) => {
    const { phone, first_name, last_name, email, password } = req.body;

    if (!phone || !first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const phoneRegex = /^(?:\+254|254|0)[17]\d{8}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Invalid Kenyan phone number format' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const userRef = firestore.collection('users');
        const existingUser = await userRef.doc(phone).get();

        if (existingUser.exists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        await userRef.doc(phone).set({
            phone,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
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

    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
    }

    try {
        const userDoc = await firestore.collection('users').doc(phone).get();

        if (!userDoc.exists) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        const user = userDoc.data();

        const isBcryptHash = user.password.startsWith('$2');
        let passwordMatch;
        if (!isBcryptHash) {
            passwordMatch = (password === user.password);
            if (passwordMatch) {
                const hashed = await bcrypt.hash(password, SALT_ROUNDS);
                await firestore.collection('users').doc(phone).update({ password: hashed });
            }
        } else {
            passwordMatch = await bcrypt.compare(password, user.password);
        }

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: { id: phone, ...userWithoutPassword } });
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

        const { password, ...userWithoutPassword } = userDoc.data();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
