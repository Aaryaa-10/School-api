# School Management API

A Node.js + Express.js backend project that allows users to add schools and retrieve schools sorted by proximity using geographical coordinates.

## Features

- Add new schools to MySQL database
- Retrieve schools sorted by nearest location
- RESTful APIs
- MySQL database integration
- Input validation using express-validator
- Professional backend folder structure
- Error handling

---

# Tech Stack

- Node.js
- Express.js
- MySQL
- express-validator
- dotenv
- mysql2

---

# Project Structure

```bash
school-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── schoolController.js
│
├── middlewares/
│   └── validation.js
│
├── routes/
│   └── schoolRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
```

---

# Installation & Setup

## Clone Repository

```bash
git clone <your-github-repo-link>
cd school-management-api
```

---

## Install Dependencies

```bash
npm install
```

---

## Setup Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
DB_PORT=3306
```

---

# Database Setup

## Create Database

```sql
CREATE DATABASE school_management;
```

---

## Use Database

```sql
USE school_management;
```

---

## Create Table

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

# Run Project

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

---

# API Endpoints

## 1. Add School

### Endpoint

```http
POST /api/addSchool
```

### Request Body

```json
{
  "name": "ABC School",
  "address": "Lucknow",
  "latitude": 26.8467,
  "longitude": 80.9462
}
```

### Success Response

```json
{
  "success": true,
  "message": "School added successfully",
  "schoolId": 1
}
```

---

# 2. List Schools

### Endpoint

```http
GET /api/listSchools?latitude=26.8467&longitude=80.9462
```

### Success Response

```json
{
  "success": true,
  "count": 1,
  "schools": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Lucknow",
      "latitude": 26.8467,
      "longitude": 80.9462,
      "distance": "0.00"
    }
  ]
}
```

---

# Validation

The project uses `express-validator` for:
- request body validation
- query parameter validation

---

# Deployment

The backend can be deployed on:
- Render
- Railway

The database can be hosted on:
- Railway MySQL
- Aiven MySQL

---
## Live Link
https://school-api-j2xd.onrender.com/

# API Testing

## POST /api/addSchool

Request Body:

```json
{
  "name": "Delhi Public School",
  "address": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

---

## GET /api/listSchools

Example:

https://school-api-j2xd.onrender.com/api/listSchools?latitude=28.6139&longitude=77.2090


# Author

Arya Amoriya