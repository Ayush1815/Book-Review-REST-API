## 📚 Book Review API:-

A RESTful API built with *Node.js*, *Express*, and *PostgreSQL* for managing books, user authentication, and book reviews. It supports signup/login with JWT-based authentication, user-contributed reviews (1 per book per user), search functionality, and protected endpoints.

====================
🚀 Features
====================
- 🔐 User signup & login with hashed passwords (bcrypt) and JWT tokens
- 📚 Book CRUD (create, read, search)
- 📝 One review per user per book
- 🔍 Case-insensitive search by title or author
- ✅ Auth-protected routes using middleware
- 📦 PostgreSQL schema auto-initialization on startup

==============================
🛠️ Project Setup Instructions
==============================

1. Clone the repository:
------------------------
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

2. Install dependencies:
------------------------
- npm install

3. Set up PostgreSQL:
------------------------
(Ensure you have PostgreSQL installed and running)
Create the database:
CREATE DATABASE bookreview;

4. Configure environment variables
------------------------
Create a .env file in the root with the following or use the same .env provided in the repository:

PORT=8020
DATABASE_URL=postgresql://postgres:<your_password>@localhost:5432/bookreview
JWT_SECRET=yourSuperSecretKey

=====================
▶️ How to Run Locally
=====================

To run in development:
------------------------
npm run dev or node Main/index

Visit: http://localhost:8020

Use Postman, curl or Thunder Client to test endpoints.

====================
Authentication
====================

POST   /api/signup         → { "username": "user", "password": "******" }

POST   /api/login          → returns a JWT token 

- Use this JWT token as bearer token and JWT secret key to JWT Bearer wherever auth required.

====================
📚 Book Endpoints
====================

POST   /api/book           → Add a book (auth required) 
GET    /api/books          → Get all books
GET    /api/book/:id       → Get a book by ID

====================
📝 Review Endpoints
====================

POST   /api/books/:id/reviews     → Add review (auth required)
PUT    /api/book/review/:id       → Update review (auth required)
DELETE /api/book/reviews/:id/del  → Delete review (auth required)

====================
🔍 Search Endpoint
====================

GET    /api/search?q=keyword      → Search by title or author

====================
📐 Design Decisions & Assumptions
====================

- Each user can only submit one review per book
- Passwords are securely hashed using bcryptjs
- JWT tokens store { id, username }
- Token is required for review and book posting/updating
- Errors use standard HTTP status codes and clear messages
- Project uses controller-service separation for clarity

====================
📂 Folder Structure
====================

/Controllers     → Business logic
/Routes          → API route declarations
/Models          → Table schemas (CREATE TABLE)
/Database        → PostgreSQL pool config
/Middleware      → Auth middleware
.env             → Environment config
index.js         → Entry point




