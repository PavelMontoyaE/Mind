exports.up = function (knex) {
  return knex.schema
    .createTableIfNotExists('roles', function (table) {
      table.increments('role_id').primary();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTableIfNotExists('users', function (table) {
      table.increments('user_id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('role').unsigned().notNullable();
      table.boolean('status').defaultTo(1);

      table.unique('email');
      table.foreign('role').references('role_id').inTable('roles');
    })
    .createTableIfNotExists('types', function (table) {
      table.increments('type_id').primary();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTableIfNotExists('courses', function (table) {
      table.increments('course_id').primary();
      table.string('name');
      table.string('url');
      table.string('description');
      table.integer('type').unsigned().notNullable();
      table.integer('created_by').unsigned().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.boolean('status').defaultTo(1);

      table.foreign('type').references('type_id').inTable('types');
      table.foreign('created_by').references('user_id').inTable('users');
    })
    .createTableIfNotExists('course_users', function (table) {
      table.increments('user_course_id').primary();
      table.integer('user').unsigned().notNullable();
      table.integer('course').unsigned().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());

      table.foreign('user').references('user_id').inTable('users');
      table.foreign('course').references('course_id').inTable('courses');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('roles')
    .dropTableIfExists('users')
    .dropTableIfExists('types')
    .dropTableIfExists('courses')
    .dropTableIfExists('course_users');
};
