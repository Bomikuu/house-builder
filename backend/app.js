require('dotenv').config()
const express = require('express');
const cors = require('cors');
const db = require('./db');
const housesRouter = require('./routes/houses');
const specificationRouter = require('./routes/specifications');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/houses/', housesRouter);
app.use('/api/specifications/', specificationRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});