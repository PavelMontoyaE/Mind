import express from 'express';
import passport from 'passport';
import * as role from '../controller/role.controller.js';

export default (app, logger) => {
  const router = express.Router();
  const middleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false });
    logger.info(`Running Route: ${req.baseUrl}`);
    next();
  };

  // Create a new Role
  router.post('/', role.create);

  // Retrieve all Roles
  router.get('/', role.findAll);

  // Retrieve a single Role with id
  router.get('/:id', role.findOne);

  // Update a Role with id
  router.put('/:id', role.update);

  // Delete a Role with id
  router.delete('/:id', role.delete_);

  // Delete all Roles
  // router.delete("/", role.deleteAll);

  app.use('/api/role', middleware, router);
};
