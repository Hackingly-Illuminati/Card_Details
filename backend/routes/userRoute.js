import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  registerUSer,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUSer);
userRouter.post("/login", loginUser);

userRouter.get("/getAllUsers", getUsers);
userRouter.get("/getUserById", getUserById);
userRouter.post("/deleteUser", deleteUser);

export default userRouter;
