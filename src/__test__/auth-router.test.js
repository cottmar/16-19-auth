
'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pRemoveAccountMock, pCreateAccountMock } from './lib/account-mock';


const apiURL = `http://localhost:${process.env.PORT}`;

describe('AUTH Router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('POST should return a 200 status code and a TOKEN', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'billie',
        email: 'billie@billie.com',
        password: 'billieisthebest',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('POST should return a 400 status code for a bad route', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        email: 'billie@billie.com',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('POST should return a 409 status code, no duplicates', () => {
    return superagent.post(`${apiURL}/signup`)
      .send({
        username: 'billie',
        email: 'billie@billie.com',
        password: 'nobirdieisthebest',
      })
      .then(() => {
        return superagent.post(`${apiURL}/signup`)
          .send({
            username: 'billie',
            email: 'billie@billie.com',
            password: 'nobirdieisthebest',
          })
          .then((Promise.reject))
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      });
  });
  describe('GET /login', () => {
    test('GET /login should get a 200 status code and a TOKEN', () => {
      return pCreateAccountMock()
        .then((mock) => {
          return superagent.get(`${apiURL}/login`)
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
});
