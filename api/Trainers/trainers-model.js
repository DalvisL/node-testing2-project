const db = require('../../database/dbConfig');

async function getAll() {
    const result = await db('trainers');
    return result;
}

async function getById(id) {
    const result = await db('trainers').where('id', id).first();
    return result;
}

async function getPokemon(id) {
    let result = await db('pokemon').where('trainer_id', id);

    if(result.length === 0) {
        result = {
            message: `Trainer with id ${id} has no pokemon`
        }
    }
    return result;
}

async function add(trainer) {
    const [id] = await db('trainers').insert(trainer);
    return getById(id);
}

module.exports = {
    getAll,
    getById,
    getPokemon,
    add
};