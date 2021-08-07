import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

type VideoListItemProps = {
  video: {
    id: string;
    createdAt: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    duration: number;
    user: {
      name: string;
      image?: string;
    };
    views: number;
  };
};

const VideoListItem = (props: VideoListItemProps) => {
  const { video } = props;
  const minutes = Math.floor(video.duration / 60);
  const seconds = video.duration % 60;
  let viewString = video.views.toString();
  if (video.views > 1000000) {
    viewString = (video.views / 1000000).toFixed(1) + "M";
  } else if (video.views > 1000) {
    viewString = (video.views / 1000).toFixed(1) + "K";
  }

  const navigation = useNavigation();

  const openVideoPage = () => {
    navigation.navigate("VideoScreen", { id: video.id });
  };

  return (
    <Pressable onPress={openVideoPage}>
      {/* thumbnail */}
      <View>
        <Image
          style={styles.thumbnail}
          source={{
            uri: video.thumbnail,
          }}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {minutes}:{seconds < 10 ? "0" : ""}
            {seconds}
          </Text>
        </View>
      </View>

      {/* title row*/}
      <View style={styles.titleRow}>
        {/*avatar */}
        <Image
          style={styles.avatar}
          source={{
            uri: video.user.image,
          }}
        />
        {/*middle container: title, subtitle, etc.*/}
        <View style={styles.middleContainer}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.subtitle}>
            {video.user.name} {viewString} views {video.createdAt}
          </Text>
        </View>
        {/*icon */}
        <Entypo name={"dots-three-vertical"} size={18} color={"white"} />
      </View>
    </Pressable>
  );
};

export default VideoListItem;
