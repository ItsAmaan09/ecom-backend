import * as menuService from "../services/menuService.js";

export const addMenuItem = async (req, res, next) => {
    try {
        const menuItem = await menuService.addMenuItem(req.params.restaurantId, req.user.id, req.body);
        res.status(201).json(menuItem);
    } catch (err) {
        next(err);
    }
};

export const getMenuByRestaurant = async (req, res, next) => {
    try {
        res.json(await menuService.getMenuByRestaurant(req.params.restaurantId));
    } catch (err) {
        next(err);
    }
};

export const updateMenuItem = async (req, res, next) => {
    try {
        res.json(await menuService.updateMenuItem(req.params.id, req.user.id, req.body));
    } catch (err) {
        next(err);
    }
};

export const deleteMenuItem = async (req, res, next) => {
    try {
        res.json(await menuService.deleteMenuItem(req.params.id, req.user.id));
    } catch (err) {
        next(err);
    }
};
