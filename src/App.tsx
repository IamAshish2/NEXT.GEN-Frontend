import { Route, Routes } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./global/components/Loader";
import { useGlobalStore } from "./global/store";
import Toaster from "./global/components/toaster/toaster";
import Profile from "./pages/layout/public/userPages/profile/profile";
import CreateGroupForm from "./pages/layout/public/userPages/groups/components/create-group-form";
import { FriendsPage } from "./pages/layout/public/userPages/friends/friends-page";
import StudyMaterialCard from "./pages/layout/public/userPages/study-materials/study-material-card";
import LandingPage from "./pages/layout/public/landing-page";

const SignUpPage = lazy(() => import("./pages/auth/signup/SignUp"));
const LoginPage = lazy(() => import("./pages/auth/login/Login"))
const PublicLayout = lazy(() => import("@/pages/layout/public/public-layout"))
const HomePage = lazy(() => import("@/pages/layout/public/userPages/home-page"))
const NotFoundPage = lazy(() => import("@/global/components/not-found-page"));
const UploadPost = lazy(() => import("@/pages/layout/public/userPages/home-page-post/upload-post-form"))
const Groups = lazy(() => import("./pages/layout/public/userPages/groups/groups-page"));
const GroupDetails = lazy(() => import("./pages/layout/public/userPages/groups/group-details"))


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
          <Route index element={<LandingPage />} />
          <Route path="/" element={<PublicLayout />} >
            <Route path="/user-home" element={<HomePage />} />
            <Route path="/upload-post" element={<UploadPost />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/user-groups" element={<Groups />} />
            <Route path="/user-groups/details/:userName" element={<GroupDetails />} />
            <Route path="/user/create-group" element={<CreateGroupForm />} />
            <Route path="/user-friends" element={<FriendsPage />} />
            <Route path="/user-home/upload-post" element={<UploadPost />} />
            <Route path="/study-materials" element={<StudyMaterialCard
              title="Advanced Mathematics"
              category="Mathematics"
              students={128}
              duration="6 weeks"
              image="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />} />
          </Route>

          {/* Not found page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;