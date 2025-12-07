import mongoose from "mongoose";

function connectToDB() {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(console.log("DB connected!"));
  } catch (error) {
    console.log("DB connect nhi ho rha!");
  }
}

export default connectToDB;
