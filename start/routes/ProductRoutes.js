import express from "express";
import {
    createProductController,
    getProductController,
    getSingleProductController,
    getProductPhotoController,
    ProductDeleteController,
    UpdateProductController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMidleware.js";


import formidable from "express-formidable";

const router = express.Router();

// create routes
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// update product
router.post("/update-product/pid" , requireSignIn , isAdmin ,formidable(),UpdateProductController)

// get all product
router.get("/get-product" , getProductController)

// single Product
router.get("get-single-product/id", getSingleProductController);

// get Photo

router.get("photo-product/pid", getProductPhotoController);

// delete product
router.delete("delete-product/pid" , ProductDeleteController)
export default router;