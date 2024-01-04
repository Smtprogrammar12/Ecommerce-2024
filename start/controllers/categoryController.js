import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const CreateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const existingCategory = await categoryModel.findOne({ name })
        
        if (existingCategory) {
            return res.status(409).json({ error: `A Category with the name ${name} already exists.` })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(202).send({
            message: 'Category created successfully',
            success: true,
            category
        })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while Creating Category"
        })
    }
};

// update category controller

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        res.status(200).json({
            success: true,
            message: "category updated Successfully!",
            category,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating category",
            error,
        })
    }
}

// Get all category

export const AllCategoryController = async(req , res) => {
    try {
        const category = await categoryModel.find({});
        // Sending response
        res.status(200).send({
            success: true,
            message: "All Categories Get Successfully!",
            category,
        })
    }
    catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Error while getting All Category!",
            error,
        })
    }
}

// single category get

export const singleCategoryController = async (req, res) => {
    try {
        
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            succes: true,
            message: 'single category get succeessfully',
            category,
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            succes: false,
            message: 'This id is not valid',
            error
        })
    }
}

// delete categories

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete( id );

         res.status(200).send({
            succes: true,
            message: 'single category deleted succeessfully',
            
        })
    }
     catch (error) {
        console.log(error);
        res.status(400).send({
            succes: false,
            message: 'error while deleting categories',
            error
        })
    }
}