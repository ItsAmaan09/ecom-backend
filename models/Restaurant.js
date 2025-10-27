import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        description : {type: String},
        address : {type: String, required: true},
        phone : {type: String},
        image: {type: String},
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timeStamps: true}
);

export default mongoose.model("Restaurant", restaurantSchema);