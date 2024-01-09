
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successfully Connected to DB");
});

module.exports = db;