import { Router } from 'express';

import { getUsers, createUser, login } from '../../controllers/user.controller';
import { createUserMiddleware } from '../../middlewares/user.middleware';
const router = Router();

router.get('/users', getUsers);
router.post('/users', [createUserMiddleware], createUser);
router.post('/login', login);

export default router;