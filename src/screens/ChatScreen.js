import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";

// Thinking Tile Component (same as before)
const ThinkingTile = () => {
  const [dots, setDots] = useState("");
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      clearInterval(interval);
      pulseAnimation.stop();
    };
  }, [fadeAnim]);

  return (
    <View className="mb-3 p-4 rounded-lg max-w-[80%] bg-white self-start shadow-sm">
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-amber-100 rounded-full items-center justify-center mr-3">
          <Text className="text-amber-600 text-lg">🤖</Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-600 text-sm font-medium mb-2">
            AI is thinking{dots}
          </Text>
          <View className="flex-row space-x-1">
            <Animated.View
              className="w-2 h-2 bg-amber-400 rounded-full"
              style={{ opacity: fadeAnim }}
            />
            <Animated.View
              className="w-2 h-2 bg-amber-400 rounded-full"
              style={{
                opacity: fadeAnim,
                transform: [{ translateX: 8 }],
              }}
            />
            <Animated.View
              className="w-2 h-2 bg-amber-400 rounded-full"
              style={{
                opacity: fadeAnim,
                transform: [{ translateX: 16 }],
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default function ChatComponent() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState("");

  // Use the existing useChat hook instead of useMutation
  const { data, isLoading, isError, error } = useChat(
    user?.username,
    currentPrompt
  );

  console.log("🔍 [CHAT] Chat state:", {
    isLoading,
    isError,
    data: data ? "EXISTS" : "NULL",
    currentPrompt,
  });

  // Handle successful response
  useEffect(() => {
    if (data && currentPrompt) {
      console.log("📥 [CHAT] Processing AI response");
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data?.response?.message || "No response" },
      ]);
      setCurrentPrompt(""); // Clear to prevent re-triggering
    }
  }, [data, currentPrompt]);

  // Handle error
  useEffect(() => {
    if (isError && currentPrompt) {
      console.log("❌ [CHAT] AI error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setCurrentPrompt(""); // Clear to prevent re-triggering
    }
  }, [isError, error, currentPrompt]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    console.log("📤 [CHAT] User sending message:", prompt);

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);

    // Set current prompt to trigger the useChat hook
    setCurrentPrompt(prompt);

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
              {msg.sender === "ai" && (
                <View className="flex-row items-center mb-2">
                  <View className="w-6 h-6 bg-amber-100 rounded-full items-center justify-center mr-2">
                    <Text className="text-amber-600 text-sm">🤖</Text>
                  </View>
                  <Text className="text-gray-500 text-xs font-medium">
                    Roastila AI Assistant
                  </Text>
                </View>
              )}
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

          {/* Show thinking tile when AI is responding */}
          {isLoading && currentPrompt && (
            <>
              {console.log(
                "🤔 [CHAT] Rendering thinking tile - isLoading:",
                isLoading
              )}
              <ThinkingTile />
            </>
          )}
        </ScrollView>

        <View className="flex-row items-center">
          <TextInput
            className="flex-1 bg-white p-3 rounded-lg border border-gray-300"
            placeholder="Ask about coffee trading, quality, or logistics..."
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            className={`ml-2 p-3 rounded-lg ${
              isLoading ? "bg-gray-400" : "bg-blue-500"
            }`}
            onPress={handleSend}
            disabled={isLoading || !prompt.trim()}
          >
            <Text className="text-white font-bold">
              {isLoading ? "..." : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
