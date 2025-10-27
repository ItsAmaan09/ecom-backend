import express from "express";
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
} from "../controllers/restaurantController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(getAllRestaurants)
    .post(protect, createRestaurant);

router.route("/:id")
    .get(getRestaurantById)
    .put(protect, updateRestaurant)
    .delete(protect, deleteRestaurant);

export default router;
