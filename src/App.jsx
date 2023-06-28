import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/teacher/Dashboard";
import TeacherLayout from "./layouts/TeacherLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TeacherLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
