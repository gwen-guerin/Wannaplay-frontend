import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { Select } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import IPAdress from '../IPAdress';

export default function UpdateProfile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [age, setAge] = useState(0);
  const [teacher, setTeacher] = useState(false);
  const [city, setCity] = useState(false);
  const [description, setDescription] = useState('');
  const [instruments, setInstruments] = useState([]);
  const [instruTaught, setInstruTaught] = useState([]);

  //FONCTIONS POUR DELETE INSTRU/TEACHING
  const handleDeleteInstru = (instru) => {
    setInstruments(instruments.filter((data) => data != instru));
  };
  const handleDeleteInstruTaught = (instru) => {
    setInstruTaught(instruTaught.filter((data) => data !== instru));
  };
  // FONCTION POUR AJOUTER UN INSTRUMENT JOUé ET DISPLAY
  function onSelectedInstru(itemAdded) {
    let added = false;
    instruments.map((data) => {
      if (data == itemAdded) {
        added = true;
      }
    });
    if (!added) {
      setInstruments((instruments) => [...instruments, itemAdded]);
    }
  }
  const mapInstru = instruments.map((instru, i) => {
    return (
      <View key={i} style={styles.instruCard}>
        <Text style={styles.instruText}>{instru}</Text>
        <Entypo
          name="cross"
          size={20}
          color="black"
          onPress={() => handleDeleteInstru(instru)}
        />
      </View>
    );
  });

  // FONCTION POUR AJOUTER UN INSTRU A ENSEIGNER
  function onSelectedInstruTaught(itemAdded) {
    let addTeach = false;
    instruTaught.map((data) => {
      if (data == itemAdded) {
        addTeach = true;
      }
    });
    if (!addTeach) {
      setInstruTaught((instruTaught) => [...instruTaught, itemAdded]);
    }
  }
  const mapInstruTaught = instruTaught.map((instru, i) => {
    return (
      <View key={i} style={styles.instruCard}>
        <Text style={styles.instruText}>{instru}</Text>
        <Entypo
          name="cross"
          size={20}
          color="black"
          onPress={() => handleDeleteInstruTaught(instru)}
        />
      </View>
    );
  });

  // ROUTE POST DES DONNEES DU FORM EN DB
  const handleFormSubmit = () => {
    fetch(`http://${IPAdress}:3000/users/updateProfile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        age,
        teacher: instruTaught,
        tags: instruments,
        description,
        status: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(login({ username: data.username }));
      });
    navigation.navigate('TabNavigator');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/illu_02.jpg')}
        imageStyle={{ opacity: 0.25 }}
        style={styles.imgBack}
      >
        <ScrollView>
          <View style={styles.scrollContainer}>
            <View>
              <Text style={styles.inputText}>How old are you ?</Text>
              <Slider
                step={1}
                minimumValue={7}
                maximumValue={100}
                value={25}
                onValueChange={(slideValue) => setAge(slideValue)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
              />
              <View style={styles.ageTextContainer}>
                <Text style={styles.ageText}>I am {age} years old</Text>
              </View>
            </View>
            <TextInput
              style={styles.inputText}
              placeholder="Where do you live ?"
              placeholderTextColor="#ffffffaa"
              onChangeText={(city) => setCity(city)}
            />
            <View>
              <Text style={styles.inputText}>
                Do you wanna teach something ?
              </Text>
              <Picker
                selectedValue={teacher}
                onValueChange={(teacher) => {
                  setTeacher(teacher), setInstruTaught([]);
                }}
              >
                <Picker.Item
                  style={styles.instruText}
                  label="No"
                  value={false}
                />
                <Picker.Item
                  style={styles.instruText}
                  label="Yes"
                  value={true}
                />
              </Picker>
            </View>
            {/* Conditionnal rendering if he/she wanna teach something (needs to choose what) */}
            <View style={{ marginTop: -30 }}>
              {teacher ? (
                <View>
                  <View style={styles.inputText}>
                    <Select
                      placeholderTextColor="white"
                      variant="unstyled"
                      selectedValue={instruTaught}
                      minWidth="200"
                      placeholder="What do you wanna teach ?"
                      fontSize={22}
                      onValueChange={(itemValue) =>
                        onSelectedInstruTaught(itemValue)
                      }
                    >
                      <Select.Item label="Singing" value="Singing" />
                      <Select.Item label="Guitar" value="Guitar" />
                      <Select.Item label="Drums" value="Drums" />
                      <Select.Item label="Piano" value="Piano" />
                      <Select.Item label="Bass" value="Bass" />
                      <Select.Item label="Trumpet" value="Trumpet" />
                      <Select.Item label="Violin" value="Violin" />
                      <Select.Item label="Saxophone" value="Saxo" />
                      <Select.Item label="Flute" value="Flute" />
                      <Select.Item label="Harmonica" value="Harmonica" />
                      <Select.Item label="Beatmaker" value="Beatmaker" />
                      <Select.Item label="Beatbox" value="Beatbox" />
                      <Select.Item label="Banjo" value="Banjo" />
                      <Select.Item label="Harp" value="Harp" />
                      <Select.Item label="Clarinet" value="Clarinet" />
                      <Select.Item label="Oboe" value="Oboe" />
                      <Select.Item label="Synthetiser" value="Synthe" />
                    </Select>
                  </View>
                  <View style={styles.instruContainer}>{mapInstruTaught}</View>
                </View>
              ) : null}
            </View>
            <View>
              <View style={styles.inputText}>
                <Select
                  placeholderTextColor="white"
                  variant="unstyled"
                  selectedValue={instruments}
                  minWidth="200"
                  placeholder="What do you play ?"
                  fontSize={25}
                  onValueChange={(itemValue) => onSelectedInstru(itemValue)}
                >
                  <Select.Item label="Singer" value="Singer" />
                  <Select.Item label="Guitar" value="Guitar" />
                  <Select.Item label="Drums" value="Drums" />
                  <Select.Item label="Piano" value="Piano" />
                  <Select.Item label="Bass" value="Bass" />
                  <Select.Item label="Trumpet" value="Trumpet" />
                  <Select.Item label="Violin" value="Violin" />
                  <Select.Item label="Saxophone" value="Saxo" />
                  <Select.Item label="Flute" value="Flute" />
                  <Select.Item label="Harmonica" value="Harmonica" />
                  <Select.Item label="Beatmaker" value="Beatmaker" />
                  <Select.Item label="Beatbox" value="Beatbox" />
                  <Select.Item label="Banjo" value="Banjo" />
                  <Select.Item label="Harp" value="Harp" />
                  <Select.Item label="Clarinet" value="Clarinet" />
                  <Select.Item label="Oboe" value="Oboe" />
                  <Select.Item label="Synthetiser" value="Synthe" />
                </Select>
              </View>
              <View style={styles.instruContainer}>{mapInstru}</View>
            </View>
            <TextInput
              style={styles.inputText}
              placeholder="Describe yourself in a few words ..."
              placeholderTextColor={'#ffffff'}
              multiline={true}
              onChangeText={(text) => setDescription(text)}
              value={description}
              maxLength={300}
            />
            <TouchableOpacity
              style={styles.submitForm}
              onPress={() => handleFormSubmit()}
            >
              <Text style={{ fontSize: 25, color: '#ffffff' }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  imgBack: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(80,0,0,0.3)',
  },
  scrollContainer: {
    height: 900,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  inputText: {
    color: '#ffffff',
    fontSize: 25,
    backgroundColor: '#CE2174aa',
    borderRadius: 15,
    padding: 6,
  },
  submitForm: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#CE2174aa',
    borderRadius: 15,
    padding: 6,
  },
  instruCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#C5C5C5aa',
    padding: 5,
  },
  instruContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  instruText: {
    fontSize: 20,
  },
  ageTextContainer: {
    alignItems: "flex-end",
    marginBottom: -30,
  },
  ageText: {
    fontSize: 30,
  },
});
