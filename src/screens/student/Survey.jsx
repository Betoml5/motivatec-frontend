import { useState } from "react";
import { questions } from "../../utils/questions";
import { useMutation, useQuery } from "react-query";
import { checkIsSurveyDoneAPI, createResultAPI } from "../../services/result";
import { validateSurvey } from "../../utils/validations";
import { toast } from "react-toastify";
import Spinner from "../../screens/loading/Spinner";
import Questions from "../../containers/Questions";

const Survey = () => {
  const { data, isLoading, isError } = useQuery(
    "checkSurvey",
    checkIsSurveyDoneAPI
  );

  const [repliedQuestions, setRepliedQuestions] = useState([]);
  const { mutate } = useMutation(
    "createSurvey",
    (data) => createResultAPI(data),
    {
      onSuccess: () => {
        setRepliedQuestions([]);
        toast.success("Encuesta enviada con exito");
      },
      onError: () => {
        toast.error("Error al enviar la encuesta");
      },
    }
  );

  const onSelect = (question, value) => {
    //Si esa pregunta ya existe en el array de resultados entonces actualizar el valor
    //Si no existe entonces agregarlo al array de resultados
    const index = repliedQuestions.findIndex(
      (item) => item.question.id === question.id
    );
    if (index !== -1) {
      //Si ya existia actualiza el valor
      setRepliedQuestions((repliedQuestions) => {
        const newRepliedQuestions = [...repliedQuestions];
        newRepliedQuestions[index].value = value;
        return newRepliedQuestions;
      });
    } else {
      //Si no existia entonces agregarlo
      setRepliedQuestions((repliedQuestions) => [
        ...repliedQuestions,
        { question: question, value },
      ]);
    }
  };

  const onSubmit = () => {
    if (validateSurvey(repliedQuestions)) {
      mutate(repliedQuestions);
      return;
    }
    toast.info("Por favor responde todas las preguntas");
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error</div>;

  if (data.isDone) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl  my-20">
          Ya has realizado la encuesta, gracias por contestar
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Questions
        questions={questions}
        onSelect={onSelect}
        repliedQuestions={repliedQuestions}
        setRepliedQuestions={setRepliedQuestions}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Survey;
