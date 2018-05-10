'use strict';

import multer from 'multer';
import { Router } from 'express';
import HttpError from 'http-errors';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import Image from '../model/image';
import { s3Upload, s3Remove } from '../lib/s3';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const imageRouter = new Router();

imageRouter.post(
  '/images', bearerAuthMiddleware, multerUpload.any(),
  (request, response, next) => {
    if (!request.account) {
      return next(new HttpError(404, 'IMAGE ROUTER ERROR, not found'));
    }
    if (!request.body.title || request.files.length > 11 || request.files[0].fieldname !== 'image') {
      return next(new HttpError(400, 'SOUND ROUTER ERROR, invalid request'));
    }

    // const file = request.files[0];
    const [file] = request.files;
    const key = `${file.filename}.${file.originalname}`;

    return s3Upload(file.path, key)
      .then((awsURL) => {
        return new Image({
          title: request.body.title,
          account: request.account._id,
          url: awsURL,
        }).save();
      })
      .then(image => response.json(image));
  },
);

export default imageRouter;
