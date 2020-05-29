const jwtSecret = 'your_jwt_secret'; // Has to be same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Local passport files

let generate JWTToken = (user => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username being encoded in the JWT
    expiresIn: '7d',
    algorithm: 'HS256' // Algorithm used to 'sign' or encode the values of the JWT
  });
}

// POST login.
module.exports = (router) => {
  routher.post('/login', (req, res) => {
    passport.authenticate('local', { session: false },
  (error, user, info) => {
    if (error || !user) {
    return res.status(400).json({
      message: 'Something is not right',
      user: user
    });
  }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      let token = generatJWTToken(user.toJSON());
      return res.json({ user, token });
      });
    })(req, res);
  });
}
