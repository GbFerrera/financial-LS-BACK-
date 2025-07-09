exports.up = function(knex) {
    return knex.schema.createTable('projects', (table) => {
      table.increments('id').primary(); 
      table.integer("admin_id").references("id").inTable("admins").onDelete("CASCADE");
      table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.string("status").notNullable();
      table.string("start_date").notNullable();
      table.string("end_date").notNullable();
      table.string("price").notNullable();
      table.string("created_at").defaultTo(knex.fn.now());
      table.string("updated_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
        table.string('title').notNullable();
        table.string('status').notNullable();
        table.string("start_date").notNullable();
        table.string("end_date").notNullable();
        table.string("price").notNullable()
        table.string("observations")
        table.string("created_at").defaultTo(knex.fn.now());
        table.string("updated_at").defaultTo(knex.fn.now());
      });
    });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('tasks')
      .then(() => knex.schema.dropTable('projects'));
  };
  