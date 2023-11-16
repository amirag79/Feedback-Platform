const express = require('express');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware for parsing JSON requests
app.use(bodyParser.json());

// Initialize Passport and session
app.use(passport.initialize());

// Google OAuth configuration
passport.use(new GoogleStrategy({
  clientID: '1038376068681-eh6toaitqttq2mq2eoocumk8vtq3rrkp.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3001/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Use profile information to create or authenticate a user
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google OAuth login endpoint
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback endpoint
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to React app after successful login
    res.redirect('http://localhost:3000/feedback');
  }
);

// Feedback submission endpoint
app.post('/api/feedback', (req, res) => {
  const feedbackData = req.body;
  // Implement the logic to store feedback in Frill.co
  console.log('Feedback submitted to Frill.co:', feedbackData);
  res.status(201).json({ message: 'Feedback submitted successfully' });
});

// Data retrieval endpoint
app.get('/api/feedback/:category', (req, res) => {
  const category = req.params.category;
  // Implement the logic to fetch aggregated feedback from Frill.co
  console.log('Fetching aggregated feedback for category:', category);
  // Return sample data for demonstration purposes
  res.json({ category, averageRating: 4.5, comments: ['Great product!', 'Needs improvement.'] });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
