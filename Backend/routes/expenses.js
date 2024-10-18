const express = require('express');
const router = express.Router();

// Mock Data - Replace this with database logic
let expenses = [];

// Route to get all expenses
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const userExpenses = expenses.filter(expense => expense.userId === userId);
  res.json(userExpenses);
});

// Route to add a new expense
router.post('/', (req, res) => {
  const { userId, name, amount } = req.body;
  const newExpense = { id: Date.now(), userId, name, amount };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

module.exports = router;
