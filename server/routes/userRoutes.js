import {Router} from "express";
import {createUser, deleteUserById, getUserById, getUsers, updateUserById} from "../controller/userController.js";

const userRouter = Router();

userRouter
    .route('/')
    .get(getUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

export default userRouter;