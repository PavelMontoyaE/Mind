import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';

import { logger, expressLogger } from './src/libs/logger.js';
import db from './src/models/index.js';
import sessionRoutes from './src/routes/session.routes.js';
import roleRoutes from './src/routes/role.routes.js';
import userRoutes from './src/routes/user.routes.js';
import courseRoutes from './src/routes/course.routes.js';

const app = express();

// Logger
app.use(expressLogger);

// Cors
var corsOptions = {
  origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Secuelize
db.sequelize.sync({ force: true });

// JWT
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'arkusmind'; // TO DO: Add to env var

let strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  logger.debug('Calling findByPk');
  await db.User.findByPk(jwt_payload.id)
    .then((user) => {
      return done(null, user.dataValues);
    })
    .catch((err) => {
      logger.error(err);
      return done(err, false);
    });
});

app.use(function (err, req, res, next) {
  logger.error(err.stack)
  res.status(500).send('Something broke!')
})

passport.use(strategy);
app.use(passport.initialize());

// simple route
app.get('/', (req, res) => {
  logger.debug('Calling res.json');
  res.json({ message: 'Welcome to Courses application.' });
});

// TO DO: add in another file
roleRoutes(app, logger);
userRoutes(app, logger);
courseRoutes(app, logger);
sessionRoutes(app, logger);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
