import { Router } from 'express';
import appointementsRouter from './appointaments.routes';

const routes = Router();

routes.use('/appointements', appointementsRouter);

export default routes;
