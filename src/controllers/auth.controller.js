const bcrypt = require('bcrypt');
const auth_service = require('../services/auth.service');
require('dotenv').config();

const self = {};

self.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await auth_service.getLogin(email);
    if (!user) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    const { access_token, refresh_token } =
      await auth_service.generateTokens(user);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: 'Login exitoso',
      access_token
    });

  } catch (error) {
    next(error);
  }
};

self.refresh = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const tokens = await auth_service.refreshToken(refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(200).json({
      access_token: tokens.access_token
    });

  } catch (error) {
    next(error);
  }
};

self.logout = async (req, res, next) => {
  try {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(200).json({
      message: 'Logout exitoso'
    });

  } catch (error) {
    next(error);
  }
};

module.exports = self;