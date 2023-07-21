import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import authRouter from './routes/auth/auth.router';
import config from '../config/default';

const dbUrl = config.db.dbUrl;

const app: Express = express();

mongoose
  .connect(dbUrl, { useNewUrlParser: true } as ConnectOptions)
  .then((res) => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log('Error while connecting to db' + err);
  });

app.use(cors()); // To enable access to this api from a different URL than the server this app is running
app.use(helmet()); //For additional security measures provided by this library
app.use(bodyParser.json()); //To enable the submitting of json to this application
app.use(bodyParser.urlencoded({ extended: true })); //To enable the submitting of urlencoded data like the get request

app.use('/api/v1/auth', authRouter);

export default app;
