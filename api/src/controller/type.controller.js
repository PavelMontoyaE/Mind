import db from '../models/index.js';
import Sequelize from 'sequelize';

const Type = db.Type;
const Op = Sequelize.Op;

// Create and Save a new Type
export const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Type
  const type = req.body;

  // Save Type in the database
  Type.create(type)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Type.',
      });
    });
};

// Retrieve all Type from the database.
export const findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Type.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Types.',
      });
    });
};

// Find a single Type with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Type.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Type with id=' + id,
      });
    });
};

// Update a Type by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  Type.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Type was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Type with id=${id}. Maybe Type was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Type with id=' + id,
      });
    });
};

// Delete a Type with the specified id in the request
export const delete_ = (req, res) => {
  const id = req.params.id;

  Type.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Type was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Type with id=${id}. Maybe Type was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Type with id=' + id,
      });
    });
};

// Delete all Type from the database.
export const deleteAll = (req, res) => {
  Type.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Types were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Types.',
      });
    });
};
