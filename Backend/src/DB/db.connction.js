const mongoose = require("mongoose");

function connectToDB() {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(console.log("DB connected!"));
  } catch (error) {
    console.log("DB connect nhi ho rha!");
  }
}

module.exports = connectToDB;
