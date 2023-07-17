import Spinner from "../loading/Spinner";
import useUser from "../../hooks/useUser";
import Post from "../../components/forum/Post";
import SmallSpinner from "../../components/loading/SmallSpinner";

import { useMutation, useQuery } from "react-query";
import { getRandomAdviceAPI } from "../../services/advice";
import { getPostsAPI } from "../../services/post";
import {
  checkIsSurveyDoneAPI,
  createDailySurveyAPI,
} from "../../services/dailySurvey";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery("advice", getRandomAdviceAPI, {
    refetchOnWindowFocus: false,
  });
  const { data: survey, refetch: refetchDailySurvey } = useQuery(
    "surveyDone",
    checkIsSurveyDoneAPI
  );
  const { data: posts, isLoading: isLoadingPosts } = useQuery("posts", () =>
    getPostsAPI({ limit: 5 })
  );
  const { mutate: sendDailySurvey } = useMutation("survey", (survey) =>
    createDailySurveyAPI(survey)
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    sendDailySurvey(data);
    refetchDailySurvey();
  };

  if (!user) return <Spinner />;
  return (
    <div className="dashboard md:mx-20 md:my-6">
      <h2 className="text-2xl">Bienvenido, {user.name}</h2>

      <div className="dashboard__container grid grid-cols-1 md:grid-cols-8 md:gap-4">
        <div className="md:col-span-4 lg:col-span-4 xl:col-span-2">
          <h3 className="mt-4 md:m-0 text-xl">Consejo rapido: </h3>
          <div className="bg-[#393E46] p-4 rounded-md text-white my-4 ">
            <p>{isLoading ? "Cargando..." : `"${data.slip.advice}"`}</p>
          </div>
          <div className="flex flex-col gap-y-3">
            <h3 className="text-2xl mt-4 md:m-0">
              Sobre motivacion estudiantil:
            </h3>
            <div className="bg-red-300 p-4 rounded-md">
              <a
                className="underline"
                href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjox-z2g_T_AhVYIUQIHQJuDzcQFnoECBIQAQ&url=https%3A%2F%2Fwww.flup.es%2Fimportancia-motivacion-estudiantes%2F&usg=AOvVaw2ew890521DHakkjJk1s8Iw&opi=89978449"
              >
                La importancia de la motivacion en los estudiantes{" "}
              </a>
            </div>
            <div className="bg-purple-300 p-4 rounded-md">
              <a
                className="underline"
                href="https://uchile.cl/presentacion/centro-de-aprendizaje-campus-sur/Material-Autorregulacion-Emocional/reconocer-prevenir-y-afrontar-el-estres-academico"
              >
                Reconocer, prevenir y afrontar el estrés académico
              </a>
            </div>
            <div className="bg-yellow-300  p-4 rounded-md">
              <a
                className="underline"
                href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjz6IDhhvT_AhV5C0QIHdWVCYkQFnoECBEQAQ&url=https%3A%2F%2Fwww.enriccorberainstitute.com%2Fblog%2Fmotivacion-en-los-estudiantes%2F&usg=AOvVaw2HB8bhbwPGnVrIBwcGSpFK&opi=89978449"
              >
                La motivación en los estudiantes: 3 Claves para aumentarla
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-4 border lg:col-span-4 xl:col-span-2 ">
          <h3 className="text-xl my-4 md:my-0 md:mb-4">
            ¿Comó te sientes hoy?
          </h3>

          {survey?.isDone && (
            <div className="bg-green-300 p-4 rounded-md my-4">
              <p>Ya has realizado la encuesta de hoy</p>
            </div>
          )}

          <form
            className={`${survey?.isDone && "opacity-80"}`}
            defaultValue={survey?.emotion}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-2 bg-yellow-300 p-4 rounded-md">
                <input
                  disabled={survey?.isDone}
                  type="radio"
                  name="feeling"
                  id="happy"
                  value="happy"
                  checked={survey?.emotion === "happy"}
                  {...register("emotion", { required: true })}
                />
                <label htmlFor="happy">Feliz</label>
              </div>
              <div className="flex items-center gap-x-2 bg-purple-300 p-4 rounded-md">
                <input
                  disabled={survey?.isDone}
                  type="radio"
                  name="feeling"
                  id="sad"
                  value="sad"
                  checked={survey?.emotion === "sad"}
                  {...register("emotion", { required: true })}
                />
                <label htmlFor="sad">Triste</label>
              </div>
              <div className="flex items-center gap-x-2 bg-red-300 p-4 rounded-md">
                <input
                  disabled={survey?.isDone}
                  type="radio"
                  name="feeling"
                  id="angry"
                  value="angry"
                  checked={survey?.emotion === "angry"}
                  {...register("emotion", { required: true })}
                />
                <label htmlFor="angry">Enojado</label>
              </div>
              <div className="flex items-center gap-x-2 bg-gray-400 p-4 rounded-md">
                <input
                  disabled={survey?.isDone}
                  type="radio"
                  name="feeling"
                  id="tired"
                  value="tired"
                  checked={survey?.emotion === "tired"}
                  {...register("emotion", { required: true })}
                />
                <label htmlFor="tired">Cansado</label>
              </div>
              <div className="flex items-center gap-x-2 bg-blue-400 p-4 rounded-md">
                <input
                  type="radio"
                  name="feeling"
                  id="anxious"
                  value="anxious"
                  checked={survey?.emotion === "anxious"}
                  {...register("emotion", { required: true })}
                />
                <label htmlFor="anxious">Ansioso</label>
              </div>
            </div>
            <button
              disabled={survey?.isDone}
              className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>

        <div className="my-4 md:m-0 md:col-span-full lg:col-span-full  xl:col-span-4 ">
          <h3 className="text-xl">Ultimos posts</h3>
          <div>
            {posts?.length === 0 ? (
              <p className="mt-4">No hay posts para mostrar</p>
            ) : isLoadingPosts ? (
              <SmallSpinner />
            ) : (
              posts.map((post) => <Post key={post.id} post={post} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
