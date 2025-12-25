import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1 bg-black px-4 pt-6">
      <Text className="text-white text-2xl font-interMedium">
        Trip Details
      </Text>

      <Text className="text-gray-400 mt-2">
        Trip ID: {id}
      </Text>
    </SafeAreaView>
  );
}
