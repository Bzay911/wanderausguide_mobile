import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Trip } from "@/types/trip";
import { formattedDate, relativeDate } from "@/components/utils/DateFormatter";

export const TripCard = ({ item }: { item: Trip }) => {
  const router = useRouter();
 
  return (
    <Pressable
      onPress={() => router.push(`/trips/${item._id}`)}
      className="mb-4 rounded-2xl bg-[#121212] border border-gray-800 active:opacity-90"
    >
      <View className="p-4">
        {/* Top Section */}
        <View className="mb-3">
          <Text className="text-lg text-white font-inter-medium">
            {item.tripName}
          </Text>
          <Text className="text-sm text-gray-400 font-inter-regular mt-1">
            {item.tripDestination}
          </Text>
        </View>

        {/* Bottom Section */}
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-gray-300 font-interMedium">
            {formattedDate(item.tripDate)}
          </Text>
          <Text className="text-xs text-gray-500">{relativeDate(item.tripDate)}</Text>

          <View className="bg-gray-800 px-3 py-1 rounded-full">
            <Text className="text-xs text-gray-300 font-inter-regular">
              2 members
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
