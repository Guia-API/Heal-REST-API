const { getPool } = require('../database');
const jwt = require('../security/jwt');

const auth_service = {};

/**
 * Login
 */
auth_service.getLogin = async (email) => {
  const pool = getPool();

  const query = `
    SELECT id_user, email, password, status
    FROM user
    WHERE email = ?
    LIMIT 1
  `;

  const [result] = await pool.query(query, [email]);

  if (result.length === 0 || result[0].status !== 1) {
    return null;
  }

  return {
    id: result[0].id_user,
    email: result[0].email,
    password: result[0].password
  };
};

/**
 * Refresh token (stateless)
 */
auth_service.refreshToken = async (refresh_token) => {
  try {
    const payload = jwt.verifyRefreshToken(refresh_token);

    // verificar usuario activo
    const pool = getPool();
    const [result] = await pool.query(
      'SELECT id_user, email, status FROM user WHERE id_user = ?',
      [payload.id]
    );

    if (result.length === 0 || result[0].status !== 1) {
      throw new Error();
    }

    return jwt.generateToken(
      result[0].id_user,
      result[0].email
    );
  } catch (error) {
    throw {
      status: 401,
      message: 'Refresh token inválido o expirado'
    };
  }
};

/**
 * Logout (stateless)
 */
auth_service.logout = async () => {
  // el frontend elimina el refresh token
  return true;
};

module.exports = auth_service;
