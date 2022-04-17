import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Avatar, Headline, Subheading, Chip, Paragraph, Button } from 'react-native-paper';
import layout from '../theme/layout';
import { AuthContext } from '../context-store/AuthContextProvider';
import firestore from '@react-native-firebase/firestore';
import images from '../theme/images'
import { ScrollView } from 'react-native-gesture-handler';
const geolib = require('geolib');
import moment from 'moment';

function ProfileScreen({ route, navigation }) {

  const { user } = route.params || {};
  const { user: userObject } = React.useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(null);
  const usersCollection = firestore().collection('Users');

  useEffect(()=>{
    if(!user && userObject.email) {
      usersCollection.doc(userObject.email).get().then((user)=>{
        console.log("🚀 ~ file: ProfileScreen.js ~ line 19 ~ firestore ~ user", user);
        const userInfo = user.data();
        userInfo && setProfileInfo(userInfo);
      })
    }
  }, []);

  const onJoinPress = async () => {
    const matchedProfiles = [];
    const usersWithSameInterests = await usersCollection.where('email', '!=', profileInfo.email).where('interests', 'array-contains-any', profileInfo.interests)
    .get();
    const myDOBPreferenceMin = moment(profileInfo.dob.toDate()).subtract({ years: 5 }).format("MM-DD-YYYY");
    const myDOBPreferenceMax = moment(profileInfo.dob.toDate()).add({ years: 5 }).format("MM-DD-YYYY");
    usersWithSameInterests.docs.forEach(user => {
      const profileObject = user.data();
      const profileDOB = moment(profileObject.dob.toDate()).format("MM-DD-YYYY");
      const distance = geolib.getDistance(profileObject.geoCoordinates, profileObject.geoCoordinates);
      if(10000 > distance && moment(profileDOB).isBetween(myDOBPreferenceMin, myDOBPreferenceMax)) {
        matchedProfiles.push(profileObject);
      }    
    });


  }

  if(!profileInfo) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
        <ScrollView style={{ flex: 1, width: '100%'}}>
          <View style={{ padding: layout.padding.xxxLarge }}/>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image size={125} source={images.avatar} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Headline>{profileInfo.name}</Headline>
            <Subheading>{profileInfo.location}</Subheading>
          </View>
          <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: layout.padding.xxxLarge, paddingBottom: layout.padding.xxxLarge }}>
            <Subheading>My Top Interests</Subheading>
            <View style={{ flexDirection: 'row', paddingTop: layout.padding.medium, paddingBottom: layout.padding.large }}>
              {profileInfo.interests.map((interest, index)=><Chip style={{ marginHorizontal: layout.padding.small }} key={`${index}_chip`}>{interest}</Chip>)}
            </View>
            <Subheading>About Me</Subheading>
            <Paragraph numberOfLines={10} >{profileInfo.aboutMe}</Paragraph>
          </View>
          <Button mode='contained' style={{ margin: layout.padding.xxxLarge }} onPress={onJoinPress}>
            <Subheading>Join a new Surkull!</Subheading>
          </Button>
          <View style={{ padding: layout.padding.xxxLarge }}></View>
        </ScrollView>
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

export default ProfileScreen;
