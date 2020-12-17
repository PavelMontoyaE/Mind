'use strict';
import Sequelize from 'sequelize';

class User extends Sequelize.Model {
  static init(sequelize, Datatypes) {
    return super.init(
      {
        id: {
          primaryKey: true,
          autoincrement: true,
          type: Datatypes.INTEGER,
        },
        firstname: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        email: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        password: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        status: {
          type: Datatypes.BOOLEAN,
          allowNull: false,
        },
        role: {
          type: Datatypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    const { Course, Role } = models;
    console.log(models);

    this.belongsTo(Role, {
      foreignKey: 'role',
    });
    this.belongsToMany(Course, {
      as: 'courses',
      through: 'CourseUsers',
      primaryKey: true,
    });
  }
}

export default User;
