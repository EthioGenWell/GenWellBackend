
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import authRouter from './routes/auth/auth.router';

const app: Express = express();

app.use(cors()); // To enable access to this api from a different URL than the server this app is running
app.use(helmet()); //For additional security measures provided by this library
app.use(bodyParser.json()); //To enable the submitting of json to this application
app.use(bodyParser.urlencoded({ extended: true })); //To enable the submitting of urlencoded data like the get request

app.use('/api/v1/auth', authRouter);

export default app;
