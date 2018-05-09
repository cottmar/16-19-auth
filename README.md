![cf](https://i.imgur.com/7v5ASc8.png) Lab 16: Basic Authentication
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Resources
* [express docs](http://expressjs.com/en/4x/api.html)
* [mongoose guide](http://mongoosejs.com/docs/guide.html)
* [mongoose api docs](http://mongoosejs.com/docs/api.html)

### Configuration
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables **(should be git ignored)**
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `test` script for running tests
  * create `dbon` and `dboff` scripts for managing the mongo daemon
* **db/** - contains mongodb files **(should be git ignored)**
* **index.js** - entry-point of the application
* **src/** - contains the remaining code
  * **src/lib/** - contains module definitions
  * **src/model/** - contains module definitions
  * **src/route/** - contains module definitions
  * **src/\_\_test\_\_/** - contains test modules
  * **main.js** - starts the server

# Feature Tasks
Basic Auth Middleware
Create middleware for parsing a Basic Authentication header, it should add an Account to the request object.

# Bearer Auth middleware
Create middleware for parsing a Bearer Authorization header, it should add an Account to the request object.

# Access controlled resource
Create a model with at least four properties that belongs to an account. The model should require an account id associated to an account.

# Server Endpoints
GET /login (Auth Route)
Create a login route that uses the basic authentication middleware to log in a user.
POST /<resource-name>
pass a bearer authentication token in the request to authorize the creation of the resource
pass data as stringifed JSON in the body of a POST request to create a new resource
on success respond with a 200 status code and an authentication token
on failure due to a bad request send a 400 status code
on failure due to bad token or lack of token respond with a 401 status code
GET /<resource-name>/:id
pass a bearer authentication token in the request to authorize the creation of the resource
on success respond with a 200 status code and a resource
on failure due to a bad id send a 404 status code
on failure due to bad token or lack of token respond with a 401 status code

# Tests
Write 200, 400, and 401 OR 404 tests for /login (Auth router)
Write 200, 400, and 401 OR 404 tests for POST /<resource-name>
Write 200, 400, and 401 OR 404 tests for GET /<resource-name>/:id
