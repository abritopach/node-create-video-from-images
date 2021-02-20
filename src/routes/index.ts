import { Router } from 'express';
import VideoRouter from './video';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/video', VideoRouter);

// Export the base-router
export default router;
