import { AiOutlineHome, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { PiChalkboardTeacherThin, PiStudentThin } from "react-icons/pi";
import { MdOutlineForum, MdGroups2 } from "react-icons/md";

const AdminLayout = () => {
  const { signout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <header className="header">
        <button className="mr-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <h3>Administrador</h3>
      </header>
      <nav
        className={`flex flex-col sidebar  ${
          sidebarOpen ? "left-0 " : "-left-64"
        }`}
      >
        <button className="mb-10" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <Link className="sidebar__item" to="/admin">
          <AiOutlineHome className="sidebar__item-icon" size={30} />
          Inicio
        </Link>
        <Link className="sidebar__item" to="/admin/students">
          <PiStudentThin className="sidebar__item-icon" size={30} />
          Alumnos
        </Link>
        <Link className="sidebar__item" to="/admin/teachers">
          <PiChalkboardTeacherThin className="sidebar__item-icon" size={30} />
          Profesores
        </Link>
        <Link className="sidebar__item" to="/admin/posts">
          <MdOutlineForum className="sidebar__item-icon" size={30} />
          Posts
        </Link>
        <Link className="sidebar__item" to="/admin/groups">
          <MdGroups2 className="sidebar__item-icon" size={30} />
          Grupos
        </Link>
        <Link></Link>
        <Link className="sidebar__item" to="/admin/settings">
          <CiSettings className="sidebar__item-icon" size={30} />
          Ajustes
        </Link>
        <button onClick={() => signout()} className="sidebar__item">
          <AiOutlineLogout className="sidebar__item-icon" size={30} />
          Cerrar sesión
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
