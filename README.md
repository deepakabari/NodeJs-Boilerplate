# 🚀 NodeJs + TypeScript Boilerplate

> A scalable, maintainable Node.js backend built with TypeScript, Express, MongoDB, and best practices for modern development.

---

## 📂 Table of Contents

- [📐 Architecture](#-architecture)
- [⚙️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Project Structure](#️-project-structure)
- [🔐 Environment Configuration](#-environment-configuration)
- [📦 API Versioning](#-api-versioning)
- [✅ Code Quality](#-code-quality)
- [📈 Monitoring & Logging](#-monitoring--logging)

---

## 📐 Architecture

- **Monolithic**
- **Clean code separation**: controllers, services, routes
- **API versioning** (`/api/v1`, `/api/v2`)
- Environment-based configuration (12-factor app)

---

## ⚙️ Tech Stack

| Layer      | Tech                     |
| ---------- | ------------------------ |
| Runtime    | Node.js (v18+)           |
| Language   | TypeScript (strict mode) |
| Server     | Express.js               |
| Database   | MongoDB + Mongoose       |
| Linting    | ESLint + Prettier        |
| Logging    | Winston                  |
| Validation | Joi                      |
| Auth       | JWT + Bcrypt             |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js = 18.20.x
- MongoDB ≥ 6.x (local or Atlas)
- npm

---

### 🛠️ Installation

```bash
git clone https://github.com/your-org/project-name.git
cd project-name
cp .env.example .env
npm install
```

---

### ▶️ Run in Dev Mode

```bash
npm run dev
```

Runs with `ts-node-dev` for hot-reloading.

---

### 🏗️ Build & Run Production

```bash
npm run build
npm run start
```

---

## 🏗️ Project Structure

```bash
src/
├── api/
│   ├── v1/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
├── config/          # Env config
├── constants/       # HTTP constants and messages
├── db/              # DB configuration and models
├── exceptions/      # HTTP Exceptions
├── interfaces/      # TypeScript interfaces
├── middleware/      # Auth, error handling, etc.
├── utils/           # Helpers/utilities
├── validations/     # Joi schemas
├── app.ts           # Express app setup
└── server.ts        # Entry point
```

---

## 🔐 Environment Configuration

Create `.env` from `.env.example`:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/app-db
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
```

Use a central `env.ts` to type-check all variables.

---

## 📦 API Versioning

- Support for multiple versions:

  ```
  /api/v1/users
  /api/v2/users
  ```

- Controllers, routes, services separated per version.

- Add a new version via:
  ```bash
  cp -r src/api/v1 src/api/v2
  ```

---

## ✅ Code Quality

- TypeScript strict mode
- ESLint + Prettier
- Linting and formatting scripts:

```bash
npm run lint
npm run prettier
```

---

## 📈 Monitoring & Logging

- `Winston` logger with timestamps, context, and log levels

---
