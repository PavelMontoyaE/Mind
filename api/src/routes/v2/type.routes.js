import express from 'express';
import passport from 'passport';
import * as type from '../../controller/type.controller.js';

export default (app) => {
  const router = express.Router();

  // Create a new Type
  router.post('/', type.create);

  // Retrieves all Types
  router.get('/', type.findAll);

  // Retrieves a Type with id
  router.get('/:id', type.findOne);

  // Updates a Type with id
  router.put('/:id', type.update);

  // Deletes a Type with id
  router.delete('/:id', type.delete_);

  // Delete all Types
  // router.delete("/", type.deleteAll);

  app.use('/api/v2/types', passport.authenticate('jwt', { session: false }), router);
};
