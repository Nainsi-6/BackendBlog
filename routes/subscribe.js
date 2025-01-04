const express = require('express');
const router = express.Router();

// This is where you would interact with a database or send the data somewhere (e.g., email service)

// Dummy storage (you can replace this with a real database, like MongoDB)
let subscribers = [];

// POST route for subscribing
router.post('/', (req, res) => {
  const { email } = req.body;  // Extract email from the request body

  // Validate the email
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  // Check if the email is already subscribed
  if (subscribers.includes(email)) {
    return res.status(409).json({ message: 'Email is already subscribed.' });
  }

  // Add the email to the subscribers list
  subscribers.push(email);

  // Send a success response
  return res.status(200).json({ message: 'Subscription successful!' });
});

module.exports = router;