import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        items: [
            {
                menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Cooking", "Out for Delivery", "Delivered", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);