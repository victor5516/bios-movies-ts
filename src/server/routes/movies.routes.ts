import { Router } from 'express';

import { getMovie, createMovie, updateMovie, deleteMovie } from '../../controllers/movies.controller';
import { createMovieMiddleware } from '../../middlewares/movies.middlewares';
const router = Router();


router.get('/movies', getMovie);
router.post('/movies', createMovieMiddleware, createMovie);
router.put('/movies/:id',updateMovie)
router.delete('/movies/:id', deleteMovie)

export default router;