import express from "express";
import {
    addMenuItem,
    getMenuByRestaurant,
    updateMenuItem,
    deleteMenuItem,
} from "../controllers/menuController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:restaurantId")
    .get(getMenuByRestaurant)
    .post(protect, addMenuItem);

router.route("/item/:id")
    .put(protect, updateMenuItem)
    .delete(protect, deleteMenuItem);

export default router;
