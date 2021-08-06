import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Platform,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import video from "../../assets/data/video.json";
import videos from "../../assets/data/videos.json";
import VideoListItem from "../../components/VideoListItem";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./styles";

const VideoScreen = () => {
  let viewString = video.views.toString();
  if (video.views > 1000000) {
    viewString = (video.views / 1000000).toFixed(1) + "M";
  } else if (video.views > 1000) {
    viewString = (video.views / 1000).toFixed(1) + "K";
  }
  return (
    <>
      {/* video player */}
      <VideoPlayer videoURI={video.videoUrl} thumbnailURI={video.thumbnail} />
      {/* video info */}
      <View style={styles.videoInfoContainer}>
        <Text style={styles.tags}>{video.tags}</Text>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.subtitle}>
          {video.user.name} {viewString} views {video.createdAt}
        </Text>
      </View>
      {/* Action list */}
      <View style={styles.actionListContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.actionListItem}>
            <AntDesign name={"like1"} size={30} color={"lightgrey"} />
            <Text style={styles.actionText}>{video.likes}</Text>
          </View>
          <View style={styles.actionListItem}>
            <AntDesign name={"dislike2"} size={30} color={"lightgrey"} />
            <Text style={styles.actionText}>{video.dislikes}</Text>
          </View>
          <View style={styles.actionListItem}>
            <AntDesign name={"export"} size={30} color={"lightgrey"} />
            <Text style={styles.actionText}>Share</Text>
          </View>
          <View style={styles.actionListItem}>
            <AntDesign name={"download"} size={30} color={"lightgrey"} />
            <Text style={styles.actionText}>Download</Text>
          </View>
        </ScrollView>
      </View>

      {/* user info */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "#3d3d3d",
          borderBottomWidth: 1,
          borderTopWidth: 1,
          padding: 10,
        }}
      >
        <Image style={styles.avatar} source={{ uri: video.user.image }} />
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {video.user.name}
          </Text>
          <Text style={{ color: "lightgrey", fontSize: 18 }}>
            {video.user.subscribers} Subscribers
          </Text>
        </View>
        <Text
          style={{
            color: "red",
            fontSize: 20,
            fontWeight: "bold",
            padding: 10,
          }}
        >
          SUBSCRIBE
        </Text>
      </View>

      {/* comments */}

      <View style={{ padding: 10, marginVertical: 10 }}>
        <Text style={{ color: "white" }}>Comments 333</Text>
        {/* comment component */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Image
            style={{ width: 35, height: 35, borderRadius: 20 }}
            source={{ uri: video.user.image }}
          />

          <Text
            style={{
              color: "white",
              marginLeft: 10,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            fugiat, consectetur temporibus nihil natus modi corporis aut eos
            fugit nam, eius molestias ad delectus facere, facilis dolor cumque
            libero ratione!
          </Text>
        </View>
      </View>
      {/* Recommended videos */}
    </>
  );
};

const VideoScreenWithRecommendations = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#141414",
        flex: 1,
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoListItem video={item} />}
        ListHeaderComponent={VideoScreen}
      />
    </SafeAreaView>
  );
};

export default VideoScreenWithRecommendations;
