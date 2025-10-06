import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = ({
  onSearch,
  placeholder = "Search coffees, origins, or flavors...",
  onFilterPress,
  showFilter = true,
  className = "",
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch?.("");
  };

  return (
    <View
      className={`bg-white rounded-lg shadow-sm p-3 ${className}`}
      {...props}
    >
      {/* Compact Search Input */}
      <View className="flex-row items-center bg-gray-50 rounded-lg px-3 py-2">
        <Text className="text-gray-400 text-base mr-2">🔍</Text>
        <TextInput
          className="flex-1 text-gray-800 text-sm"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="ml-2 p-1">
            <Text className="text-gray-400 text-sm">✕</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-amber-500 px-3 py-2 rounded-lg ml-2"
        >
          <Text className="text-white font-medium text-sm">Search</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Search Tags */}
      <View className="mt-2">
        <View className="flex-row flex-wrap">
          {[
            "Yirgacheffe",
            "Sidamo",
            "Harrar",
            "Organic",
            "Washed",
            "Natural",
          ].map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => {
                setSearchQuery(tag);
                onSearch?.(tag);
              }}
              className="bg-gray-100 px-2 py-1 rounded-full mr-1 mb-1"
            >
              <Text className="text-xs text-gray-600 font-medium">{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
