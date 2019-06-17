const express = require('express');
const router = express.Router();

// @route  GET api/contacts
// @desc   Get all users contacts
// @access Private
router.get('/', (req, res) => {
    res.send('Get a users contacts');
});

// @route  POST api/contacts
// @desc   Add new contact
// @access Public
router.post('/', (req, res) => {
    res.send('Create a new contact');
});

// @route  PUT api/contacts/:id
// @desc   Update contact
// @access Public
router.put('/:id', (req, res) => {
    res.send('Update a  contact');
});

// @route  DELETE api/contacts/:id
// @desc   Update contact
// @access Public
router.delete('/:id', (req, res) => {
    res.send('Delete a  contact');
});
module.exports = router;
