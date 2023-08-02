/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('types').insert([
    { type: 'normal' },
    { type: 'fire' },
    { type: 'water' },
    { type: 'grass' },
    { type: 'electric' },
    { type: 'ice' },
    { type: 'fighting' },
    { type: 'poison' },
    { type: 'ground' },
    { type: 'flying' },
    { type: 'psychic' },
    { type: 'bug' },
    { type: 'rock' },
    { type: 'ghost' },
    { type: 'dark' },
    { type: 'dragon' },
    { type: 'steel' },
    { type: 'fairy' },
  ]);
  await knex('pokemon_types').insert([
    { pokemon_id: 1, type_id: 5 },
    { pokemon_id: 2, type_id: 2 },
    { pokemon_id: 3, type_id: 3 },
    { pokemon_id: 4, type_id: 4 },
    { pokemon_id: 5, type_id: 11 },
    { pokemon_id: 6, type_id: 11 },
    { pokemon_id: 7, type_id: 1 },
    { pokemon_id: 8, type_id: 3 },
    { pokemon_id: 9, type_id: 1 },
    { pokemon_id: 10, type_id: 2 },
    { pokemon_id: 10, type_id: 7 },
  ]);
};
