import Sequelize from 'sequelize';
import db from '../models/index.js';
import { logger } from '../libs/logger.js';

const Role = db.Role;
const Op = Sequelize.Op;

// Create and Save a new Role
export const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Role
  const role = req.body;

  // Save Role in the database
  Role.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Role.',
      });
    });
};

// Retrieve all Roles from the database.
export const findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Role.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Roles.',
      });
    });
};

// Find a single Role with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Role with id=' + id,
      });
    });
};

// Update a Role by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Role was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({
        message: 'Error updating Role with id=' + id,
      });
    });
};

// Delete a Role with the specified id in the request
export const delete_ = (req, res) => {
  const id = req.params.id;

  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Role was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Role with id=' + id,
      });
    });
};

// Delete all Roles from the database.
export const deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Roles.',
      });
    });
};
