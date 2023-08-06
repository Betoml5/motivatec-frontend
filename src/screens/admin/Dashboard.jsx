import { useQuery } from "react-query";
import { getConfigAPI } from "../../services/config";
import { formatPhoneNumber } from "../../utils/formats";
import { Link } from "react-router-dom";
import Spinner from "../loading/Spinner";

const Dashboard = () => {
  const {
    data: config,
    error: configError,
    isLoading: configLoading,
  } = useQuery("config", getConfigAPI);

  if (configLoading) return <Spinner />;
  if (configError) return <div>Error al obtener los datos de la escuela</div>;
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-md  py-10 px-16 md:my-4">
      <h2 className="text-2xl">{config.schoolName}</h2>
      <section className="grid-cols-1">
        <div>
          <p>{config.schoolAddress}</p>
          <p>{formatPhoneNumber(config.schoolPhone)}</p>
          <p>{config.scholEmail}</p>
          <Link className="underline text-blue-600" to="/admin/settings">
            Editar datos
          </Link>
        </div>
        <div
          className={`
          py-4 my-4  rounded-md shadow-md text-white text-center 
          ${config.status ? "bg-green-500" : "bg-red-500"}
        `}
        >
          {config.status
            ? "Tu suscripción esta activa "
            : "Tu suscripción esta inactiva"}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
