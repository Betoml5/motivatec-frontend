import PropTypes from "prop-types";

const Students = ({ students }) => {
  return (
    <div>
      {students.map((student) => {
        return (
          <div key={student.id}>
            <h1>{student.name}</h1>
            <h1>{student.lastName}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Students;
