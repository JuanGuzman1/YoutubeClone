import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import VideoListItem from "../components/VideoListItem";
import { DataStore } from "@aws-amplify/datastore";
import { Video } from "../src/models";

const HomeScreen = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    //fetch videos
    const fetchVideos = async () => {
      const response = await DataStore.query(Video);
      setVideos(response);
    };
    fetchVideos();
  }, []);

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
