import { Outlet, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineForum } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { RiSurveyLine } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import useSideBar from "../hooks/useSideBar";

const StudentLayout = () => {
  const { signout } = useAuth();

  const { containerRef, setSidebarOpen, sidebarOpen } = useSideBar();

  return (
    <div>
      <header ref={containerRef} className="header">
        <button className="mr-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <h3>Alumno</h3>
      </header>
      <nav
        className={`flex flex-col sidebar transform  ${
          sidebarOpen ? "left-0 " : "-left-64"
        } `}
      >
        <button className="mb-10" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AiOutlineMenu className="sidebar__item-icon" size={30} />
        </button>
        <Link className="sidebar__item" to="/student">
          <AiOutlineHome className="sidebar__item-icon" size={30} />
          Inicio
        </Link>
        <Link className="sidebar__item" to="/forum">
          <MdOutlineForum className="sidebar__item-icon" size={30} />
          Foro
        </Link>
        <Link className="sidebar__item" to="/student/survey">
          <RiSurveyLine className="sidebar__item-icon" size={30} />
          Encuestas
        </Link>
        <Link className="sidebar__item" to="/student/settings">
          <CiSettings className="sidebar__item-icon" size={30} />
          Mi cuenta
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

export default StudentLayout;
