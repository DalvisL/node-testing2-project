const db = require('../../database/dbConfig');

const validateIdByType = (type) => async (req, res, next) => {    
    if (type === 'pokemon') {
        const pokemon = await db('pokemon').where('id', req.params.id).first();
        if (!pokemon) {
            return res.status(404).json({
                message: `Pokemon with id ${req.params.id} not found`,
            });
        }
    } else if (type === 'trainers') {
        const trainer = await db('trainers').where('id', req.params.id).first();
        if (!trainer) {
            return res.status(404).json({
                message: `Trainer with id ${req.params.id} not found`,
            });
        }
    }
    next();
};

const validatePokemonBody = (req, res, next) => {
    const { name, level, trainer_id, primary_type } = req.body;
    if (!name || !level || !trainer_id || !primary_type) {
        return res.status(400).json({
            message: 'Missing required name, level, trainer_id, or types field',
        });
    }
    next();
};

const convertTypesToIds = async (req, res, next) => {
    const { primary_type, secondary_type } = req.body;
    const types = [primary_type, secondary_type];
    const typeIds = [];
    if (!secondary_type) {
        types.pop();
    }
    for (let i = 0; i < types.length; i++) {
        const type = await db('types').where('type', types[i]).first();
        if (!type) {
            return res.status(404).json({
                message: `Type ${types[i]} not found`,
            });
        } else {
            typeIds.push(type.id);
        }
    }
    req.body.types = typeIds;
    next();
};

module.exports = {
    validateIdByType,
    validatePokemonBody,
    convertTypesToIds,
};