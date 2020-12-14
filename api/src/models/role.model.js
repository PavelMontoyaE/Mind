import Sequelize from 'sequelize';

class Role extends Sequelize.Model {
  static init(sequelize, Datatypes) {
    return super.init(
      {
        role_id: {
          type: Datatypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoincrement: true,
        },
        name: {
          type: Datatypes.STRING,
          allowNull: false,
        },
      }, {sequelize});
  }
}

export default new Role();