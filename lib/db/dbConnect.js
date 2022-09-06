import mongoose from "mongoose";

async function dbConnect() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log(err));
}
export default dbConnect;
