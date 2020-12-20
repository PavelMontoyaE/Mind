import express from 'express';
import * as session from '../controller/session.controller.js';

export default (app) => {
  const router = express.Router();

  router.post('/', session.login);

  app.use('/api/session', router);
};
