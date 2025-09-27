import React, { useState } from "react";
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FindProducersTab = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Mock producer data
  const producers = [
    {
      id: "producer-001",
      name: "Abebe Coffee Farm",
      location: "Yirgacheffe, Ethiopia",
      rating: 4.9,
      reviews: 156,
      verified: true,
      specialties: ["Yirgacheffe", "Washed", "Organic"],
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop",
      description: "Family-owned farm with 3 generations of coffee expertise",
      certifications: ["Organic", "Fair Trade"],
      established: "1985",
      totalCoffees: 12,
      avgRating: 4.8,
    },
    {
      id: "producer-002",
      name: "Kebede Family Farm",
      location: "Sidamo, Ethiopia",
      rating: 4.7,
      reviews: 89,
      verified: true,
      specialties: ["Sidamo", "Natural", "Washed"],
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop",
      description: "Sustainable farming practices with focus on quality",
      certifications: ["Fair Trade", "Rainforest Alliance"],
      established: "1992",
      totalCoffees: 8,
      avgRating: 4.6,
    },
    {
      id: "producer-003",
      name: "Harrar Coffee Cooperative",
      location: "Harrar, Ethiopia",
      rating: 4.5,
      reviews: 203,
      verified: true,
      specialties: ["Harrar", "Natural", "Longberry"],
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
      description: "Cooperative of 150+ smallholder farmers",
      certifications: ["Organic", "Fair Trade"],
      established: "1978",
      totalCoffees: 15,
      avgRating: 4.4,
    },
    {
      id: "producer-004",
      name: "Guji Highland Coffee",
      location: "Guji, Ethiopia",
      rating: 4.8,
      reviews: 127,
      verified: true,
      specialties: ["Guji", "Natural", "Honey"],
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop",
      description: "High-altitude specialty coffee producer",
      certifications: ["Organic", "Fair Trade", "Direct Trade"],
      established: "2001",
      totalCoffees: 6,
      avgRating: 4.7,
    },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleProducerPress = (producer) => {
    Alert.alert(
      producer.name,
      `${producer.description}\n\nLocation: ${producer.location}\nEstablished: ${producer.established}\nCertifications: ${producer.certifications.join(", ")}`,
      [
        { text: "Close", style: "cancel" },
        { text: "View Profile", onPress: () => console.log("View profile") },
        {
          text: "Contact Producer",
          onPress: () => console.log("Contact producer"),
        },
        { text: "View Coffees", onPress: () => console.log("View coffees") },
      ]
    );
  };

  const ProducerCard = ({ producer }) => (
    <TouchableOpacity
      onPress={() => handleProducerPress(producer)}
      className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden active:bg-gray-50"
    >
      {/* Producer Image */}
      <View className="relative">
        <Image
          source={{ uri: producer.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        {producer.verified && (
          <View className="absolute top-3 right-3 bg-green-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-semibold">✓ Verified</Text>
          </View>
        )}
      </View>

      {/* Producer Details */}
      <View className="p-4">
        {/* Name and Rating */}
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
            {producer.name}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-amber-500 text-sm">⭐</Text>
            <Text className="text-sm font-semibold text-gray-700 ml-1">
              {producer.rating}
            </Text>
            <Text className="text-xs text-gray-500 ml-1">
              ({producer.reviews})
            </Text>
          </View>
        </View>

        {/* Location */}
        <Text className="text-sm text-gray-600 mb-2">
          🌍 {producer.location}
        </Text>

        {/* Description */}
        <Text className="text-sm text-gray-700 mb-3">
          {producer.description}
        </Text>

        {/* Specialties */}
        <View className="flex-row flex-wrap mb-3">
          {producer.specialties.map((specialty, index) => (
            <View
              key={index}
              className="bg-green-100 px-2 py-1 rounded-full mr-2 mb-1"
            >
              <Text className="text-xs text-green-700 font-medium">
                {specialty}
              </Text>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View className="flex-row flex-wrap mb-3">
          {producer.certifications.map((cert, index) => (
            <View
              key={index}
              className="bg-blue-100 px-2 py-1 rounded-full mr-2 mb-1"
            >
              <Text className="text-xs text-blue-700 font-medium">{cert}</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500 mr-4">
              Est. {producer.established}
            </Text>
            <Text className="text-xs text-gray-500">
              {producer.totalCoffees} coffees
            </Text>
          </View>
          <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg active:bg-green-600">
            <Text className="text-white font-semibold text-sm">Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-1">
          Find Producers
        </Text>
        <Text className="text-gray-600">
          Connect with verified Ethiopian coffee producers
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 pt-4">
        <View className="bg-white rounded-xl shadow-sm p-4">
          <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3">
            <Text className="text-gray-400 text-lg mr-3">🔍</Text>
            <Text className="flex-1 text-gray-800 text-base">
              Search producers by name, location, or specialty...
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Options */}
      <View className="px-4 pt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {[
              "All",
              "Verified",
              "Organic",
              "Fair Trade",
              "Yirgacheffe",
              "Sidamo",
              "Harrar",
            ].map((filter) => (
              <TouchableOpacity
                key={filter}
                className="bg-white px-4 py-2 rounded-full shadow-sm active:bg-amber-100"
              >
                <Text className="text-sm font-medium text-gray-700">
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Producers List */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#10B981"]}
            tintColor="#10B981"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-sm text-gray-600">
            {producers.length} verified producers
          </Text>
        </View>

        {producers.map((producer) => (
          <ProducerCard key={producer.id} producer={producer} />
        ))}

        {/* Load More */}
        <View className="py-6">
          <TouchableOpacity
            className="bg-white border border-green-500 py-3 rounded-lg"
            onPress={() => console.log("Load more producers")}
          >
            <Text className="text-green-600 font-semibold text-center">
              Load More Producers
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default FindProducersTab;
