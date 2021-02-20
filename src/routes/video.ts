import { Router } from 'express';
import { upload } from '@middlewares/multerMiddleware';
import { testVideo, createVideo } from '@controllers/videoController';

const router = Router();


/******************************************************************************
 *                      Get Test Video - "GET /api/video/test"
 ******************************************************************************/

router.get('/test', testVideo);

/******************************************************************************
 *                       Create video - "POST /api/video/create"
 ******************************************************************************/

router.post('/create', upload.array('images', 50), createVideo);


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
