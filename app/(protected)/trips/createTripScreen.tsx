import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import AutoCompleteTextField from "@/components/textfield/AutoCompleteTextField";
import { API } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateTripScreen() {
  const router = useRouter();
  const [placeName, setPlaceName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);
  const [destinationName, setDestinationName] = useState("");
  const queryClient = useQueryClient();

  // Checking if form is filled
  const isFormValid =
    placeName.trim().length > 0 &&
    destinationName.trim().length > 0 &&
    date !== null;

  const createTrip = async (payload: any) => {
    const response = await fetch(`${API.BASE_URL}/api/trip/create-trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create a trip");
    }
    console.log("Trip created successsfully!");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      router.back();
    },
    onError: (error) => {
      console.error("Failed to create trip", error);
    },
  });

  const handleCreatePress = async () => {
    console.log("pressed ");
    if (!isFormValid) return;

    const payload = {
      tripName: placeName.trim(),
      tripDestination: destinationName,
      destinationCoords: destinationCoords,
      tripDate: date,
      description: description,
    };

    mutate(payload);
  };

  return (
    <SafeAreaView className=" bg-black flex-1 p-4">
      {/* Back button */}
      <View className="flex-row items-center mb-8 justify-around">
        <View className="w-8">
          <Ionicons
            name="chevron-back-outline"
            size={22}
            color="white"
            onPress={() => router.back()}
          />
        </View>

        <View className="flex-1 items-center">
          <Text className="text-white font-inter-regular text-lg">
            Create a trip
          </Text>
        </View>

        <View className="w-8" />
      </View>

      {/* Trip details */}
      <View className="mb-4">
        <View className="mb-6">
          <Text className=" text-base font-inter-regular mb-3 text-white">
            Trip Name
          </Text>
          <TextInput
            value={placeName}
            onChangeText={setPlaceName}
            placeholder="e.g. Trip to Albany"
            placeholderTextColor="#9ca3af"
            className="border border-gray-500 text-white rounded-lg px-4 py-4 text-base font-inter-regular"
            style={{ lineHeight: 20 }}
          />
        </View>

        <View className="mb-6">
          <Text className=" text-base font-inter-regular mb-3 text-white">
            Trip Destination
          </Text>
          {/* Location selector */}
          <AutoCompleteTextField
            setDestinationCoords={setDestinationCoords}
            setDestinationName={setDestinationName}
          />
        </View>

        {/* Date*/}
        <View className="mb-6">
          <Text className=" text-base font-inter-regular mb-3 text-white">
            Pick a date
          </Text>
          <Pressable
            onPress={() => setShowPicker(true)}
            className="border border-gray-500 rounded-lg px-4 py-4 flex-row items-center justify-between"
          >
            <Text
              className={`text-base font-inter-regular ${date ? "text-white" : "text-gray-400"}`}
            >
              {date ? date.toDateString() : "Select your trip date"}
            </Text>

            <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
          </Pressable>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            style={{
              backgroundColor: "white",
              marginTop: 12,
              alignSelf: "center",
            }}
            display="spinner"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Description if any */}
        <View className="mb-6">
          <Text className=" text-base font-inter-regular mb-3 text-white">
            Description (if any)
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="e.g. Pickup point at 7-eleven"
            multiline
            textAlignVertical="top"
            placeholderTextColor="#9ca3af"
            className=" border border-gray-500 rounded-lg px-4 py-4 text-white text-base h-32 font-inter-regular"
            style={{ lineHeight: 20 }}
          />
        </View>

        <Pressable
          onPress={() => handleCreatePress()}
          disabled={!isFormValid || !isPending}
          className={`p-4 items-center rounded-lg ${
            isFormValid ? "bg-blue-500" : "bg-gray-600"
          }`}
        >
          <Text
            className={`text-base font-inter-regular ${
              isFormValid ? "text-white" : "text-gray-300"
            }`}
          >
            Create trip
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
