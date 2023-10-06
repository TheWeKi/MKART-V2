import {Router} from "express";
import {deleteUserById, getUserById, getUsers, updateUserById} from "../controller/userController.js";
import { isAuthenticated, isAuthorized } from "../middleware/isAuthenticated.js";

const userRouter = Router();


userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

userRouter
    .route('/')
    .get(isAuthenticated, isAuthorized(true), getUsers)

export default userRouter;