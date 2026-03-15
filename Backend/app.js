const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const targetsRoutes = require('./routes/targets');
const savingsRoutes = require('./routes/savings');
const profileImageRoutes = require('./routes/profileImage');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://e-xpensefly-i-o.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));

// Use routes
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
app.use('/api', targetsRoutes);
app.use('/api', savingsRoutes);
app.use('/api/images', profileImageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
