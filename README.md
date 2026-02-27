# Sistema web de gestión de inventario

Estructura generada:

- `backend`: API REST con Java 8 + Spring Boot 2.6.
- `frontend`: aplicación Angular 15 con Reactive Forms.
- `db/schema.sql`: script de base de datos MySQL.

## Backend

```bash
cd backend
mvn spring-boot:run
```

API base: `http://localhost:8080/api`

## Frontend

```bash
cd frontend
npm install
npm start
```

App: `http://localhost:4200`

## Endpoints principales

- `GET/POST/PUT/DELETE /api/categorias`
- `GET/POST/PUT/DELETE /api/productos`
- `POST /api/movimientos`
- `GET /api/movimientos/producto/{productoId}`
