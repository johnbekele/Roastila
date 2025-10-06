import React, { useState } from "react";
import { Dimensions, PanResponder, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const { width: screenWidth } = Dimensions.get("window");

const PriceRangeSlider = ({
  minPrice = 0,
  maxPrice = 1000,
  currentMin = 0,
  currentMax = 1000,
  onRangeChange,
  currency = "€",
}) => {
  const { theme } = useTheme();
  const sliderWidth = screenWidth - 80; // Account for padding
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);

  const updateRange = (newMin, newMax) => {
    setLocalMin(newMin);
    setLocalMax(newMax);
    onRangeChange?.(newMin, newMax);
  };

  const getPositionFromPrice = (price) => {
    return ((price - minPrice) / (maxPrice - minPrice)) * sliderWidth;
  };

  const getPriceFromPosition = (position) => {
    return Math.round(
      minPrice + (position / sliderWidth) * (maxPrice - minPrice)
    );
  };

  const minPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newPosition = Math.max(
        0,
        Math.min(getPositionFromPrice(localMax) - 20, gestureState.moveX - 40)
      );
      const newMin = getPriceFromPosition(newPosition);

      if (newMin !== localMin && newMin >= minPrice && newMin < localMax) {
        updateRange(newMin, localMax);
      }
    },
  });

  const maxPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newPosition = Math.max(
        getPositionFromPrice(localMin) + 20,
        Math.min(sliderWidth, gestureState.moveX - 40)
      );
      const newMax = getPriceFromPosition(newPosition);

      if (newMax !== localMax && newMax <= maxPrice && newMax > localMin) {
        updateRange(localMin, newMax);
      }
    },
  });

  const minPosition = getPositionFromPrice(localMin);
  const maxPosition = getPositionFromPrice(localMax);

  return (
    <View style={{ paddingVertical: theme.spacing.md }}>
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
          Price Range
        </Text>
        <Text
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
          }}
        >
          {currency}
          {localMin} - {currency}
          {localMax}
        </Text>
      </View>

      <View
        style={{
          height: 40,
          justifyContent: "center",
          paddingHorizontal: theme.spacing.sm,
        }}
      >
        {/* Track Background */}
        <View
          style={{
            height: 4,
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
            position: "relative",
          }}
        />

        {/* Active Range */}
        <View
          style={{
            position: "absolute",
            height: 4,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.sm,
            left: minPosition,
            width: maxPosition - minPosition,
          }}
        />

        {/* Min Thumb */}
        <View
          {...minPanResponder.panHandlers}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
            borderWidth: 3,
            borderColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            left: minPosition - 10,
            top: 8,
          }}
        />

        {/* Max Thumb */}
        <View
          {...maxPanResponder.panHandlers}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
            borderWidth: 3,
            borderColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            left: maxPosition - 10,
            top: 8,
          }}
        />
      </View>

      {/* Price Labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: theme.spacing.sm,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textSecondary,
          }}
        >
          {currency}
          {minPrice}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textSecondary,
          }}
        >
          {currency}
          {maxPrice}
        </Text>
      </View>
    </View>
  );
};

export default PriceRangeSlider;
