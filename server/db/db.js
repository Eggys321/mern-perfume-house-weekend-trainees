import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,{
        dbName:"perfume-house"
    } );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};
