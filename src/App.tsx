import { Route, Routes } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./global/components/Loader";
import { useGlobalStore } from "./global/store";
import Toaster from "./global/components/toaster/toaster";
import HomePage from "./pages/userPages/home-page";

const SignUpPage = lazy(() => import("./pages/auth/signup/SignUp"));
const LoginPage = lazy(() => import("./pages/auth/login/Login"))



function App() {

  const { toaster, closeToasterData } = useGlobalStore();
  return (
    <>
      {/* private routes */}

      {/* public routes */}
      <Suspense fallback={<Loader />}>
        <Toaster data={toaster} close={closeToasterData} />
        <Routes>
          <Route
            index
            element={
              <SignUpPage />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />

          {/* After a user logs in */}
          <Route path="user-home" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;