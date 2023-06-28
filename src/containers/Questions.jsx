import PropTypes from "prop-types";

const Questions = ({ questions, replyTypes, repliedQuestions, onSelect }) => {
  return (
    <div className="p-4">
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
                className="flex"
                key={reply.id}
              >
                <p>{reply.value}</p>
                <p className={`${isSelected && "bg-red-500"}`}>
                  {reply.description}
                </p>
              </button>
            );
          })}
        </div>
      ))}
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
