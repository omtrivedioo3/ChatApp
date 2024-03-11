import express from "express"
import { getMessage,sendMessage,createGroupChat,renameGroup,addToGroup } from "../controllers/message.js"
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id",protectRoute,getMessage);
router.route("/group").post(protectRoute, createGroupChat);
router.route("/rename").put(protectRoute, renameGroup);
// router.route("/groupremove").put(protectRoute, removeFromGroup);
router.route("/groupadd").put(protectRoute, addToGroup);



export default router;

 

