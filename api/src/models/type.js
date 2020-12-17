'use strict';
import Sequelize from 'sequelize';

class Type extends Sequelize.Model {
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
      },
      { sequelize }
    );
  }
}

export default Type;
