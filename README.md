# Nexa Chain - Frontend Dashboard

[cite_start]A premium, responsive React dashboard built for an investment and referral-based platform[cite: 3, 5, 107]. [cite_start]This frontend application handles user interfaces for tracking investments, daily ROI, and multi-level referral networks while maintaining high-quality UI/UX practices[cite: 122].

## 🚀 Key Features

Based on the core project requirements, this dashboard includes:

* [cite_start]**Responsive UI:** A fully responsive React dashboard tailored for both desktop and mobile views[cite: 107].
* [cite_start]**Key Metrics Display:** Dashboard cards displaying Total Investments, Daily ROI, Total Level Income, and Wallet Balance[cite: 108, 110, 111, 112, 113].
* [cite_start]**Detailed Histories:** Comprehensive tables for Investment History, ROI History, and Referral Income History[cite: 109, 114, 115, 116].
* [cite_start]**Referral Matrix:** A visual, nested representation of the referral tree hierarchy[cite: 117, 118].
* [cite_start]**Visual Data Representation:** Integration of charts for the visual representation of earnings[cite: 122].
* [cite_start]**Robust State Management:** Seamless API integration with proper handling of loading and error states to ensure a smooth user experience[cite: 120, 121].

## 🛠️ Tech Stack & Architecture

* [cite_start]**Framework:** React.js [cite: 5, 107]
* [cite_start]**Architecture:** Clean code structure focusing on modular and reusable components[cite: 124].

## ⚙️ Project Setup Steps

[cite_start]Follow these steps to run the frontend application locally[cite: 156]:

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repository-link>
    cd nexa-chain-frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(Note: You can also use `yarn install` or `pnpm install` depending on your package manager).*

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the necessary variables (see the section below).

4.  **Start the Development Server:**
    ```bash
    npm start
    ```
    *(or `npm run dev` if using Vite).* The application will typically be available at `http://localhost:3000` or `http://localhost:5173`.

## 🔐 Environment Variables

[cite_start]To successfully connect the frontend to the backend APIs, configure the following environment variable in your `.env` file[cite: 157]:

```env
# The base URL for the backend REST APIs (Authentication, Investment, Dashboard, Referral)
REACT_APP_API_BASE_URL=http://localhost:5000/api