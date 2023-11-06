import { Router } from 'express';

import { getMovies, createMovie, updateMovie, deleteMovie, getMovieByTitle } from '../../controllers/movie.controller';
import { createMovieMiddleware } from '../../middlewares/movie.middleware';
import { verifyTokenMiddleware }  from '../../middlewares/auth.middleware';
const router = Router();


router.get('/movies',[verifyTokenMiddleware], getMovies);
router.post('/movies', [verifyTokenMiddleware,createMovieMiddleware], createMovie);
router.put('/movies/:id',[verifyTokenMiddleware],updateMovie)
router.delete('/movies/:id',[verifyTokenMiddleware], deleteMovie)
router.get('/movieByTitle/',[verifyTokenMiddleware], getMovieByTitle);

export default router;