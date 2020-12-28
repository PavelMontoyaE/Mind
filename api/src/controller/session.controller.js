import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import db from '../models/index.js';

const User = db.User;
const ExtractJwt = passportJWT.ExtractJwt;

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ msg: 'Password is incorrect' });
  }

  // we get the user with the name and save the resolved promise returned
  // TO DO: get Active User
  const user = await getUser(email);

  if (!user || !user.dataValues) {
    return res.status(401).json({ msg: 'No such user was found', user });
  }

  const { id: userId, password: userPassword } = user.dataValues;

  if (bcrypt.compareSync(password, userPassword)) {
    const payload = { id: userId };
    const jwtOptions = {};

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // TO DO: add ona config file.
    jwtOptions.secretOrKey = 'arkusmind';
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    const userData = {
      email,
      id: userId,
    };
    return res.send({ user: userData, token: token });
  }

  res.status(401).send({
    msg: 'Invalid Credentials',
  });
};

const getUser = async (email) => {
  var condition = { email: email };
  const user = await User.findAll({ where: condition })
    .then((data) => {
      return data[0];
    })
    .catch(() => {
      return false;
    });
  return user;
};
