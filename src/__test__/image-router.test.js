'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pRemoveImageMock, pCreateImageMock } from './lib/image-mock';

// set this to true or false depending on if you want to hit the mock AWS-SDK
//  or if you want to hit the real AWS-SDK, i.e., upload an asset to your real bucket

const apiUrl = `http://localhost:${process.env.PORT}`;

describe('TESTING ROUTES AT /images', () => {
  beforeAll(startServer);
  afterEach(pRemoveImageMock);
  afterAll(stopServer);

  describe('POST 200 for successful post /images', () => {
    test('should return 200 for sucessful image post', () => {
      jest.setTimeout(20000);
      return pCreateImageMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.post(`${apiUrl}/images`)
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'bird')
            .attach('image', `${__dirname}/asset/dog.jpg`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual('bird');
              expect(response.body._id).toBeTruthy();
              expect(response.body.url).toBeTruthy();
            });
        })
        .catch((err) => {
          console.log(err.message, 'ERR IN TEST');
          console.log(err.status, 'CODE ERR IN TEST');
          expect(err.status).toEqual(200);
        });
    });
  });
});
