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
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving trainers: ${err}}`,
            });
            next(err);
        });

});

// GET trainer by id
router.get('/:id', validateIdByType('trainers'), (req, res, next) => {
    Trainers.getById(req.params.id)
        .then(trainer => {
            res.status(200).json(trainer);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving trainer with id ${req.params.id}: ${err}}`,
            });
            next(err);
        });
});

// GET all pokemon for a trainer
router.get('/:id/pokemon', validateIdByType('trainers'), (req, res, next) => {
    Trainers.getPokemon(req.params.id)
        .then(pokemon => {
            res.status(200).json(pokemon);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving pokemon for trainer with id ${req.params.id}: ${err}}`,
            });
            next(err);
        });
});

// POST new trainer
router.post('/', (req, res, next) => {
    const { name } = req.body;
    Trainers.add({ name })
        .then(trainer => {
            res.status(201).json(trainer);
        }
        )
        .catch(err => {
            res.status(500).json({
                message: `Error adding trainer: ${err}}`,
            });
            next(err);
        });

});

router.use((err, req, res, next) => { // eslint-disable-line
    // catch all error handler
    res.status(500).json({
        message: `Trainers router error: ${err.message}`,
        error: err.message,
    });
});
module.exports = router;
