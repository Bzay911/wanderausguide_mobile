import React from "react";
import { View, Text, Pressable, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export const TripCard = ({ item }) => {
  const router = useRouter();
  return (
    <Pressable
      className="h-[180px] mb-3 rounded-lg overflow-hidden"
     onPress={() => router.push(`/trips/${item.id}`)}
    >
      <ImageBackground
        source={require("../../assets/images/esperence.jpg")}
        resizeMode="cover"
        className="flex-1"
      >
        {/* Overlay */}
        <View className="flex-1 flex-row items-end bg-black/20 p-4 justify-between">
          <View>
            <Text className="text-white text-lg font-interMedium">
              {item.tripname}
            </Text>
            <Text className="text-gray-300 font-inter-regular">
              {item.tripDestination}
            </Text>
          </View>
          <View>
            <Text className="text-white text-md font-interMedium">
              {item.tripdate}
            </Text>
            <Text className="text-gray-300 text-sm font-inter-regular">
              {item.membersLength} members
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
