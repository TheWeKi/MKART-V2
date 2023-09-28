import {Router} from "express";
import {deleteUserById, getUserById, updateUserById} from "../controller/userController.js";

const userRouter = Router();


userRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

export default userRouter;