import jsonwebtoken from 'jsonwebtoken';
import constants from '../config/constants.js';

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Access token nao informado');
  }

  const [, accessToken] = token.split(' ');

  try {
    jsonwebtoken.verify(accessToken, constants.jsonSecret);

    const { id, email } = await jsonwebtoken.decode(accessToken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();
  } catch (error) {
    return res.status(401).send('Usuario não autorizado');
  }
};
