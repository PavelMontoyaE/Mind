import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../models/index.js';
import Course from '../models/course.js';
import Role from '../models/role.js';

const User = db.User;
const Op = Sequelize.Op;

// Create and Save a new User
export const create = (req, res) => {
  // Validate request
  // TO DO: Create field validator
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password ||
    !req.body.role
  ) {
    res.status(400).send({
      message: 'Missing fields',
    });
    return;
  }

  // Create a User
  // TO DO: Create parser
  const user = req.body;
  const saltRounds = 10; // TO DO: again, save environment var
  user.password = bcrypt.hashSync(req.body.password, saltRounds);
  user.status = req.body.status ? req.body.status : false;

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

// Retrieve all Users from the database.
export const findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

// Find a single User with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: Role })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving User with id=' + id,
      });
    });
};

// Find a single User with an id
export const findOneWithCourses = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [{
      model: Course,
      as: 'courses',
    }, Role]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('[findOneWithCourses] error: ', err);
      res.status(500).send({
        message: 'Error retrieving User with id=' + id,
      });
    });
};

// Update a User by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};

// Delete a User with the specified id in the request
export const delete_ = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id,
      });
    });
};

// Delete all Users from the database.
export const deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all users.',
      });
    });
};

// Find all active Users
export const findActive = (req, res) => {
  User.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};
