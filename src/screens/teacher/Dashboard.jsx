import { useQuery } from "react-query";
import Spinner from "../loading/Spinner";
import useUser from "../../hooks/useUser";
import { getRandomAdviceAPI } from "../../services/advice";
import { getStudentsAPI } from "../../services/student";
import { getPostsAPI } from "../../services/post";
import Post from "../../components/forum/Post";
const Dashboard = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery("advice", getRandomAdviceAPI, {
    refetchOnWindowFocus: false,
  });
  const { data: students, isLoading: isLoadingStudents } = useQuery(
    "students",
    getStudentsAPI
  );

  const { data: posts, isLoading: isLoadingPosts } = useQuery("posts", () =>
    getPostsAPI({ limit: 5 })
  );

  if (!user) return <Spinner />;
  return (
    <div className="dashboard md:mx-20 md:my-6">
      <h2 className="text-2xl">Bienvenido, {user.name}</h2>

      <div className="dashboard__container grid grid-cols-1 md:grid-cols-8 md:gap-4">
        <div className="md:col-span-4 lg:col-span-2">
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

        <div className="my-4 md:col-span-4 md:m-0 lg:col-span-3">
          <h3 className="text-xl">Tus estudiantes</h3>
          {isLoadingStudents ? (
            <p>Cargando...</p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between text-white bg-blue-500 p-4 rounded-md my-4"
              >
                <p>
                  {student.name} {student.lastName}
                </p>
                <p>{student.group.name}</p>
              </div>
            ))
          )}
        </div>
        <div className="md:col-span-full lg:col-span-5 lg:col-start-6">
          <h3 className="text-xl">Ultimos posts</h3>
          <div>
            {isLoadingPosts ? (
              <p>Cargando...</p>
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
