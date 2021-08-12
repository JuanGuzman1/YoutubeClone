import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Platform,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import videos from "../../assets/data/videos.json";
import VideoListItem from "../../components/VideoListItem";
import VideoPlayer from "../../components/VideoPlayer";
import styles from "./styles";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import VideoComments from "../../components/VideoComments";
import VideoComment from "../../components/VideoComment";
import comments from "../../assets/data/comments.json";
import { Video, Comment } from "../../src/models";
import { useRoute } from "@react-navigation/native";
import { DataStore, Storage } from "aws-amplify";

const VideoScreen = () => {
  const [video, setVideo] = useState<Video | undefined>(undefined);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const route = useRoute();
  const videoId = route.params?.id;

  useEffect(() => {
    DataStore.query(Video, videoId).then(setVideo);
  }, [videoId]);

  useEffect(() => {
    if (!video) {
      return;
    }
    if (video.videoUrl.startsWith("http")) {
      setVideoUrl(video.videoUrl);
    } else {
      Storage.get(video.videoUrl).then(setVideoUrl);
    }
    if (video.thumbnail.startsWith("http")) {
      setImage(video.thumbnail);
    } else {
      Storage.get(video.thumbnail).then(setImage);
    }
  }, [video]);

  useEffect(() => {
    if (!video) {
      return;
    }
    const fetchComments = async () => {
      const response = (await DataStore.query(Comment)).filter(
        (c) => c.videoID === video.id
      );
      setComments(response);
    };
    fetchComments();
  }, [video]);

  const commentsSheetRef = useRef<BottomSheetModal>(null);

  const openComments = () => {
    commentsSheetRef.current?.present();
  };

  if (!video) {
    return <ActivityIndicator size="small" color="#00ff00" />;
  }

  let viewString = video.views.toString();
  if (video.views > 1000000) {
    viewString = (video.views / 1000000).toFixed(1) + "M";
  } else if (video.views > 1000) {
    viewString = (video.views / 1000).toFixed(1) + "K";
  }

  return (
    <View
      style={{
        backgroundColor: "#141414",
        flex: 1,
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      {/* video player */}
      <VideoPlayer videoURI={videoUrl} thumbnailURI={image} />
      <View style={{ flex: 1 }}>
        {/* video info */}
        <View style={styles.videoInfoContainer}>
          <Text style={styles.tags}>{video.tags}</Text>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.subtitle}>
            {video.User?.name} {viewString} views {video.createdAt}
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
          <Image style={styles.avatar} source={{ uri: video.User?.image }} />
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              {video.User?.name}
            </Text>
            <Text style={{ color: "lightgrey", fontSize: 18 }}>
              {video.User?.subscribers} Subscribers
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
        <Pressable
          onPress={openComments}
          style={{ padding: 10, marginVertical: 10 }}
        >
          <Text style={{ color: "white" }}>Comments 333</Text>
          {/* comment component */}

          {!!comments.length && <VideoComment comment={comments[0]} />}
        </Pressable>
        {/* all comments */}
        <BottomSheetModal
          ref={commentsSheetRef}
          snapPoints={["70%"]}
          index={0}
          backgroundComponent={({ style }) => (
            <View style={[style, { backgroundColor: "#4d4d4d" }]} />
          )}
        >
          <VideoComments comments={comments} videoId={video.id} />
        </BottomSheetModal>
      </View>
    </View>
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
      <BottomSheetModalProvider>
        <FlatList
          data={videos}
          renderItem={({ item }) => <VideoListItem video={item} />}
          ListHeaderComponent={VideoScreen}
        />
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default VideoScreenWithRecommendations;
