import  Express  from "express";
import { registerController, loginController, textController , forgotPasswordControllers } from "../controllers/authController.js";

import { requireSignIn , isAdmin } from "../middlewares/authMidleware.js";

// router object
const router = Express.Router();
//routing

router.post('/register', registerController)

// login // Post
router.post("/login", loginController);

// forget Password
router.post('/forget-password' , forgotPasswordControllers)

// test router
router.get('/test', requireSignIn, isAdmin, textController);

// protected routes auth-user
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected routes auth -Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
export default router