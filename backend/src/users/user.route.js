const express = require('express');
const User = require('./user.Model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error registering user", error: error.message });
    }
});
  
// Login user endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Password does not match" });
        }

        // Generate JWT token
        const token = await generateToken(user.id);

        // Set cookie and respond
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        res.status(200).send({
            message: "Logged in successfully",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
});

// Logout endpoint
router.post("/logout", (req, res) => {
    res.clearCookie('token'); // Clear the 'token' cookie
    res.status(200).json({ message: "Logged out successfully" });
});


// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Send success message after user deletion
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user", error: error.message });
    }v 
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'id email role')
            .sort({ createdAt: -1 }); 
        res.status(200).send(users);
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).send({ message: "Error fetching users" });
    }
});

// Update user role
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the URL
        const { role } = req.body; // Get the new role from the request body

        // Check if role is provided in the request body
        if (!role) {
            return res.status(400).send({ message: "Role is required" });
        }

        const user = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User role updated successfully", user });

    } catch (error) {
        console.log("Error updating user role:", error); 
        res.status(500).send({ message: "Error updating user role", error: error.message });
    }
});

// Edit or update profile
router.patch('/edit-profile', async (req, res) => {
    try {
        // Destructure fields from request body
        const { userId, username, profileImage, bio, profession } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }

        // Find the user by userId
        const user = await User.findById(userId);

        // If user is not found, return 404
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Update the user profile fields
        user.username = username || user.username;
        user.profileImage = profileImage || user.profileImage; 
        user.bio = bio || user.bio;
        user.profession = profession || user.profession;

        // Save the updated user
        await user.save();

        // Send success response
        res.status(200).send({ message: 'User profile updated successfully', user });

    } catch (error) {
        console.log("Error updating user profile:", error); // Improved logging
        res.status(500).send({ message: "Error updating user profile", error: error.message });
    }
});






module.exports = router;
