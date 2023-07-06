import { useQuery } from "react-query";
import { getStudentsAPI } from "../../services/student";
import { getPostsAPI } from "../../services/post";

const Dashboard = () => {
  const {
    data: students,
    error: studentsError,
    isLoading: studentsLoading,
  } = useQuery("students", getStudentsAPI);

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useQuery("posts", getPostsAPI);

  return <div>
    
  </div>;
};

export default Dashboard;
