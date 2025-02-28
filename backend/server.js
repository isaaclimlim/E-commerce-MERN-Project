const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true })); // No deprecation warning
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Corrected key
}));

//all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.routes')
const reviewRoute = require('./src/reviews/reviews.router')
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoute)


// Database connection
main()
  .then(() => console.log("Mongodb is successfully connected"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

// Routes
app.get('/', (req, res) => {
  res.send('E-commerce server is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
