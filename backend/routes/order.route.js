import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
// import { get } from "mongoose";
import { cancelOrder, getAllOrders, getUserOrders, toggleStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/",protectRoute,adminRoute,getAllOrders)
router.get("/:userId",protectRoute,getUserOrders);
router.patch("/:orderId",protectRoute,adminRoute,toggleStatus);
router.delete("/cancel/:orderId",protectRoute,cancelOrder);



export default router;