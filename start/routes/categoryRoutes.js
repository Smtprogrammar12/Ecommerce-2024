import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMidleware.js";
import { AllCategoryController, CreateCategoryController , updateCategoryController ,singleCategoryController,deleteCategoryController} from "../controllers/categoryController.js";

const router = express.Router(); 

// rotes category
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController ,);


// update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

// get all category
router.get("/AllCategory", AllCategoryController);

// single category
router.get("/single-category/:slug", singleCategoryController);

// delete category
router.delete("/delete-category/:id" , requireSignIn , isAdmin , deleteCategoryController)

export default router;