'use strict';
import Sequelize from 'sequelize';

class Course extends Sequelize.Model {
  static init(sequelize, Datatypes) {
    return super.init(
      {
        id: {
          primaryKey: true,
          autoincrement: true,
          type: Datatypes.INTEGER,
        },
        name: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        url: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        description: {
          type: Datatypes.STRING,
          allowNull: false,
        },
        status: {
          type: Datatypes.BOOLEAN,
          allowNull: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    const { User, Type} = models;

    this.belongsTo(Type, { foreignKey: 'type' });
    this.belongsTo(User, { foreignKey: 'createdBy' });
    this.belongsToMany(User, {
      as: 'users',
      through: 'CourseUsers',
      primaryKey: true,
    });
  }
}

export default Course;