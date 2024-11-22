const bcrypt = require("bcrypt");
const Register = require("../Model/RegModel");

// Controller for logging in the user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // If successful, return a success message or a token (if you use JWT)
        res.status(200).json({
            message: "Login successful",
            userID: user.userID,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Server error" });
    }
};

exports.loginUser = loginUser;
