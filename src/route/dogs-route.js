'use strict';

import { json } from 'body-parser';
import { Router } from 'express'; // interview keywords : de-structuring and module
import HttpError from 'http-errors';
import Dogs from '../model/dogs';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';

const jsonParser = json();
const dogsRouter = new Router();

dogsRouter.post('/dogss', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }

  return new Dogs({
    ...request.body,
    account: request.account._id,
  })
    .save()
    .then((dogs) => {
      logger.log(logger.INFO, 'Returing a 200 and a new Dogs');
      return response.json(dogs);
    })
    .catch(next);
});

export default dogsRouter;
