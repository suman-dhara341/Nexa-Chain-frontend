# Nexa Chain - Frontend Dashboard

A modern investment and referral management dashboard built with **React.js**, **Redux Toolkit (RTK Query)**, **Tailwind CSS**, and **Framer Motion**.

This application serves as the frontend interface for the **Nexa Chain** platform, allowing users to manage investments, track ROI earnings, monitor referral networks, and view wallet balances through a responsive and visually appealing dashboard.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Dashboard

* Total Investments Overview
* Daily ROI Earnings
* Level Income Tracking
* Wallet Balance Monitoring
* Recent Investment Activity

### Investment Management

* Create New Investments
* View Investment History
* Track ROI Performance

### Referral System

* Direct Referral Tracking
* Multi-Level Referral Tree Visualization
* Level Income History

### UI/UX

* Responsive Design
* Glassmorphism Components
* Smooth Framer Motion Animations
* Mobile-Friendly Layout
* Modern Fintech/Web3 Inspired Interface

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Redux Toolkit
* RTK Query
* Tailwind CSS
* Framer Motion
* Axios (Optional)

### Backend (Expected)

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

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### For Vite Projects

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Run Development Server

### Create React App

```bash
npm start
```

### Vite

```bash
npm run dev
```

---

## Build For Production

### Create React App

```bash
npm run build
```

### Vite

```bash
npm run build
```

---

# 📁 Project Structure

```text
src/
│
├── app/
│   └── store.js
│
├── api/
│   └── apiSlice.js
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── investments/
│   └── referrals/
│
├── components/
│   ├── common/
│   ├── layout/
│   └── charts/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Investments.jsx
│   └── Referrals.jsx
│
├── routes/
│   └── ProtectedRoute.jsx
│
├── hooks/
├── utils/
├── assets/
└── App.jsx
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
# Backend API URL
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

For Vite:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# 📚 API Documentation

The frontend consumes the following backend REST APIs.

## Authentication

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

## Dashboard

### Get Dashboard Data

```http
GET /investments/dashboard
```

Returns:

* Total Investments
* Daily ROI
* Level Income
* Wallet Balance
* Recent Investments

---

## Investments

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

## Referral & Network

### User Details

```http
GET /user/details
```

Returns:

* User Information
* Direct Referrals
* Referral Tree
* Level Income History

---

# 🔑 Authentication Flow

1. User logs in.
2. Backend returns JWT token.
3. Token is stored in localStorage.
4. RTK Query automatically attaches the token to protected requests.
5. Protected routes verify authentication status before rendering.

Example Authorization Header:

```http
Authorization: Bearer <jwt-token>
```

---

# 🎨 Design Decisions

The UI follows a premium fintech dashboard approach with:

* Glassmorphism Design
* Dark Theme Friendly Components
* Animated Page Transitions
* Interactive Referral Tree
* Reusable UI Components
* Mobile-First Responsive Layout

---

# 📌 Assumptions

### Backend Contract

The frontend assumes API responses match the interfaces defined within RTK Query slices.

### JWT Authentication

Backend provides valid JWT tokens for protected routes.

### ROI Automation

ROI calculations are managed entirely by the backend scheduler.

### Referral Tree Structure

Backend provides nested referral tree data recursively.

### Route Security

Unauthenticated users are redirected to login pages through Protected Routes.

---

# 🚀 Deployment

Build the application:

```bash
npm run build
```

Deploy the generated build folder to:

* Vercel
* Netlify
* AWS S3
* Firebase Hosting
* Render

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project was developed as part of a MERN Stack Technical Assessment and is intended for educational and evaluation purposes.

---

## 👨‍💻 Author

Developed using React.js, RTK Query, Tailwind CSS, and Framer Motion as part of the Nexa Chain investment platform frontend implementation.
