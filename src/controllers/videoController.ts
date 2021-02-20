
import { paramMissingError } from '@shared/constants';
import chalk from 'chalk';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
const { OK, METHOD_FAILURE, INTERNAL_SERVER_ERROR, BAD_REQUEST } = StatusCodes;
import * as path from 'path';

// Videoshow.
const videoshow = require('videoshow');

const videoOptions = {
    fps: 25,
    // loop: 5, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    format: 'mp4',
    pixelFormat: 'yuv420p'
};

export async function testVideo(req: Request, res: Response) {
    try {
        const images = Array.from({length: 10}, (v, i) => path.join(__dirname, '../public/images', `${i + 1}.jpg`));
        await videoGenerationWithVideoShow(images, res);
    } catch (err) {
        console.error(chalk.red('[VIDEO CONTROLLER ERROR::testVideo]: ' + err.message));
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message,
            data: null
        });
    }
}

export async function createVideo(req: Request, res: Response) {
    try {
        const images = req.files as any;
        console.log(req.files);
        const { imagesDuration } = req.body;
        console.log(imagesDuration);
        if (!imagesDuration) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        let durations = JSON.parse(JSON.parse(imagesDuration));
        console.log(durations);
        const videoImages = images.map((x: any) => Object.assign(x, durations.find((y: any) => y.imageName == x.originalname)));
        console.log(videoImages);
        await videoGenerationWithVideoShow(videoImages, res);
    } catch (err) {
        console.error(chalk.red('[VIDEO CONTROLLER ERROR::createVideo]: ' + err.message));
        return res.status(INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message,
            data: null
        });
    }
}

async function videoGenerationWithVideoShow(images: any, res: Response) {
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
}