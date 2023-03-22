const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => { console.log(`ERORR: ${error}`)})
db.once('open', () => {
  console.log('Connected to MongoDB database!');
});

module.exports = db;