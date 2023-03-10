import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import { StyleSheet } from "react-native";

import ChatsFriends from "./chatPages/ChatsFriends";
import ChatsList from "./chatPages/ChatsList";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ChatsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#CE2174",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="All" component={ChatsList} />
      <Tab.Screen name="Friends" component={ChatsFriends} />
    </Tab.Navigator>
  );
};

export default function Chats() {
  return (
    <View style={styles.tabNavigatorContainer}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        style={styles.navigator}
      >
        <Stack.Screen name="ChatsNavigator" component={ChatsNavigator} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  navigator: {
    borderBottomColor: "#ec6e5b",
  },
  tabNavigatorContainer: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "white",
  },
});
