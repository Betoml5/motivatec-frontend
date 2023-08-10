import { useMutation, useQuery } from "react-query";
import {
  checkIsSurveyDoneAPI,
  createDailySurveyAPI,
} from "../../services/dailySurvey";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const DailySurvey = () => {
  const { data: survey, refetch: refetchDailySurvey } = useQuery(
    "surveyDone",
    checkIsSurveyDoneAPI
  );
  const { mutate: sendDailySurvey } = useMutation(
    "survey",
    (survey) => createDailySurveyAPI(survey),
    {
      onSuccess: () => {
        toast.success("Encuesta enviada");
        refetchDailySurvey();
      },
      onError: () => {
        toast.error("Error al enviar la encuesta");
      },
    }
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
  return (
    <>
      <h3 className="text-xl my-4 md:my-0 md:mb-4">¿Comó te sientes hoy?</h3>

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
              defaultChecked={survey?.emotion === "happy"}
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
              defaultChecked={survey?.emotion === "sad"}
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
              defaultChecked={survey?.emotion === "angry"}
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
              defaultChecked={survey?.emotion === "tired"}
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
              defaultChecked={survey?.emotion === "anxious"}
              {...register("emotion", { required: true })}
            />
            <label htmlFor="anxious">Ansioso</label>
          </div>
        </div>
        {errors.emotion && (
          <p className="text-red-500 font-semibold mt-2">
            Selecciona una opción
          </p>
        )}
        <button
          disabled={survey?.isDone}
          className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </>
  );
};

export default DailySurvey;
