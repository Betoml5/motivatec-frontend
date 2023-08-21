import "./App.css";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./screens/teacher/Dashboard";
import TeacherLayout from "./layouts/TeacherLayout";
import MainLayout from "./layouts/MainLayout";

import Home from "./screens/Home";
import Students from "./screens/teacher/students/Students";
import Register from "./screens/teacher/students/Register";
import Statistics from "./screens/teacher/Statistics";
import ProtectedRoute from "./components/ProtectedRoute";

import { default as SurveyForm } from "./screens/student/Survey";
import { default as StudentDashboard } from "./screens/student/Dashboard";
import { default as AdminDashboard } from "./screens/admin/Dashboard";
import { default as StudentSettings } from "./screens/student/Settings";
import { default as TeacherSettings } from "./screens/teacher/Settings";
import { default as StudentsAdmin } from "./screens/admin/Students";
import { default as TeachersAdmin } from "./screens/admin/Teachers";
import { default as PostsAdmin } from "./screens/admin/Posts";
import { default as SettingsAdmin } from "./screens/admin/Settings";
import { default as GroupsAdmin } from "./screens/admin/Groups";

import StudentEdit from "./screens/shared/StudentEdit";
import StudentLayout from "./layouts/StudentLayout";
import Posts from "./screens/forum/Posts";
import ForumLayout from "./layouts/ForumLayout";
import Create from "./screens/forum/Create";
import PostDetails from "./components/forum/PostDetails";
import NotFound from "./screens/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import initAxiosInterceptors from "./services/axios/auth-helpers";
import StudentDetails from "./screens/shared/StudentDetails";
// import EditStudent from "./screens/student/Edit";

function  App() {
  initAxiosInterceptors();

  return (
    <>
      <Routes>
        <Route path="/forum" element={<ForumLayout />}>
          <Route path="" element={<Posts />} />
          <Route
            path="create"
            element={
              <ProtectedRoute
                element={Create}
                allowedRoles={["student"]}
                fallbackPath={"/forum"}
              />
            }
          />
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
          <Route path="students" element={<Students />} />
          <Route path="students/register" element={<Register />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/edit/:id" element={<StudentEdit />} />
          <Route path="statistics" element={<Statistics />} />
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
          {/* <Route path="edit/:id" element={<EditStudent />} /> */}
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
          <Route path="students" element={<StudentsAdmin />} />
          <Route path="teachers" element={<TeachersAdmin />} />
          <Route path="posts" element={<PostsAdmin />} />
          <Route path="groups" element={<GroupsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
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
