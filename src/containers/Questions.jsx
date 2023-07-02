import PropTypes from "prop-types";
import { replyTypes } from "../utils/replyType";
const Questions = ({ questions, repliedQuestions, onSelect }) => {
  return (
    <div className="bg-white max-w-3xl mx-auto rounded-md p-6 my-4 ">
      <section className="text-black mb-4">
        <section className="bg-secondary text-white rounded-lg p-4">
          <h2 className="text-xl font-bold">SIGNIFICADO DE LOS NÚMEROS.</h2>
          <p className="italic text-lg mb-3">
            {" "}
            La razón de la cuestión se corresponde con mi opinión personal.
          </p>

          <section className="flex flex-wrap   text-xs  gap-x-4 gap-y-2">
            {replyTypes.map((level) => (
              <div
                key={level.id}
                className="flex  items-center   w-1/6 py-1 mr-8  rounded-sm   "
              >
                <p className=" flex justify-center items-center bg-white text-black  border-white   font-semibold  w-8 h-8 px-[14px] py-1 rounded-full ">
                  {level.value}
                </p>
                <p className="font-semibold ml-1 ">{level.description}</p>
              </div>
            ))}
          </section>
        </section>
      </section>
      {questions.map((question) => (
        <div key={question.id}>
          {question.id}.- {question.question}
          {replyTypes.map((reply) => {
            const isSelected = repliedQuestions.find(
              (result) =>
                result.question.id === question.id &&
                result.value === reply.value
            );
            return (
              <button
                onClick={() => onSelect(question, reply.value)}
                className="flex items-center my-2"
                key={reply.id}
              >
                <p className="flex items-center justify-center text-white bg-secondary rounded-full p-2 h-8 w-8 mr-2">
                  {reply.value}
                </p>
                <p className={`${isSelected && "underline"}`}>
                  {reply.description}
                </p>
              </button>
            );
          })}
        </div>
      ))}
      <button className="bg-secondary text-white rounded-md p-2 hover:opacity-90">
        Enviar resultados
      </button>
    </div>
  );
};

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
    })
  ).isRequired,
  replyTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  repliedQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Questions;
