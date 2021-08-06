import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import VideoListItem from "../components/VideoListItem";
import videos from "../assets/data/videos.json";

const HomeScreen = () => {
  return (
    <View>
      {/* video list item */}
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoListItem video={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
