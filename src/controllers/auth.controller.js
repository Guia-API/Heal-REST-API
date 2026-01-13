const bcrypt = require('bcrypt');
const auth_service = require('../services/auth.service');
const dotenv = require('dotenv');
dotenv.config();

let self = {};

/**
 * LOGIN
 */
self.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await auth_service.getLogin(email);

    if (!user) {
      return res.status(401).json({
        message: 'Correo o contraseña incorrectos'
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: 'Correo o contraseña incorrectos'
      });
    }

    const { access_token, refresh_token } =
      await auth_service.generateTokens(user);

    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id.toString(),
        fullname: user.fullName,
        email: user.email,
        role: user.role
      },
      access_token,
      refresh_token
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({
        message: 'Error al iniciar sesión'
      });
    }

    console.error('❌ Error en login: ', error.message);
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

/**
 * REFRESH TOKEN
 */
self.refresh = async function (req, res) {
  try {
    const { refresh_token } = req.body;

    const access_token =
      await auth_service.refreshToken(refresh_token);

    return res.status(200).json({
      message: 'Token renovado exitosamente',
      access_token
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(401).json({
        message: 'Refresh token inválido o expirado'
      });
    }

    console.error('❌ Error en refresh: ', error.message);
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

/**
 * LOGOUT
 */
self.logout = async function (req, res) {
  try {
    const { refresh_token } = req.body;

    await auth_service.logout(refresh_token);

    return res.status(200).json({
      message: 'Logout exitoso'
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(400).json({
        message: 'Error al cerrar sesión'
      });
    }

    console.error('❌ Error en logout: ', error.message);
    return res.status(500).json({
      message: 'Error del servidor'
    });
  }
};

module.exports = self;
