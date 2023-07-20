import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getStudentAPI } from "../../services/student";
const Edit = () => {
  const { id } = useParams();
  const { data: student } = useQuery("student", getStudentAPI(id));
  console.log(student);
  return <div>Edit</div>;
};

export default Edit;
