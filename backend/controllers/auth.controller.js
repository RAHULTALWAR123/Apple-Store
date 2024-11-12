import e from "express";
import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "7d"
    })

    return {accessToken,refreshToken};
}

const storeRefreshToken = async(userId,refreshToken) => {
    await redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60);
}

const setCookies = (res,accessToken,refreshToken) => {
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:15*60*1000
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })
}

export const signup = async(req,res) => {
    const {email,password,name} = req.body;
    try{
    const userExits = await User.findOne({email});
    if(userExits){
        return res.status(400).json({message : "user already exists"});
    }       
    const user  = await User.create({email,password,name});


    const {accessToken,refreshToken} = generateTokens(user._id);
    await storeRefreshToken(user._id,refreshToken);

    setCookies(res,accessToken,refreshToken);



    res.status(201).json({user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    },message: "user created successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})

        if(user && (await user.comparePassword(password))){
            const {accessToken,refreshToken} = generateTokens(user._id)

            await storeRefreshToken(user._id,refreshToken)
            setCookies(res,accessToken,refreshToken);

            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            })
        }
        else{
            res.status(401).json({message:"invalid email or password"});
        }
    }
    catch(error){
        // console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
    }

}

export const logout = async(req,res) => {
    try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const refreshToken = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if(storedToken !== refreshToken){
            return res.status(401).json({message:"Invalid token"});
        }

        const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"15m"
        })

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:15*60*1000,
        });
        res.json({message:"Token refreshed"});

        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const getProfile = async(req,res) => {
    try{
    res.json(req.user);
    }
    catch(error){
        res.status(500).json({message:"profile error","error":error});
    }
}  

export const getAllUsers = async(req,res) => {
    try{
        const users = await User.find({});
        res.json(users);
    }
    catch(error){
        res.status(500).json({message:"profile error","error":error});
    }
}

export const adminToggleUser = async(req,res) => {
    try{
        const userId = req.params.id;
        const currentUserId = req.user._id;

        if(userId === currentUserId.toString()){
            return res.status(403).json({message:"You cannot change your own role"});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.role = user.role === "customer" ? "admin" : "customer";

        await user.save();
        res.json(user);

    }catch{
        console.error("Error toggling user role:", error);
        res.status(500).json({message:"profile error",error:error.message});

    }
}