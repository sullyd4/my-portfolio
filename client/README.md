# My Portfolio & CRM

This is a full-stack MERN application that serves as a personal portfolio and includes a fully-featured CRM backend.

## Project Overview

This project is divided into two main parts:

* **`/client`**: A React frontend built with Vite that displays the portfolio and provides a user interface for the CRM. It uses Tailwind CSS for styling.
* **`/server`**: A Node.js and Express backend that powers the CRM. It connects to a MongoDB database and provides a RESTful API for managing users, contacts, deals, and interactions.

## Technologies Used

### Frontend (Client)
- React
- Vite
- React Router
- Tailwind CSS
- shadcn/ui

### Backend (Server)
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing

## Setup and Installation

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB (local installation or a cloud service like MongoDB Atlas)

### 1. Backend Setup

```sh
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file in the /server directory
# Add your MongoDB connection string and a JWT secret
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_super_secret_key

# Start the backend server
npm start