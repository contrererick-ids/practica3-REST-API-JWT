# API REST con autenticación JWT — Práctica 3

Este repositorio contiene un proyecto backend desarrollado con **Node.js**, **Express** y autenticación mediante **JWT**. Se trata de un sistema de comercio electrónico simplificado con control de acceso por roles, operaciones CRUD y gestión de órdenes.

## 🎯 Objetivo

Construir una API RESTful con las siguientes características:
- Autenticación usando tokens **JWT**.
- Autorización basada en roles (`admin`, `cliente`).
- Operaciones CRUD para usuarios, productos y órdenes.
- Documentación de la API con **Swagger**.

## 📦 Funcionalidades

### 🔐 Autenticación y autorización
- Login mediante `POST /api/users/login`, retorna un **JWT Bearer Token**.
- Las rutas protegidas validan el token con middleware personalizado (`auth.js`).
- Control de acceso por rol:
  - `admin`: acceso completo a CRUD de usuarios y productos.
  - `cliente`: acceso a sus propios datos y creación de órdenes.

### 👥 Gestión de usuarios (`/api/users`)
- `POST /` – Registro de nuevos usuarios.
- `POST /login` – Autenticación con token JWT.
- `GET /` – Obtener todos los usuarios (solo admin).
- `GET /:id` – Obtener un usuario por ID (admin o el mismo usuario).
- `PUT /:id` – Actualizar usuario (admin o el mismo usuario).
- `DELETE /:id` – Eliminar usuario (solo admin).

### 🛍️ Gestión de productos (`/api/products`)
- `GET /` – Obtener todos los productos.
- `GET /:id` – Obtener producto por ID.
- `POST /` – Crear producto (solo admin).
- `PUT /:id` – Actualizar producto (solo admin).
- `DELETE /:id` – Eliminar producto (solo admin).

### 📦 Gestión de órdenes (`/api/orders`)
- `GET /` – Obtener todas las órdenes del usuario autenticado.
- `POST /` – Crear nueva orden (usuario autenticado).
- `GET /:id` – Ver una orden específica si pertenece al usuario.

### 🧱 Modelos
- **Usuario**: `name`, `email`, `password`, `role`
- **Producto**: `name`, `description`, `price`, `stock`, `category`
- **Orden**: `userId`, `products[]`, `total`, `date`

## 🛡️ Middleware

### 🔑 auth.js
- Valida el token Bearer desde la cabecera `Authorization`.
- Decodifica el token y añade los datos del usuario al objeto `req`.
- Verifica si el usuario tiene rol de admin para rutas restringidas.

## 📘 Documentación con Swagger

La API está documentada usando **Swagger**:
- Autogenerada con `swagger-jsdoc`.
- Mostrada con `swagger-ui-express`.
- Disponible desde la ruta raíz `/`.

## 🧪 Entregables

- Archivos `.js` de rutas, controladores, modelos y middleware.
- Archivo `.http` o equivalente para probar los endpoints.
- Capturas de pantalla:
  - Login exitoso
  - Uso del Swagger
  - Creación de órdenes
- Video corto (2–3 minutos) demostrando el sistema.
- Formato de autoevaluación y conclusiones.

## 📝 Criterios de evaluación (100 pts)

| Criterio                                      | Puntos |
|----------------------------------------------|--------|
| Login con JWT                                | 15     |
| Middleware de autenticación                  | 10     |
| Autorización basada en roles                 | 10     |
| CRUD de productos (admin)                    | 20     |
| CRUD de usuarios (admin y self)              | 15     |
| Creación de órdenes (usuarios autenticados)  | 10     |
| Documentación Swagger                        | 10     |
| Pruebas funcionales (.http, capturas)        | 10     |
| Conclusiones                                 | 5      |

## ⚠️ Nota

Este proyecto fue desarrollado con fines académicos únicamente.

---

📄 _This README is also available in [English](README.md)._
