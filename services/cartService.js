import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

export const getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate("items.menuItem");
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
};

export const addToCart = async (userId, menuItemId, quantity) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) throw new Error("Menu item not found");

    const existingItem = cart.items.find((i) => i.menuItem.toString() === menuItemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ menuItem: menuItemId, quantity });
    }

    cart.totalPrice = 0;
    for (const i of cart.items) {
        const itemDetails = await MenuItem.findById(i.menuItem);
        cart.totalPrice += itemDetails.price * i.quantity;
    }

    await cart.save();
    return cart.populate("items.menuItem");
};

export const removeFromCart = async (userId, menuItemId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter((i) => i.menuItem.toString() !== menuItemId);

    cart.totalPrice = 0;
    for (const i of cart.items) {
        const itemDetails = await MenuItem.findById(i.menuItem);
        cart.totalPrice += itemDetails.price * i.quantity;
    }

    await cart.save();
    return cart.populate("items.menuItem");
};

export const clearCart = async (userId) => {
    await Cart.deleteOne({ user: userId });
    return { message: "Cart cleared" };
};
