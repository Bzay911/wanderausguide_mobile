import { Text, View, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { API } from "@/config/api";
import { Post } from "@/types/post";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const [postDetails, setPostDetails] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostById = async (id: string) => {
      try {
        const response = await fetch(`${API.BASE_URL}/api/imagekit/post/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post by id");
        }
        const data = await response.json();
        setPostDetails(data.postDetails);
      } catch (err) {
        console.log("Error fetching posts", err);
      }
    };

    fetchPostById(id);
  }, []);

  // Calculate dynamic image height (75% of screen height)
  const imageHeight = height * 0.75;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Back button */}
      <View className="m-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
      </View>

      {/* Image Preview with indicators */}
      <View className="relative">
        <ScrollView
          className="rounded-lg bg-black"
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {postDetails &&
            postDetails.images.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={{
                  width,
                  height: imageHeight,
                }}
                contentFit="cover"
              />
            ))}
        </ScrollView>

        {/* Image Counter Badge */}
        {postDetails && postDetails.images.length > 1 && (
          <View className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full">
            <Text className="text-white text-sm font-semibold">
              {activeIndex + 1} / {postDetails.images.length}
            </Text>
          </View>
        )}

        {/* Dot Indicators */}
        {postDetails && postDetails.images.length > 1 && (
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {postDetails.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === activeIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </View>
        )}
      </View>

      {/* Text content */}
      <View className="px-4 mt-4 flex-1">
        <Text className="text-white text-lg font-inter-medium">
          {postDetails?.placeName}
        </Text>
        <Text className="text-gray-300 text-sm mb-4 font-inter-regular mt-2">
          {postDetails?.description}
        </Text>
      </View>
    </SafeAreaView>
  );
}
