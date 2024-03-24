# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:amgSTRIDeR/nodejs2024Q1-service.git
```

## Installing NPM modules

```
npm install
```

## Add .env file

```
create .env file in root directory or rename .env.example
it should be PORT=4000 in .env file
```

## Running application

```
npm start
```

After starting the app on port (PORT from .env file) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
