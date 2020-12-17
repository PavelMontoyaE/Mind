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
          password: '$2y$10$fWIiN3MdAlpKdiufshw30u.PXfqkIbhBZUtZAwecR0VTikPtaEZT6', // 10 rounds
          status: true,
          role: 1,
        },
        {
          firstname: 'Albert',
          lastname: 'Camus',
          email: 'acamus@arkusnexus.com', // p4p1Camu$
          password: '$2y$10$z0UOLAmw1IhrcTBsNGSB5uyV7rCArVd5Y3siXB9kwNOfB5B/ppxge',
          status: true,
          role: 1,
        },
        {
          firstname: 'Johan',
          lastname: 'Goethe',
          email: 'jgoethe@arkusnexus.com', // faust0
          password: '$2y$10$Z8RcmVdlJMUZUp7dyBkyGehRAwczk1iMJgLdA3WQGwY2cxDE8xE8O',
          status: true,
          role: 2,
        },
        {
          firstname: 'Leon',
          lastname: 'Tolstoi',
          email: 'ltolstoi@arkusnexus.com', // 14guerraYpaz
          password: '$2y$10$p7pq8tCXLZaBrZaj4.mgLeovJtFzv49GyD24HLkhATtrG3JdwpXOy',
          status: true,
          role: 2,
        },
        {
          firstname: 'Edgar Allan',
          lastname: 'Poe',
          email: 'epoe@arkusnexus.com', // nunc4mas
          password: '$2y$10$lyMdGa1tGeZaV0fi.gwhi.auiqWdijoG7ZwMAl.zGYb0TUm9LXGdW',
          status: true,
          role: 2,
        },
        {
          firstname: 'Gabriel',
          lastname: 'Garcia',
          email: 'epoe@arkusnexus.com', // g4b1t0
          password: '$2y$10$wZP4btqI70uDTZGw31Pgt.zYXHtcgAq.JFnup2pTCAmK8x3LxO2BK',
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
        status: true,
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
        { userId: 1, courseId: 2 },
        { userId: 2, courseId: 4 },
        { userId: 2, courseId: 3 },
        { userId: 3, courseId: 1 },
        { userId: 3, courseId: 2 },
        { userId: 5, courseId: 1 },
        { userId: 5, courseId: 2 },
        { userId: 5, courseId: 3 },
        { userId: 5, courseId: 4 },
        { userId: 6, courseId: 1 },
        { userId: 6, courseId: 4 },
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
