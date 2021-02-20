import { Router } from 'express';
import UserRouter from './Users';
import VideoRouter from './video';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/video', VideoRouter);

// Export the base-router
export default router;
