import {Router} from "express";
import {deleteUserById, getUserById, getUsers, updateUserRoleById, saveUserDeliveryaddress} from "../controller/userController.js";
import {isAuthenticated, isAuthorized} from "../middleware/isAuthenticated.js";

const userRouter = Router();


userRouter
    .route('/:id')
    .get(getUserById)
    .put(isAuthenticated, isAuthorized(true), updateUserRoleById)
    .delete(isAuthenticated, isAuthorized(true), deleteUserById);

userRouter
    .route('/')
    .get(isAuthenticated, isAuthorized(true), getUsers)
    .patch(isAuthenticated, saveUserDeliveryaddress);

export default userRouter;