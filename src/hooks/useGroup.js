import { useQuery } from "react-query";
import { getGroupsAPI } from "../services/group";

const useGroups = () => {
  const {
    data: groups,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useQuery("groups", getGroupsAPI);

  return { groups, isGroupsLoading, isGroupsError };
};

export default useGroups;
