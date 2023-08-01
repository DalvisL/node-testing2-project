const db = require('../../database/dbConfig.js');

async function getAll() {
    // left join to include trainer name and pokemon type from both the trainer table
    // and the pokemon_types table
    /**
     * The shape should look something like this:
     * [
     * {
     * id: 1,
     * name: 'pikachu',
     * level: 80,
     * trainer: 'ash',
     * types: {
     *     primary: 'electric',
     *     secondary: null
     *  }
     * },
     * 
     * ]
     */
    const pokemon = await db('pokemon')
        .leftJoin('trainers', 'pokemon.trainer_id', 'trainers.id')
        .leftJoin('pokemon_types', 'pokemon.id', 'pokemon_types.pokemon_id')
        .leftJoin('types', 'pokemon_types.type_id', 'types.id')
        .select('pokemon.id', 'pokemon.name', 'pokemon.level', 'trainers.name as trainer', 'types.type')
        .orderBy('pokemon.id');
        
    const result = [];

    pokemon.forEach(p => {
        const index = result.findIndex(r => r.id === p.id);
        if (index === -1) {
            result.push({
                id: p.id,
                name: p.name,
                level: p.level,
                trainer: p.trainer,
                types: {
                    primary: p.type,
                    secondary: null
                }
            });
        } else {
            result[index].types.secondary = p.type;
        }
    });

    return result;

}

async function getById(id) {
    const pokemon = await db('pokemon')
    .leftJoin('trainers', 'pokemon.trainer_id', 'trainers.id')
    .leftJoin('pokemon_types', 'pokemon.id', 'pokemon_types.pokemon_id')
    .leftJoin('types', 'pokemon_types.type_id', 'types.id')
    .select('pokemon.id', 'pokemon.name', 'pokemon.level', 'trainers.name as trainer', 'types.type')
    .where('pokemon.id', id)
    .orderBy('pokemon.id');

    const result = {
        id: pokemon[0].id,
        name: pokemon[0].name,
        level: pokemon[0].level,
        trainer: pokemon[0].trainer,
        types: {
            primary: pokemon[0].type,
            secondary: null
        }
    };

    pokemon.forEach(p => {
        if (p.type !== result.types.primary) {
            result.types.secondary = p.type;
        }
    });

    return result;
}

async function add(pokemon, types) {
    const [id] = await db('pokemon').insert(pokemon);
    const typeIds = types;
    for (let i = 0; i < typeIds.length; i++) {
        await db('pokemon_types').insert({ pokemon_id: id, type_id: typeIds[i] });
    }
    return getById(id);
}

module.exports = {
    getAll,
    getById,
    add,
};