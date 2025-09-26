import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/EnvConfig";

const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  console.log("Users fetched:", response.data);
  return response.data;
};

export function useUsers() {
  const UserQuery = useQuery({
    queryKey: ["Users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 300000,
  });

  return {
    users: UserQuery.data || [],
    isLoading: UserQuery.isLoading,
    isError: UserQuery.isError,
    refetch: UserQuery.refetch,
    error: UserQuery.error,
  };
}
