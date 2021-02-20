import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { paramMissingError, IRequest } from '@shared/constants';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

import * as path from 'path';
const videoshow = require('videoshow');


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
        console.log('ffmpeg process started:', command)
    })
    .on('error', (err: any, stdout: any, stderr: any) => {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr)
    })
    .on('end', (output: any) => {
        console.error('Video created in:', output)
    });


    return res.status(OK).json({message: 'Test video'});
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
