import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import VideoScreen from "./screens/VideoScreen/VideoScreen";
import { withAuthenticator } from "aws-amplify-react-native";

import Amplify, { Auth, DataStore } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

import { User } from "./src/models";

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const saveUserToDatabase = async () => {
      //get user from cognito
      const userInfo = await Auth.currentAuthenticatedUser();
      if (!userInfo) {
        return;
      }
      const userId = userInfo.attributes.sub;
      //check if user exists in database
      const user = (await DataStore.query(User)).find(
        (user) => user.sub === userId
      );

      if (!user) {
        //if not, save to database
        await DataStore.save(
          new User({
            sub: userId,
            name: userInfo.attributes.email,
            subscribers: 0,
          })
        );
      } else {
        console.log("User already exists in DB");
      }
    };
    saveUserToDatabase();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={"dark"} />

        {/* <VideoScreen /> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
