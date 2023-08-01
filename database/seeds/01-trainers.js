/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('trainers').insert([
    { name: 'ash' },
    { name: 'misty' },
    { name: 'brock' },
  ]);
};
