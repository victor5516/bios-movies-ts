import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { handleError } from '../handlers/error.handler';
import { handleResponse } from '../handlers/response.handler';


import moviesRoutes from './routes/movie.routes';
import userRoutes from './routes/user.routes';

const app = express();

const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

//midelewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(options));

//ruta de prueba
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/api/v1', moviesRoutes);
app.use('/api/v1', userRoutes);

app.use(handleResponse);
app.use(handleError);

export default app;
