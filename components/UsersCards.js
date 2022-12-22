import { Image, View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import IPAdress from "../IPAdress";

//composant pour afficher les profils de tous les utilisateurs

export default function UsersCards(props) {
  //useEffect pour récupérer tous les utilisateurs
  useEffect(() => {
    fetch(`http://${IPAdress}:3000/users/allUsers`)
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.user);
      });
  }, []);

  //style conditionnel pour le statut online ou pas
  let styleOnline = styles.online;
  if (friends.status) {
    styleOnline = styles.online1;
  }

  //il faudra remplacer l'image par l'uri/l de la photo des amis
  return (
    <View style={styles.container}>
      <Image
        style={styles.userPicture}
        source={require("../assets/mia-khalifa.jpg")}
      />
      <View style={styles.friendonline}>
        <Text style={styles.textUser}>{friends.username}</Text>
        <Text style={styleOnline}></Text>
      </View>
      <FontAwesome5 name="rocketchat" size={20} color="#CE2174" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  userPicture: {
    borderRadius: 60,
    width: 70,
    height: 70,
  },
  textUser: {
    color: "#CE2174",
    fontSize: 18,
  },
  online: {
    marginTop: 10,
    height: 15,
    width: 15,
    backgroundColor: "red",
    borderRadius: 40,
    marginBottom: 8,
  },
  online1: {
    marginTop: 10,
    height: 15,
    width: 15,
    backgroundColor: "green",
    borderRadius: 40,
    marginBottom: 8,
  },
  friendonline: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "yellow",
    width: 100,
    height: 30,
    alignItems: "center",
    alignContent: "center",
  },
});