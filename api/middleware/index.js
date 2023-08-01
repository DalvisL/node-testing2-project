const db = require('../../database/dbConfig');


const validateIdByType = (type) => async (req, res, next) => {    
    if (type === 'pokemon') {
        const pokemon = await db('pokemon').where('id', req.params.id).first();
        if (!pokemon) {
            next({
                status: 404,
                message: `Pokemon with id ${req.params.id} not found`,
            });
        } else {
            next();
        }
    } else if (type === 'trainers') {
        const trainer = await db('trainers').where('id', req.params.id).first();
        if (!trainer) {
            next({
                status: 404,
                message: `Trainer with id ${req.params.id} not found`,
            });
        } else {
            next();
        }
    }
};

const validatePokemonBody = (req, res, next) => {
    const { name, level, trainer_id, primary_type } = req.body;
    if (!name || !level || !trainer_id || !primary_type) {
        next({
            status: 400,
            message: 'Missing required name, level, trainer_id, or types field',
        });
    } else {
        next();
    }
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
            next({
                status: 404,
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