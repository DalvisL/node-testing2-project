const express = require('express');
const Trainers = require('./trainers-model.js');
const { validateIdByType } = require('../middleware');

const router = express.Router();

// GET all trainers
router.get('/', (req, res, next) => {
    Trainers.getAll()
        .then(trainers => {
            res.status(200).json(trainers);
        })
        .catch(next);
});

// GET trainer by id
router.get('/:id', validateIdByType('trainers'), (req, res, next) => {
    Trainers.getById(req.params.id)
        .then(trainer => {
            if (trainer) {
                res.status(200).json(trainer);
            } else {
                res.status(404).json({
                    message: `Pokemon with id ${req.params.id} not found`,
                });
            }
        })
        .catch(next);
});

// GET all pokemon for a trainer
router.get('/:id/pokemon', validateIdByType('trainers'), (req, res, next) => {
    Trainers.getPokemon(req.params.id)
        .then(pokemon => {
            if (pokemon) {
                res.status(200).json(pokemon);
            } else {
                res.status(404).json({
                    message: `Trainer with id ${req.params.id} not found`,
                });
            }
        })
        .catch(next);
});

// POST new trainer
router.post('/', (req, res, next) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({
            message: 'Missing required name field',
        });
    }

    Trainers.add({ name })
        .then(trainer => {
            res.status(201).json(trainer);
        })
        .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
    // catch all error handler
    const status = err.status || 500;
    res.status(status).json({
        message: err.message,
    });
})
module.exports = router;
