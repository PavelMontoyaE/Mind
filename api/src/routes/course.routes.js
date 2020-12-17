import express from 'express';
import * as course from '../controller/course.controller.js';

export default app => {
  const router = express.Router();

  // Create a new Course
  router.post("/", course.create);

  // Retrieve all Courses
  router.get("/", course.findAll);

  // Retrieve a single Course with id
  router.get("/:id", course.findOne);

  // Update a Course with id
  router.put("/:id", course.update);

  // Delete a Course with id
  router.delete("/:id", course.delete_);

  // Delete all Courses
  // router.delete("/", course.deleteAll);

  app.use('/api/course', router);
};