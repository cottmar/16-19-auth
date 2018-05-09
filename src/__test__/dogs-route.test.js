'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pRemoveDogsMock } from './lib/dogs-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('POST /dogss', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveDogsMock);

  test('POST /dogss should get a 200 and the newly created dogs', () => { // eslint-disable-line
    let accountMock = null;
    return pCreateAccountMock()
      .then((accountSetMock) => {
        accountMock = accountSetMock;
        return superagent.post(`${apiURL}/dogss`)
          .set('Authorization', `Bearer ${accountSetMock.token}`)
          .send({
            bio: 'Three-legged Bird-Dog',
            firstName: 'Birdie',
            lastName: 'Blue',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.account).toEqual(accountMock.account._id.toString());
        expect(response.body.firstName).toEqual('Birdie');
        expect(response.body.lastName).toEqual('Blue');
        expect(response.body.bio).toEqual('Three-legged Bird-Dog');
      });
  });
});
