// Multer.
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

import * as path from 'path';


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
const multerFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});