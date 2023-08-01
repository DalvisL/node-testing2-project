/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("types", (table) => {
            table.increments("id");
            table.string("type", 24).notNullable();
        })
        .createTable("trainers", (table) => {
            table.increments("id");
            table.string("name", 128).notNullable();
        })
        .createTable("pokemon", (table) => {
            table.increments("id");
            table.string("name", 128).notNullable();
            table.integer("level").notNullable();
            table.integer("trainer_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("trainers")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
        .createTable("pokemon_types", (table) => {
            table.integer("pokemon_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("pokemon")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            table.integer("type_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("types")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
            table.primary(["pokemon_id", "type_id"]); // Composite primary key
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("pokemon_types")
    .dropTableIfExists("pokemon")
    .dropTableIfExists("trainers")
    .dropTableIfExists("types");
};
