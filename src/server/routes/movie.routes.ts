import { Router } from 'express';

import { getMovies, createMovie, updateMovie, deleteMovie } from '../../controllers/movie.controller';
import { createMovieMiddleware } from '../../middlewares/movies.middlewares';
const router = Router();


router.get('/movies', getMovies);
router.post('/movies', createMovieMiddleware, createMovie);
router.put('/movies/:id',updateMovie)
router.delete('/movies/:id', deleteMovie)

export default router;