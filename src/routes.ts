

import { Router } from "express";

import noticiasController from "./controllers/noticiasController";



const routes = Router();

routes.get('/noticias',noticiasController.getPage)


export default routes;