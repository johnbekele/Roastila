import { useQuery } from "@tanstack/react-query";
import apiClient from "../config/axiosConfig";

// Fetch chat response from backend using POST
const fetchChat = async ({ queryKey }) => {
  const [, { username, prompt }] = queryKey;
  console.log("Fetching chat:", prompt);
  console.log("Username:", username);
  if (!prompt || !username) {
    throw new Error("Missing username or prompt");
  }
  const response = await apiClient.post("genai/generate-response", {
    username: username,
    prompt: prompt,
  });

  console.log("Chat response:", response.data);
  return response.data;
};

export function useChat(username, prompt) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Ai", { username, prompt }],
    queryFn: fetchChat,
    enabled: !!prompt, // Only fetch if prompt exists
  });

  return {
    data,
    messages: data?.response?.message || "",
    schedule: data?.response?.schedule || [],
    isLoading,
    isError,
    error,
  };
}
