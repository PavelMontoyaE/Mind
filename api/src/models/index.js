import Sequelize from 'sequelize';
import * as dbConfig from '../config/db.config.js';
import Role from './role.js';
import User from './User.js';
import Type from './type.js';
import Course from './course.js';
import CourseUser from './CourseUser.js';
import { logger } from '../libs/logger.js';

const DataTypes = Sequelize.DataTypes;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: 'mysql',
  logging: (sql, timing) => logger.info(sql, typeof timing === 'number' ? `Elapsed time: ${timing}ms` : ''),
});

const models = {
  Role: Role.init(sequelize, DataTypes),
  User: User.init(sequelize, DataTypes),
  Type: Type.init(sequelize, DataTypes),
  Course: Course.init(sequelize, DataTypes),
  CourseUser: CourseUser.init(sequelize, DataTypes),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

export default db;
