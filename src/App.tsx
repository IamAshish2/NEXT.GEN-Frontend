import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./global/components/Loader";

const SignUpPage = lazy(() => import("./pages/auth/SignUp"));

function App() {
  return (
    <>
      {/* private routes */}

      {/* public routes */}
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />

      </Routes>
    </>
  );
}

export default App;