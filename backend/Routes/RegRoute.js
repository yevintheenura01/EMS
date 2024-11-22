const express = require("express");
const regController = require("../Controllers/RegController");

const router = express.Router();



// Route for user registration (POST request)
router.post("/", regController.registerUser);


// Get user profile by userID (GET request)
router.get('/:userID', regController.getUserProfile);



// Delete user profile (DELETE request)
router.delete('/:userID', regController.deleteUserProfile);

module.exports = router;
