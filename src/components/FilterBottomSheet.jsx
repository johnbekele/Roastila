import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import PriceRangeSlider from "./PriceRangeSlider";

const { height: screenHeight } = Dimensions.get("window");

const FilterBottomSheet = ({
  visible,
  onClose,
  filters = [],
  activeFilters = [],
  onToggleFilter,
  onClearAll,
  title = "Filters & Sort",
  sortOptions = [],
  sortBy = "",
  onSortChange,
  filterCategories = {},
  onCategoryFilter,
  priceRange = null,
  onPriceRangeChange,
}) => {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={handleClose}
        />

        {/* Bottom Sheet */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: theme.borderRadius.xl,
            borderTopRightRadius: theme.borderRadius.xl,
            maxHeight: screenHeight * 0.7,
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
            paddingBottom: theme.spacing.xl,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
              }}
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              style={{
                padding: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  color: theme.colors.textSecondary,
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: screenHeight * 0.5 }}
          >
            {/* Price Range Slider (if provided) */}
            {priceRange && (
              <View style={{ marginBottom: theme.spacing.lg }}>
                <PriceRangeSlider
                  minPrice={priceRange.minPrice}
                  maxPrice={priceRange.maxPrice}
                  currentMin={priceRange.currentMin}
                  currentMax={priceRange.currentMax}
                  onRangeChange={onPriceRangeChange}
                  currency={priceRange.currency || "€"}
                />
              </View>
            )}

            {/* Sort Options (if provided) */}
            {sortOptions.length > 0 && (
              <View style={{ marginBottom: theme.spacing.lg }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  Sort By
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ flexDirection: "row" }}>
                    {sortOptions.map((option) => (
                      <TouchableOpacity
                        key={option.key}
                        onPress={() => onSortChange?.(option.key)}
                        style={{
                          backgroundColor:
                            sortBy === option.key
                              ? theme.colors.primary
                              : theme.colors.backgroundSecondary,
                          paddingHorizontal: theme.spacing.md,
                          paddingVertical: theme.spacing.sm,
                          borderRadius: theme.borderRadius.full,
                          marginRight: theme.spacing.sm,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              sortBy === option.key
                                ? theme.colors.textInverse
                                : theme.colors.text,
                            fontSize: theme.typography.fontSize.sm,
                            fontWeight: theme.typography.fontWeight.medium,
                          }}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            {/* Filter Categories (if provided) */}
            {Object.keys(filterCategories).length > 0 && (
              <View style={{ marginBottom: theme.spacing.lg }}>
                {Object.entries(filterCategories).map(([category, options]) => (
                  <View
                    key={category}
                    style={{ marginBottom: theme.spacing.md }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.text,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      {category}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {options.map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => onCategoryFilter?.(category, option)}
                            style={{
                              backgroundColor: theme.colors.backgroundSecondary,
                              paddingHorizontal: theme.spacing.md,
                              paddingVertical: theme.spacing.sm,
                              borderRadius: theme.borderRadius.full,
                              marginRight: theme.spacing.sm,
                            }}
                          >
                            <Text
                              style={{
                                color: theme.colors.text,
                                fontSize: theme.typography.fontSize.sm,
                                fontWeight: theme.typography.fontWeight.medium,
                              }}
                            >
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                ))}
              </View>
            )}

            {/* Simple Filter Options (if provided) */}
            {filters.length > 0 && (
              <View style={{ marginBottom: theme.spacing.lg }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: theme.spacing.md,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text,
                    }}
                  >
                    Filter Options
                  </Text>
                  <TouchableOpacity onPress={onClearAll}>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.primary,
                        fontWeight: theme.typography.fontWeight.medium,
                      }}
                    >
                      Clear All
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Filter Chips */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  {filters.map((filter) => (
                    <TouchableOpacity
                      key={filter}
                      onPress={() => onToggleFilter(filter)}
                      style={{
                        backgroundColor: activeFilters.includes(filter)
                          ? theme.colors.primary
                          : theme.colors.backgroundSecondary,
                        paddingHorizontal: theme.spacing.md,
                        paddingVertical: theme.spacing.sm,
                        borderRadius: theme.borderRadius.full,
                        marginRight: theme.spacing.sm,
                        marginBottom: theme.spacing.sm,
                        borderWidth: activeFilters.includes(filter) ? 2 : 0,
                        borderColor: activeFilters.includes(filter)
                          ? theme.colors.primary
                          : "transparent",
                      }}
                    >
                      <Text
                        style={{
                          color: activeFilters.includes(filter)
                            ? theme.colors.textInverse
                            : theme.colors.text,
                          fontSize: theme.typography.fontSize.sm,
                          fontWeight: theme.typography.fontWeight.medium,
                        }}
                      >
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Active Filters Summary */}
                {activeFilters.length > 0 && (
                  <View
                    style={{
                      backgroundColor: theme.colors.primaryLight,
                      padding: theme.spacing.md,
                      borderRadius: theme.borderRadius.lg,
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.primary,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      Active Filters ({activeFilters.length})
                    </Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {activeFilters.map((filter) => (
                        <View
                          key={filter}
                          style={{
                            backgroundColor: theme.colors.primary,
                            paddingHorizontal: theme.spacing.sm,
                            paddingVertical: theme.spacing.xs,
                            borderRadius: theme.borderRadius.full,
                            marginRight: theme.spacing.sm,
                            marginBottom: theme.spacing.xs,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: theme.colors.textInverse,
                              fontSize: theme.typography.fontSize.xs,
                              marginRight: theme.spacing.xs,
                            }}
                          >
                            {filter}
                          </Text>
                          <TouchableOpacity
                            onPress={() => onToggleFilter(filter)}
                            style={{ marginLeft: theme.spacing.xs }}
                          >
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
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: theme.spacing.lg,
              paddingTop: theme.spacing.lg,
              borderTopWidth: 1,
              borderTopColor: theme.colors.border,
            }}
          >
            <TouchableOpacity
              onPress={onClearAll}
              style={{
                flex: 1,
                backgroundColor: theme.colors.backgroundSecondary,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                marginRight: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  textAlign: "center",
                }}
              >
                Clear All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleClose}
              style={{
                flex: 1,
                backgroundColor: theme.colors.primary,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  textAlign: "center",
                }}
              >
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterBottomSheet;
