'use strict';

import multer from 'multer';
import { Router } from 'express';
import HttpError from 'http-errors';
import bearerAuthMiddleWare from '../lib/bearer-auth-middleware';
import Image from '../model/image';
import logger from '../lib/logger';
import { s3Upload, s3Remove } from '../lib/s3';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const imageRouter = new Router();

imageRouter.post('/images', bearerAuthMiddleWare, multerUpload.any(), (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, 'IMAGE ROUTER _ERROR_, not found'));
  }

  if (!request.body.title || request.files.length > 1 || request.files[0].fieldname !== 'image') {
    return next(new HttpError(400, 'IMAGE ROUTER __ERROR__ invalid request'));
  }

  imageRouter.get('/api/images:id', (request, response, next) => { 
    return Image.findById(request.params.id)
      .then((image) => {
        if (!image) {
          logger.log(logger.ERROR, 'IMAGE ROUTER: responding with a 404 status code for !image');
          return next(new HttpError(404, 'image not found'));
        }
        logger.log(logger.INFO, 'IMAGE ROUTER: responding with a 200 status code');
        logger.log(logger.INFO, `IMAGE ROUTER: ${JSON.stringify(image)}`);
        return response.json(image);
      })
      .catch(next);
  });

  const file = request.files[0];
  const key = `${file.filename}.${file.originalname}`;
  return s3Upload(file.path, key)
    .then((url) => {
      return new Image({
        title: request.body.title,
        account: request.account._id,
        url,
      }).save();
    })
    .then(image => response.json(image))
    .catch(next);
});

export default imageRouter;
