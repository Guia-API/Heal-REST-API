const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const generateToken = (id, email, name, role) => {
  return jwt.sign(
    {
      id,
      email,
      name,
      role,
      iss: 'HealRESTJWT',
      aud: 'HealRESTJWT'
    },
    jwtSecret,
    { expiresIn: '20m' }
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      id,
      iss: 'HealRESTJWT',
      aud: 'HealRESTJWT'
    },
    refreshSecret,
    { expiresIn: '7d' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};


const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshSecret);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken
};
