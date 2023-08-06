import useUser from "../../hooks/useUser";
import Spinner from "../loading/Spinner";
import { PiStudentThin } from "react-icons/pi";

const Settings = () => {
  const { user } = useUser();

  if (!user) return <Spinner />;

  return (
    <div className="max-w-xl mx-auto  my-4">
      <div className="flex flex-col  p-4 py-20 bg-white mx-4 rounded-md ">
        <div className="w-20 h-20 shadow rounded-full p-2 self-center">
          <PiStudentThin size={50} className="w-full h-full" />
        </div>
        {/* <Link
          to={`/student/edit/${user.id}`}
          className="text-hardBlue underline text-center text-sm my-2"
        >
          Editar mi perfil
        </Link> */}
        <p className="font-semibold self-center my-2">
          {user.name} {user.lastName}
        </p>

        <p className="font-semibold text-center">{user.user.email}</p>
      </div>
    </div>
  );
};

export default Settings;
