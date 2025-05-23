import "./index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./global/components/Loader";
import { useGlobalStore } from "./global/store";
import Toaster from "./global/components/toaster/toaster";
import Protected from "./pages/auth/Protected";
import LandingPage from "./pages/layout/public/landing-page";

const SignUpPage = lazy(() => import("./pages/auth/signup/SignUp"));
const LoginPage = lazy(() => import("./pages/auth/login/Login"));
const PublicLayout = lazy(() => import("@/pages/layout/public/public-layout"));
const HomePage = lazy(() => import("@/pages/layout/public/userPages/home-page"));
const NotFoundPage = lazy(() => import("@/global/components/not-found-page"));
const UploadPost = lazy(() => import("@/pages/layout/public/userPages/home-page-post/upload-post-form"));
const Profile = lazy(() => import("./pages/layout/public/userPages/profile/profile"));
const Groups = lazy(() => import("./pages/layout/public/userPages/groups/groups-page"));
const GroupDetails = lazy(() => import("./pages/layout/public/userPages/groups/group-details"));
const CreateGroupForm = lazy(() => import("./pages/layout/public/userPages/groups/components/create-group-form"));
const GroupMembers = lazy(() => import("./pages/layout/public/userPages/groups/components/view-group-members"));
const GroupPosts = lazy(() => import("./pages/layout/public/userPages/groups/group-posts/group-posts"));
const UploadPostToGroup = lazy(() => import("./pages/layout/public/userPages/groups/components/upload-post-to-group"));
const PostView = lazy(() => import("./pages/layout/public/userPages/groups/individual-post/view-individual-post"));
const FriendsPage = lazy(() => import("./pages/layout/public/userPages/friends/friends-page"));
const StudyMaterialCard = lazy(() => import("./pages/layout/public/userPages/study-materials/study-material-card"));


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
            <Route path="/user-groups/details/:name" element={<GroupDetails />} />
            <Route path="/user-groups/details/:name/members" element={<GroupMembers />} />
            <Route path="/user-groups/details/:name/posts" element={<GroupPosts />} />
            <Route path="/user-groups/:name/post" element={<UploadPostToGroup />} />
            <Route path="/user/create-group" element={<CreateGroupForm />} />
            <Route path="/user-friends" element={<FriendsPage />} />
            <Route path="/user-home/upload-post" element={<UploadPost />} />


            {/* for viewing individual post */}
            <Route path="/view-user-post/:postId" element={<PostView />} />

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