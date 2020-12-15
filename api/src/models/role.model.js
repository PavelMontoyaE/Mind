import Sequelize from 'sequelize';

class Role extends Sequelize.Model {
  static init(sequelize, Sequelize) {
    return super.init(
      {
        role_id: {
          primaryKey: true,
          autoincrement: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }, {sequelize});
  }
}

export default Role;