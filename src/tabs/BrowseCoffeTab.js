import React, { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CoffeeCard from "../components/CoffeeCard";
import FilterBottomSheet from "../components/FilterBottomSheet";
import { useTheme } from "../context/ThemeContext";
import {
  useCoffeeFilterOptions,
  useCoffeeSearch,
} from "../hooks/useCoffeeSearch";

const BrowseCoffeTab = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCoffees, setSelectedCoffees] = useState(new Set());
  const [bulkMode, setBulkMode] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const { theme } = useTheme();

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

  const { regions, processingMethods } = useCoffeeFilterOptions();

  const handleSearch = (query) => {
    search(query);
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
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
    // Toggle sort: if the same sort is already selected, remove it
    if (sortBy === sortOption) {
      sort("");
    } else {
      sort(sortOption);
    }
  };

  const handleFilter = (filterType, value) => {
    // Toggle filter: if the same value is already selected, remove it
    if (filters[filterType] === value) {
      applyFilters({ [filterType]: null });
    } else {
      applyFilters({ [filterType]: value });
    }
  };

  const clearAllFilters = () => {
    clearFilters();
    clearSearch();
    setShowFilters(false);
  };

  const toggleBulkMode = () => {
    setBulkMode(!bulkMode);
    if (!bulkMode) {
      setSelectedCoffees(new Set());
    }
  };

  const toggleCoffeeSelection = (coffeeId) => {
    const newSelected = new Set(selectedCoffees);
    if (newSelected.has(coffeeId)) {
      newSelected.delete(coffeeId);
    } else {
      newSelected.add(coffeeId);
    }
    setSelectedCoffees(newSelected);
  };

  const selectAllCoffees = () => {
    const allIds = new Set(coffees.map((coffee) => coffee.id));
    setSelectedCoffees(allIds);
  };

  const clearSelection = () => {
    setSelectedCoffees(new Set());
  };

  const handleBulkAction = (action) => {
    const selectedCount = selectedCoffees.size;
    Alert.alert(
      `${action} Selected Coffees`,
      `This will ${action.toLowerCase()} ${selectedCount} coffee${selectedCount > 1 ? "s" : ""}. Continue?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            console.log(
              `${action} ${selectedCount} coffees:`,
              Array.from(selectedCoffees)
            );
            // Here you would implement the actual bulk action
            setSelectedCoffees(new Set());
            setBulkMode(false);
          },
        },
      ]
    );
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
    <View
      style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}
    >
      {/* Top Search Section */}
      <View
        style={{
          backgroundColor: theme.colors.surface,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
            }}
          >
            Browse Coffees
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={toggleBulkMode}
              style={{
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
                marginRight: theme.spacing.sm,
                backgroundColor: bulkMode
                  ? theme.colors.primary
                  : theme.colors.backgroundSecondary,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: bulkMode
                    ? theme.colors.textInverse
                    : theme.colors.text,
                }}
              >
                {bulkMode ? "Exit Bulk" : "Bulk"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFilterPress}
              style={{
                backgroundColor: theme.colors.secondary,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                }}
              >
                Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.lg,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.typography.fontSize.base,
              marginRight: theme.spacing.sm,
            }}
          >
            🔍
          </Text>
          <TextInput
            style={{
              flex: 1,
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.sm,
            }}
            placeholder="Search coffees..."
            placeholderTextColor={theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery && (
            <TouchableOpacity
              onPress={() => handleSearch("")}
              style={{
                marginLeft: theme.spacing.sm,
                padding: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textTertiary,
                  fontSize: theme.typography.fontSize.sm,
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
            }}
          >
            {total} coffees available
            {bulkMode &&
              selectedCoffees.size > 0 &&
              ` • ${selectedCoffees.size} selected`}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.textTertiary,
            }}
          >
            €35-65 price range
          </Text>
        </View>
      </View>

      {/* Bulk Mode Controls */}
      {bulkMode && (
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            backgroundColor: theme.colors.infoLight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.sm,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={selectAllCoffees}
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.md,
                  marginRight: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Select All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={clearSelection}
                style={{
                  backgroundColor: theme.colors.textSecondary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.md,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: theme.colors.info,
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {selectedCoffees.size} selected
            </Text>
          </View>

          {selectedCoffees.size > 0 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => handleBulkAction("Request Quote")}
                style={{
                  backgroundColor: theme.colors.success,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.md,
                  flex: 1,
                  marginRight: theme.spacing.xs,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.medium,
                    textAlign: "center",
                  }}
                >
                  Request Quote
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBulkAction("Add to Inquiry")}
                style={{
                  backgroundColor: theme.colors.secondary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.md,
                  flex: 1,
                  marginHorizontal: theme.spacing.xs,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.medium,
                    textAlign: "center",
                  }}
                >
                  Add to Inquiry
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBulkAction("Save")}
                style={{
                  backgroundColor: theme.colors.textSecondary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.md,
                  flex: 1,
                  marginLeft: theme.spacing.xs,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.medium,
                    textAlign: "center",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Active Filters */}
      {(hasActiveFilters || hasSearchQuery) && (
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            backgroundColor: theme.colors.warningLight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              {hasSearchQuery && (
                <View
                  style={{
                    backgroundColor: theme.colors.warning,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    borderRadius: theme.borderRadius.full,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: theme.spacing.sm,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.textInverse,
                      marginRight: theme.spacing.xs,
                    }}
                  >
                    &ldquo;{searchQuery}&rdquo;
                  </Text>
                  <TouchableOpacity onPress={clearSearch}>
                    <Text
                      style={{
                        color: theme.colors.textInverse,
                        fontSize: theme.typography.fontSize.xs,
                      }}
                    >
                      ✕
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {sortBy && (
                <View
                  style={{
                    backgroundColor: theme.colors.info,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    borderRadius: theme.borderRadius.full,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.textInverse,
                    }}
                  >
                    {sortBy.replace("-", " ").toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text
                style={{
                  color: theme.colors.warning,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Coffee List */}
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.md,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.secondary]}
            tintColor={theme.colors.secondary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {isEmpty ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 80,
            }}
          >
            <Text
              style={{
                fontSize: 60,
                marginBottom: theme.spacing.md,
              }}
            >
              ☕
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              No coffees found
            </Text>
            <Text
              style={{
                color: theme.colors.textSecondary,
                textAlign: "center",
                marginBottom: theme.spacing.md,
              }}
            >
              Try adjusting your search or filters
            </Text>
            <TouchableOpacity
              onPress={reset}
              style={{
                backgroundColor: theme.colors.secondary,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Compact Results Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.textSecondary,
                }}
              >
                {isFetching ? "Searching..." : `${total} coffees found`}
              </Text>
              {isLoading && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontSize: theme.typography.fontSize.xs,
                      marginRight: theme.spacing.xs,
                    }}
                  >
                    Loading...
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontSize: theme.typography.fontSize.xs,
                    }}
                  >
                    ⏳
                  </Text>
                </View>
              )}
            </View>

            {/* Coffee Cards List */}
            <View>
              {coffees
                .filter(
                  (coffee, index, self) =>
                    index === self.findIndex((c) => c.id === coffee.id)
                )
                .map((coffee, index) => (
                  <View key={coffee.id} className="mb-3">
                    {bulkMode ? (
                      <TouchableOpacity
                        onPress={() => toggleCoffeeSelection(coffee.id)}
                        className={`relative ${
                          selectedCoffees.has(coffee.id) ? "opacity-75" : ""
                        }`}
                      >
                        {selectedCoffees.has(coffee.id) && (
                          <View className="absolute top-2 left-2 z-10 bg-blue-500 rounded-full w-6 h-6 items-center justify-center">
                            <Text className="text-white text-xs font-bold">
                              ✓
                            </Text>
                          </View>
                        )}
                        <CoffeeCard coffee={coffee} onPress={() => {}} />
                      </TouchableOpacity>
                    ) : (
                      <CoffeeCard coffee={coffee} onPress={handleCoffeePress} />
                    )}
                  </View>
                ))}
            </View>

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

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        title="Coffee Filters & Sort"
        priceRange={{
          minPrice: 0,
          maxPrice: 100,
          currentMin: priceRange.min,
          currentMax: priceRange.max,
          currency: "€",
        }}
        onPriceRangeChange={handlePriceRangeChange}
        sortOptions={[
          { key: "", label: "Default" },
          { key: "name", label: "Name A-Z" },
          { key: "price-low", label: "Price Low" },
          { key: "price-high", label: "Price High" },
          { key: "rating", label: "Rating" },
          { key: "newest", label: "Newest" },
        ]}
        sortBy={sortBy}
        onSortChange={handleSort}
        filterCategories={{
          Region: regions,
          Processing: processingMethods,
        }}
        onCategoryFilter={(category, option) => {
          const filterKey = category.toLowerCase();
          handleFilter(filterKey, option);
        }}
        onClearAll={() => {
          clearFilters();
          clearSearch();
          setPriceRange({ min: 0, max: 100 });
        }}
      />
    </View>
  );
};

export default BrowseCoffeTab;
