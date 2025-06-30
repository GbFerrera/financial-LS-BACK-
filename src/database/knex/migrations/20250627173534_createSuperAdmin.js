exports.up = function(knex) {
    return knex.schema.createTable('super_admins', (table) => {
      table.increments('id').primary(); 
      table.string('name').notNullable(); 
      table.string('email').notNullable().unique(); 
      table.string('password').notNullable(); 
      table.string('created_at')
      table.string('updated_at')
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('super_admins');
  };