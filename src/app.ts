import 'express-async-errors';
import express, { Application } from 'express';
import { errorHandler } from './errors';
import { moviesRoutes } from './routes/movies.routes';

const app: Application = express();
app.use(express.json());

app.use('/movies', moviesRoutes);

app.use(errorHandler);

export default app;
