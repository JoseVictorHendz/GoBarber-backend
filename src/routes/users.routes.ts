import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserAvatarService';

const UsersRouter = Router();
const upload = multer(uploadConfig);

UsersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const newUser = await createUser.execute({
    name,
    email,
    password,
  });

  // delete newUser.password;
  newUser.password = '';

  return response.json(newUser);
});

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const userUpdateAvatarService = new UpdateUserService();
    const newUserUpdateAvatarService = await userUpdateAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    newUserUpdateAvatarService.password = '';

    return response.json(newUserUpdateAvatarService);
  },
);
export default UsersRouter;
