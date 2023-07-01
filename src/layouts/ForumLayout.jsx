import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineForum } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ForumLayout = () => {
  const { signout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.user?.userType?.type.toLowerCase();

  return (
    <div className="relative z-50">
      <header className="header">
        <button className="mr-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <h3>Foro</h3>
      </header>
      <nav
        className={`flex flex-col sidebar  ${
          sidebarOpen ? "left-0 " : "-left-64"
        }`}
      >
        <button className="mb-10" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>

        <Link className="sidebar__item" to="/forum">
          <MdOutlineForum className="sidebar__item-icon" size={30} />
          Foro
        </Link>
        <Link className="sidebar__item" to="/forum/create">
          <IoCreateOutline className="sidebar__item-icon" size={30} />
          Crear post
        </Link>

        {/* Make a condition if role is student or teacher or admin */}

        {role === "admin" && (
          <Link className="sidebar__item" to="/admin">
            <LuLayoutDashboard className="sidebar__item-icon" size={30} />
            Dashboard
          </Link>
        )}

        {role === "teacher" && (
          <Link className="sidebar__item" to="/teacher">
            <LuLayoutDashboard className="sidebar__item-icon" size={30} />
            Dashboard
          </Link>
        )}

        {role === "student" && (
          <Link className="sidebar__item" to="/student">
            <LuLayoutDashboard className="sidebar__item-icon" size={30} />
            Dashboard
          </Link>
        )}

        {user ? (
          <button onClick={() => signout()} className="sidebar__item">
            <AiOutlineLogout className="sidebar__item-icon" size={30} />
            Cerrar sesión
          </button>
        ) : (
          <Link to="/" className="sidebar__item">
            <AiOutlineLogin className="sidebar__item-icon" size={30} />
            Iniciar sesión
          </Link>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default ForumLayout;
