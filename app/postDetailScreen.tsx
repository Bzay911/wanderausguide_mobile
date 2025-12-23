import { Text, View, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePostContext } from "../contexts/PostContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts } = usePostContext();
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);

  const post = posts.find((p) => p.id === id);
  if (!post) return null;

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
          {post.images.map((image, index) => (
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
        {post.images.length > 1 && (
          <View className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full">
            <Text className="text-white text-sm font-semibold">
              {activeIndex + 1} / {post.images.length}
            </Text>
          </View>
        )}

        {/* Dot Indicators */}
        {post.images.length > 1 && (
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {post.images.map((_, index) => (
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
        <Text className="text-white text-lg font-inter-medium">{post.title}</Text>
        <Text className="text-gray-300 text-sm mb-4 font-inter-regular mt-2">{post.description}</Text>
      </View>
    </SafeAreaView>
  );
}