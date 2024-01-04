import slugify from "slugify";
import productModel from "../models/productModel.js";
// import categoryModel from "../models/categoryModel.js";
import fs from "fs";
export const createProductController = async (req, res) => {
    try {
        const { name,  description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !category || !quantity ) { 
            return res.send({ status: 400, message: 'All fields are required' });
        }
        if (!photo && photo.size > 1000000) { 
            return res.status(422).json('Image size is too large')
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        // response
        res.status(200).send({
            success: true,
            message: "Product created successfully",
            products,
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while craeting product",
            error,
        });
    }
}

// get all Product

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            total:products.length,
            success: true,
            message: "Product Getted Successfully!",
            products
        })
    } catch (error) { 
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting All Product",error
        })
    }
}

export const getSingleProductController = async (req, res) => {
    try {
        // const { id } = req.params;
        const product = await productModel.findById(req.params.id).select("-photo").populate("category");

        res.status(200).send({
            success: true,
            message: "Product Get successfully!",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting Single Product", error
        });
    }
};


// get photo controller

export const getProductPhotoController = async() => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(
                product.photo.data
            )
        }
    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting Photo of Product",
            error
        });
    }
}

// delete Product Controller

export const ProductDeleteController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Deleted Successfully',
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Product deleted successfully!",
            error
        });
    }
}

// update Product controller

export const UpdateProductController = async (req, res) => {
    try {
        const { name,  description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        if (!name || !description || !price || !category || !quantity ) { 
            return res.send({ status: 400, message: 'All fields are required' });
        }
        if (!photo && photo.size > 1000000) { 
            return res.status(422).json('Image size is too large')
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {
            ...req.fields , slug:slugify(name)
        },{new:true})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        // response
        res.status(200).send({
            success: true,
            message: "Product Update successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while Updating product",
            error,
        });
    }
}