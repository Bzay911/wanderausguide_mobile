import React from "react";
import { View, Text, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { TripCard } from "@/components/trip/TripCard";

export const tripsMockData = [
  {
    id: "trip_001",
    tripname: "Perth Coastal Escape",
    membersLength: 4,
    tripdate: "2025-01-15",
    tripDestination: "Perth, WA",
  },
  {
    id: "trip_002",
    tripname: "Albany Nature Retreat",
    membersLength: 6,
    tripdate: "2025-02-10",
    tripDestination: "Albany, WA",
  },
  {
    id: "trip_003",
    tripname: "Margaret River Wine Tour",
    membersLength: 3,
    tripdate: "2025-03-05",
    tripDestination: "Margaret River, WA",
  },
  {
    id: "trip_004",
    tripname: "Broome Beach Holiday",
    membersLength: 5,
    tripdate: "2025-04-18",
    tripDestination: "Broome, WA",
  },
  {
    id: "trip_005",
    tripname: "Esperance Road Trip",
    membersLength: 7,
    tripdate: "2025-05-22",
    tripDestination: "Esperance, WA",
  },
];

export default function PlanScreen() {

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 pt-6 pb-3">
        <Text className="text-gray-200 font-interMedium text-2xl">
          Your Trips
        </Text>
      </View>

      <FlatList
        data={tripsMockData}
         renderItem={({ item }) => <TripCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 100,
        }}
      />

      <FAB
        icon="plus"
        label="Create"
        size="small"
        color="#000"
        onPress={() => console.log("Pressed")}
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
