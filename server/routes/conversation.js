import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getConversation, getAllConversations } from "../controllers/conversation-controller.js";



const router=express.Router();


router.get('/getConversation/:firstUserId/:secondUserId',getConversation);
router.get('/getAllConversations/',getAllConversations);

export default router;
