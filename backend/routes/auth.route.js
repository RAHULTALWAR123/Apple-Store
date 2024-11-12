import express from "express";
import { adminToggleUser, getAllUsers, getProfile, login, logout, refreshToken, signup } from "../controllers/auth.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users",protectRoute,adminRoute,getAllUsers)
router.get("/profile",protectRoute,getProfile)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refresh-token",refreshToken)
router.patch("/:id",protectRoute,adminRoute,adminToggleUser)

export default router;