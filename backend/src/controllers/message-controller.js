import User from '../models/user-model.js';
import Message from '../models/message-model.js';
import cloudinary from '../lib/cloudinary.js';

const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password -__v -createdAt -updatedAt');
        res.status(200).json({ users: filteredUsers });
    } catch (error) {
        console.log("Message controller getAllUsers --", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getAllMessages = async (req, res) => {
    try {
        const { userId: receiverId } = req.params;
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { sender: loggedInUserId, receiver: receiverId },
                { sender: receiverId, receiver: loggedInUserId }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.log("Message controller getAllMessages --", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const { userId: receiverId } = req.params;
        const loggedInUserId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url;
        }

        const newMessage = new Message({
            sender: loggedInUserId,
            receiver: receiverId,
            text,
            image
        });
        await newMessage.save();

        // socket io logic

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.log("Message controller sendMessage --", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export default {
    getAllUsers,
    getAllMessages,
    sendMessage
}