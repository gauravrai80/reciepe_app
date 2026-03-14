# Recipe Explorer Backend API

This directory contains the backend server for the Recipe Explorer application. It is built using **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**), adhering to the **MVC (Model-View-Controller)** architectural pattern.

## Features

*   **Authentication**: JWT-based user registration and login (`authController.js`).
*   **User Favorites**: Users can save and remove favorite recipes (`favoritesController.js`).
*   **Recipe CRUD**: Full CRUD functionality for custom user recipes (`recipeController.js`).
*   **Security**: Password hashing using `bcryptjs` and route protection with custom JWT middleware.
*   **Validation**: Comprehensive Mongoose schema validations.

## Prerequisites

*   Node.js installed (v16 or higher recommended).
*   A MongoDB database (local or Atlas cluster).

## Setup Instructions

1.  **Install Dependencies**: Navigate to this `server/` directory and run:
    ```bash
    npm install
    ```

2.  **Environment Variables**: The application requires a `.env` file in the root of the `server/` directory. Ensure the following variables are set:
    ```env
    MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/recipeExplorer?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

3.  **Start the Server**:
    *   For development (uses node --watch):
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```
    The server will typically start on `http://localhost:5000`.

## API Endpoints Overview

All endpoints are prefixed with `/api`.

### Authentication (`/api/auth`)
*   `POST /register` - Register a new user. Returns JWT.
*   `POST /login` - Authenticate user. Returns JWT.
*   `GET /me` - Get current user profile (Requires Auth).

### Recipes (`/api/recipes`)
*   `POST /` - Create a new recipe (Requires Auth).
*   `GET /` - Retrieve all recipes (Public).
*   `GET /:id` - Retrieve a recipe by ID (Public).
*   `PUT /:id` - Update a recipe. Must be the owner (Requires Auth).
*   `DELETE /:id` - Delete a recipe. Must be the owner (Requires Auth).

### Favorites (`/api/favorites`)
*   `GET /` - Retrieve the logged-in user's favorites (Requires Auth).
*   `POST /` - Add a recipe to favorites (Requires Auth).
*   `DELETE /:recipeId` - Remove a recipe from favorites (Requires Auth).

## API Documentation (Postman)

A comprehensive Postman Collection is provided in the root of this directory named `postman_collection.json`.

**To use the Postman collection:**
1.  Open Postman.
2.  Click "Import" -> "File" -> Select `postman_collection.json`.
3.  The collection has pre-defined `{{baseUrl}}` (defaults to `http://localhost:5000`) and `{{token}}` variables.
4.  After logging in via the `Login User` endpoint, copy the returned `token` and paste it into the "Variables" section of the Postman Collection under `token`. This will automatically authenticate subsequent requests.
