import express from "express"
import { getMessage, sendMessage } from "../controller/messanger.controller.js";
import secureRout from "../middleware/secureRoute.js"

const router = express.Router();
router.post("/send/:id", secureRout, sendMessage);
router.get("/get/:id", secureRout, getMessage);

export default router;