import "./App.css";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./screens/teacher/Dashboard";
import TeacherLayout from "./layouts/TeacherLayout";
import Home from "./screens/Home";
import MainLayout from "./layouts/MainLayout";
import Survey from "./screens/teacher/Survey";
import Students from "./screens/teacher/students/Students";
import Register from "./screens/teacher/students/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { default as SurveyForm } from "./screens/student/Survey";
import { default as StudentDashboard } from "./screens/student/Dashboard";
import { default as StudentSettings } from "./screens/student/Settings";

import initAxiosInterceptors from "./services/axios/auth-helpers";
import StudentLayout from "./layouts/StudentLayout";
import Posts from "./screens/forum/Posts";
import ForumLayout from "./layouts/ForumLayout";
import Create from "./screens/forum/Create";
import PostDetails from "./components/forum/PostDetails";

function App() {
  initAxiosInterceptors();

  return (
    <>
      <Routes>
        <Route path="/forum" element={<ForumLayout />}>
          <Route path="" element={<Posts />} />
          <Route path="create" element={<Create />} />
          <Route path="post/:id" element={<PostDetails />} />
        </Route>

        <Route
          path="/teacher"
          element={
            <ProtectedRoute
              element={TeacherLayout}
              allowedRoles={["teacher"]}
              fallbackPath={"/"}
            />
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="survey" element={<Survey />} />
          <Route path="students" element={<Students />} />
          <Route path="students/register" element={<Register />} />
        </Route>

        <Route
          path="/student"
          element={
            <ProtectedRoute
              element={StudentLayout}
              allowedRoles={["student"]}
              fallbackPath={"/"}
            />
          }
        >
          <Route path="" element={<StudentDashboard />} />
          <Route path="survey" element={<SurveyForm />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
