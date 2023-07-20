import express from 'express';
import type { Express } from '@types/express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app: Express = new express();

app.use(cors()); // To enable access to this api from a different URL than the server this app is running
app.use(helmet()); //For additional security measures provided by this library
app.use(bodyParser.json()); //To enable the submitting of json to this application
app.use(bodyParser.urlencoded({ extended: true })); //To enable the submitting of urlencoded data like the get request

export default app;
