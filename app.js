// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const path = require('path');

// const app = express();
// const PORT = 5005;
// const SECRET_KEY = 'b2d7bd0a58fe5c1a688ce1b5bf8bf89ae9ecb527f5eb47543ef448166ea2e0fcdfc0a581a6ca931711e3c3e27639cc204d9bc899e64dd04ed6570aa79ad19480';

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../frontend')));

// // MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Signup Route
// app.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (err) {
//     res.status(400).send('Error signing up');
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send('User not found');

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).send('Invalid credentials');

//     const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(400).send('Error logging in');
//   }
// });

// // Middleware to Check Authentication
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).send('Unauthorized');

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).send('Unauthorized');
//   }
// };

// // Protected Blog Route
// app.get('/blog', authMiddleware, (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/blog.html'));
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

// Initialize the app
const app = express();
const PORT = 5005;
const SECRET_KEY = 'b2d7bd0a58fe5c1a688ce1b5bf8bf89ae9ecb527f5eb47543ef448166ea2e0fcdfc0a581a6ca931711e3c3e27639cc204d9bc899e64dd04ed6570aa79ad19480';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

// Routes
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(400).send('Error signing up');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).send('Error logging in');
  }
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  // Handle subscription logic
  res.status(200).json({ message: 'Successfully subscribed!' });
});

// Your existing subscription endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  // Handle subscription logic here, such as saving the email to a database
  console.log(`New subscription from: ${email}`);

  // Send success response
  res.status(200).json({ message: 'Successfully subscribed!' });
});

// Serve Static Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Login Page
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/signup.html'));
});

// Protected Blog Route
app.get('/blog', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/blog.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



