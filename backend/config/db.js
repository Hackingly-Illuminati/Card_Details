import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hackingly:tanmay%40hackingly@cardgenerator.qtmsm.mongodb.net/?"
    )
    .then(() => {
      console.log("MongoDB connected");
    });
};

// ------------------!!!!!!!!!!!!!!!!!!!!!!!!!!--------------
// Check for Special Characters in Password

// If your password contains special characters like @, !, or %, they need to be URL-encoded:
// @ becomes %40
// ! becomes %21
// # becomes %23
