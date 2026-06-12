import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./Component/ProtectedRoute";
import PublicRoute from "./Component/PublicRoute";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Referrals = lazy(() => import("./pages/Referrals"));
const Investment = lazy(() => import("./pages/Investment"));
const NewInvestment = lazy(() => import("./Component/NewInvestment"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" replace /> : <Home />}
          />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/investments" element={<Investment />} />
            <Route path="/new_investment" element={<NewInvestment />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
