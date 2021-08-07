import React from "react";
import { View, Text, Image } from "react-native";

interface VideoCommentProps {
  comment: {
    id: string;
    createdAt: string;
    comment: string;
    user: {
      name: string;
      image: string;
    };
    likes: number;
    dislikes: number;
    replies: number;
  };
}

const VideoComment = ({ comment }: VideoCommentProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 35, height: 35, borderRadius: 20 }}
        source={{ uri: comment.user.image }}
      />

      <Text
        style={{
          color: "white",
          marginLeft: 10,
        }}
      >
        {comment.comment}
      </Text>
    </View>
  );
};

export default VideoComment;
