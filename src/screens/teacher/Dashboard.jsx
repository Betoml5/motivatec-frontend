import { HiQuestionMarkCircle } from "react-icons/hi";
import Spinner from "../loading/Spinner";
import Articles from "../../containers/shared/Articles";
import Posts from "../../containers/forum/Posts";
import useUser from "../../hooks/useUser";
import { useQuery } from "react-query";
import { getRandomAdviceAPI } from "../../services/advice";
import { getStudentsAPI } from "../../services/student";
import { getPostsAPI } from "../../services/post";
import { getDailyAPI } from "../../services/statistics";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import Students from "../../containers/shared/Students";
const Dashboard = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery("advice", getRandomAdviceAPI, {
    refetchOnWindowFocus: false,
  });
  const {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = useQuery("students", () => getStudentsAPI({ limit: 5 }));

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery("posts", () => getPostsAPI({ pageSize: 5 }));

  const { data: dailySurvey } = useQuery("dailySurvey", getDailyAPI);

  const dataRadar = dailySurvey?.map((item) => {
    return {
      emocion: item.emotion,
      total: item.total,
      fullMark: 150,
    };
  });

  if (!user) return <Spinner />;

  return (
    <div className="dashboard md:mx-20 md:my-6">
      <h2 className="text-2xl">Bienvenido/a, {user.name}</h2>
      <div className="dashboard__container grid grid-cols-1 md:grid-cols-8 md:gap-4">
        <div className="md:col-span-4 lg:col-span-2">
          <h3 className="mt-4 md:m-0 text-xl">Consejo rapido: </h3>
          <div className="bg-[#393E46] p-4 rounded-md text-white my-4 shadow-md">
            <p>{isLoading ? "Cargando..." : `"${data.slip.advice}"`}</p>
          </div>
          <Articles />
          <div className="flex items-center">
            <p className="text-lg my-4 mr-2">Emociones de tus estudiantes </p>
            <HiQuestionMarkCircle
              size={20}
              color="#999999"
              title="El grafico muestra las emociones de tus estudiantes en la ultima encuesta diaria."
            />
          </div>
          <div className="bg-white rounded-md py-4 shadow-md mt-4">
            {dailySurvey?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" aspect={2}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={dataRadar}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="emocion" />
                  <PolarRadiusAxis />
                  <Radar
                    name="total"
                    dataKey="total"
                    stroke="#6aa6f9"
                    fill="#6aa6f9"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center">No hay datos para mostrar</p>
            )}
          </div>
        </div>

        <div className="my-4 md:col-span-4 md:m-0 lg:col-span-3">
          <Students
            students={students}
            isLoading={isLoadingStudents}
            isError={isErrorStudents}
          />
        </div>
        <div className="md:col-span-full lg:col-span-5 lg:col-start-6">
          <Posts
            posts={posts}
            isLoading={isLoadingPosts}
            isError={isErrorPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
