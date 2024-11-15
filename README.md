# Wallet Management Project

This project is a RESTful API built with Node.js and TypeScript that allows for the management of cryptocurrency wallets. It implements user authentication and session management using JWT (JSON Web Token) with short-lived access tokens and refresh tokens.

## Features

- **Login** with secure authentication.
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
    - [Steps to Test the API using Postman](#steps-to-test-the-api-using-postman)

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

### Steps to Test the API using Postman

1. **Import the Postman Collection**:
   - In Postman, go to the **Import** section.
   - Select the `shieldPay-challenge.postman_collection.json` file, which contains all the requests needed to test the API.
   - Once imported, you’ll see a collection named **shieldPay-challenge** with the following requests:
     - **SignIn**: to log in and get the `accessToken`.
     - **Refresh**: to refresh the access token using the `refreshToken`.
     - **Create Wallet**: to create a new wallet.
     - **Get Wallets**: to retrieve all wallets.
     - **Get Wallet by id**: to retrieve a specific wallet by its ID.
     - **Update Wallet**: to update a specific wallet.
     - **Delete Wallet**: to delete a specific wallet.

2. **Run the Requests in Order**:
   - Follow the order of requests in the collection to ensure proper testing:
     1. **SignIn**: to obtain the initial `accessToken`.
     2. **Refresh**: to refresh the access token if necessary.
     3. **Create Wallet**: to create a new wallet and get the `walletId`.
     4. **Get Wallets** and **Get Wallet by id**: to verify the wallet was created successfully.
     5. **Update Wallet** and **Delete Wallet**: to modify and delete the wallet.

3. **Post-Request Scripts to Save Tokens**:
   - The following post-request scripts are used to automatically save **`accessToken`** and **`walletId`** after executing **SignIn** and **Create Wallet**, respectively:

   **SignIn Post-Request Script**:
    ```javascript
       const response = pm.response.json();
    
       if (response.accessToken) {
           pm.collectionVariables.set("accessToken", response.accessToken);
           console.log("Access Token saved:", response.accessToken);
       } else {
           console.error("The access token is not in the response.");
       }
    ```
  
    **Create Wallet Post-Request Script**:
    ```javascript
    const response = pm.response.json();
    if (response.id) {
          pm.collectionVariables.set("walletId", response.id);
          console.log("Wallet ID saved:", response.id);
      } else {
          console.error("The wallet ID is not in the response.");
      }
    ```
    
    By following these steps, you can test each endpoint in Postman using the collection, ensuring that the accessToken and walletId values are saved and used properly throughout the requests.
  
