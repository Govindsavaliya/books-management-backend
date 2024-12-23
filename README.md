# Books Management Backend

This is a Node.js-based backend application for managing books and users, including functionalities like book addition, user registration, login, and retrieving user information. It uses MongoDB as the database.

## Features
- **Books Management**: Add and retrieve books.
- **User Management**: Register, login, and get user information.
- **Authentication**: JWT-based authentication for secure access.
- **Validation**: Input validation for user and book data.
- **RESTful API**: Structured endpoints for seamless interaction.

---

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js**: v14.x or higher
- **MongoDB**: v4.x or higher
- **npm**: Comes with Node.js

---

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Govindsavaliya/books-management-backend.git
   cd books-management-backend
   ```

2. **Install Dependencies**  
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Create a `.env` File**  
   Create a `.env` file in the root directory and include the following:
   ```plaintext
    PORT=8073
    JWT_SECRET_KEY=asdfghjkl1234@!&*axcvrtykjbszkgdjhsdfgbjkwb45njmdfbgkjnerbs4564@booksManagement
    MONGODB_URI=mongodb+srv://devgovind:devgovind@atlascluster.vqvjbui.mongodb.net/booksManagement
    FRONTEND_URL="http://localhost:3000"
    PRODUCTION_FRONTEND_URL="https://books-management-frontend.vercel.app"
   ```

4. **Run the Application**  
   Start the application:
   ```bash
   npm start
   ```

5. **Access the API**  
   The API will be available at [http://localhost:8073](http://localhost:8073).

---

## API Endpoints

### Books Endpoints
| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| GET    | `/books`       | Retrieve all books.       |
| POST   | `/books`       | Add a new book.           |

### Users Endpoints
| Method | Endpoint       | Description                         |
|--------|----------------|-------------------------------------|
| POST   | `/register`    | Register a new user.                |
| POST   | `/login`       | Login a user and generate a token.  |
| GET    | `/user-info`   | Get logged-in user information.     |

---

## Folder Structure
```
.
├── controllers
│   ├── bookController.js
│   └── userController.js
├── middleware
│   ├── check.user.auth.js
│   └── validate.js
├── models
│   ├── book.model.js
│   └── user.model.js
├── routes
│   ├── index.js
│   ├── books.routes.js
│   └── users.routes.js
├── utils
│   ├── db.js
│   ├── httpStatusCode.js
│   └── responseMessage.js
├── index.js
├── package.json
├── vercel.json
├── booksManagement.postman_collection.json
└── README.md

```

---

## How to Use the Application

### Register a User
- Endpoint: `POST /register`
- Body:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

### Login a User
- Endpoint: `POST /login`
- Body:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Get User Info
- Endpoint: `GET /user-info`
- Headers: 
  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

### Add a Book
- Endpoint: `POST /books`
- Body:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```

### Get All Books
- Endpoint: `GET /books`

---

## Technologies Used
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: MongoDB ODM.
- **JWT**: Authentication and authorization.
- **Express Validator**: Request validation middleware.

---