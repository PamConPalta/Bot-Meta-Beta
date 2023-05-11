import express from "express"
import { VerifyToken, ReceivedMessage } from "../controllers/whatsappControllers.js"

const router = express.Router()

router
.get("/", VerifyToken)
.post("/", ReceivedMessage)

export default router