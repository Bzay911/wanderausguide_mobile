import { Text, View, Pressable, ScrollView, FlatList, Touchable, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { API } from "@/config/api";
import { formattedDate, relativeDate } from "@/components/utils/DateFormatter";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { FAB } from "react-native-paper";
import AddPlaceModal from "@/components/place/addPlaceModal";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";


function RightAction(
  progress: SharedValue<number>,
  dragX: SharedValue<number>
) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value + 80 }],
    };
  });

  return (
    <Reanimated.View
      style={animatedStyle}
      className="w-20 h-[70px] bg-red-600 rounded-md ml-2 flex items-center justify-center"
    ><TouchableOpacity onPress={() => console.log('pressed')}>
      <Ionicons name="trash-outline" size={22} color="white" />
      <Text className="text-white text-xs mt-1">Delete</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const queryClient = useQueryClient();
  const openSwipeRef = useRef<Swipeable>(null);

  // Tabs
  const tabs = ["Places", "Members", "Expenses"] as const;
  type TabKey = (typeof tabs)[number];
  const [activeTab, setActiveTab] = useState<TabKey>("Places");

  // Fetch Trip by ID
  const fetchTripById = async (id: string) => {
    const response = await fetch(`${API.BASE_URL}/api/trip/get-trip/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch trip by id");
    }
    const data = await response.json();
    return data.tripDetails;
  };

  // Query to get trip details
  const {
    data: trip,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => fetchTripById(id),
    enabled: !!id,
  });

  // Fething places based on trip id
  const fetchPlacesByTripId = async (tripId: string) => {
    const response = await fetch(
      `${API.BASE_URL}/api/place/get-places/${tripId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch places by trip id");
    }
    const data = await response.json();
    return data.places;
  };

  // Query to get places based on trip id
  const { data: places } = useQuery({
    queryKey: ["places", id],
    queryFn: () => fetchPlacesByTripId(id),
    enabled: !!id,
  });

  // Adding places to db
  const addPlace = async ({
    tripId,
    placeName,
    placeCoords,
  }: {
    tripId: string;
    placeName: string;
    placeCoords: [number, number];
  }) => {
    const response = await fetch(`${API.BASE_URL}/api/place/add-place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tripId,
        placeName,
        placeCoords,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add place");
    }

    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places", id] });
    },
    onError: (error) => {
      console.error("Failed to create place", error);
    },
  });

  // tabs button
  const TabButton = ({
    label,
    active,
    onPress,
  }: {
    label: string;
    active: boolean;
    onPress: () => void;
  }) => {
    return (
      <Pressable
        onPress={onPress}
        className={`px-4 py-2 rounded-full border ${
          active ? "bg-white border-white" : "bg-transparent border-neutral-800"
        }`}
      >
        <Text
          className={`text-sm font-interMedium ${
            active ? "text-black" : "text-gray-300"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  // LOADING
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-gray-400">Loading trip...</Text>
      </SafeAreaView>
    );
  }

  // ERROR
  if (error || !trip) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-red-400">Failed to load trip.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black relative">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Ionicons
          name="chevron-back"
          size={22}
          color="#E5E7EB"
          onPress={() => router.back()}
        />
        <Ionicons name="menu" size={22} color="#9CA3AF" onPress={() => {}} />
      </View>

      {/* MAIN SCROLL */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trip Card */}
        <View className="m-4 rounded-2xl bg-[#121212] border border-gray-800 p-5">
          {/* Title + Date */}
          <View className="flex-row items-center justify-between mb-2">
            <Text
              className="text-2xl text-white font-interMedium flex-1 pr-3"
              numberOfLines={1}
            >
              {trip.tripName}
            </Text>
            <View className="rounded-full bg-neutral-800 px-3 py-1">
              <Text className="text-xs text-gray-300 font-interMedium">
                {relativeDate(trip.tripDate)}
              </Text>
            </View>
          </View>
          {/* Destination */}
          <View className="flex-row items-center gap-2">
            <Ionicons name="location-outline" size={18} color="#9CA3AF" />
            <Text className="text-gray-400">{trip.tripDestination}</Text>
          </View>
          {/* Divider */}
          <View className="my-4 h-[1px] bg-neutral-800" />
          {/* Info Row */}
          <View className="flex-row items-center justify-between">
            {/* Trip Date */}
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-neutral-800 items-center justify-center">
                <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
              </View>
              <View>
                <Text className="text-xs text-gray-500">Trip Date</Text>
                <Text className="text-sm text-gray-300 font-interMedium">
                  {formattedDate(trip.tripDate)}
                </Text>
              </View>
            </View>
            {/* Members */}
            <View className="flex-row items-center gap-3">
              <View className="h-9 w-9 rounded-full bg-neutral-800 items-center justify-center">
                <Ionicons name="people-outline" size={18} color="#9CA3AF" />
              </View>
              <View>
                <Text className="text-xs text-gray-500">Members</Text>
                <Text className="text-sm text-gray-300 font-interMedium">
                  {trip.members?.length ?? 0} members
                </Text>
              </View>
            </View>
          </View>
          {/* Description */}
          <View className="mt-5">
            <Text className="text-gray-400 text-sm mb-1">Description</Text>
            <Text className="text-gray-300 text-sm">
              {trip.description || "Add trip overview here."}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <View className="flex-row gap-2">
            {tabs.map((t) => (
              <TabButton
                key={t}
                label={t}
                active={activeTab === t}
                onPress={() => setActiveTab(t)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Tab Content */}
        <View className="m-4">
          {activeTab === "Places" && (
            <View>
              {places && places.length > 0 ? (
                places.map((place: any) => (
                  <ReanimatedSwipeable
                    key={place._id}
                    ref={(ref) => {
                           if (ref && openSwipeRef.current !== ref) {
      openSwipeRef.current?.close();
      openSwipeRef.current = ref;
    }
                    }}
                    friction={2}
                    rightThreshold={40}
                    renderRightActions={RightAction}
                  >
                    <View className="mb-4 h-[70px] bg-neutral-800 rounded-md px-4 py-3">
                      <Text className="text-white font-interMedium text-sm">
                        {place.placeName}
                      </Text>

                      <View className="items-end pt-2">
                        <Text className="text-gray-400 text-xs">
                          added by Bijay
                        </Text>
                      </View>
                    </View>
                  </ReanimatedSwipeable>
                ))
              ) : (
                <View className="min-h-[200px] items-center justify-center">
                  <Text className="text-gray-500">No places added yet.</Text>
                </View>
              )}
            </View>
          )}
          {activeTab === "Members" && (
            <Text className="text-gray-300">Members list here.</Text>
          )}
          {activeTab === "Expenses" && (
            <Text className="text-gray-300">Expenses here.</Text>
          )}
        </View>

        <AddPlaceModal
          visible={showAddPlaceModal}
          onClose={() => setShowAddPlaceModal(false)}
          onSave={(data) => {
            console.log("Place added:", data);
            mutate({
              tripId: id,
              placeName: data.name,
              placeCoords: data.coords,
            });
          }}
        />

        <View className="h-10" />
      </ScrollView>
      <FAB
        icon="plus"
        label="Add"
        size="small"
        color="#000"
        onPress={() => {
          setShowAddPlaceModal(true);
        }}
        style={{
          position: "absolute",
          right: 16,
          bottom: 45,
          backgroundColor: "#fff",
        }}
      />
    </SafeAreaView>
  );
}
