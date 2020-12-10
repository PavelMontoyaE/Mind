const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries and resets Auto Increment
    await knex('course_users').del();
    await knex.raw('ALTER TABLE ' + 'course_users' + ' AUTO_INCREMENT = 1')
    await knex('courses').del();
    await knex.raw('ALTER TABLE ' + 'courses' + ' AUTO_INCREMENT = 1')
    await knex('types').del();
    await knex.raw('ALTER TABLE ' + 'types' + ' AUTO_INCREMENT = 1')
    await knex('users').del();
    await knex.raw('ALTER TABLE ' + 'users' + ' AUTO_INCREMENT = 1')
    await knex('roles').del();
    await knex.raw('ALTER TABLE ' + 'roles' + ' AUTO_INCREMENT = 1')

    await knex('roles').insert([
      { name: 'admin' },
      { name: 'tutor' },
      { name: 'user' },
    ]);

    await knex('users').insert([
      { 
        first_name: 'Pavel',
        last_name: 'Montoya',
        email: 'pmontoya@arkusnexus.com',
        password: bcrypt.hashSync('pass', saltRounds),
        role: 1,
      },
      { 
        first_name: 'Johan',
        last_name: 'Goethe',
        email: 'jg@arkusnexus.com',
        password: bcrypt.hashSync('faust0', saltRounds),
        role: 2,
      },
      { 
        first_name: 'Leon',
        last_name: 'Tolstoi',
        email: 'lt@arkusnexus.com',
        password: bcrypt.hashSync('guerra', saltRounds),
        role: 3,
      },
      { 
        first_name: 'Edgar Allan',
        last_name: 'Poe',
        email: 'ep@arkusnexus.com',
        password: bcrypt.hashSync('nuncamas', saltRounds),
        role: 3,
      },
      { 
        first_name: 'Albert',
        last_name: 'Camus',
        email: 'ac@arkusnexus.com',
        password: bcrypt.hashSync('extranjero', saltRounds),
        role: 3,
      },
    ]);

    await knex('types').insert([
      { name: 'General' },
      { name: 'IT' },
      { name: 'Musica' },
      { name: 'DIY' },
    ]);

    await knex('courses').insert([
      { 
        name: 'NodeJs',
        url: 'https://www.youtube.com/watch?v=BhvLIzVL8_o',
        description: 'Nodejs Curso Desde Cero, para principiantes',
        type: 2,
        created_by: 2,
      },
      { 
        name: 'Historia',
        url: 'https://www.youtube.com/watch?v=4cCx-4L9zmg',
        description: 'Mas Alla',
        type: 1,
        created_by: 2,
      },
      { 
        name: 'Musica',
        url: 'https://www.youtube.com/watch?v=K09_5IsgGe8',
        description: 'Musica de Joji',
        type: 3,
        created_by: 2,
      },
      { 
        name: 'DIY',
        url: 'https://www.youtube.com/watch?v=3es9O-IDNmE',
        description: 'DIY Lightsaber',
        type: 4,
        created_by: 2,
      },
    ]);

    await knex('course_users').insert({ user: 3, course: 1 });

  } catch (err) {
    console.error(err);
  }
}
