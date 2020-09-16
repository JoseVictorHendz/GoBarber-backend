import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';

const UsersRouter = Router();
const upload = multer(uploadConfig);

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

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);
export default UsersRouter;
