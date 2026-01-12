import React from "react";
import { View, Text, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { TripCard } from "@/components/trip/TripCard";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/config/api";

const fetchAllTrips = async () => {
    const response = await fetch(`${API.BASE_URL}/api/trip/get-all-trips`);
    if (!response.ok) {
      throw new Error("Failed to fetch trips");
    }
    const data = await response.json();
    return data.trips;
};

export default function PlanScreen() {
  const router = useRouter();
  const {data: trips, isLoading, isFetching, error} = useQuery({
    queryKey: ['trips'],
    queryFn: fetchAllTrips
  });

    // FIRST LOAD
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-gray-300">Loading trips...</Text>
      </SafeAreaView>
    );
  };


  // ERROR STATE
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-red-400">
          Failed to load trips. Please try again.
        </Text>
      </SafeAreaView>
    );
  };
  
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 pt-6 pb-3">
        <Text className="text-gray-200 font-inter-medium text-lg">
          Your Trips
        </Text>
          {isFetching && (
          <Text className="text-gray-400 text-sm">Refreshing...</Text>
        )}
      </View>

        {trips.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 mb-4">
            No trips yet. Create your first one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={trips}
          renderItem={({ item }) => <TripCard item={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: 100,
          }}
        />
      )}

      <FAB
        icon="plus"
        label="Create"
        size="small"
        color="#000"
        onPress={() => {
          router.push('/trips/createTripScreen')
        }}
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#fff",
        }}
      />
    </SafeAreaView>
  );
}
