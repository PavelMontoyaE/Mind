import express from 'express';
import passport from 'passport';
import * as course from '../../controller/course.controller.js';

export default (app) => {
  const router = express.Router();

  // Create a new Course
  router.post("/", passport.authenticate('jwt', { session: false }), course.create);

  // Retrieve all Courses
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", passport.authenticate('jwt', { session: false }), course.findOne);

  // Update a Course with id
  router.put("/:id", passport.authenticate('jwt', { session: false }), course.update);

  // Delete a Course with id
  router.delete("/:id", passport.authenticate('jwt', { session: false }), course.delete_);

  app.use('/api/v2/courses', router);
};