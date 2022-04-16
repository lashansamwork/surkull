import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, FlatList, SafeAreaView } from 'react-native';
import layout from '../theme/layout';
import { Appbar, Headline, Caption, List, Divider, Button } from 'react-native-paper'
import colors from '../theme/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


function InterestInfoScreen({ route, navigation }) {

  const { userBio } = route.params || {};
  const usersCollection = firestore().collection('Users');

  const [interests, setInterests] = useState([
    {
      id: 1,
      title: 'Chess',
      selected: false
    },
    {
      id: 2,
      title: 'Reading',
      selected: false
    },
    {
      id: 3,
      title: 'Photography',
      selected: false
    },
    {
      id: 4,
      title: 'Design',
      selected: false
    },
    {
      id: 5,
      title: 'Blog writing',
      selected: false
    },
    {
      id: 6,
      title: 'Dancing',
      selected: false
    },
  ]);

  const onSavePressed =  () => {
    auth()
    .createUserWithEmailAndPassword(userBio.email, userBio.password)
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });

    usersCollection.doc(userBio.email.toLowerCase())
    .set({
      name: userBio.name,
      location: userBio.location,
      dob: userBio.dob,
      gender: userBio.gender,
      email: userBio.email.toLowerCase(),
      interests: interests.filter((interest)=>interest.selected).map((interest)=>interest.title)
    })
    .then(() => {
      console.log('User added!');
    });


  };

  return (
    <View style={styles.container}>
      <Appbar style={layout.appBar}/>
      <Headline>Interests</Headline>
      <Caption>Select what activities suites best for your character</Caption>
        <View style={{ padding: layout.padding.xxxLarge, width: '100%', flex: 1 }}>
          <FlatList
            data={interests}
            style={{ flex: 1, width: '100%'}}
            renderItem={({ item, index })=> <List.Item
              theme={item.selected && { colors: { text: colors.themeLightColors.primary }}}
              onPress={()=> {
                const updatedInterests = [...interests]; 
                updatedInterests[index] = { ...item, selected: !item.selected}
                setInterests(updatedInterests);
              }}
              title={item.title}
              left={props => item.selected? <List.Icon {...props} icon="decagram" /> :  <List.Icon {...props} icon="decagram-outline" />}
            />}
            ItemSeparatorComponent={Divider}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge*2, paddingHorizontal: layout.padding.xxxLarge, flex: 0.5 }}>
          <Button mode="contained" onPress={() => onSavePressed()}>
              Save
            </Button>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default InterestInfoScreen;
