import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { IRequest } from '@shared/constants';

import * as path from 'path';

// Videoshow.
const videoshow = require('videoshow');

// Multer.
import multer from 'multer';

const router = Router();
const { OK, METHOD_FAILURE } = StatusCodes;


// Multer config.

// Using memory storage.
// const multerStorage = multer.memoryStorage();

// Using disk storage.
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
});

// Filter files with multer.
const multerFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Not an image! Please upload only images.", false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});


/******************************************************************************
 *                      Get Test Video - "GET /api/video/test"
 ******************************************************************************/

router.get('/test', async (req: Request, res: Response) => {

    const images = Array.from({length: 2}, (v, i) => path.join(__dirname, '../public/images', `${i + 1}.jpg`));

    const videoOptions = {
        fps: 25,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
        format: 'mp4',
        pixelFormat: 'yuv420p'
    };

    videoshow(images, videoOptions)
    .save(`video.mp4`)
    .on('start', (command: any) => {
        console.log('ffmpeg process started:', command);
    })
    .on('error', (err: any, stdout: any, stderr: any) => {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr);
        return res.status(METHOD_FAILURE).json({'ffmpeg stderr': stderr});
    })
    .on('end', (output: any) => {
        console.error('Video created in:', output);
        return res.status(OK).json({message: 'Video created!'});
    });
});

/******************************************************************************
 *                       Create video - "POST /api/video/create"
 ******************************************************************************/

router.post('/create', upload.array('images', 50), async (req: IRequest, res: Response) => {
    console.log(req.files);

    const videoOptions = {
        fps: 25,
        loop: 5, // seconds
        transition: true,
        transitionDuration: 1, // seconds
        videoBitrate: 1024,
        videoCodec: 'libx264',
        size: '640x?',
        format: 'mp4',
        pixelFormat: 'yuv420p'
    };

    videoshow(req.files, videoOptions)
    .save(`video.mp4`)
    .on('start', (command: any) => {
        console.log('ffmpeg process started:', command);
    })
    .on('error', (err: any, stdout: any, stderr: any) => {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr);
        return res.status(METHOD_FAILURE).json({'ffmpeg stderr': stderr});
    })
    .on('end', (output: any) => {
        console.error('Video created in:', output);
        return res.status(OK).json({message: 'Video created!'});
    });
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
