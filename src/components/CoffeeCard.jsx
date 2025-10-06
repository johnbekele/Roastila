import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const { width: screenWidth } = Dimensions.get("window");

const CoffeeCard = ({
  coffee,
  onPress,
  image = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop",
  name = "Ethiopian Yirgacheffe",
  origin = "Yirgacheffe, Ethiopia",
  price = "€45.00",
  rating = 4.8,
  reviews = 127,
  processing = "Washed",
  altitude = "1,800-2,200m",
  flavorNotes = ["Floral", "Citrus", "Tea-like"],
  availability = "In Stock",
  ...props
}) => {
  const { theme } = useTheme();
  const coffeeData = coffee || {
    image,
    name,
    origin,
    price,
    rating,
    reviews,
    processing,
    altitude,
    flavorNotes,
    availability,
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(coffeeData)}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.sm,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      {...props}
    >
      <View className="flex-row">
        {/* Coffee Image */}
        <View
          className="relative"
          style={{
            width: screenWidth < 400 ? 100 : screenWidth < 500 ? 120 : 140,
            height: screenWidth < 400 ? 100 : screenWidth < 500 ? 120 : 140,
          }}
        >
          <Image
            source={{ uri: coffeeData.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded-full">
            <Text className="text-xs font-medium text-green-600">
              {coffeeData.availability}
            </Text>
          </View>
        </View>

        {/* Coffee Details */}
        <View className="flex-1 p-3">
          {/* Name and Rating */}
          <View className="flex-row justify-between items-start mb-2">
            <Text
              style={{
                fontSize:
                  screenWidth < 400
                    ? theme.typography.fontSize.sm
                    : theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                flex: 1,
                marginRight: theme.spacing.sm,
              }}
              numberOfLines={2}
            >
              {coffeeData.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-amber-500 text-sm">⭐</Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.textSecondary,
                  marginLeft: theme.spacing.xs,
                }}
              >
                {coffeeData.rating}
              </Text>
            </View>
          </View>

          {/* Origin and Producer */}
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
            numberOfLines={1}
          >
            🌍 {coffeeData.origin}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
            numberOfLines={1}
          >
            Producer: {coffeeData.producer || "Ethiopian Co-op"}
          </Text>

          {/* Processing and Certification */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm text-gray-500">
              {coffeeData.processing} • {coffeeData.altitude}
            </Text>
            <Text className="text-sm text-green-600 font-medium">
              {coffeeData.certification || "Organic"}
            </Text>
          </View>

          {/* Flavor Notes */}
          <View className="flex-row flex-wrap mb-3">
            {coffeeData.flavorNotes.slice(0, 4).map((note, index) => (
              <View
                key={index}
                className="bg-amber-100 px-2 py-1 rounded-full mr-1 mb-1"
              >
                <Text className="text-xs text-amber-700 font-medium">
                  {note}
                </Text>
              </View>
            ))}
            {coffeeData.flavorNotes.length > 4 && (
              <View className="bg-gray-100 px-2 py-1 rounded-full">
                <Text className="text-xs text-gray-600 font-medium">
                  +{coffeeData.flavorNotes.length - 4}
                </Text>
              </View>
            )}
          </View>

          {/* Price and Actions */}
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-xl font-bold text-amber-600">
                {coffeeData.price}
              </Text>
              <Text className="text-xs text-gray-500">
                Min Qty: 50kg • {coffeeData.quantity}kg available
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className={`bg-green-600 ${screenWidth < 400 ? "px-2 py-1.5" : "px-4 py-2"} rounded-lg mr-2 shadow-sm`}
              >
                <Text
                  className={`text-white font-semibold ${screenWidth < 400 ? "text-xs" : "text-sm"}`}
                >
                  Quote
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-blue-600 ${screenWidth < 400 ? "px-2 py-1.5" : "px-4 py-2"} rounded-lg shadow-sm`}
              >
                <Text
                  className={`text-white font-semibold ${screenWidth < 400 ? "text-xs" : "text-sm"}`}
                >
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoffeeCard;
