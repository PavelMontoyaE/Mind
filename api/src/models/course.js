'use strict';
import Sequelize from 'sequelize';

class Course extends Sequelize.Model {
  static init(sequelize, Datatypes) {
    return super.init(
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
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
        duration: {
          type: Datatypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: Datatypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    const { User, Type, CourseUser} = models;

    this.belongsTo(Type, { foreignKey: 'type' });
    this.belongsTo(User, { foreignKey: 'createdBy' });
    this.belongsToMany(User, {
      as: 'users',
      through: CourseUser,
      primaryKey: true,
    });
  }
}

export default Course;
