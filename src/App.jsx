import "./App.css";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./screens/teacher/Dashboard";
import TeacherLayout from "./layouts/TeacherLayout";
import MainLayout from "./layouts/MainLayout";

import Home from "./screens/Home";
import Survey from "./screens/teacher/Survey";
import Students from "./screens/teacher/students/Students";
import Register from "./screens/teacher/students/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import { default as SurveyForm } from "./screens/student/Survey";
import { default as StudentDashboard } from "./screens/student/Dashboard";
import { default as AdminDashboard } from "./screens/admin/Dashboard";
import StudentEdit from "./screens/shared/StudentEdit";
import { default as StudentSettings } from "./screens/student/Settings";
import { default as TeacherSettings } from "./screens/teacher/Settings";

import StudentLayout from "./layouts/StudentLayout";
import Posts from "./screens/forum/Posts";
import ForumLayout from "./layouts/ForumLayout";
import Create from "./screens/forum/Create";
import PostDetails from "./components/forum/PostDetails";
import NotFound from "./screens/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import initAxiosInterceptors from "./services/axios/auth-helpers";
import StudentDetails from "./screens/shared/StudentDetails";

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
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/edit/:id" element={<StudentEdit />} />
          <Route path="settings" element={<TeacherSettings />} />
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

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={AdminLayout}
              allowedRoles={["admin"]}
              fallbackPath={"/"}
            />
          }
        >
          <Route path="" element={<AdminDashboard />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
