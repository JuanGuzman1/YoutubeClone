import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import VideoComment from "../VideoComment";
import { Feather } from "@expo/vector-icons";
import { DataStore, Auth } from "aws-amplify";
import { Comment } from "../../src/models";
import { User } from "../../src/models";

interface VideoCommentsProps {
  comments: Comment[];
  videoId: string;
}

const VideoComments = ({ comments, videoId }: VideoCommentsProps) => {
  const [newComment, setNewComment] = useState("");

  const sendComment = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    const userSub = userInfo.attributes.sub;
    const user = (await DataStore.query(User)).find(
      (user) => user.sub === userSub
    );

    if (!user) {
      console.error("User not found");
      return;
    }

    await DataStore.save(
      new Comment({
        comment: newComment,
        likes: 0,
        dislikes: 0,
        replies: 0,
        videoID: videoId,
        userID: user?.id,
      })
    );
    setNewComment("");
  };

  return (
    <View style={{ backgroundColor: "#141414", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ padding: 10, color: "white", flex: 1 }}
          placeholder={"Write a comment.."}
          value={newComment}
          onChangeText={setNewComment}
          placeholderTextColor={"grey"}
        />
        <Pressable onPress={sendComment}>
          <Feather name={"send"} size={24} color={"white"} />
        </Pressable>
      </View>

      <BottomSheetFlatList
        data={comments}
        renderItem={({ item }) => <VideoComment comment={item} />}
      />
    </View>
  );
};

export default VideoComments;
