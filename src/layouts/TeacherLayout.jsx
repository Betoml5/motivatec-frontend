import { Outlet, Link } from "react-router-dom";

import {
  AiOutlineMenu,
  AiOutlinePieChart,
  AiOutlineLink,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { PiStudentLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";

const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <header className="header">
        <button className="mr-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <h3>Maestro</h3>
      </header>
      <nav
        className={`flex flex-col sidebar  ${
          sidebarOpen ? "left-0 " : "-left-64"
        }`}
      >
        <button className="mb-10" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <Link className="sidebar__item" to="/teacher">
          <AiOutlineHome className="sidebar__item-icon" size={30} />
          Inicio
        </Link>
        <Link className="sidebar__item" to="/teacher/students">
          <PiStudentLight className="sidebar__item-icon" size={30} />
          Estudiantes
        </Link>
        <Link className="sidebar__item" to="estadisticas">
          <AiOutlinePieChart className="sidebar__item-icon" size={30} />
          Estadisticas
        </Link>
        <Link className="sidebar__item" to="/teacher/survey">
          <AiOutlineLink className="sidebar__item-icon" size={30} />
          Hacer encuesta
        </Link>
        <Link className="sidebar__item" to="/teacher/settings">
          <CiSettings className="sidebar__item-icon" size={30} />
          Mi cuenta
        </Link>
        <button className="sidebar__item">
          <AiOutlineLogout className="sidebar__item-icon" size={30} />
          Cerrar sesión
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default TeacherLayout;
