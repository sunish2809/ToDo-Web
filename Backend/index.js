const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/auth')
const cors = require("cors");
dotenv.config();
const app = express();
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
    })
);


app.use(express.json());
connectDB();
app.use('/api',routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });