import * as cartService from "../services/cartService.js";

export const getCart = async (req, res, next) => {
    try {
        res.json(await cartService.getCart(req.user.id));
    } catch (err) {
        next(err);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { menuItemId, quantity } = req.body;
        res.json(await cartService.addToCart(req.user.id, menuItemId, quantity));
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        res.json(await cartService.removeFromCart(req.user.id, req.params.menuItemId));
    } catch (err) {
        next(err);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        res.json(await cartService.clearCart(req.user.id));
    } catch (err) {
        next(err);
    }
};
