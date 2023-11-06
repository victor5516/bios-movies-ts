import { Router } from 'express';

import { getUsers, createUser, login, updateUser, deleteUser } from '../../controllers/user.controller';
import { createUserMiddleware, loginUserMiddleware } from '../../middlewares/user.middleware';
import { verifyTokenMiddleware }  from '../../middlewares/auth.middleware';
const router = Router();

router.get('/users',[verifyTokenMiddleware], getUsers);
router.post('/users', [createUserMiddleware], createUser);
router.post('/login',[loginUserMiddleware], login);
router.put('/users/:id',[verifyTokenMiddleware],updateUser)
router.delete('/users/:id',[verifyTokenMiddleware], deleteUser)

export default router;