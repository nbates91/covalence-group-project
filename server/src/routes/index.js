import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import locationsRouter from './locations';
import routesRouter from './routes';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);

// router
// 	.route('*')
// 	.post(tokenMiddleware, isLoggedIn)
// 	.put(tokenMiddleware, isLoggedIn)
// 	.delete(tokenMiddleware, isLoggedIn);

router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/routes', routesRouter);

export default router;
