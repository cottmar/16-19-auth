'use strict';

import multer from 'multer';
import { Router } from 'express';
import HttpError from 'http-errors';
import bearerAuthMiddleWare from '../lib/bearer-auth-middleware';
import Image from '../model/image';
import logger from '../lib/logger';
import { s3Upload, s3Remove } from '../lib/s3'; //eslint-disable-line

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const imageRouter = new Router();

imageRouter.post('/images', bearerAuthMiddleWare, multerUpload.any(), (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, 'IMAGE ROUTER _ERROR_, not found'));
  }

  if (!request.body.title || request.files.length > 1 || request.files[0].fieldname !== 'image') {
    return next(new HttpError(400, 'IMAGE ROUTER __ERROR__ invalid request'));
  }
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
console.log('before delete');
imageRouter.delete('/api/images/:id', bearerAuthMiddleWare, (request, response, next) => {
  return Image.findByIdAndRemove(request.params.id)
    .then((image) => {
      console.log('inside delete .thn');
      if (!image) {
        logger.log(logger.ERROR, 'IMAGE ROUTER: responding with 404 !image');
        return next(new HttpError(404, 'image not found'));
      }
      logger.log(logger.INFO, 'IMAGE ROUTER: responding with 204 status code');
      return response.sendStatus(204);
    });
});

export default imageRouter;

// console.log('before delete route');
// imageRouter.delete('api/images/:id', bearerAuthMiddleWare, (request, response, next) => {
//   if (!request.params.id) {
//     console.log('IMAGE ROUTER: responding with a 404 !image_id');
//     console.log('inside if statement of delete');
//     return next(new HttpError(404, 'image not found '));
//   }
//   return Image.findByIdAndRemove(request.params.id)
//     .then((image) => {
//       if (!image) {
//         return next(new HttpError(401, 'IMAGE ROUTER: no image found, bad request'));
//       }
//       logger.log(logger.INFO, 'IMAGE ROUTER: no content');
//       return s3Remove(image.url);
//     })
//     .then(() => {
//       console.log('inside delete .then');
//       return response.sendStatus(204);
//     })
//     .catch(next);
// });
