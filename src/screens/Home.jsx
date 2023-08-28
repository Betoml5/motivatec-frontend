import Signin from "../components/Signin";
import useUser from "../hooks/useUser";
import Spinner from "./loading/Spinner";
import { default as StudentDashboard } from "./student/Dashboard";
import { default as TeacherDashboard } from "./teacher/Dashboard";
import { default as AdminDashboard } from "./admin/Dashboard";

const Home = () => <Signin />;

export default Home;
