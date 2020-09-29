const jwt = require('jwt-simple');
const config = require('../../config');

const User = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const error = new Error('Wrong Credentials');
      error.statusCode = 401;
      throw error;
    }

    const validPassword = await user.validPassword(password, user.password);
    if (!validPassword) {
      const error = new Error('Wrong Credentials');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    config.localStorage.setItem('token', token);
    return res.send({ user, token });
  } catch (err) {
    next(err);
    return true;
  }
};
exports.loginView = async (req, res) => {
  res.render('login');
};
exports.signup = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const error = new Error('Email already used');
      error.statusCode = 403;
      throw error;
    }
    let user = new User();
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);
    user.last_name = req.body.last_name;
    user.first_name = req.body.first_name;
    user.role = req.body.role;
    user = await user.save();

    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    config.localStorage.setItem('token', token);
    res.writeHead(302, {
      Location: 'login',
    });
    res.end();
    return res.send({ user, token });
  } catch (err) {
    next(err);
    return true;
  }
};
exports.signupView = async (req, res) => {
  res.render('inscription');
};
exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user, {
      places: [],
    });
    return res.send(user);
  } catch (err) {
    next(err);
    return true;
  }
};
