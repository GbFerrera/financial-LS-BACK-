exports.up = function(knex) {
    return knex.schema.createTable('admins', (table) => {
      table.increments('id').primary(); 
      table.integer('super_admin_id').unsigned().references('id').inTable('super_admins').onDelete('CASCADE');      
      table.string('name').notNullable(); 
      table.string('phone_number').notNullable();
      table.string('email').notNullable().unique(); 
      table.string('password').notNullable(); 
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('admins');
  };