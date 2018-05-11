'use strict';

import express from 'express';
import mongoose from 'mongoose';
import logger from './logger';
import authRoutes from '../route/auth-router';
import dogsRouter from '../route/dogs-route';
import imageRouter from '../route/image-router';
import loggerMiddleware from './logger-middleware';
import errorMiddleware from './error-middleware';

const app = express();
let server = null;

app.use(loggerMiddleware);
app.use(authRoutes);
app.use(dogsRouter);
app.use(imageRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'SERVER: Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      return server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    });
};

export { startServer, stopServer };
