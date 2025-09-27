import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/EnvConfig";

// Fetch chat response from backend using POST
const fetchChat = async ({ queryKey }) => {
  const [, { username, prompt }] = queryKey;
  console.log("Fetching chat:", prompt);
  console.log("Username:", username);
  if (!prompt || !username) {
    throw new Error("Missing username or prompt");
  }
  const response = await axios.post(
    `${API_URL}/genai/generate-response`,
    { username: username, prompt: prompt },
    { headers: { "Content-Type": "application/json" } }
  );

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
