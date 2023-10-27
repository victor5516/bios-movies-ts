import express from 'express';
import bodyParser from 'body-parser';
import { handleError } from '../handlers/error.handler';
import { handleResponse } from '../handlers/response.handler';

import moviesRoutes from './routes/movies.routes';

const app = express();

app.use(express.json());
//midelewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', moviesRoutes);

app.use(handleResponse);
app.use(handleError);

export default app;