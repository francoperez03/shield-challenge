# Wallet Management Project

This project is a RESTful API built with Node.js and TypeScript that allows for the management of cryptocurrency wallets. It implements user authentication and session management using JWT (JSON Web Token) with short-lived access tokens and refresh tokens.

## Features

- **User Registration and Login** with secure authentication.
- **Wallet Management**: Create, read, update, and delete (CRUD) operations.
- **Route Protection** using JWT access tokens.
- **Data Validation** using DTOs (Data Transfer Objects) and `class-validator`.
- **Modular Structure** with separated services, controllers, middlewares, and entities.

## Table of Contents

- [Wallet Management Project](#wallet-management-project)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Wallets (Protected, requires authentication)](#wallets-protected-requires-authentication)
  - [Testing](#testing)
    - [Running Automated Tests](#running-automated-tests)
    - [Using the `api.rest` File](#using-the-apirest-file)
      - [Steps to Test the API](#steps-to-test-the-api)

## Installation

1. **Clone the repository**

```bash
  git clone https://github.com/francoperez03/shield-challenge.git
```


2. **Navigate to the project directory**

```bash
  cd shield-challenge
```

3. **Rename the .env.example file to .env**

```bash
  mv .env.example .env
```

4. **Run the following commands in order:**

```bash
npm install
```
```bash
npm run docker:up
```
```bash
npm run migration:run
```
```bash
npm run seed
```
```bash
npm run dev
```

These commands will:

1. Install dependencies.
2. Start up the Docker container for the database.
3. Run database migrations.
4. Seed initial data.
5. Start the development server.


## Available Scripts
- `npm run dev` : Runs the application in development mode using ts-node and nodemon.
- `npm run build` : Compiles TypeScript code to JavaScript in the dist folder.
- `npm start` : Runs the compiled code in production.
- `npm run docker:up` : Starts the Docker container for the database.
- `npm run migration:run` : Runs TypeORM migrations.
- `npm run seed` : Seeds the database with initial data.


## API Endpoints
### Authentication
- `POST /api/auth/login` :Logs in a user and obtains access and refresh tokens.
- `POST /api/auth/logout` : Logs out a user and deletes the refresh token.
  
### Wallets (Protected, requires authentication)
- `GET /api/wallets` : Retrieves all wallets for the authenticated user.
- `POST /api/wallets` : Creates a new wallet.
- `GET /api/wallets/:id` : Retrieves a wallet by its ID.
- `PUT /api/wallets/:id` : Updates an existing wallet.
- `DELETE /api/wallets/:id` : Deletes a wallet.


## Testing

### Running Automated Tests

To ensure the API functions correctly, automated tests have been written for both unit and integration testing. You can execute these tests using the following command:

```bash
npm run test
```

### Using the `api.rest` File

The `api.rest` file is included in the project to facilitate API testing with [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), a Visual Studio Code extension. This file contains pre-configured HTTP requests for all the endpoints in the API, allowing you to test them easily.

#### Steps to Test the API

1. **Install REST Client Extension**:
   - Open Visual Studio Code.
   - Go to the Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   - Search for "REST Client" and install the extension.

2. **Run the Application**:
   - Make sure your application is running on `http://localhost:3000` (or update the `@baseUrl` variable in the `api.rest` file to match your server's URL).
   - Use the command `npm run dev` to start the application.

3. **Open the `api.rest` File**:
   - Navigate to the `api.rest` file in the project directory.
   - Open it in Visual Studio Code.

4. **Make Requests**:
   - Click the "Send Request" button that appears above each request block in the `api.rest` file.
   - Follow the order of the requests to test different endpoints.

5. **Understand the Variables**:
   - The file uses variables like `@baseUrl`, `@token`, and `@walletId` for reusability. Replace these values with your own if needed:
     - `@token`: The JWT token obtained after signing in (`POST /auth/signin`).
     - `@walletId`: The ID of the wallet created or fetched during testing (`POST /wallets` or `GET /wallets`).