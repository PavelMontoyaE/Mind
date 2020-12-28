import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import swaggerUi from 'swagger-ui-express';

import { logger, expressLogger } from './src/libs/logger.js';
import swaggerSpecs from './src/config/swagger.config.js';
import db from './src/models/index.js';
import routesV2 from './src/routes/v2/index.js'

const app = express();

// Logger
app.use(expressLogger);

// Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, { explorer: true })
);

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
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

passport.use(strategy);
app.use(passport.initialize());

// simple route
app.get('/', (req, res) => {
  logger.debug('Calling res.json');
  res.json({ message: 'Welcome to Courses application.' });
});

// TO DO: add in another file
routesV2(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
