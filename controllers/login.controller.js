const users = require('../models/user');
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN;

async function login(req, res) {
  const user = await req.body;
  const check = await users.findOne({
    where: { email: user.email },
  });
  if (check === null) {
    res.status(404).json({ message: 'Email not registered' });
  } else {
    jwt.sign({ user }, TOKEN, (err, token) => {
      res.json({ token });
    });
  }
}

async function register(req, res) {
  try {
    const data = await req.body;
    const check = await users.findOne({
      where: { email: data.email },
    });
    if (check === null) {
      const newUser = await users.create({
        email: data.email,
        password: data.password,
      });
      res
        .status(201)
        .json({ message: 'User registered successfully', data: newUser });
    } else {
      res.status(409).json({ message: 'Email already registered' });
    }
  } catch (err) {
    throw new Error(err);
  }
}

/** Authorization: Bearer <token> */
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = { login, register, verifyToken };
