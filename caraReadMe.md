#Author
Cara Ottmar, Version 1.0.0

#Overview
-Create middleware for parsing a Basic Authentication header, it should add an Account to the request object.

-Create middleware for parsing a Bearer Authorization header, it should add an Account to the request object.

-Create a model with at least four properties that belongs to an account. The model should require an account id associated to an account.

#Architecture
README.md** - contains documentation
.env** - contains env variables **(should be git ignored)**
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

#Change Log
5-8-2018 4:00pm - Started putting in "starter code" additions
5-8-2018 6:30pm - Starter code debugged and tests passing
5-8-2018 7:00pm - Made "Dogs" resource
5-8-2018 7:15pm - added POST and GET for Dogs
5-8-2018 7:30pm - working on testing for POST and GET
5-8-2018 7:45pm - only able to get 9/10 tests passing


#Credits
Judy and Joy for helping me debug!! 