import express from "express";
import { paymentWebhook } from "../controllers/paymentController.js";

const router = express.Router();

// Stripe webhook endpoint
router.post("/webhook", express.raw({ type: "application/json" }), paymentWebhook);

export default router;
