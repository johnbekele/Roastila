import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  filterCoffees,
  mockCoffeeData,
  searchCoffees,
  sortCoffees,
} from "../data/mockCoffeeData";

// Simulate API call delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API function
const fetchCoffees = async ({ queryKey }) => {
  const [, { searchQuery, filters, sortBy }] = queryKey;

  // Simulate network delay
  await delay(500);

  let coffees = [...mockCoffeeData];

  // Apply search
  if (searchQuery) {
    coffees = searchCoffees(coffees, searchQuery);
  }

  // Apply filters
  if (filters && Object.keys(filters).length > 0) {
    coffees = filterCoffees(coffees, filters);
  }

  // Apply sorting
  if (sortBy) {
    coffees = sortCoffees(coffees, sortBy);
  }

  return {
    coffees,
    total: coffees.length,
    searchQuery,
    filters,
    sortBy,
  };
};

export const useCoffeeSearch = (
  initialSearchQuery = "",
  initialFilters = {},
  initialSortBy = ""
) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState(initialSortBy);

  const queryKey = ["coffees", { searchQuery, filters, sortBy }];

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: fetchCoffees,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Memoized search function
  const search = useMemo(
    () => (query) => {
      setSearchQuery(query);
    },
    []
  );

  // Memoized filter function
  const applyFilters = useMemo(
    () => (newFilters) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  // Memoized sort function
  const sort = useMemo(
    () => (newSortBy) => {
      setSortBy(newSortBy);
    },
    []
  );

  // Clear all filters
  const clearFilters = useMemo(
    () => () => {
      setFilters({});
      setSortBy("");
    },
    []
  );

  // Clear search
  const clearSearch = useMemo(
    () => () => {
      setSearchQuery("");
    },
    []
  );

  // Reset all
  const reset = useMemo(
    () => () => {
      setSearchQuery("");
      setFilters({});
      setSortBy("");
    },
    []
  );

  return {
    // Data
    coffees: data?.coffees || [],
    total: data?.total || 0,

    // State
    searchQuery,
    filters,
    sortBy,
    isLoading,
    isError,
    error,
    isFetching,

    // Actions
    search,
    applyFilters,
    sort,
    clearFilters,
    clearSearch,
    reset,
    refetch,

    // Computed values
    hasActiveFilters: Object.keys(filters).length > 0 || !!sortBy,
    hasSearchQuery: !!searchQuery,
    isEmpty: !isLoading && (!data?.coffees || data.coffees.length === 0),
  };
};

// Hook for getting filter options
export const useCoffeeFilterOptions = () => {
  const regions = useMemo(() => {
    const uniqueRegions = [
      ...new Set(mockCoffeeData.map((coffee) => coffee.region)),
    ];
    return uniqueRegions.sort();
  }, []);

  const processingMethods = useMemo(() => {
    const uniqueProcessing = [
      ...new Set(mockCoffeeData.map((coffee) => coffee.processing)),
    ];
    return uniqueProcessing.sort();
  }, []);

  const certifications = useMemo(() => {
    const allCerts = mockCoffeeData.flatMap((coffee) =>
      coffee.certification.split(", ").map((cert) => cert.trim())
    );
    const uniqueCerts = [...new Set(allCerts)];
    return uniqueCerts.sort();
  }, []);

  const availabilityOptions = useMemo(() => {
    const uniqueAvailability = [
      ...new Set(mockCoffeeData.map((coffee) => coffee.availability)),
    ];
    return uniqueAvailability.sort();
  }, []);

  const priceRange = useMemo(() => {
    const prices = mockCoffeeData.map((coffee) =>
      parseFloat(coffee.price.replace("€", ""))
    );
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, []);

  const ratingRange = useMemo(() => {
    const ratings = mockCoffeeData.map((coffee) => coffee.rating);
    return {
      min: Math.min(...ratings),
      max: Math.max(...ratings),
    };
  }, []);

  return {
    regions,
    processingMethods,
    certifications,
    availabilityOptions,
    priceRange,
    ratingRange,
  };
};
