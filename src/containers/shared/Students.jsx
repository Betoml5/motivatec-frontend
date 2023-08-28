import { PiStudentLight } from "react-icons/pi";
import SmallSpinner from "../../components/loading/SmallSpinner";
import PropTypes from "prop-types";
const Students = ({ students, isLoading, isError }) => {
  if (isLoading) return <SmallSpinner />;
  if (isError) return <p>Ha ocurrido un error</p>;

  return (
    <>
      {students?.length === 0 ? (
        <p>No tienes estudiantes asignados</p>
      ) : (
        students.map((student) => (
          <div
            key={student.id}
            className="flex justify-between shadow-md items-center   bg-white p-4 rounded-md my-4"
          >
            <div className="flex">
              <PiStudentLight size={25} className="mr-3" />
              <p>
                {student.name} {student.lastName}
              </p>
            </div>

            <p>{student.group.name}</p>
          </div>
        ))
      )}
    </>
  );
};

Students.propTypes = {
  students: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Students;
