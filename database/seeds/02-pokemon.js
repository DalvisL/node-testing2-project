/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('pokemon').insert([
    { name: 'pikachu', level: 80, trainer_id: 1 },
    { name: 'charmander', level: 10, trainer_id: 1 },
    { name: 'squirtle', level: 15, trainer_id: 1 },
    { name: 'bulbasaur', level: 20, trainer_id: 3 },
    { name: 'mew', level: 99, trainer_id: 3 },
    { name: 'mewtwo', level: 99, trainer_id: 3 },
    { name: 'snorlax', level: 50, trainer_id: 2 },
    { name: 'piplup', level: 5, trainer_id: 2 },
    { name: 'pidgey', level: 2, trainer_id: 2 },
    { name: 'emboar', level: 50, trainer_id: 1 }
  ]);
};
