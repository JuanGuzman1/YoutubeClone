import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { TabOneParamList } from "../types";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
const logo = require("../assets/images/logo.png");

const HomeStack = createStackNavigator<TabOneParamList>();

function CustomHeader() {
  return (
    <SafeAreaView style={{ backgroundColor: "#141414" }}>
      <View
        style={{
          margin: 10,
          padding: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          resizeMode={"contain"}
          style={{ width: 100, height: 25 }}
          source={logo}
        />
        <View
          style={{
            flexDirection: "row",
            width: 150,
            justifyContent: "space-between",
          }}
        >
          <Feather name={"cast"} size={24} color={"white"} />
          <AntDesign name={"bells"} size={24} color={"white"} />
          <AntDesign name={"search1"} size={24} color={"white"} />
          <FontAwesome name={"user-circle-o"} size={24} color={"white"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeStackComponent() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        header: () => <CustomHeader />,
      }}
    >
      <HomeStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
    </HomeStack.Navigator>
  );
}
export default HomeStackComponent;
