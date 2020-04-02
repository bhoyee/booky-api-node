# Introduction

This project is the backend of Booky, a Book Rental App and it was implemented using Node.js.


## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

## Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

## Install the Dependencies

Next, from the project folder, install the dependencies:

```bash
npm i
```

## Populate the Database

```bash
node sampleDB.js
```

## Run the Tests

You're almost done! Run the tests to make sure everything is working:

```bash
npm test
```
All tests should pass.

## Start the Server

```bash
node app.js
```
This will launch the Node server on port 3000. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:3000/api/categories

You should see the list of categories. That confirms that you have set up everything successfully.

## Environment Variables -- this is optional

If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

On Mac:

```bash
export booky_jwtPrivateKey=yourSecureKey
```

On Windows:

```bash
set booky_jwtPrivateKey=yourSecureKey
```
