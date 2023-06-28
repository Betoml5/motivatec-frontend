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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
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
      </Routes>
    </>
  );
}

export default App;
