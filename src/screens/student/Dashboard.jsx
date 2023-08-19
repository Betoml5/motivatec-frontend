import Spinner from "../loading/Spinner";
import useUser from "../../hooks/useUser";
import Posts from "../../containers/forum/Posts";
import { useQuery } from "react-query";
import { getRandomAdviceAPI } from "../../services/advice";
import { getPostsAPI } from "../../services/post";
import DailySurvey from "../../components/student/DailySurvey";
import Articles from "../../containers/shared/Articles";

const Dashboard = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery("advice", getRandomAdviceAPI, {
    refetchOnWindowFocus: false,
  });

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery("posts", () => getPostsAPI({ pageNumber: 1, pageSize: 5 }));

  if (!user) return <Spinner />;
  return (
    <div className="dashboard md:mx-20 md:my-6">
      <h2 className="text-2xl">Bienvenido/a, {user.name}</h2>

      <div className="dashboard__container grid grid-cols-1 md:grid-cols-8 md:gap-4">
        <div className="md:col-span-4 lg:col-span-4 xl:col-span-2">
          <h3 className="mt-4 md:m-0 text-xl">Consejo rapido: </h3>
          <div className="bg-[#393E46] p-4 rounded-md text-white my-4 ">
            <p>{isLoading ? "Cargando..." : `"${data.slip.advice}"`}</p>
          </div>
          <Articles />
        </div>
        <div className="col-span-4 border lg:col-span-4 xl:col-span-2 ">
          <DailySurvey />
        </div>
        <div className="my-4 md:m-0 md:col-span-full lg:col-span-full  xl:col-span-4 ">
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
