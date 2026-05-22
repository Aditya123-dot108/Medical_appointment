require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

const uri = process.env.MONGO_URI;
console.log('Connecting to:', uri);

mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ Error:', err.message));

app.use('/api/appointments', require('./routes/appointments'));

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});