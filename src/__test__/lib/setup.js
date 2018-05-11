'use strict';

import faker from 'faker';
import * as awsSDKMock from 'aws-sdk-mock'; // this will pre-empt aws methods in code

// takes in the name of the actual aws service we are using, which is S3
// params is equal to whatever options you passed into the original method
// in this case, params is equal to the uploadOptions in s2Upload.
awsSDKMock.mock('S3', 'upload', (params, callback) => {
  if (!params.Key || !params.Bucket || !params.Body || !params.ACL) {
    return callback(new Error('SETUP AWS MOCK ERROR: key, bucket, body, or ACL required'));
  }

  if (params.ACL !== 'public-read') {
    return callback(new Error('SETUP AWS MOCK ERROR: ACL should be public-read'));
  }

  if (params.Bucket !== process.env.AWS_BUCKET) {
    return callback(new Error('SETUP AWS MOCK ERROR: wrong bucket'));
  }

  return callback(null, { Location: faker.internet.url() });
});

awsSDKMock.mock('S3', 'deleteObject', (params, callback) => {
  if (!params.Key || !params.Bucket) {
    return callback(new Error('SETUP AWS MOCK ERROR: key and bukcet required'));
  }

  return callback(null, 'successful deletion');
});
