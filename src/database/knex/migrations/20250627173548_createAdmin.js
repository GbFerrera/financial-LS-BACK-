exports.up = function(knex) {
    return knex.schema.createTable('admins', (table) => {
      table.increments('id').primary(); 
      table.increments('super_admin_id').references('id').inTable('super_admins').onDelete('CASCADE');      
      table.string('name').notNullable(); 
      table.string('phone_number').notNullable();
      table.string('email').notNullable().unique(); 
      table.string('password').notNullable(); 
      table.string('created_at')
      table.string('updated_at')
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('admins');
  };