import { questions } from "../../utils/questions";
import { replyTypes } from "../../utils/replyType";

import Questions from "../../containers/Questions";
import { useState } from "react";
const Survey = () => {
  const [repliedQuestions, setRepliedQuestions] = useState([]);

  // const params = new URLSearchParams(window.location.search);
  // const groupId = params.get("groupId");
  // const teacherId = params.get("teacherId");

  const onSelect = (question, value) => {
    console.log(question, value);
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

  return (
    <div>
      <h1>Survey</h1>

      <Questions
        questions={questions}
        replyTypes={replyTypes}
        onSelect={onSelect}
        repliedQuestions={repliedQuestions}
        setRepliedQuestions={setRepliedQuestions}
      />
    </div>
  );
};

export default Survey;
