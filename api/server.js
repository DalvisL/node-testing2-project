const express = require('express');
const pokemonRouter = require('./Pokemon/pokemon-router.js');
const trainersRouter = require('./Trainers/trainers-router.js');

const server = express();

server.use(express.json());

server.use('/api/pokemon', pokemonRouter);
server.use('/api/trainers', trainersRouter);

server.get('/', (req, res) => {
    res.send({
        message: 'API is running!'
    })
});

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Error 404: Not Found',
    });
});

module.exports = server;
