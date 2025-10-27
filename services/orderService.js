import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (userId, restaurantId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.menuItem");
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
    );

    const order = await Order.create({
        user: userId,
        restaurant: restaurantId,
        items: cart.items.map((i) => ({
            menuItem: i.menuItem._id,
            quantity: i.quantity,
        })),
        totalPrice,
    });

    await Cart.deleteOne({ user: userId });
    return order;
};

export const getUserOrders = async (userId) => {
    return await Order.find({ user: userId }).populate("items.menuItem restaurant");
};

export const getRestaurantOrders = async (ownerId) => {
    return await Order.find()
        .populate({
            path: "restaurant",
            match: { owner: ownerId },
        })
        .populate("user", "name email")
        .populate("items.menuItem");
};

export const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.status = status;
    await order.save();
    return order;
};
