import Sequelize from 'sequelize';
import db from '../models/index.js';
import { logger } from '../libs/logger.js';

const Course = db.Course;
const Op = Sequelize.Op;

// Create and Save a new Course
export const create = (req, res) => {
  if (!req.body.name || !req.body.url || !req.body.description) {
    res.status(400).send({
      message: 'Missing fields',
    });
    return;
  }

  // Create a Course
  const course = req.body;
  course.status = req.body.status ? req.body.status : false;

  // Save Course in the database
  Course.create(course)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Course.',
      });
    });
};

// Retrieve all Courses from the database.
export const findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Course.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving courses.',
      });
    });
};

// Find a single Course with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: 'Error retrieving Course with id=' + id,
      });
    });
};

// Update a Course by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Course.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Course was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: 'Error updating Course with id=' + id,
      });
    });
};

// Delete a Course with the specified id in the request
export const delete_ = (req, res) => {
  const id = req.params.id;

  Course.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Course was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Course with id=${id}. Maybe Course was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: 'Could not delete Course with id=' + id,
      });
    });
};

// Delete all Courses from the database.
export const deleteAll = (req, res) => {
  Course.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Courses were deleted successfully!` });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all courses.',
      });
    });
};

// Find all active Courses
export const findActive = (req, res) => {
  Course.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving courses.',
      });
    });
};
