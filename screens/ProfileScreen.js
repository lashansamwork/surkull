import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Avatar, Headline, Subheading, Chip, Paragraph, Button, Banner } from 'react-native-paper';
import layout from '../theme/layout';
import { AuthContext } from '../context-store/AuthContextProvider';
import firestore from '@react-native-firebase/firestore';
import images from '../theme/images'
import { ScrollView } from 'react-native-gesture-handler';
const geolib = require('geolib');
import moment from 'moment';
import colors from '../theme/colors';
import FullScreenLoading from '../component/FullScreenLoading';

function ProfileScreen({ route, navigation }) {

  const { user } = route.params || {};
  const { user: userObject } = React.useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(user);
  const [groupError, setGroupError] = useState(false);
  const usersCollection = firestore().collection('Users');
  const chatRoomsCollection = firestore().collection('ChatRooms');
  const adminPreference = firestore().collection('AdminPreference');
  const [preferences, setPreferences] = useState({ ageDifference: 5, locationDistance: 10000 });

  useEffect(()=>{
    if(!user && userObject.email) {
      usersCollection.doc(userObject.email).get().then((user)=>{
        const userInfo = user.data();
        userInfo && setProfileInfo(userInfo);
      })
    }

    adminPreference.get().then((res)=>{
      const preferences = res.docs[0].data();
      setPreferences(preferences);
    });


  }, []);

  const onJoinPress = async () => {
    const { ageDifference, locationDistance } = preferences;
    const matchedProfiles = [];
    const usersWithSameInterests = await usersCollection.where('email', '!=', profileInfo.email).where('interests', 'array-contains-any', profileInfo.interests)
    .get();
    const myDOBPreferenceMin = moment(profileInfo.dob.toDate()).subtract({ years: ageDifference }).format("MM-DD-YYYY");
    const myDOBPreferenceMax = moment(profileInfo.dob.toDate()).add({ years: ageDifference }).format("MM-DD-YYYY");
    usersWithSameInterests.docs.forEach(user => {
      const profileObject = user.data();
      const profileDOB = moment(profileObject.dob.toDate()).format("MM-DD-YYYY");
      const distance = geolib.getDistance(profileObject.geoCoordinates, profileObject.geoCoordinates);
      if(locationDistance > distance && moment(profileDOB).isBetween(myDOBPreferenceMin, myDOBPreferenceMax)) {
        matchedProfiles.push(profileObject);
      }    
    });
    matchedProfiles.push(profileInfo);
    //find the room already exists
    const matchedEmails = matchedProfiles.map((user)=>user.email).sort();
    const roomsExists = await chatRoomsCollection.where('emails', 'in', [matchedEmails]).get();

    if(roomsExists.docs.length == 0) {
      //create a room with matched profiles
      chatRoomsCollection.add({
        emails: matchedEmails,
        users: matchedProfiles,
        avatar: null
      });
    } else {
      setGroupError(true);
    }
  }

  if(!profileInfo) {
    return <FullScreenLoading/>
  }

  return (
    <View style={styles.container}>
        <Banner
          visible={groupError}
          style={{ width: '100%', backgroundColor: colors.themeLightColors.primaryLight}}
          actions={[
            {
              label: 'Okay',
              onPress: () => setGroupError(false),
              style: { backgroundColor: 'white' }
            }
          ]}
        >
          No matching groups found, try again later or try different interests
        </Banner>
        <ScrollView style={{ flex: 1, width: '100%'}}>
          <View style={{ padding: layout.padding.xxxLarge }}/>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image size={125} source={{ uri: profileInfo.avatar}} />
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
          {!user && <Button mode='contained' style={{ margin: layout.padding.xxxLarge }} onPress={onJoinPress}>
            <Subheading>Join a new Surkull!</Subheading>
          </Button>}
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
