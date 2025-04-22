# REST API with JWT Authentication — Practice 3

This repository contains a backend project developed using **Node.js**, **Express**, and **JWT** for user authentication. It implements a simplified e-commerce system that allows role-based access control, CRUD operations, and order management.

## 🎯 Objective

Build a RESTful API with the following features:
- Authentication using **JWT tokens**.
- Authorization based on user roles (`admin`, `client`).
- CRUD operations for Users, Products, and Orders.
- API documentation using **Swagger**.

## 📦 Features

### 🔐 Authentication & Authorization
- Login via `POST /api/users/login` returns a **JWT Bearer Token**.
- Protected routes require token validation through custom middleware (`auth.js`).
- Role-based access control:
  - `admin`: full CRUD access to users and products.
  - `client`: access to their own data and order creation.

### 👥 User Management (`/api/users`)
- `POST /` – Register a new user.
- `POST /login` – Authenticate and return JWT.
- `GET /` – Get all users (admin only).
- `GET /:id` – Get user by ID (admin or self).
- `PUT /:id` – Update user (admin or self).
- `DELETE /:id` – Delete user (admin only).

### 🛍️ Product Management (`/api/products`)
- `GET /` – Get all products.
- `GET /:id` – Get product by ID.
- `POST /` – Create product (admin only).
- `PUT /:id` – Update product (admin only).
- `DELETE /:id` – Delete product (admin only).

### 📦 Order Management (`/api/orders`)
- `GET /` – Get all orders for authenticated user.
- `POST /` – Create a new order (authenticated only).
- `GET /:id` – Get specific order if it belongs to the user.

### 🧱 Models
- **User**: `name`, `email`, `password`, `role`
- **Product**: `name`, `description`, `price`, `stock`, `category`
- **Order**: `userId`, `products[]`, `total`, `date`

## 🛡️ Middleware

### 🔑 auth.js
- Validates Bearer token from `Authorization` header.
- Decodes token and attaches user info to `req`.
- Checks for admin role in restricted routes.

## 📘 API Documentation

The API is documented using **Swagger**:
- Auto-generated with `swagger-jsdoc`.
- Displayed via `swagger-ui-express`.
- Accessible at the root route `/`.

## 🧪 Deliverables

- Source files for:
  - Routes, controllers, models, middleware.
- `.http` or `curl` file for endpoint testing.
- Screenshots showing:
  - Successful login
  - Swagger UI in use
  - Order creation
- 2–3 minute video demo.
- Auto-evaluation form and conclusions.

## 📝 Evaluation Criteria (100 pts)

| Criteria                                   | Points |
|-------------------------------------------|--------|
| JWT login functionality                   | 15     |
| Auth middleware                           | 10     |
| Role-based authorization                  | 10     |
| Product CRUD (admin)                      | 20     |
| User CRUD (admin/self)                    | 15     |
| Order creation (authenticated users)      | 10     |
| Swagger API documentation                 | 10     |
| Functional testing (screenshots, .http)   | 10     |
| Conclusions                               | 5      |

## ⚠️ Note

This project was developed for academic purposes only.