const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
  try {
    const conn =  await mongoose.connect(process.env.MONGO_URI, {
      // userNewUrlParser: true,
      // userUnifiedTopology: true,
      // userCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  } 
}

module.exports = connectDB;