import express from 'express';
import passport from 'passport';
import * as role from '../../controller/role.controller.js';

export default (app) => {
  const router = express.Router();

  // Create a new Role
  router.post('/', role.create);

  // Retrieves all Roles
  router.get('/', role.findAll);

  // Retrieves a Role with id
  router.get('/:id', role.findOne);

  // Updates a Role with id
  router.put('/:id', role.update);

  // Deletes a Role with id
  router.delete('/:id', role.delete_);

  // Delete all Roles
  // router.delete("/", role.deleteAll);

  app.use('/api/v2/roles', passport.authenticate('jwt', { session: false }), router);
};
