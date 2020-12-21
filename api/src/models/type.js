'use strict';
import Sequelize from 'sequelize';

class Type extends Sequelize.Model {
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

export default Type;
