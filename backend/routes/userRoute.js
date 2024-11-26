import express from "express"
import {registerUser,verifyEmail, loginUser, updatePassword} from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/verifyemail", verifyEmail)
userRouter.post("/updatePassword", updatePassword)
userRouter.post("/login", loginUser)
export default userRouter