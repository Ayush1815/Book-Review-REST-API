let jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  let authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT error:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    if (!user?.id) {
      return res.status(401).json({ message: 'Unauthorized: no user ID in token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;


/*
let jwt = require('jsonwebtoken');

let authenticateToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        if (!user.id) {
            return res.status(401).json({ message: 'Unauthorized: no user ID in token' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

*/