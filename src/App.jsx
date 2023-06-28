import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/teacher/Dashboard";
import TeacherLayout from "./layouts/TeacherLayout";
import Home from "./screens/Index";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
