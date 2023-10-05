import {Router} from "express";
import {deleteUserById, getUserById, getUsers, updateUserById} from "../controller/userController.js";

const userRouter = Router();


userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

userRouter
    .route('/')
    .get(getUsers)

export default userRouter;