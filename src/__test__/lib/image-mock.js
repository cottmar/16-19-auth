'use strict';

import faker from 'faker';
import { pCreateAccountMock, pRemoveAccountMock } from '../lib/account-mock'; // eslint-disable-line
import Image from '../../model/image';
import Account from '../../model/account';

const pCreateImageMock = () => {
  const resultMock = {};
  return pCreateAccountMock()
    .then((mockAccountResponse) => { 
      resultMock.accountMock = 
      mockAccountResponse;
      return new Image({ 
        title: faker.lorem.words(2),
        url: faker.random.image(),
        account: resultMock.accountMock.account._id, 
      }).save();
    })
    .then((image) => {
      resultMock.image = image;
      return resultMock;
    });
};
// this will return a promise
const pRemoveImageMock = () => Promise.all([Account.remove({}), Image.remove({})]);

export { pCreateImageMock, pRemoveImageMock };
