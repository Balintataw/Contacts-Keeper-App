const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// @route  GET api/auth
// @desc   Get logged in user
// @access Private
router.get('/', authMiddleware, async (req, res) => {
    // req.user comes from authMiddleware
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error getting logged in user' });
    }
});

// @route  POST api/auth
// @desc   Auth user and get token
// @access Public
router.post(
    '/',
    [
        check('email', 'Email is invalid').isEmail(),
        check('password', 'Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ msg: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ msg: 'Invalid credentials' });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                config.get('jwt-secret'),
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw new Error('Error setting token');
                    res.status(200).json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message });
        }
    }
);

module.exports = router;
