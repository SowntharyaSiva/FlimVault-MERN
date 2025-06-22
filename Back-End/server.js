const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

//mongoose.connect('mongodb://localhost:27017/flimvault');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, watchlist: [] });
  await user.save();
  res.json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    success: true,
    message: 'Login successful',
    user: {
      _id: user._id,
      username: user.username,
      watchlist: user.watchlist
    }
  });
});



app.get('/watchlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.post('/watchlist/add', async (req, res) => {
  const { userId, movie } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const exists = user.watchlist.some((m) => m.id === movie.id);
  if (!exists) user.watchlist.push(movie);
  await user.save();
  res.json(user.watchlist);
});

app.post('/watchlist/delete', async (req, res) => {
  const { userId, movieId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.watchlist = user.watchlist.filter((m) => m.id !== movieId);
  await user.save();
  res.json(user.watchlist);
});

app.listen(5000, () => console.log('Server running on port 5000'));
