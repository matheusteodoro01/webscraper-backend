require ('dotenv').config()
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import routes from './routes'
import cors from "cors"



const PORT = process.env.PORT || 3333; //Configuração para deploy no heroku 



const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)


app.use((err: ErrorRequestHandler, req: Request , res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "production")
      res.status(500).json({ error: "Erro Interno" });
    else return next(err);
  });

app.listen(PORT);


