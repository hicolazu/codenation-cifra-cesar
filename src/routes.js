import { Router } from 'express';

import DecifrarController from './app/controllers/CifraController';

const routes = new Router();

routes.get('/decifrar', DecifrarController.index);

export default routes;