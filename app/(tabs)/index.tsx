import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image } from "expo-image";
import { dummyPosts } from "@/data/posts";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GAP = 12;
const NUM_COLUMNS = 2;
const IMAGE_WIDTH = (SCREEN_WIDTH - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export default function FeedScreen() {
  const filters = [
    "All",
    "road-trip",
    "adventure",
    "beach",
    "city",
    "hiking",
    "food",
    "wildlife",
  ];

  const [selectedFilter, setSelectedFilter] = useState("All");

  const masonryPosts = dummyPosts.map((post, index) => ({
    ...post,
    coverImage: post.images[0],
    height: 240 + (index % 3) * 80,
  }));

  const filteredImages =
    selectedFilter === "All"
      ? masonryPosts
      : masonryPosts.filter((img) => img.category.includes(selectedFilter));

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4">
        {/* Search bar */}
        <View>
          <View className="mt-4 mb-2 px-4 py-2 bg-zinc-800 rounded-full flex-row items-center gap-3">
            <Ionicons name="search" size={20} color="#9ca3af" onPress={() => console.log('searched')}/>
            <Text className="text-zinc-400">Search</Text>
          </View>
          <TouchableOpacity className="absolute right-6 top-6" onPress={() => console.log('options pressed')}>
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
                  className={`text-sm ${
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
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => console.log("Open post:", item.postId)}
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
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
