import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    placeOrder,
    getUserOrders,
    getRestaurantOrders,
    updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

// Customer
router.post("/", placeOrder);
router.get("/my-orders", getUserOrders);

// Owner
router.get("/restaurant-orders", getRestaurantOrders);
router.put("/:orderId/status", updateOrderStatus);

export default router;
