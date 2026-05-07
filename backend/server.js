require('dotenv').config();   // NEW

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CHANGED (no hardcoding)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const User = mongoose.model('User', { name: String });

// GET
app.get('/api', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST
app.post('/api', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.send('User added');
});

// Use env port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));