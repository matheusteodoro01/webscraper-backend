"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
exports.default = {
    getPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const BASE_URL = 'https://www.estadao.com.br';
            const path = '/ultimas,1';
            const url = `${BASE_URL}${path}`;
            axios_1.default.get(url)
                .catch(error => {
                return error.status(400).json(error.original);
            })
                .then(resp => {
                const $ = cheerio_1.default.load(resp.data);
                let noticias = [];
                $('.item-lista').each(function (index, element) {
                    const autor = $(element).find('.credito-posts').text().replace(/\s\s+/g, '');
                    const titulo = $(element).find('.third').text().replace(/\s\s+/g, '');
                    const resumo = $(element).find('p').text();
                    const link = $(element).find('.link-title').attr('href');
                    const data = $(element).find('.data-posts').text();
                    let noticia = {
                        autor: autor,
                        titulo: titulo,
                        resumo: resumo,
                        data: data,
                    };
                    //        'autor': autor, 'titulo': titulo, 'resumo': resumo, 'data': data, 'link': link 
                    noticias.push(noticia);
                });
                console.log(`Consulta efetuada em ${url}`);
                return res.json(noticias);
            });
        });
    }
};
