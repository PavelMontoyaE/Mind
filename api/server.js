import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './src/models/index.js';
import roleRoutes from './src/routes/role.routes.js'
import userRoutes from './src/routes/user.routes.js';
import courseRoutes from './src/routes/course.routes.js';

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// TO DO: add in another file
roleRoutes(app);
userRoutes(app);
courseRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
