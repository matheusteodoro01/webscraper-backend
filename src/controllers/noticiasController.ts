import { Request, Response } from 'express'
import axios from 'axios'
import cheerio from 'cheerio'




export default {
    async getPage(req: Request, res: Response) {

        const BASE_URL = 'https://www.estadao.com.br'
        const path = '/ultimas,1'
        const url = `${BASE_URL}${path}`

        axios.get(url)

            .catch(error => {
                return error.status(400).json(error.original)
            })
            .then(resp => {

                const $ = cheerio.load(resp.data)

                interface Noticia {
                    autor: string,
                    titulo: string,
                    resumo: string,
                    link?:string,
                    data: string
                }
                let noticias: Noticia[] = []

                //Coletando apenas as noticias do site através da div item-lista
                $('.item-lista').each(function (index, element) {

                    const autor = $(element).find('.credito-posts').text().replace(/\s\s+/g, '') 
                    const titulo = $(element).find('.third').text().replace(/\s\s+/g, '')
                    const resumo = $(element).find('p').text()
                    const link = $(element).find('.link-title').attr('href')
                    const data = $(element).find('.data-posts').text()


                    let noticia = {
                        autor: autor,
                        titulo: titulo,
                        resumo: resumo,
                        link: link,
                        data: data,
                     
                    }
                    noticias.push(noticia);
                })
                console.log(`Consulta efetuada em ${url}`)

                return res.json(noticias)

            })

    }

}