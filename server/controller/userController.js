import Errorhandler from "../utils/errorhandler.js";
import {User} from "../model/userModel.js";


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if (!users) {
            return next(new Errorhandler(404, "User Not Found"));
        }
        res.json(users);
    } catch (e) {
        next(e);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return next(new Errorhandler(404, "User Not Found"));
        }
        res.json(user)
    } catch (e) {
        next(e);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const {id} = req.params
        await User.findByIdAndDelete(id);
        res.json({
            message: `User [${id}] Deleted Successfully`
        })
    } catch (e) {
        next(e);
    }
}

const updateUserById = async (req, res) => {
    try {
        const {id} = req.params
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser)
    } catch (e) {
        console.log(e);
    }
}

export {getUsers, getUserById, updateUserById, deleteUserById}