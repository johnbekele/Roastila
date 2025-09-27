import React, { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CoffeeCard from "../components/CoffeeCard";
import SearchBar from "../components/SearchBar";
import {
  useCoffeeFilterOptions,
  useCoffeeSearch,
} from "../hooks/useCoffeeSearch";

const BrowseCoffeTab = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    coffees,
    total,
    searchQuery,
    filters,
    sortBy,
    isLoading,
    isError,
    error,
    isFetching,
    search,
    applyFilters,
    sort,
    clearFilters,
    clearSearch,
    reset,
    refetch,
    hasActiveFilters,
    hasSearchQuery,
    isEmpty,
  } = useCoffeeSearch();

  const {
    regions,
    processingMethods,
    certifications,
    availabilityOptions,
    priceRange,
    ratingRange,
  } = useCoffeeFilterOptions();

  const handleSearch = (query) => {
    search(query);
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handleCoffeePress = (coffee) => {
    Alert.alert(
      coffee.name,
      `${coffee.description}\n\nPrice: ${coffee.price}\nProducer: ${coffee.producer}\nCertification: ${coffee.certification}`,
      [
        { text: "Close", style: "cancel" },
        {
          text: "Contact Producer",
          onPress: () => console.log("Contact producer"),
        },
        {
          text: "Add to Inquiry",
          onPress: () => console.log("Add to inquiry"),
        },
      ]
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSort = (sortOption) => {
    sort(sortOption);
    setShowFilters(false);
  };

  const handleFilter = (filterType, value) => {
    applyFilters({ [filterType]: value });
  };

  const clearAllFilters = () => {
    clearFilters();
    clearSearch();
    setShowFilters(false);
  };

  if (isError) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-6">
        <Text className="text-red-500 text-lg font-semibold mb-4">
          Error loading coffees
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          {error?.message || "Something went wrong. Please try again."}
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-amber-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-1">
          Browse Coffees
        </Text>
        <Text className="text-gray-600">
          {total} premium Ethiopian coffees available
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 pt-4">
        <SearchBar
          onSearch={handleSearch}
          onFilterPress={handleFilterPress}
          placeholder="Search by name, origin, flavor, or producer..."
        />
      </View>

      {/* Active Filters & Sort */}
      {(hasActiveFilters || hasSearchQuery) && (
        <View className="px-4 mb-4">
          <View className="bg-white rounded-lg p-3 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-semibold text-gray-700">
                Active Filters
              </Text>
              <TouchableOpacity onPress={clearAllFilters}>
                <Text className="text-amber-600 text-sm font-medium">
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>

            {hasSearchQuery && (
              <View className="flex-row items-center mb-2">
                <Text className="text-xs text-gray-600 mr-2">Search:</Text>
                <View className="bg-amber-100 px-2 py-1 rounded-full flex-row items-center">
                  <Text className="text-xs text-amber-700 mr-1">
                    "{searchQuery}"
                  </Text>
                  <TouchableOpacity onPress={clearSearch}>
                    <Text className="text-amber-600 text-xs">✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {sortBy && (
              <View className="flex-row items-center">
                <Text className="text-xs text-gray-600 mr-2">Sort:</Text>
                <View className="bg-blue-100 px-2 py-1 rounded-full">
                  <Text className="text-xs text-blue-700">
                    {sortBy.replace("-", " ").toUpperCase()}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <View className="px-4 mb-4">
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Filters & Sort
            </Text>

            {/* Sort Options */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Sort By
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  { key: "", label: "Default" },
                  { key: "name", label: "Name A-Z" },
                  { key: "price-low", label: "Price Low" },
                  { key: "price-high", label: "Price High" },
                  { key: "rating", label: "Rating" },
                  { key: "newest", label: "Newest" },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    onPress={() => handleSort(option.key)}
                    className={`px-3 py-2 rounded-full mr-2 ${
                      sortBy === option.key ? "bg-amber-500" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        sortBy === option.key ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Region Filter */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Region
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {regions.map((region) => (
                  <TouchableOpacity
                    key={region}
                    onPress={() => handleFilter("region", region)}
                    className={`px-3 py-2 rounded-full mr-2 ${
                      filters.region === region ? "bg-amber-500" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        filters.region === region
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {region}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Processing Filter */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Processing
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {processingMethods.map((method) => (
                  <TouchableOpacity
                    key={method}
                    onPress={() => handleFilter("processing", method)}
                    className={`px-3 py-2 rounded-full mr-2 ${
                      filters.processing === method
                        ? "bg-amber-500"
                        : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        filters.processing === method
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      )}

      {/* Coffee List */}
      <ScrollView
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#F59E0B"]}
            tintColor="#F59E0B"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-6xl mb-4">☕</Text>
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              No coffees found
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Try adjusting your search or filters
            </Text>
            <TouchableOpacity
              onPress={reset}
              className="bg-amber-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Clear All</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Results Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-sm text-gray-600">
                {isFetching ? "Searching..." : `${total} coffees found`}
              </Text>
              {isLoading && (
                <View className="flex-row items-center">
                  <Text className="text-amber-500 text-sm mr-2">
                    Loading...
                  </Text>
                  <Text className="text-amber-500">⏳</Text>
                </View>
              )}
            </View>

            {/* Coffee Cards */}
            {coffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onPress={handleCoffeePress}
              />
            ))}

            {/* Load More Button (for future pagination) */}
            {coffees.length > 0 && (
              <View className="py-6">
                <TouchableOpacity
                  className="bg-white border border-amber-500 py-3 rounded-lg"
                  onPress={() => console.log("Load more")}
                >
                  <Text className="text-amber-600 font-semibold text-center">
                    Load More Coffees
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default BrowseCoffeTab;
