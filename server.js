const express = require('express');
require('dotenv').config();
const path = require('path');
const connect = require('./config/db');

const app = express();

// mongo connection
connect();

// Init middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder in /client/build
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', index.html));
    });
}

app.get('/', (req, res, next) => {
    res.json({ hey: 'Welcome to ContactKeeper API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
