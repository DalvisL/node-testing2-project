const express = require('express');
const Trainers = require('./trainers-model.js');
const { validateIdByType } = require('../middleware');

const router = express.Router();

// GET all trainers
router.get('/', (req, res) => {
    Train
});

// GET trainer by id
router.get('/:id', validateIdByType('trainers'), (req, res) => {

});

// GET all pokemon for a trainer
router.get('/:id/pokemon', validateIdByType('trainers'), (req, res) => {

});

// POST new trainer
router.post('/', (req, res) => {

});

module.exports = router;
