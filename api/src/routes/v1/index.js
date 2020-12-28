import express from 'express';
import passport from 'passport';
import Sequelize from 'sequelize';

import db from '../../models/index.js';
import { logger } from '../../libs/logger.js';

const Course = db.Course;
const Op = Sequelize.Op;

export default (app) => {
  // Retrieve all Courses
  router.get('/', (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Course.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving courses.',
        });
      });
  });
  app.use('/api/v1/course', router);
};
