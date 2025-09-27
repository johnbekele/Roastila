import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_URL } from "../config/EnvConfig";
import { useAuth } from "../hooks/useAuth";

export default function ChatComponent() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("User:", user);
  console.log("Prompt:", prompt);

  const chatMutation = useMutation({
    mutationFn: async (promptText) => {
      const response = await axios.post(
        `${API_URL}/genai/generate-response`,
        { username: user?.username, prompt: promptText },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Append AI response
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data?.response?.message || "No response" },
      ]);
    },
  });

  const handleSend = async () => {
    if (!prompt.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);

    // Send to AI
    chatMutation.mutate(prompt);

    setPrompt(""); // Clear input
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View className="flex-1 p-4">
        <ScrollView
          className="flex-1 mb-4"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 self-end"
                  : "bg-white self-start"
              }`}
            >
              <Text
                className={`${
                  msg.sender === "user" ? "text-white" : "text-gray-800"
                } text-base`}
              >
                {(msg.text || "").split("\n").map((line, i) => (
                  <Text key={i}>
                    {line}
                    {"\n"}
                  </Text>
                ))}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row items-center">
          <TextInput
            className="flex-1 bg-white p-3 rounded-lg border border-gray-300"
            placeholder="Type a message..."
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            className="ml-2 bg-blue-500 p-3 rounded-lg"
            onPress={handleSend}
            disabled={chatMutation.isLoading}
          >
            <Text className="text-white font-bold">
              {chatMutation.isLoading ? "..." : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
