import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const UsersRouter = Router();

UsersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  try {
    const createUser = new CreateUserService();

    const newUser = await createUser.execute({
      name,
      email,
      password,
    });

    delete newUser.password;

    return response.json(newUser);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default UsersRouter;
