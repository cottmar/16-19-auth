'use strict';

import faker from 'faker';
import Dogs from '../../model/dogs';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';

const pCreateDogsMock = () => {
  const resultMock = {};

  return pCreateAccountMock()
    .then((accountSetMock) => {
      resultMock.accountSetMock = accountSetMock;

      return new Dogs({
        bio: faker.lorem.words(10),
        avatar: faker.random.image(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        account: accountSetMock.account._id, // this line sets up the relationship
      }).save();
    })
    .then((dogs) => {
      resultMock.dogs = dogs;
      return resultMock;
    });
};

const pRemoveDogsMock = () => {
  return Promise.all([
    Dogs.remove({}),
    pRemoveAccountMock(),
  ]);
};

export { pCreateDogsMock, pRemoveDogsMock };
