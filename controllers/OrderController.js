import * as orderService from "../services/orderService.js";

export const placeOrder = async (req, res, next) => {
    try {
        res.status(201).json(await orderService.placeOrder(req.user.id, req.body.restaurantId));
    } catch (err) {
        next(err);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        res.json(await orderService.getUserOrders(req.user.id));
    } catch (err) {
        next(err);
    }
};

export const getRestaurantOrders = async (req, res, next) => {
    try {
        res.json(await orderService.getRestaurantOrders(req.user.id));
    } catch (err) {
        next(err);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        res.json(await orderService.updateOrderStatus(req.params.orderId, req.body.status));
    } catch (err) {
        next(err);
    }
};
