'use strict';
import Sequelize from 'sequelize';

class Role extends Sequelize.Model {
  static init(sequelize, Sequelize) {
    return super.init(
      {
        id: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
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
}

export default Role;
