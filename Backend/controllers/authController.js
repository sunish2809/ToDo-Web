const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Create the user with plain password, it will be hashed automatically in pre-save hook
        const user = new User({ name, email: email.toLowerCase(), password });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        // Compare the plain text password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Signed in successfully", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

