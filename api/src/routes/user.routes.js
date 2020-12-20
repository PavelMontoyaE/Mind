import express from 'express';
import passport from 'passport';
import * as user from '../controller/user.controller.js';

export default (app, logger) => {
  const router = express.Router();
  const middleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false });
    logger.info(`Running Route: ${req.baseUrl}`);
    next();
  };

  // Create a new User
  router.post("/", user.create);

  // Retrieve all Users
  router.get("/", user.findAll);

  // Retrieve a single User with id
  router.get("/:id", user.findOne);

  // Retrieve a single User with id
  router.get("/:id/courses", user.findOneWithCourses);

  // Update a User with id
  router.put("/:id", user.update);

  // Delete a User with id
  router.delete("/:id", user.delete_);

  app.use('/api/user', middleware, router);
};