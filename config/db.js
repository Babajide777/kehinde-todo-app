const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    return await mongoose.connect(process.env.MONGODB_URI, {});
  } catch (error) {
    console.log(`error connecting to DB ${error}`);
  }
};

module.exports = { connectDB };
