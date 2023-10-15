import express from "express";
import { 
    register,
    login,
    logout,
    myProfile,
    getAllUsers,
    addUser
 } from "../controllers/user-controller.js";

import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

 
 router.post("/register" ,register);

router.post("/login",login);

router.get("/logout",logout);

router.get("/me",isAuthenticated, myProfile);


router.get("/users",isAuthenticated, getAllUsers);

router.patch("/addUser/:userId",isAuthenticated, addUser);








export default router;