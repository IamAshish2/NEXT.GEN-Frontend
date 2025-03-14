import { Route, Routes } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./global/components/Loader";
import { useGlobalStore } from "./global/store";
import Toaster from "./global/components/toaster/toaster";


const SignUpPage = lazy(() => import("./pages/auth/signup/SignUp"));
const LoginPage = lazy(() => import("./pages/auth/login/Login"))
const PublicLayout = lazy(() => import("@/pages/layout/public/public-layout"))
const HomePage = lazy(() => import("@/pages/layout/public/userPages/home-page"))
const NotFoundPage = lazy(() => import("@/global/components/not-found-page"));
const UploadPost = lazy(() => import("@/pages/layout/public/userPages/upload-post/components/upload-post"))


function App() {

  const { toaster, closeToasterData } = useGlobalStore();
  return (
    <>
      {/* private routes */}

      {/* public routes */}
      <Suspense fallback={<Loader />}>
        <Toaster data={toaster} close={closeToasterData} />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* After a user logs in */}
          <Route path="/" element={<PublicLayout />} >
            <Route index element={<HomePage />} />
            <Route path="/upload-post" element={<UploadPost />} />
          </Route>

          {/* Not found page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;