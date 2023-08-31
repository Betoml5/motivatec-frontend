import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  return <div>StudentDetails</div>;
};

export default StudentDetails;
