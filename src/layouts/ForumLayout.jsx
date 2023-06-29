import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineForum } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ForumLayout = () => {
  const { signout, isAuth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
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

        <Link className="sidebar__item" to="/student/forum">
          <MdOutlineForum className="sidebar__item-icon" size={30} />
          Foro
        </Link>
        <Link className="sidebar__item" to="/teacher/settings">
          <IoCreateOutline className="sidebar__item-icon" size={30} />
          Crear post
        </Link>
        {isAuth ? (
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
