# Nexa Chain - Frontend Dashboard

A modern investment and referral management dashboard built with **React.js**, **TypeScript**, **Redux Toolkit (RTK Query)**, **Tailwind CSS**, and **Framer Motion**.

This application serves as the frontend interface for the **Nexa Chain** platform, allowing users to manage investments, track ROI earnings, monitor referral networks, and view wallet balances through a responsive and visually appealing dashboard.

---

# 🚀 Features

## Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* Public Route Handling

## Dashboard

* Total Investments Overview
* Daily ROI Earnings
* Level Income Tracking
* Wallet Balance Monitoring
* Recent Investment Activity

## Investment Management

* Create New Investments
* View Investment History
* Track ROI Performance

## Referral System

* Direct Referral Tracking
* Multi-Level Referral Tree Visualization
* Level Income History
* Interactive Referral Tree Component

## UI/UX

* Fully Responsive Design
* Modern Dashboard Layout
* Framer Motion Animations
* Mobile-Friendly Interface
* Clean and Reusable Components

---

# 🛠 Tech Stack

## Frontend

* React.js
* TypeScript
* Vite
* Redux Toolkit
* RTK Query
* React Router DOM
* Tailwind CSS
* Framer Motion

## Backend (Expected)

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

# 📦 Project Setup

## Prerequisites

Before running the project, ensure you have:

* Node.js (v18+ recommended)
* npm / yarn / pnpm

---

## Clone Repository

```bash
git clone <your-frontend-repository-link>
cd nexa-chain-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Run Development Server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

---

## Build For Production

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# 📁 Project Structure

```text
my-project/
│
├── src/
│   │
│   ├── Component/
│   │   ├── NewInvestment.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── TreeNode.tsx
│   │
│   ├── features/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── investment/
│   │   └── referrals/
│   │
│   ├── layout/
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Investment.tsx
│   │   ├── Login.tsx
│   │   ├── Referrals.tsx
│   │   └── SignUp.tsx
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── store.ts
│
├── .env
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Use inside the application:

```ts
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

---

# 📚 API Documentation

The frontend consumes the following backend REST APIs.

## Authentication APIs

### Register User

```http
POST /auth/register
```

Request Body:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "password": "password123",
  "referralCode": "REF123"
}
```

---

### Login User

```http
POST /auth/login
```

Response:

```json
{
  "token": "jwt-token"
}
```

---

## Dashboard APIs

### Get Dashboard Data

```http
GET /investments/dashboard
```

Returns:

* Total Investments
* Daily ROI
* Total Level Income
* Wallet Balance
* Recent Investments

---

## Investment APIs

### Create Investment

```http
POST /investments
```

Request:

```json
{
  "planName": "Starter Plan",
  "amount": 5000,
  "duration": 30,
  "roiPercentage": 2
}
```

---

### Get Investment History

```http
GET /investments
```

---

## Referral APIs

### User Details

```http
GET /user/details
```

Returns:

* User Profile Information
* Direct Referrals
* Referral Tree Structure
* Level Income History

---

# 🔑 Authentication Flow

1. User logs in using credentials.
2. Backend validates the user.
3. JWT token is returned.
4. Token is stored in localStorage.
5. RTK Query automatically attaches the token to authenticated requests.
6. Protected routes restrict unauthorized access.

Example Authorization Header:

```http
Authorization: Bearer <jwt-token>
```

---

# 🎨 Design Decisions

The dashboard follows modern fintech UI principles:

* Responsive Design
* Modular Component Architecture
* Reusable Components
* Smooth Page Transitions
* Interactive Referral Tree
* Optimized State Management with Redux Toolkit
* Type-Safe Development Using TypeScript

---

# 📌 Assumptions

## Backend Contract

The frontend assumes backend responses match the interfaces used within RTK Query.

## JWT Authentication

The backend provides secure JWT-based authentication.

## ROI Processing

ROI calculations are handled entirely by backend cron jobs.

## Referral Tree

The backend provides nested referral data recursively.

## Route Security

Users cannot access dashboard pages without authentication.

---

# 🚀 Deployment

Generate a production build:

```bash
npm run build
```

Deploy the generated `dist/` folder to:

* Vercel
* Netlify
* Render
* AWS S3
* Firebase Hosting

---

# 🤝 Contributing

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

