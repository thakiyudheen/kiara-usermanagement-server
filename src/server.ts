import express, { Request, Response, Application, NextFunction, ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import helmet from 'helmet';
import adminRouter from './router/admin-router';

const app : Application = express();
const PORT : number = Number(process.env.PORT) || 3000;



// using middlewares ----------------------------------
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));



// cors setup ------------------------------------------
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
// route setup -----------------------------------------

app.get('/api/auth/test', (req: Request, res: Response,next) => {
    res.status(200).json({
        message: "Auth service ON!"
    });
});

app.use('/api/admin', adminRouter);

//  not fount Error --------------------------------------

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ success: false, status: 404, message: "API Not found" });
});


// app.use( errorHandler )  

// start server -------------------------------------------

const start = () => {
    app.listen(PORT, () => {
        console.log(`The ${process.env.SERVICE} is listening on port ${PORT}`);
    });
}


export default { start }