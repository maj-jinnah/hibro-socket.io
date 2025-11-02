import { generateJWtToken } from '../lib/index.js';
import User from '../models/user-model.js';

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: 'All fields are required' })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const payload = { id: user._id, email: user.email };
        const token = generateJWtToken(payload, res);

        res.status(200).json({
            success: true,
            user: { id: user._id, email: user.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const register = async (req, res) => {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ email, password, fullName });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log("Logout error -", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// const refreshToken = (req, res) => {
//     // Handle token refresh
//     res.status(200).json({ message: 'Token refreshed successfully' });
// };

export default {
    login,
    register,
    logout,
    // refreshToken
};