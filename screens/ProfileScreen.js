import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import FriendsCards from "../components/FriendsCards";
import UploadImage from "../components/UploadImage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout, setFriends } from "../reducers/user";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import IPAdress from "../IPAdress";

// construction de  la page profile
export default function ProfileScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.user.value);

  const [user, setUser] = useState({
    firstname: null,
    tags: [],
    friends: [],
    city: null,
    age: null,
    teacher: [],
    description: null,
    profilePicture: null,
  });

  //useEffect utilisé pour charger la page profile de l'utilisateur au  moment de sa connection/signin
  useEffect(() => {
    fetch(`http://${IPAdress}:3000/users/profile/${userRed.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setUser({
            age: data.user.age,
            tags: data.user.tags,
            friends: data.user.friends,
            city: data.user.city,
            teacher: data.user.teacher,
            firstname: data.user.firstname,
            description: data.user.description,
            profilePicture: data.user.profilePicture,
            city: data.user.city,
          });
          dispatch(setFriends({ friends: data.user.friends }));
        }
      });
  }, [isFocused]);

  //style conditionnel pour le statut online ou pas
  let styleOnline = styles.online;
  if (userRed.status) {
    styleOnline = styles.online1;
  }

  //on map sur l'état teacher pour faire ressortir les tags/les instruments que l'utilisateur veut enseigner
  const teacherTag = user.teacher.map((teacher, i) => {
    function randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + "aa";
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { borderColor: color }]} key={i}>
        #{teacher}
      </Text>
    );
  });



  //on map sur l'état tags pour faire ressortir les tags/les instruments pratiqué par l'utilisateur
  const tagsList = user.tags.map((tag, i) => {
    function randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color + "aa";
    }
    const color = randomColor();
    return (
      <Text style={[styles.textUser1, { borderColor: color }]} key={i}>
        #{tag}
      </Text>
    );
  });
    
  const friendsList = user.friends.map((friend, i) => {
    return <FriendsCards key={i} friend={friend} />;
  });

  const handleLogout = () => {
    fetch(`http://${IPAdress}:3000/users/isOffline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userRed.username,
      }),
    })
    dispatch(logout());
    navigation.navigate("Home");
  };

  const handleModify = () => {
    navigation.navigate("UpdateProfile");
  };
  return (
    <ImageBackground
      source={require("../assets/illu_02.jpg")}
      imageStyle={{ opacity: 0.4 }}
      style={styles.imgBack}
    >
      <View style={styles.container}>
        <View style={styles.headerProfile}>
          <UploadImage />
          <View style={styles.nameAndTags}>
            <View style={styles.nameAndStatus}>
              <Text style={styles.textUsername}>#{userRed.username}</Text>
              <View style={styleOnline}></View>
              <SimpleLineIcons
                style={styles.logoLogout}
                name="logout"
                size={15}
                color="black"
                onPress={() => handleLogout()}
              />
            </View>
            <View style={styles.tagandteach}>
              <View style={styles.tagsList}>{tagsList}</View>
              {user.teacher.length > 0 && (
                <View style={styles.tagsList}>
                  <Text style={styles.textUser}>Wanna teach : </Text>
                  {teacherTag}
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.description}>
          <View style={styles.infoContainer}>
            <Text style={styles.textUser}>About me : </Text>
            <Text style={styles.textUser}>{user.firstname}</Text>
            <Text style={styles.textUser}>{user.age} years old</Text>
            <Text style={styles.textUser}>{user.city}</Text>
          </View>
          <Text style={styles.textDecription}>{user.description}</Text>
          <View style={styles.modifyIcon}>
            <FontAwesome
              onPress={() => handleModify()}
              name="pencil-square-o"
              size={16}
              color="#A3A3A3"
            />
          </View>
        </View>
        <View>
        <ScrollView style={styles.friendsCardsContainer} horizontal={true}>
          {friendsList}
        </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    paddingTop: 50,
    padding: 10,
  },
  imgBack: {
    width: "100%",
    height: "100%",
  },
  textUser: {
    fontSize: 15,
    margin: 2,
    alignItems: "center",
    fontWeight: "700",
  },
  textDecription: {
    fontFamily: "Atma-Regular",
    fontSize: 17,
    color: "#615B5Aaa",
    alignItems: "center",
    padding: 5,
    fontWeight: "700",
  },
  textUser1: {
    fontSize: 14,
    fontWeight: "800",
    color: "black",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    margin: 5,
    borderWidth: 3,
    backgroundColor: "white",
  },
  textUsername: {
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    color: "#CE2174",
  },
  nameAndStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 150,
    justifyContent: "space-around",
    alignItems: "center",
  },
  online: {
    backgroundColor: "green",
    height: 20,
    width: 20,
    borderRadius: 40,
    backgroundColor: "red",
  },
  online1: {
    backgroundColor: "green",
    height: 20,
    width: 20,
    borderRadius: 40,
    backgroundColor: "green",
  },
  tagsList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
  },
  tagandteach: {
    display: "flex",
    marginTop: 20,
    marginBottom: 20,
  },
  headerProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nameAndTags: {
    marginLeft: 20,
    width: 150,
  },
  description: {
    backgroundColor: "#ffffffaa",
    display: "flex",
    alignItems: "stretch",
    borderRadius: 5,
    width: "100%",
    padding: 5,
    marginTop: 25,
  },
  infoContainer: {
    backgroundColor: "#E5EAE9",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
  },
  modifyIcon: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: -15,
  },
});
