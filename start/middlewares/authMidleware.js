import JWT, { decode } from "jsonwebtoken"
import userModel from "../models/userModel.js";

export const requireSignIn = async (req , res , next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    
    catch (error) {
        console.log(error);
    }
}

// is Admin

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(403).send({ error: 'Only admin can perform this action' });
        }
        else {
            next();
        }
    } catch (error) { 
        console.log(error);
        return res.status(404).json({
            success: false,
            message: 'User not found.',
            error
        })
    }
}