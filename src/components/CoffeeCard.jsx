import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
      className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden active:bg-gray-50"
      {...props}
    >
      {/* Coffee Image */}
      <View className="relative">
        <Image
          source={{ uri: coffeeData.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full">
          <Text className="text-xs font-semibold text-green-600">
            {coffeeData.availability}
          </Text>
        </View>
      </View>

      {/* Coffee Details */}
      <View className="p-4">
        {/* Name and Rating */}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
            {coffeeData.name}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-amber-500 text-sm">⭐</Text>
            <Text className="text-sm font-semibold text-gray-700 ml-1">
              {coffeeData.rating}
            </Text>
            <Text className="text-xs text-gray-500 ml-1">
              ({coffeeData.reviews})
            </Text>
          </View>
        </View>

        {/* Origin */}
        <Text className="text-sm text-gray-600 mb-2">
          🌍 {coffeeData.origin}
        </Text>

        {/* Processing and Altitude */}
        <View className="flex-row justify-between mb-3">
          <Text className="text-xs text-gray-500">
            Processing: {coffeeData.processing}
          </Text>
          <Text className="text-xs text-gray-500">
            Altitude: {coffeeData.altitude}
          </Text>
        </View>

        {/* Flavor Notes */}
        <View className="flex-row flex-wrap mb-3">
          {coffeeData.flavorNotes.map((note, index) => (
            <View
              key={index}
              className="bg-amber-100 px-2 py-1 rounded-full mr-2 mb-1"
            >
              <Text className="text-xs text-amber-700 font-medium">{note}</Text>
            </View>
          ))}
        </View>

        {/* Price and Action */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-amber-600">
            {coffeeData.price}
          </Text>
          <TouchableOpacity className="bg-amber-500 px-4 py-2 rounded-lg active:bg-amber-600">
            <Text className="text-white font-semibold text-sm">
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoffeeCard;
