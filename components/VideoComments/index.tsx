import React from "react";
import { View, Text, FlatList } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import comments from "../../assets/data/comments.json";
import VideoComment from "../VideoComment";

const VideoComments = () => {
  return (
    <View style={{ backgroundColor: "#141414", flex: 1 }}>
      <BottomSheetFlatList
        data={comments}
        renderItem={({ item }) => <VideoComment comment={item} />}
      />
    </View>
  );
};

export default VideoComments;
