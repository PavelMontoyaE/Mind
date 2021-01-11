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

  if (bcrypt.compareSync(password, user.password)) {
    const payload = { id: user.id };
    const jwtOptions = {};

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.API_SECRET;
    const token = jwt.sign(payload, jwtOptions.secretOrKey);

    const userData = {
      email,
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
      role: user.Role.name,
    };
    return res.send({ user: userData, token: token });
  }

  res.status(401).send({
    msg: 'Invalid Credentials',
  });
};

const getUser = async (email) => {
  var condition = { email: email };
  const attributes = { attributes: ['id', 'name'] };
  const user = await User.findAll({
    where: condition,
    include: [{ model: db.Role, ...attributes }],
  })
    .then((data) => {
      return data[0];
    })
    .catch(() => {
      return false;
    });
  return user;
};
