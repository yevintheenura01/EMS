const express = require("express");
const forgotPasswordController = require("../Controllers/ForgotPasswordController");

const router = express.Router();

router.post("/forgot-password", forgotPasswordController.sendForgotPasswordEmail);
router.post("/reset-password", forgotPasswordController.resetPassword);

module.exports = router;
