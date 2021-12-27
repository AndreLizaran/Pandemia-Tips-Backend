// Modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const dbConnection = require('./db/db');

const app = express();

dbConnection();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/user', require('./routes/userRoutes'));
app.use('/place', require('./routes/placesRoutes'));

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
})