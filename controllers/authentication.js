const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password
  // We just need to give them a token
  res.json({ user: req.user, token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    
    // // If a user with email does NOT exist, create and save user record
 
    const newUser = new User(req.body);
    // newUser.save(err => { 
    //     if (err) { res.json(err); }
    //     res.json(newUser); 
    // });
    
    newUser.save(function(err) {
        if (err) { res.json(err); }
        res.json({ user: newUser, token: tokenForUser(newUser) });
    });
  });
};
