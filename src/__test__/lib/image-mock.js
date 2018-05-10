'use strict';

import faker from 'faker';
import { pCreateAccountMock, pRemoveAccountMock } from '../lib/account-mock';
import Image from '../../model/image';
import Account from '../../model/account';

const pCreateImageMock = () => {
  const resultMock = {};
  return pCreateAccountMock()
    .then((mockAccountResponse) => { // this can be named whatever.
      //  this .then is continuing from 'mock' on account-mock. 
      resultMock.accountMock = 
      mockAccountResponse;
      // assuming the below is successful, that promise will re 
      return new Image({ // instantiate a constructor with new this is instantiating a new promise
        title: faker.lorem.words(2),
        url: faker.random.image(),
        account: resultMock.accountMock.account._id, 
        // we are digging deep to find _id so we can assign it to account property of our sound
      }).save(); // the .save returns to use a PROMISE!
    })
    .then((image) => {
      resultMock.image = image;
      return resultMock; // large object that hold much more than image
    });
};
// this will return a promise
const pRemoveImageMock = () => Promise.all([Account.remove({}, Image.remove({}))]);

export { pCreateImageMock, pRemoveImageMock };
