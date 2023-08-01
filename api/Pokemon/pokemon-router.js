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
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving pokemon: ${err}}`,
            });
            next(err);
        })
});

// GET pokemon by id
router.get('/:id', validateIdByType('pokemon'), (req, res, next) => {
    Pokemon.getById(req.params.id)
        .then(pokemon => {
            res.status(200).json(pokemon);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error retrieving pokemon with id ${req.params.id}: ${err}}`,
            });
            next(err);
        });
});

// POST new pokemon
router.post('/', validatePokemonBody, convertTypesToIds, (req, res, next) => {
    const { name, level, trainer_id, types } = req.body;
    const pokemon = { name, level, trainer_id };
    
    Pokemon.add(pokemon, types)
        .then(pokemon => {
            res.status(201).json(pokemon);
        })
        .catch(err => {
            res.status(500).json({
                message: `Error adding pokemon: ${err}}`,
            });
            next(err);
        });
});

router.use((err, req, res, next) => { // eslint-disable-line
   // catch all error handler
    res.status(500).json({
        message: `Pokemon router error: ${err.message}`,
        error: err.message,
        stack: err.stack,
    });
}); 

module.exports = router;