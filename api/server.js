import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import { logger, expressLogger } from './src/libs/logger.js';
import swaggerOptions from './src/config/swagger.config.js';
import db from './src/models/index.js';
import routes from './src/routes/v1/index.js';
import routesV2 from './src/routes/v2/index.js';

dotenv.config();
const app = express();

// Logger
app.use(expressLogger);

app.use(express.static('src/public'));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

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
jwtOptions.secretOrKey = process.env.API_SECRET;

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

routes(app);
routesV2(app);

let port;
if (process.env.NODE_ENV === 'testing') {
  port = process.env.TEST_PORT;
} else {
  port = process.env.PORT;
}
export default app.listen(port, () => {
  logger.info(`Server is running on port ${port}.`);
});

export const { sequelize } = db;
