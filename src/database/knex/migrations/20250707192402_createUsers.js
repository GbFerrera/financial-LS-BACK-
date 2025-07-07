exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); 
      table.string("name").notNullable()
      table.string("document").notNullable()
      table.string("email").notNullable()
      table.string("password").notNullable()
      table.string("phone_number").notNullable()
      table.string("company_name").notNullable()
      table.string("created_at").defaultTo(knex.fn.now())
      table.string("updated_at").defaultTo(knex.fn.now())
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };