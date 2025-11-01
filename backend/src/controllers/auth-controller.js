import bcrypt from 'bcryptjs';
import User from '../models/user-model.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        throw error;
    }
};

const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, fullName });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        throw error;
    }
};

const logout = (req, res) => {
    // Handle user logout
    res.status(200).json({ message: 'User logged out successfully' });
}

const refreshToken = (req, res) => {
    // Handle token refresh
    res.status(200).json({ message: 'Token refreshed successfully' });
};
export default {
    login,
    register,
    logout,
    refreshToken
};