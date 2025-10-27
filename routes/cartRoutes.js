import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove/:menuItemId", removeFromCart);
router.delete("/clear", clearCart);

export default router;
