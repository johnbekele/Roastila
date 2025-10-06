import NetInfo from "@react-native-community/netinfo";

export const checkNetworkConnection = async () => {
  try {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
    };
  } catch (error) {
    console.error("Error checking network connection:", error);
    return {
      isConnected: false,
      isInternetReachable: false,
      type: "unknown",
    };
  }
};

export const isNetworkAvailable = async () => {
  const networkState = await checkNetworkConnection();
  return networkState.isConnected && networkState.isInternetReachable;
};
