'use strict';

import fs from 'fs-extra';

const s3Upload = (path, key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();

  const uploadOptions = {
    Bucket: process.env.AWS_BUCKET, 
    Key: 'public-read',
    Body: fs.createReadStream(path), // creates readable stream (data that comes to us in chunks)
  };
  
  return amazonS3.upload(uploadOptions)
    .promise() // this calls the internal callback of the .upload method
    .then((response) => {
      // console.log(response, 'response from s3');
      return fs.remove(path)
        .then(() => response.Location)
        .catch(err => Promise.reject(err));
    })
    .catch((err) => {
      return fs.remove(path)
        .then(() => Promise.reject(err))
        .catch(fsErr => Promise.reject(fsErr));
    });
}; 

const s3Remove = (key) => {
  const aws = require('aws-sdk');
  const amazonS3 = new aws.S3();
  const removeOptions = {
    Key: key,
    Bucket: process.env.AWS_BUCKET,
  };

  return amazonS3.deleteObject(removeOptions).promise();
};
