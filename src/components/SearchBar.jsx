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
      className={`bg-white rounded-xl shadow-sm p-4 mb-4 ${className}`}
      {...props}
    >
      {/* Search Input */}
      <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 mb-3">
        <Text className="text-gray-400 text-lg mr-3">🔍</Text>
        <TextInput
          className="flex-1 text-gray-800 text-base"
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
            <Text className="text-gray-400 text-lg">✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-amber-500 px-6 py-3 rounded-lg flex-1 mr-2 active:bg-amber-600"
        >
          <Text className="text-white font-semibold text-center">Search</Text>
        </TouchableOpacity>

        {showFilter && (
          <TouchableOpacity
            onPress={onFilterPress}
            className="bg-gray-100 px-4 py-3 rounded-lg active:bg-gray-200"
          >
            <Text className="text-gray-700 font-medium">Filter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Search Tags */}
      <View className="mt-3">
        <Text className="text-sm text-gray-500 mb-2">Quick search:</Text>
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
              className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-1 active:bg-amber-100"
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
