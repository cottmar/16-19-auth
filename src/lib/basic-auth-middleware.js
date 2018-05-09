'use strict';

import HttpError from 'http-errors';
import Account from '../model/account';

export default (request, response, next) => {
  if (!request.headers.authorization) { // this is named incorrectly, we are doing authent
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  if (!base64AuthHeader) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  // at this point, stringAuthHeader looks like username:password
  const [username, password] = stringAuthHeader.split(':');

  if (!username || !password) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        return next(new HttpError(400, 'AUTH - invalid request'));
      }
      return account.pVerifyPassword(password);
    })
    .then((account) => {
      // in this line. I have the correct account
      request.account = account;
      return next(); // calling the next function in the middleware chain
    })
    .catch(next);
};
