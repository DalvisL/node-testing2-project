const Pokemon = require('./pokemon-model.js');
const db = require('../../database/dbConfig.js');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('Sanity Test', () => {
    it('should run tests', () => {
        expect(true).toBe(true);
    });
});

describe('getAll', () => {
    it('should return all pokemon', async () => {
        const pokemon = await Pokemon.getAll();
        expect(pokemon).toHaveLength(10);
    })
    it('should return the correct shape for pokemon with only a primary type', async () => {
        const pokemon = await Pokemon.getAll();
        expect(pokemon[0]).toMatchObject({
            id: 1,
            name: 'pikachu',
            level: 80,
            trainer: 'ash',
            types: {
                primary: 'electric',
                secondary: null
            }
        })
    })
    it('should return the correct shape for pokemon with both a primary and secondary type', async () => {
        const pokemon = await Pokemon.getAll();
        expect(pokemon[9]).toMatchObject({
            id: 10,
            name: 'emboar',
            level: 50,
            trainer: 'ash',
            types: {
                primary: 'fire',
                secondary: 'fighting'
            }
        })
    })      
});

describe('getById', () => {
    it('should return the pokemon with the specified id', async () => {
        const pokemon = await Pokemon.getById(1);
        expect(pokemon).toMatchObject({
            id: 1,
            name: 'pikachu',
            level: 80,
            trainer: 'ash',
            types: {
                primary: 'electric',
                secondary: null
            }
        })    
    });
    it('should return null if the pokemon is not found', async () => {
        const pokemon = await Pokemon.getById(100);
        expect(pokemon).toBeNull();
    });
});

describe('add', () => {
    it('should add the pokemon to the database', async () => {
        const newPokemon = {
            name: 'charmander',
            level: 12,
            trainer_id: 1,
        }
        const types = [2];
        const pokemon = await Pokemon.add(newPokemon, types);
        const addedPokemon = await db('pokemon').where('id', pokemon.id).first();
        expect(addedPokemon).toMatchObject({
            id: 11,
            name: 'charmander',
            level: 12,
            trainer_id: 1,
        });
    });
    it('should return the added pokemon', async () => {
        const newPokemon = {
            name: 'charmander',
            level: 12,
            trainer_id: 1,
        }
        const types = [2];
        const pokemon = await Pokemon.add(newPokemon, types);
        expect(pokemon).toMatchObject({
            id: 11,
            name: 'charmander',
            level: 12,
            trainer: 'ash',
            types: {
                primary: 'fire',
                secondary: null
            }
        });
    });
});