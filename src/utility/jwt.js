import jwt from 'jsonwebtoken';
import config from '../config';

export default {
  createToken(payload,expireTime) {
    return jwt.sign(payload, config.jwt.secreet_key, {
      expiresIn: expireTime,
    });
  },
  verifyToken(token,expireTime) {
    return jwt.verify(token, config.jwt.secreet_key, {
      expiresIn: expireTime,
    });
  }
};
