import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>StudentDetails</div>;
};

export default StudentDetails;
