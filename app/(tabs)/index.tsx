import { Ionicons } from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePostContext } from "@/contexts/PostContext";
import { router } from "expo-router";

type MasonryPost = Post & {
  coverImage: string;
  height: number;
};

interface Post {
  _id: string;
  placeName: string;
  description: string;
  images: string[];
  category: string[];
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const GAP = 12;
const NUM_COLUMNS = 2;
const IMAGE_WIDTH = (SCREEN_WIDTH - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export default function FeedScreen() {
  const { backendPosts } = usePostContext();

  const filters = [
    "All",
    "beach",
    "park",
    "mountain",
    "city",
    "lookout",
    "historical",
    "hiking",
    "wildlife",
    "cultural",
    "activities",
    "other"
  ];

  const [selectedFilter, setSelectedFilter] = useState("All");

  const masonryPosts: MasonryPost[] = backendPosts
    .filter((post) => post.images?.length > 0) // 🔐 safety
    .map((post, index) => ({
      ...post,
      coverImage: post.images[0],
      height: 240 + (index % 3) * 80,
    }));

  const filteredImages: MasonryPost[] =
    selectedFilter === "All"
      ? masonryPosts
      : masonryPosts.filter((img) => img.category.includes(selectedFilter));

  const handlePostPress = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4">
        {/* Search bar */}
        <View>
          <View className="mt-4 mb-2 px-4 py-2 bg-zinc-800 rounded-full flex-row items-center gap-3">
            <Ionicons
              name="search"
              size={20}
              color="#9ca3af"
              onPress={() => console.log("searched")}
            />
            <Text className="text-zinc-400 font-inter-regular text-sm">
              Search
            </Text>
          </View>
          <TouchableOpacity
            className="absolute right-6 top-6"
            onPress={() => console.log("options pressed")}
          >
            <Ionicons name="options" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingVertical: 12 }}
          renderItem={({ item }) => {
            const isActive = item === selectedFilter;

            return (
              <TouchableOpacity
                onPress={() => setSelectedFilter(item)}
                className={`px-4 py-2 mr-2 rounded-full ${
                  isActive ? "bg-white" : "bg-zinc-800"
                }`}
              >
                <Text
                  className={`text-sm font-inter-regular ${
                    isActive ? "text-black" : "text-white"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: GAP }}>
        <MasonryList
          data={filteredImages}
          numColumns={NUM_COLUMNS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handlePostPress(item._id)}
              style={{ marginBottom: GAP }}
            >
              <Image
                source={{ uri: item.coverImage }}
                contentFit="cover"
                style={{
                  width: IMAGE_WIDTH,
                  height: item.height,
                  borderRadius: 16,
                }}
              />

              {/* 🔹 Title overlay */}
              <View className="absolute bottom-2 left-2 right-2">
                <Text
                  numberOfLines={2}
                  className="text-white text-sm font-semibold"
                >
                  {item.placeName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
