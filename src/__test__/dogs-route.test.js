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
  test('POST /dogss should return a 400 status code for a bad route', () => {
    return superagent.post(`${apiURL}/dogss`)
      .send({
        email: 'billie@billie.com',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/dogss/:id', () => {
    test('GET /api/doggs/:id should get a 200 status code and a TOKEN', () => {
      return pCreateAccountMock()
        .then((mock) => {
          return superagent.get(`${apiURL}/dogss/:id`)
            .auth(mock.request.username, mock.request.password); // this line is important
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
  test('POST /api/dogss/:id should return a 400 status code for a bad route', () => {
    return superagent.post(`${apiURL}/dogss`)
      .send({
        email: 'billie@billie.com',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
});
