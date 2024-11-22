const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const ForgotPassword = require("../Model/ForgotPasswordModel");
const Register = require("../Model/RegModel");

// Send reset password link
const sendForgotPasswordEmail = async (req, res) => {
    const { email } = req.body;
    console.log(`Forgot password request received for email: ${email}`); // Log the email
    try {
        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate a random token
        const token = crypto.randomBytes(20).toString("hex");

        // Save token and associate it with the email
        const forgotPassword = new ForgotPassword({ email, token });
        await forgotPassword.save();

        // Set up nodemailer transporter (configure with real credentials)
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        // Send the reset link to the user's email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Verify token and reset password
const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const forgotPassword = await ForgotPassword.findOne({ token });
        if (!forgotPassword) return res.status(400).json({ message: "Invalid or expired token" });

        const user = await Register.findOne({ email: forgotPassword.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Hash the new password and save it
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        // Delete the token after successful password reset
        await ForgotPassword.findOneAndDelete({ token });

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    sendForgotPasswordEmail,
    resetPassword
};
