import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connection established");
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB;