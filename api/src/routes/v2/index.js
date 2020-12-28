import sessionRoutes from './session.routes.js';
import roleRoutes from './role.routes.js';
import userRoutes from './user.routes.js';
import courseRoutes from './course.routes.js';

export default (app) => {
  roleRoutes(app);
  userRoutes(app);
  courseRoutes(app);
  sessionRoutes(app);
};
