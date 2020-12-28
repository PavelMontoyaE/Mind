'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Roles',
      [{ name: 'Admin' }, { name: 'User' }],
      {}
    );

    // TO DO: Search Ids by query
    /*
    const roles = await queryInterface.sequelize.query(
      `select id from roles;`
    );
    */

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstname: 'Pavel',
          lastname: 'Montoya',
          email: 'pmontoya@arkusnexus.com', // arkus@123
          password: '$2a$10$j1o6zGazJwsXGeqr0cf5dugAkleDKRK0MA0xTPfDdh3CiinjcOc/C', // 10 rounds
          status: true,
          role: 1,
        },
        {
          firstname: 'Albert',
          lastname: 'Camus',
          email: 'acamus@arkusnexus.com', // p4p1Camu$
          password: '$2a$10$/HLkPCjdSfLVL90LE4cfQug./4jjn5L6qsNWjEPYrDiLOQsSvw.v6',
          status: true,
          role: 1,
        },
        {
          firstname: 'Johan',
          lastname: 'Goethe',
          email: 'jgoethe@arkusnexus.com', // faust0
          password: '$2a$10$jvtUsp7tC61tbjLrO9xXsu6kYjSA8/aCgMtYFV.oWhAmXadZS3yrK',
          status: true,
          role: 2,
        },
        {
          firstname: 'Leon',
          lastname: 'Tolstoi',
          email: 'ltolstoi@arkusnexus.com', // 14guerraYpaz
          password: '$2a$10$oeXfTGCl2MDQBoV6AbhLu.Psg9lKlNNZ8hCUpGWdRwC7zNcMkREBK',
          status: true,
          role: 2,
        },
        {
          firstname: 'Edgar Allan',
          lastname: 'Poe',
          email: 'epoe@arkusnexus.com', // nunc4mas
          password: '$2a$10$T0jZfDXeaFD9J.zcrcFOIuWBeVUG90ff14KiTgtSVT.wka8x1Ma9K',
          status: true,
          role: 2,
        },
        {
          firstname: 'Gabriel',
          lastname: 'Garcia',
          email: 'epoe@arkusnexus.com', // g4b1t0
          password: '$2a$10$jwJR6x00mo3g6cO5YbHRf.BMHcB8ePelGKNJyQAxilDPI5qcerewG',
          status: true,
          role: 2,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'Types',
      [{ name: 'General' }, { name: 'Music' }, { name: 'IT' }, { name: 'DIY' }],
      {}
    );

    await queryInterface.bulkInsert('Courses', [
      {
        name: 'NodeJs',
        url: 'https://www.youtube.com/watch?v=BhvLIzVL8_o',
        description: 'Nodejs Curso Desde Cero, para principiantes',
        duration: 90,
        type: 3,
        createdBy: 2,
        status: true,
      },
      {
        name: 'Historia',
        url: 'https://www.youtube.com/watch?v=4cCx-4L9zmg',
        description: 'Mas Alla',
        duration: 62,
        type: 1,
        createdBy: 2,
        status: true,
      },
      {
        name: 'Run',
        url: 'https://www.youtube.com/watch?v=K09_5IsgGe8',
        description: 'Musica de Joji',
        duration: 5,
        type: 2,
        createdBy: 2,
        status: false,
      },
      {
        name: 'DIY',
        url: 'https://www.youtube.com/watch?v=3es9O-IDNmE',
        description: 'DIY Lightsaber',
        duration: 1140,
        type: 4,
        createdBy: 2,
        status: true,
      },
    ]);

    await queryInterface.bulkInsert(
      'CourseUsers',
      [
        { userId: 1, courseId: 2, completed: false, },
        { userId: 2, courseId: 4, completed: false, },
        { userId: 2, courseId: 3, completed: false, },
        { userId: 3, courseId: 1, completed: false, },
        { userId: 3, courseId: 2, completed: true, },
        { userId: 5, courseId: 1, completed: false, },
        { userId: 5, courseId: 2, completed: false, },
        { userId: 5, courseId: 3, completed: true, },
        { userId: 5, courseId: 4, completed: false, },
        { userId: 6, courseId: 1, completed: true, },
        { userId: 6, courseId: 4, completed: true, },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CourseUsers', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
    await queryInterface.bulkDelete('Types', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
