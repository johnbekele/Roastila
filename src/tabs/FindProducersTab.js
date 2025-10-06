import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FilterBottomSheet from "../components/FilterBottomSheet";
import { useTheme } from "../context/ThemeContext";

const { width: screenWidth } = Dimensions.get("window");

const FindProducersTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducers, setSelectedProducers] = useState(new Set());
  const [bulkMode, setBulkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Filter options for producers
  const filterOptions = [
    "Verified",
    "Organic",
    "Fair Trade",
    "Direct Trade",
    "Yirgacheffe",
    "Sidamo",
    "Harrar",
    "Guji",
    "Limu",
    "Wollaita",
    "Nekemt",
  ];

  // Mock producer data
  const producers = [
    {
      id: "producer-001",
      name: "Yirgacheffe Coffee Farmers Cooperative",
      location: "Yirgacheffe, Ethiopia",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      rating: 4.8,
      reviews: 124,
      verified: true,
      description:
        "Premium specialty coffee from the birthplace of coffee. Sustainable farming practices with direct trade relationships.",
      specialties: ["Yirgacheffe", "Washed", "Specialty Grade"],
      certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
      established: "1985",
      totalCoffees: 8,
      avgRating: 4.8,
    },
    {
      id: "producer-002",
      name: "Sidamo Highlands Coffee",
      location: "Sidamo, Ethiopia",
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
      rating: 4.6,
      reviews: 89,
      verified: true,
      description:
        "High-altitude coffee farms producing exceptional Sidamo beans with traditional processing methods.",
      specialties: ["Sidamo", "Natural", "High Altitude"],
      certifications: ["Organic", "Direct Trade"],
      established: "1992",
      totalCoffees: 6,
      avgRating: 4.6,
    },
    {
      id: "producer-003",
      name: "Harrar Coffee Collective",
      location: "Harrar, Ethiopia",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      rating: 4.7,
      reviews: 156,
      verified: true,
      description:
        "Traditional dry-processed Harrar coffee with unique wine-like characteristics and fruity notes.",
      specialties: ["Harrar", "Natural", "Dry Processed"],
      certifications: ["Fair Trade", "UTZ"],
      established: "1978",
      totalCoffees: 4,
      avgRating: 4.7,
    },
    {
      id: "producer-004",
      name: "Limu Coffee Growers Association",
      location: "Limu, Ethiopia",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
      rating: 4.5,
      reviews: 67,
      verified: false,
      description:
        "Small-scale farmers producing exceptional Limu coffee with sustainable agricultural practices.",
      specialties: ["Limu", "Washed", "Small Batch"],
      certifications: ["Organic"],
      established: "2001",
      totalCoffees: 3,
      avgRating: 4.5,
    },
    {
      id: "producer-005",
      name: "Guji Highland Coffee",
      location: "Guji, Ethiopia",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      rating: 4.9,
      reviews: 203,
      verified: true,
      description:
        "Award-winning Guji coffee with complex flavor profiles and exceptional quality standards.",
      specialties: ["Guji", "Natural", "Award Winner"],
      certifications: ["Organic", "Fair Trade", "Cup of Excellence"],
      established: "1989",
      totalCoffees: 12,
      avgRating: 4.9,
    },
    {
      id: "producer-006",
      name: "wollaita Coffee",
      location: "wollaita, Ethiopia",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      rating: 4.9,
      reviews: 203,
      verified: false,
      description:
        "Award-winning Guji coffee with complex flavor profiles and exceptional quality standards.",
      specialties: ["Guji", "Natural", "Award Winner"],
      certifications: ["Organic", "Fair Trade", "Cup of Excellence"],
      established: "1989",
      totalCoffees: 12,
      avgRating: 4.9,
    },
    {
      id: "producer-007",
      name: "nekemt Highland Coffee",
      location: "nekemt, Ethiopia",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      rating: 4.9,
      reviews: 203,
      verified: false,
      description:
        "Award-winning Guji coffee with complex flavor profiles and exceptional quality standards.",
      specialties: ["Guji", "Natural", "Award Winner"],
      certifications: ["Fair Trade", "Cup of Excellence"],
      established: "1989",
      totalCoffees: 12,
      avgRating: 4.9,
    },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Filter producers based on search query and active filters
  const filteredProducers = producers.filter((producer) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Active filters
    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => {
        switch (filter) {
          case "Verified":
            return producer.verified;
          case "Organic":
            return producer.certifications.includes("Organic");
          case "Fair Trade":
            return producer.certifications.includes("Fair Trade");
          case "Direct Trade":
            return producer.certifications.includes("Direct Trade");
          case "Yirgacheffe":
            return producer.specialties.includes("Yirgacheffe");
          case "Sidamo":
            return producer.specialties.includes("Sidamo");
          case "Harrar":
            return producer.specialties.includes("Harrar");
          case "Guji":
            return producer.specialties.includes("Guji");
          case "Limu":
            return producer.specialties.includes("Limu");
          case "Wollaita":
            return producer.location.toLowerCase().includes("wollaita");
          case "Nekemt":
            return producer.location.toLowerCase().includes("nekemt");
          default:
            return true;
        }
      });

    return matchesSearch && matchesFilters;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleBulkMode = () => {
    setBulkMode(!bulkMode);
    if (!bulkMode) {
      setSelectedProducers(new Set());
    }
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    setPriceRange({ min: 0, max: 1000 });
  };

  const removeFilter = (filter) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const toggleProducerSelection = (producerId) => {
    const newSelected = new Set(selectedProducers);
    if (newSelected.has(producerId)) {
      newSelected.delete(producerId);
    } else {
      newSelected.add(producerId);
    }
    setSelectedProducers(newSelected);
  };

  const selectAllProducers = () => {
    const allIds = new Set(filteredProducers.map((producer) => producer.id));
    setSelectedProducers(allIds);
  };

  const clearSelection = () => {
    setSelectedProducers(new Set());
  };

  const handleBulkAction = (action) => {
    Alert.alert(
      "Bulk Action",
      `${action} for ${selectedProducers.size} selected producers?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => console.log(`${action} confirmed`) },
      ]
    );
  };

  const handleProducerPress = (producer) => {
    navigation.navigate("ProducerDetail", { producer });
  };

  const handleViewDetails = (producer) => {
    navigation.navigate("ProducerDetail", { producer });
  };

  const handleContact = (producer) => {
    Alert.alert(
      "Contact Producer",
      `Would you like to contact ${producer.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Contact",
          onPress: () => console.log("Contact producer:", producer.name),
        },
      ]
    );
  };

  const ProducerCard = ({ producer }) => (
    <TouchableOpacity
      onPress={() =>
        bulkMode
          ? toggleProducerSelection(producer.id)
          : handleProducerPress(producer)
      }
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.sm,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: selectedProducers.has(producer.id) ? 2 : 0,
        borderColor: selectedProducers.has(producer.id)
          ? theme.colors.primary
          : "transparent",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {/* Producer Image */}
        <View
          style={{
            position: "relative",
            width: screenWidth < 400 ? 100 : screenWidth < 500 ? 120 : 140,
            height: screenWidth < 400 ? 100 : screenWidth < 500 ? 120 : 140,
          }}
        >
          <Image
            source={{ uri: producer.image }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          {/* Bulk Selection Indicator */}
          {bulkMode && (
            <View
              style={{
                position: "absolute",
                top: theme.spacing.xs,
                left: theme.spacing.xs,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: selectedProducers.has(producer.id)
                    ? theme.colors.primary
                    : theme.colors.backgroundSecondary,
                  borderWidth: 2,
                  borderColor: theme.colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectedProducers.has(producer.id) && (
                  <Text
                    style={{
                      color: theme.colors.textInverse,
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.bold,
                    }}
                  >
                    ✓
                  </Text>
                )}
              </View>
            </View>
          )}
          {/* Verified Badge */}
          {producer.verified && (
            <View
              style={{
                position: "absolute",
                top: theme.spacing.xs,
                right: theme.spacing.xs,
                backgroundColor: theme.colors.success,
                paddingHorizontal: theme.spacing.xs,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                ✓ Verified
              </Text>
            </View>
          )}
        </View>

        {/* Producer Details */}
        <View style={{ flex: 1, padding: theme.spacing.sm }}>
          {/* Name and Rating */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: theme.spacing.xs,
            }}
          >
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
              {producer.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: theme.colors.secondary,
                  fontSize: theme.typography.fontSize.sm,
                }}
              >
                ⭐
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.textSecondary,
                  marginLeft: theme.spacing.xs,
                }}
              >
                {producer.rating}
              </Text>
            </View>
          </View>

          {/* Location */}
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
            numberOfLines={1}
          >
            🌍 {producer.location}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text,
              marginBottom: theme.spacing.xs,
            }}
            numberOfLines={2}
          >
            {producer.description}
          </Text>

          {/* Specialties */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: theme.spacing.xs,
            }}
          >
            {producer.specialties.slice(0, 3).map((specialty, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: theme.colors.successLight,
                  paddingHorizontal: theme.spacing.xs,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                  marginRight: theme.spacing.xs,
                  marginBottom: theme.spacing.xs,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.success,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  {specialty}
                </Text>
              </View>
            ))}
            {producer.specialties.length > 3 && (
              <View
                style={{
                  backgroundColor: theme.colors.backgroundSecondary,
                  paddingHorizontal: theme.spacing.xs,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  +{producer.specialties.length - 3}
                </Text>
              </View>
            )}
          </View>

          {/* Certifications */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.xs,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.textSecondary,
              }}
            >
              Est. {producer.established} • {producer.totalCoffees} coffees
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.success,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {producer.certifications[0] || "Organic"}
            </Text>
          </View>

          {/* Actions */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => handleContact(producer)}
              style={{
                backgroundColor: theme.colors.success,
                paddingHorizontal:
                  screenWidth < 400 ? theme.spacing.sm : theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
                marginRight: theme.spacing.sm,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize:
                    screenWidth < 400
                      ? theme.typography.fontSize.xs
                      : theme.typography.fontSize.sm,
                  textAlign: "center",
                }}
              >
                Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleViewDetails(producer)}
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal:
                  screenWidth < 400 ? theme.spacing.sm : theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize:
                    screenWidth < 400
                      ? theme.typography.fontSize.xs
                      : theme.typography.fontSize.sm,
                  textAlign: "center",
                }}
              >
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            Find Producers
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
            placeholder="Search producers..."
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
            {filteredProducers.length} of {producers.length} producers
            {bulkMode &&
              selectedProducers.size > 0 &&
              ` • ${selectedProducers.size} selected`}
          </Text>
          {bulkMode && selectedProducers.size > 0 && (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={selectAllProducers}
                style={{
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  marginRight: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.primary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Select All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={clearSelection}
                style={{
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Bulk Mode Actions */}
      {bulkMode && selectedProducers.size > 0 && (
        <View
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => handleBulkAction("Contact")}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              📞 Contact All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBulkAction("Save")}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              💾 Save All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBulkAction("Share")}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              📤 Share All
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        title="Producer Filters"
        priceRange={{
          minPrice: 0,
          maxPrice: 1000,
          currentMin: priceRange.min,
          currentMax: priceRange.max,
          currency: "€",
        }}
        onPriceRangeChange={handlePriceRangeChange}
        filters={filterOptions}
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        onClearAll={clearAllFilters}
      />

      {/* Active Filters Display */}
      {(activeFilters.length > 0 || searchQuery) && (
        <View
          style={{
            backgroundColor: theme.colors.warningLight,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
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
              {searchQuery && (
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
                    &quot;{searchQuery}&quot;
                  </Text>
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
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
              {activeFilters.map((filter) => (
                <View
                  key={filter}
                  style={{
                    backgroundColor: theme.colors.info,
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
                    {filter}
                  </Text>
                  <TouchableOpacity onPress={() => removeFilter(filter)}>
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
              ))}
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

      {/* Producer List */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: theme.spacing.md }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.success]}
            tintColor={theme.colors.success}
          />
        }
      >
        {filteredProducers.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: theme.spacing.xxl,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                marginBottom: theme.spacing.md,
              }}
            >
              🌱
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: theme.spacing.sm,
                textAlign: "center",
              }}
            >
              No producers found
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.textSecondary,
                textAlign: "center",
                marginBottom: theme.spacing.lg,
              }}
            >
              {searchQuery || activeFilters.length > 0
                ? "Try adjusting your search or filters"
                : "No producers available"}
            </Text>
            {(searchQuery || activeFilters.length > 0) && (
              <TouchableOpacity
                onPress={clearAllFilters}
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.lg,
                  paddingVertical: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.semibold,
                  }}
                >
                  Clear Filters
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            {/* Results Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: theme.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                }}
              >
                {searchQuery ? `Results for "${searchQuery}"` : "All Producers"}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                {filteredProducers.length} producers
              </Text>
            </View>

            {filteredProducers.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}

            {/* Load More Button */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.surface,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                alignItems: "center",
                marginBottom: theme.spacing.xl,
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                Load More Producers
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default FindProducersTab;
