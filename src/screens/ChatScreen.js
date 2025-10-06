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
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";

// Thinking Tile Component (same as before)
const ThinkingTile = () => {
  const [dots, setDots] = useState("");
  const fadeAnim = useRef(new Animated.Value(0.3)).current;
  const { theme } = useTheme();

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
    <View
      style={{
        marginBottom: theme.spacing.sm,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        maxWidth: "80%",
        backgroundColor: theme.colors.surface,
        alignSelf: "flex-start",
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: theme.colors.secondaryLight,
            borderRadius: theme.borderRadius.full,
            alignItems: "center",
            justifyContent: "center",
            marginRight: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              color: theme.colors.secondary,
              fontSize: theme.typography.fontSize.lg,
            }}
          >
            🤖
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              marginBottom: theme.spacing.sm,
            }}
          >
            AI is thinking{dots}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Animated.View
              style={{
                width: 8,
                height: 8,
                backgroundColor: theme.colors.secondary,
                borderRadius: theme.borderRadius.full,
                opacity: fadeAnim,
              }}
            />
            <Animated.View
              style={{
                width: 8,
                height: 8,
                backgroundColor: theme.colors.secondary,
                borderRadius: theme.borderRadius.full,
                opacity: fadeAnim,
                transform: [{ translateX: 8 }],
              }}
            />
            <Animated.View
              style={{
                width: 8,
                height: 8,
                backgroundColor: theme.colors.secondary,
                borderRadius: theme.borderRadius.full,
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
  const { theme } = useTheme();
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
      style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={{ flex: 1, padding: theme.spacing.md }}>
        <ScrollView
          style={{ flex: 1, marginBottom: theme.spacing.md }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={{
                marginBottom: theme.spacing.sm,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
                maxWidth: "80%",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  msg.sender === "user"
                    ? theme.colors.primary
                    : theme.colors.surface,
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {msg.sender === "ai" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: theme.colors.secondaryLight,
                      borderRadius: theme.borderRadius.full,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: theme.spacing.sm,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.secondary,
                        fontSize: theme.typography.fontSize.sm,
                      }}
                    >
                      🤖
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.medium,
                    }}
                  >
                    Roastila AI Assistant
                  </Text>
                </View>
              )}
              <Text
                style={{
                  color:
                    msg.sender === "user"
                      ? theme.colors.textInverse
                      : theme.colors.text,
                  fontSize: theme.typography.fontSize.base,
                }}
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

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: theme.colors.surface,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              borderWidth: 1,
              borderColor: theme.colors.border,
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.sm,
            }}
            placeholder="Ask about coffee trading, quality, or logistics..."
            placeholderTextColor={theme.colors.textTertiary}
            value={prompt}
            onChangeText={setPrompt}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={{
              marginLeft: theme.spacing.sm,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: isLoading
                ? theme.colors.textSecondary
                : theme.colors.primary,
            }}
            onPress={handleSend}
            disabled={isLoading || !prompt.trim()}
          >
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              {isLoading ? "..." : "Send"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
