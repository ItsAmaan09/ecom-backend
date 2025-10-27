import User from '../models/Users.js';
import generateToken from "../utils/generateToken.js";

export const registerUser = async ({ name, email, password, role }) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error('User already exists');
    const user = await User.create({ name, email, password, role });
    return { _id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return { _id: user.id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) };
    } else {
        throw new Error('Invalid email or password');
    }
}