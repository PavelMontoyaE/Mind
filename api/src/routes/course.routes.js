import express from 'express';
import passport from 'passport';
import * as course from '../controller/course.controller.js';

export default (app, logger) => {
  const router = express.Router();
  const middleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false });
    logger.info(`Running Route: ${req.baseUrl}`);
    next();
  };

  // Create a new Course
  router.post("/", middleware, course.create);

  // Retrieve all Courses
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", middleware, course.findOne);

  // Update a Course with id
  router.put("/:id", middleware, course.update);

  // Delete a Course with id
  router.delete("/:id", middleware, course.delete_);

  // Delete all Courses
  // router.delete("/", course.deleteAll);

  app.use('/api/course', router);
};