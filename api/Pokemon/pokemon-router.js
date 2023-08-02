const express = require('express');
const Pokemon = require('./pokemon-model.js');
const { 
    validateIdByType,
    validatePokemonBody,
    convertTypesToIds
} = require('../middleware');

const router = express.Router();

// GET all pokemon
router.get('/', (req, res, next) => {
    Pokemon.getAll()
        .then(pokemon => {
            res.status(200).json(pokemon);
        })
        .catch(next);
});

// GET pokemon by id
router.get('/:id', validateIdByType('pokemon'), (req, res, next) => {
    Pokemon.getById(req.params.id)
        .then(pokemon => {
            if (pokemon) {
                res.status(200).json(pokemon);
            } else {
                res.status(404).json({
                    message: `Pokemon with id ${req.params.id} not found`,
                });
            }
        })
        .catch(next);
});

// POST new pokemon
router.post('/', validatePokemonBody, convertTypesToIds, (req, res, next) => {
    const { name, level, trainer_id, types } = req.body;
    const pokemon = { name, level, trainer_id };
    
    Pokemon.add(pokemon, types)
        .then(pokemon => {
            res.status(201).json(pokemon);
        })
        .catch(next);
});

router.use((err, req, res, next) => { // eslint-disable-line
    // catch all error handler
    const status = err.status || 500;
    res.status(status).json({
        message: err.message,
    });
}); 

module.exports = router;