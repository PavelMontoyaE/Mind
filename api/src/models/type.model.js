import Sequelize from 'sequelize';

class Role extends Sequelize.Model {
  static init(sequelize, Sequelize) {
    return super.init(
      {
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoincrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }, {sequelize});
  }
}

console.log(Role);

export default new Role();