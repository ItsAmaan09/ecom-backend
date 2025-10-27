import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
    try {
        res.status(201).json(await authService.registerUser(req.body));
    } catch (err) {
        next(err);
    }
}

export const login = async (req,res, next) => {
    try {
        res.json(await authService.loginUser(req.body));
    } catch (err) {
        next(err);
    }
}