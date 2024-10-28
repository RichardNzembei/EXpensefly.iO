const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const targetsRoutes = require('./routes/targets');
const savingsRoutes = require('./routes/savings')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
app.use('/api', targetsRoutes);
app.use('/api', savingsRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
