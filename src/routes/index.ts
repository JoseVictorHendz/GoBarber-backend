import { Router } from 'express';
import appointementsRouter from './appointaments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointements', appointementsRouter);
routes.use('/users', usersRouter);

export default routes;
