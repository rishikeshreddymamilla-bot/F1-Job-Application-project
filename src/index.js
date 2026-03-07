const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const companyRoutes = require('./routes/companies');
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later' }
});

app.use(express.json());
app.use(limiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/companies', companyRoutes);
app.use('/reports', reportRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});