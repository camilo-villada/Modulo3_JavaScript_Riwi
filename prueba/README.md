# CRUDZASO - Task Management Application

## Description
Single Page Application (SPA) for task management with role-based authentication.

## Technologies
- **Frontend:** Vite + Vanilla JavaScript
- **Backend:** JSON Server
- **HTTP Client:** Axios
- **Styles:** CSS

## Roles and Functionalities

### Administrator (admin)
- Dashboard with global metrics
- Full CRUD operations for all users' tasks
- User management

### Regular User (user)
- "My Tasks" view with personal tasks
- CRUD operations for their own tasks
- User profile

## Installation

```bash
# Install dependencies
```npm install

# Start JSON Server (backend)
``npm run server

# Start development server

# json-server
``npx json-server --watch db.json

```

## Test Credentials

### Admin
- Email: admin@crudzaso.com
- Password: admin123

### User
- Email: juan@test.com
- Password: 123456


## Coder Information
-Full Name: Juan Camilo Villada
-Clan: Thompson
-Email: villajuan163@gmail.com


## Project Structure
```
src/
├── auth/ # Auth Controllers
├── routes/ # SPA Router
├── services/ # API Services
├── styles/ # CSS Stylesheets
└── views/ # Application Views
```

## Ports
- Frontend (Vite): http://localhost:5173
- Backend (JSON Server): http://localhost:3000