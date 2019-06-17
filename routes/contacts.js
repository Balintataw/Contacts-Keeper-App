const express = require('express');
const { check, validationResult } = require('express-validator/check');

const authMiddleware = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route  GET api/contacts
// @desc   Get all users contacts
// @access Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching users contacts' });
    }
});

// @route  POST api/contacts
// @desc   Add new contact
// @access Private
router.post(
    '/',
    [
        authMiddleware,
        [
            check('name', 'Name is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });
            const contact = await newContact.save();
            res.status(200).json(contact);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error creating user contact' });
        }
    }
);

// @route  PUT api/contacts/:id
// @desc   Update contact
// @access Private
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        // Ensure user owns contact
        if (contact.user.toString !== req.user.id) {
            return res
                .status(401)
                .json({ msg: 'Contact creation not authorized' });
        }
        // Update conatact
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );
        res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error updating user contact' });
    }
});

// @route  DELETE api/contacts/:id
// @desc   Update contact
// @access Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found' });
        // Ensure user owns contact
        if (contact.user.toString !== req.user.id) {
            return res
                .status(401)
                .json({ msg: 'Contact creation not authorized' });
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error removing user contact' });
    }
});
module.exports = router;
