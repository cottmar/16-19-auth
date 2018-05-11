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
  describe('GET /api/images/:id', () => {
    test('GET /api/images/:id should get a 200 status code and a TOKEN', () => {
      return pCreateImageMock()
        .then((mock) => {
          return superagent.get(`${apiUrl}/images/:id`)
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
    test('GET /api/images/:id should return a 404 status code for a bad route', () => {
      return superagent.get(`${apiUrl}/imagesss/:wrongid`)
        .send({
          title: 'title',
        })
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
    // test('GET /api/images/:id should return a 401 status code for a bad token', () => {
    //   test('GET /api/images/:id should get a 400 status code and a TOKEN', () => {
    //     const mock = null;
    //     return pCreateImageMock()
    //       .then((mock) => {
    //         mock = mockResponse.image;
    //         const { token } = mockResponse.accountMock;
    //         return superagent.get(`${apiUrl}/images/${mock._id}`)
    //           .set('Authorization', 'Bearer ${token}')
    //           .then((response) => {
    //             expect(response.status).toEqual(401);
    //             expect(response.body.title).toEqual(mock.title);
    //           });
    //       });
    //   })
    //     .catch((error) => {
    //       console.log(error); 
    //     });
    // });
    describe('DELETE 204 for successful deletion', () => {
      test('should return status code 204', () => {
        let testMock = null;
        return pCreateImageMock()
          .then((mockResponse) => {
            testMock = mockResponse.image;
            const { token } = mockResponse.accountMock;
            return superagent.delete(`${apiUrl}/images/${testMock.id}`)
              .set('Authorization', `Bearer ${token}`)
              .then((response) => {
                expect(response.status).toEqual(204);
              });
          });
      });
    });
  });
});
