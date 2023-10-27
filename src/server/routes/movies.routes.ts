import { Router } from 'express';

import { getMovie } from '../../controllers/movies.controller';

const router = Router();


router.get('/movies', getMovie);


export default router;