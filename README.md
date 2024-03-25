# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop installed on your machine [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Downloading

```
git clone git@github.com:amgSTRIDeR/nodejs2024Q1-service.git
```

## Navigate to the project directory

```
cd nodejs2024Q1-service
```

## Install dependencies

```
npm install
```

## Create a .env file based on the provided .env.example

```
cp .env.example .env
```

## Running application

```
npm start
```

After starting the app on port (PORT from .env file) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Running the Application with Docker

```
npm run start:docker
```


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

