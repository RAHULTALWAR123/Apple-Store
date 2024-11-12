import express from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, getFeaturedProducts, getHighProductsByCategory, getLowProductsByCategory, getProduct, getProductsByCategory, getProductsByName, getRecommendedProducts, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/",protectRoute,adminRoute,getAllProducts)
router.get("/featured",getFeaturedProducts)
router.get("/recommendations",getRecommendedProducts)
router.get("/category/:category",getProductsByCategory)
router.get("/category1/:category",getLowProductsByCategory)
router.get("/category2/:category",getHighProductsByCategory)
router.get("/:id",protectRoute,adminRoute,getProduct)
router.get("/name/:name",getProductsByName)
router.post("/",protectRoute,adminRoute,createProduct)
router.post("/:id",protectRoute,adminRoute,editProduct)
router.patch("/:id",protectRoute,adminRoute,toggleFeaturedProduct)
router.delete("/:id",protectRoute,adminRoute,deleteProduct)

export default router;
