'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateImageMock, pRemoveImageMock } from './lib/image-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('TESTING ROUTES AT /images', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveImageMock);

  describe('POST 200 for successful post to /images', () => {
    test('should return 200', () => {
      return pCreateImageMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock; // es6. want to grab the token
          return superagent.post(`${apiURL}/images`)
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'dog barks')
            .attach('image', `${__dirname}/asset/dog/mp3`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual('dog barks');
              expect(response.body._id).toBeTruthy();
              expect(response.body.url).toBeTruthy();
            }); // think of this like arbitrary data. Key value pairs
        })
        .catch((err) => {
          console.log(err);
          expect(err.status).toEqual(200);
        });
    });
  });
});
