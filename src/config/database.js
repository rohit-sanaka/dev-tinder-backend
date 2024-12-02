const mongoose = require("mongoose");
require("dotenv").config();
const DB_URI = process.env.MONGO_CLUSTER_URI;
const TABLE_NAME = "devTinder";

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URI}/${TABLE_NAME}`);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
