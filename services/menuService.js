import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";

export const addMenuItem = async (restaurantId, userId, data) => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");

    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error("Not authorized to add items to this restaurant");
    }

    return await MenuItem.create({ ...data, restaurant: restaurantId });
};

export const getMenuByRestaurant = async (restaurantId) => {
    return await MenuItem.find({ restaurant: restaurantId });
};

export const updateMenuItem = async (itemId, userId, data) => {
    const item = await MenuItem.findById(itemId).populate("restaurant");
    if (!item) throw new Error("Menu item not found");

    if (item.restaurant.owner.toString() !== userId.toString()) {
        throw new Error("Not authorized");
    }

    Object.assign(item, data);
    await item.save();
    return item;
};

export const deleteMenuItem = async (itemId, userId) => {
    const item = await MenuItem.findById(itemId).populate("restaurant");
    if (!item) throw new Error("Menu item not found");

    if (item.restaurant.owner.toString() !== userId.toString()) {
        throw new Error("Not authorized");
    }

    await item.deleteOne();
    return { message: "Menu item deleted" };
};
