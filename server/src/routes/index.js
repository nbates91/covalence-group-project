import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import contactRouter from './contactform'
import locationsRouter from './locations';
import routesRouter from './routes';
import imageRouter from './image';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);
router.use('/contact', contactRouter);

// router
// 	.route('*')
// 	.post(tokenMiddleware, isLoggedIn)
// 	.put(tokenMiddleware, isLoggedIn)
// 	.delete(tokenMiddleware, isLoggedIn);

router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/routes', routesRouter);
router.use('/image', imageRouter);

export default router;
