"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noticiasController = require('./controllers/noticiasController');
const routes = (0, express_1.Router)();
routes.get('/noticias', noticiasController.getPage);
exports.default = routes;
