import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getMessages, addMessage } from "../controllers/message-controller.js";



const router=express.Router();


router.get('/getMessages/:user1/:user2/:page',getMessages);
router.post('/addMessage',addMessage);

export default router;
