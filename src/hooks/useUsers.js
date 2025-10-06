import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../config/axiosConfig";

const fetchUsers = async () => {
  const response = await apiClient.get("users");

  console.log("Users fetched:", response.data);
  return response.data;
};

const createUser = async (user) => {
  const response = await apiClient.post("users/signup", user);
  return response.data;
};

const resetPassword = async (email) => {
  const response = await apiClient.post("users/reset-password", { email });
  return response.data;
};

const updateUser = async ({ id, userData }) => {
  const response = await apiClient.put(`users/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await apiClient.delete(`users/${id}`);
  return response.data;
};

export function useUsers() {
  const queryClient = useQueryClient();

  const UserQuery = useQuery({
    queryKey: ["Users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 300000,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      console.error("Error resetting password:", error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  return {
    // Query data
    users: UserQuery.data || [],
    isLoading: UserQuery.isLoading,
    isError: UserQuery.isError,
    refetch: UserQuery.refetch,
    error: UserQuery.error,

    // Mutations
    createUser: createUserMutation.mutate,
    createUserAsync: createUserMutation.mutateAsync,
    isCreatingUser: createUserMutation.isPending,
    createUserError: createUserMutation.error,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    isResettingPassword: resetPasswordMutation.isPending,
    resetPasswordError: resetPasswordMutation.error,

    updateUser: updateUserMutation.mutate,
    updateUserAsync: updateUserMutation.mutateAsync,
    isUpdatingUser: updateUserMutation.isPending,
    updateUserError: updateUserMutation.error,

    deleteUser: deleteUserMutation.mutate,
    deleteUserAsync: deleteUserMutation.mutateAsync,
    isDeletingUser: deleteUserMutation.isPending,
    deleteUserError: deleteUserMutation.error,
  };
}
