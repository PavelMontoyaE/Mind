'use strict';
import Sequelize from 'sequelize';

class CourseUser extends Sequelize.Model {
  static init(sequelize, Datatypes) {
    return super.init(
      {
        completed: {
          type: Datatypes.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      { sequelize }
    );
  }
}

export default CourseUser;
