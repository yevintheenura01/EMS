// controllers/registerController.js
const bcrypt = require("bcrypt");
const Register = require("../Model/RegModel");

// Controller function to handle user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Register({
            name,
            email,
            password:hashedPassword , // Save the hashed password
        });

        // Save the new user
        const savedUser = await newUser.save();

        // Respond with success and user details
        res.status(200).json({
            message: "User registered successfully",
            user: savedUser,
            userID: newUser.userID
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server error" });
    }
};

// Get user profile data
const getUserProfile = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await Register.findOne({ userID });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            name: user.name,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userID } = req.params;
        const { name, password } = req.body;
        

        const user = await Register.findOne({ userID });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await Register.findOneAndDelete({ userID });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.registerUser = registerUser;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.deleteUserProfile = deleteUserProfile;