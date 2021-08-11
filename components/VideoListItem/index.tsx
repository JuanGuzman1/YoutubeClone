import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Video } from "../../src/models";

type VideoListItemProps = {
  video: Video;
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
      <View style={{ marginVertical: 15 }}>
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
            uri: video.User?.image,
          }}
        />
        {/*middle container: title, subtitle, etc.*/}
        <View style={styles.middleContainer}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.subtitle}>
            {video.User?.name} {viewString} views {video.createdAt}
          </Text>
        </View>
        {/*icon */}
        <Entypo name={"dots-three-vertical"} size={18} color={"white"} />
      </View>
    </Pressable>
  );
};

export default VideoListItem;
