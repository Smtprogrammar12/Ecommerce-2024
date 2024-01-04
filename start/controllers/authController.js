import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"



export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address , question } = req.body;

        if (!name || !email || !password || !phone || !address || !question) {
            return res.send({ error: "All Fields are required!!" })
        }

        //check user
        const existinguser = await userModel.findOne({ email });
        // check  existing user
        if (existinguser) {
            return res.status(200).json({
                success: false,
                message: "User already exists Please Login!! "
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword , question}).save()
        
        // send response
       return res.status(200).json({
            success: true,
            message: "user register successfully!!",
            user
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while register",
            error
        })
    }
};

// login controller || POST

export const loginController = async(req , res) => {
    try {
      
        // fatch the data from request body
        const { email, password } = req.body;

        // validate the data
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message:"invalid email or Password"
            })
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is Not regiter "
            })
        }

        // match password
        const match = await comparePassword(password, user.password);

        // validation password

        if (!match) {
            return res.status(200).json({
                success: false,
                message: "invalid Password!!"
            });
        }
        // generate token
        
        const token =  JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", });
      
        // return response
        return res.status(200).send({
            success: true,
            message: "User login Successfully!!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while login",
            error
        })
    }
}


// test controller

export const textController = (req, res) => {
    res.send("protected routes");
}


// forget-Password Controllers

export const forgotPasswordControllers = async(req, res) => {
    try {
        const { email, question, newPassword } = req.body;
        if (!email || !question || !newPassword) { 
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            })
        }

        // check email and Password
        let user = await userModel.findOne({ email, question });
        // validation

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "wrong email or answer"
            })
        }

        const hashed = await hashPassword(newPassword);

        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).json({
            success: true,
            message:"Password Reset Successfully!!"
        })
    }
    catch (error) {
        console.log('error', error);
        res.status(402).send({
            success: false,
            message: "Something went wrong while Forgeting Password",
            error
        })
    }
}
