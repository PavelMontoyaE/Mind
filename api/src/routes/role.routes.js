import express from 'express';
import passport from 'passport';
import * as role from '../controller/role.controller.js';

export default (app, logger) => {
  const router = express.Router();

  // Create a new Role
  router.post('/', role.create);

  /**
   * @swagger
   * /api/role:
   *   get:
   *     summary: Retrieve all roles
   *     responses:
   *       200:
   *         description: All roles
   */
  router.get('/', role.findAll);

  /**
   * @swagger
   * /api/role/{id}:
   *   get:
   *     summary: Retrieve a single role with id
   *     responses:
   *       200:
   *         description: A single role
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the role to retrieve.
   *         schema:
   *           type: integer
   */
  router.get('/:id', role.findOne);

  /**
   * @swagger
   * /api/role/{id}:
   *   put:
   *     summary: Updates a single role with id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The role's name.
   *                 example: Admin
   *     responses:
   *       200:
   *         description: Updated a single role
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the role to retrieve.
   *         schema:
   *           type: integer
   */
  router.put('/:id', role.update);

  // Delete a Role with id
  router.delete('/:id', role.delete_);

  // Delete all Roles
  // router.delete("/", role.deleteAll);

  app.use('/api/role', passport.authenticate('jwt', { session: false }), router);
};
