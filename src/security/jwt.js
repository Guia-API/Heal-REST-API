const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

/**
 * ACCESS TOKEN (20 min)
 */
const generateToken = (id, email, name, role) => {
  return jwt.sign(
    {
      id,
      email,
      name,
      role,
      iss: 'SSAADSJWT',
      aud: 'SSAADSJWT'
    },
    jwtSecret,
    { expiresIn: '20m' }
  );
};

/**
 * REFRESH TOKEN (7 días)
 */
const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      id,
      iss: 'SSAADSJWT',
      aud: 'SSAADSJWT'
    },
    refreshSecret,
    { expiresIn: '7d' }
  );
};

/**
 * VERIFY ACCESS TOKEN
 */
const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

/**
 * VERIFY REFRESH TOKEN
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshSecret);
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken
};
