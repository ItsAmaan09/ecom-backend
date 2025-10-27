import * as restaurantService from "../services/restaurantService.js";

export const createRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.createRestaurant(req.body, req.user.id);
        res.status(201).json(restaurant);
    } catch (err) {
        next(err);
    }
};

export const getAllRestaurants = async (req, res, next) => {
    try {
        res.json(await restaurantService.getAllRestaurants());
    } catch (err) {
        next(err);
    }
};

export const getRestaurantById = async (req, res, next) => {
    try {
        res.json(await restaurantService.getRestaurantById(req.params.id));
    } catch (err) {
        next(err);
    }
};

export const updateRestaurant = async (req, res, next) => {
    try {
        res.json(await restaurantService.updateRestaurant(req.params.id, req.user.id, req.body));
    } catch (err) {
        next(err);
    }
};

export const deleteRestaurant = async (req, res, next) => {
    try {
        res.json(await restaurantService.deleteRestaurant(req.params.id, req.user.id));
    } catch (err) {
        next(err);
    }
};
