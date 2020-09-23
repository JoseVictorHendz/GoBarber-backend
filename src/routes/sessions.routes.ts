import { Router } from 'express';

import AutheticateUserService from '../services/AuthenticateUserService';

const SessionsRouter = Router();

SessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AutheticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  // delete user.password;
  user.password = '';

  return response.json({ user, token });
});

export default SessionsRouter;
