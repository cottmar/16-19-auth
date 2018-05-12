#Author
Cara Ottmar, Version 1.0.0

#Overview
-Create a third model that represents a file asset. The file should be stored on AWS S3, and metadata about the file should be stored in your mongo database.

-Create a model with at least 4 properties that represents some type of file asset (BLOB) resource (image, audio, movie, 3d file). One of the models properites should account and should hold an Account _id. One of the properties should be url and should hold an AWS Location.

-Add a screenshot of your uploaded Model into your AWS bucket.

Write 200, 400, and 401 tests for POST /image
Write 200, 404, and 401 tests for GET /image/:id
Write 204, 404, and 401 tests for DELETE /image/:id

#Architecture
README.md** - contains documentation
.env** - contains env variables **(should be git ignored)**
  -DOUBLE CHECK THIS IS GITIGNORED DUE TO AWS KEY
.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
.eslintrc.json** - contains the course linter configuration
.eslintignore** - contains the course linter ignore configuration
package.json** - contains npm package config
  - create a `test` script for running tests
  - create `dbon` and `dboff` scripts for managing the mongo daemon
db/** - contains mongodb files **(should be git ignored)**
index.js** - entry-point of the application
src/** - contains the remaining code
  -src/lib/** - contains module definitions
  -src/model/** - contains module definitions
  -src/route/** - contains module definitions
  -src/\_\_test\_\_/** - contains test modules
  -main.js** - starts the server
Create an AWS account, make a bucket, and key to put into your .env 

#Change Log
5-10-2018 4:00pm - Started putting in "starter code" additions
5-10-2018 5:30pm - created AWS bucket, put in secret key and key, and was able to add an image to the AWS bucket. 
5-10-2018 6:30pm - Starter code debugged and tests passing
5-10-2018 7:00pm - Started writing routes for GET
5-10-2018 7:15pm - Passed GET tests
5-10-2018 7:30pm - Continued working on GET routes/testing
5-10-2018 9:45pm - wrote delete route but 204 delete test is failing. Cannot found the route.
I'm able to find the object, but the image is inside of the token and I am having trouble pinpointing it to hit the route. 


#Credits
Seth, Judy, and Joy for the help debugging.  