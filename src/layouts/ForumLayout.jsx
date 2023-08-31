import { Outlet } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineHome,
} from "react-icons/ai";
import { MdOutlineForum } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSideBar from "../hooks/useSideBar";

const ForumLayout = () => {
  const { signout, user } = useAuth();
  const { containerRef, setSidebarOpen, sidebarOpen } = useSideBar();
  const role = user?.user?.userType?.type.toLowerCase();

  return (
    <div className="relative z-50">
      <header ref={containerRef} className="header">
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
        {role === "admin" && (
          <Link className="sidebar__item" to="/admin">
            <AiOutlineHome className="sidebar__item-icon" size={30} />
            Inicio
          </Link>
        )}

        {role === "teacher" && (
          <Link className="sidebar__item" to="/teacher">
            <AiOutlineHome className="sidebar__item-icon" size={30} />
            Inicio
          </Link>
        )}

        {role === "student" && (
          <Link className="sidebar__item" to="/student">
            <AiOutlineHome className="sidebar__item-icon" size={30} />
            Inicio
          </Link>
        )}
        <Link className="sidebar__item" to="/forum">
          <MdOutlineForum className="sidebar__item-icon" size={30} />
          Foro
        </Link>
        {role === "student" && (
          <Link className="sidebar__item" to="/forum/create">
            <IoCreateOutline className="sidebar__item-icon" size={30} />
            Crear post
          </Link>
        )}

        {/* Make a condition if role is student or teacher or admin */}

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
