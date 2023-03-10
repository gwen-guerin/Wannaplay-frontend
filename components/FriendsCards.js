import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import IPAdress from "../IPAdress";
import { useNavigation } from "@react-navigation/native";

//comment on fait pour concrètrement pour faire une demande d'amis ?? et pusher en BD ?
export default function FriendsCards(props) {
  const navigation = useNavigation();
  const [isFriendOnline, setIsFriendOnline] = useState(false);
  const [photo, setPhoto] = useState();

  
  //useEffect à la connexion de l'utilisateur qui récupère les données des amis (username et photo)
  useEffect(() => {

    fetch(`http://${IPAdress}:3000/users/profile/${props.friend}`)
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data.user.profilePicture);
        setIsFriendOnline(data.user.status);
        
      });
    
  }, []);

  //style conditionnel pour le statut online ou pas
  let styleOnline = styles.online;
  if (isFriendOnline) {
    styleOnline = styles.online1;
  }

  const handleProfile = () => {
    navigation.navigate("FriendProfile", { username: props.friend });
  };

  //il faudra remplacer l'image par l'uri/l de la photo des amis
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => handleProfile()}>
          <Image source={{ uri: photo }} style={styles.photoFriend} />
        </TouchableOpacity>
      </View>
      <View style={styles.friendonline}>
        <Text style={styles.textUser}>{props.friend}</Text>
      </View>
      <View style={styles.iconfriend}>
        <Text style={styleOnline}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffffaa",
    elevation: 1,
    borderRadius: 10,
    margin: 5,
  },
  textUser: {
    color: "#CE2174",
    fontSize: 18,
    width: 180,
    textAlign: "center",
  },
  online: {
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
    justifyContent: "center",
    width: 100,
    height: 30,
    alignItems: "center",
  },
  photoFriend: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  iconfriend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 50,
  },
});
