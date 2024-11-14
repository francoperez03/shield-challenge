# Wallet Management Project

This project is a RESTful API built with Node.js and TypeScript that allows for the management of cryptocurrency wallets. It implements user authentication and session management using JWT (JSON Web Token) with short-lived access tokens and refresh tokens.

## Features

- **User Registration and Login** with secure authentication.
- **Wallet Management**: Create, read, update, and delete (CRUD) operations.
- **Route Protection** using JWT access tokens.
- **Session Handling** using refresh tokens to renew expired access tokens.
- **Data Validation** using DTOs (Data Transfer Objects) and `class-validator`.
- **Modular Structure** with separated services, controllers, middlewares, and entities.
- **Support for Multiple Blockchains** with additional metadata.

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
npm run docker:up
npm run migration:run
npm run seed
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
An api.rest file is included for testing API endpoints with the REST Client extension in Visual Studio Code.