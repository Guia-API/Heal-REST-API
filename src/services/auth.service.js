const { getPool } = require('../database');
const jwt = require('../security/jwt');

const auth_service = {};

auth_service.getLogin = async (email) => {
  const pool = getPool();

  const [result] = await pool.query(
    `
    SELECT id_user, email, password, status
    FROM user
    WHERE LOWER(email) = LOWER(?)
    LIMIT 1
    `,
    [email]
  );

  if (result.length === 0 || result[0].status !== 1) {
    return null;
  }

  return {
    id: result[0].id_user,
    email: result[0].email,
    password: result[0].password
  };
};

auth_service.generateTokens = async (user) => {
  const access_token = jwt.generateToken(user.id, user.email);
  const refresh_token = jwt.generateRefreshToken(user.id, user.email);

  const pool = getPool();

  await pool.query(
    `
    INSERT INTO refresh_token (id_user, token, expires_at)
    VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
    `,
    [user.id, refresh_token]
  );

  return {
    access_token,
    refresh_token
  };
};

auth_service.refreshToken = async (old_refresh_token) => {
  try {
    const payload = jwt.verifyRefreshToken(old_refresh_token);

    const pool = getPool();

    const [[stored]] = await pool.query(
      `
      SELECT id, id_user, revoked
      FROM refresh_token
      WHERE token = ?
      `,
      [old_refresh_token]
    );

    if (!stored || stored.revoked) {
      throw new Error();
    }

    await pool.query(
      `UPDATE refresh_token SET revoked = 1 WHERE id = ?`,
      [stored.id]
    );

    const access_token = jwt.generateToken(payload.id, payload.email);
    const refresh_token = jwt.generateRefreshToken(payload.id, payload.email);

    await pool.query(
      `
      INSERT INTO refresh_token (id_user, token, expires_at)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))
      `,
      [payload.id, refresh_token]
    );

    return { access_token, refresh_token };

  } catch {
    throw {
      status: 401,
      message: 'Refresh token inválido o expirado'
    };
  }
};


auth_service.logout = async (refresh_token) => {
  const pool = getPool();

  await pool.query(
    `UPDATE refresh_token SET revoked = 1 WHERE token = ?`,
    [refresh_token]
  );

  return true;
};


module.exports = auth_service;