process.env.NODE_ENV = 'development';
process.env.PORT = 7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';
process.env.FLICKR_SECRET = 'Wc75a4rlxCpLAREDMJLzLtktCXGUINfo1T2tc4f5k9MTtuCEZob7nMH08WboVxd';

const isAwsMock = false;

if (isAwsMock) {
  process.env.AWS_BUCKET = 'fake';
  process.env.AWS_SECRET_ACCESS_KEY = 
  'fakeasdjslkjfkljefklajeklf';
  process.env.AWS_ACCESS_KEY_ID = 'fakekeyinsidetestenv';
  require('./setup');
} else {
  require('dotenv').config();
}
