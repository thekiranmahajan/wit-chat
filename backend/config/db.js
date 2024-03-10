import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected successfully!! --> ${conn.connection.host}`.cyan
    );
  } catch (error) {
    console.log("Couldn't able to connect to database", error.red);
  }
};

export default connectDB;
