import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (data, userId) => {
    return await Restaurant.create({ ...data, owner: userId });
};

export const getAllRestaurants = async () => {
    return await Restaurant.find().populate("owner", "name email");
};

export const getRestaurantById = async (id) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
};

export const updateRestaurant = async (id, userId, data) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new Error("Restaurant not found");

    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error("Not authorized");
    }

    Object.assign(restaurant, data);
    await restaurant.save();
    return restaurant;
};

export const deleteRestaurant = async (id, userId) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new Error("Restaurant not found");

    if (restaurant.owner.toString() !== userId.toString()) {
        throw new Error("Not authorized");
    }

    await restaurant.deleteOne();
    return { message: "Restaurant deleted" };
};
