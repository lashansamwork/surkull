import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Avatar, Headline, Subheading, Chip, Paragraph } from 'react-native-paper';
import layout from '../theme/layout';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context-store/AuthContextProvider';
import firestore from '@react-native-firebase/firestore';
import images from '../theme/images'

function ProfileScreen({ route, navigation }) {

  const { user } = route.params || {};
  const { user: userObject } = React.useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(()=>{
    if(!user && userObject.email) {
      firestore().collection('Users').doc(userObject.email).get().then((user)=>{
        const userInfo = user.data();
        userInfo && setProfileInfo(userInfo);
      })
    }
  }, []);

  if(!profileInfo) {
    return <Text>Loading</Text>
  }

  return (
    <View style={styles.container}>
        <View style={{ padding: layout.padding.xxxLarge }}/>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar.Image size={125} source={images.avatar} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Headline>{profileInfo.name}</Headline>
          <Subheading>{profileInfo.location}</Subheading>
        </View>
        <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: layout.padding.xxxLarge }}>
          <Subheading>My Top Interests</Subheading>
          <View style={{ flexDirection: 'row', paddingTop: layout.padding.medium, paddingBottom: layout.padding.large }}>
            {profileInfo.interests.map((interest)=><Chip style={{ marginHorizontal: layout.padding.small }}>{interest}</Chip>)}
          </View>
          <Subheading>About Me</Subheading>
          <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas odio non elementum imperdiet. Ut at ligula ornare, efficitur libero quis, malesuada arcu. Etiam eu dui quis turpis aliquet malesuada in ut elit. Suspendisse potenti. Mauris arcu justo, luctus quis lacinia a, ullamcorper vel turpis. Pellentesque laoreet at neque vel sagittis. Praesent ultricies, nunc sit amet accumsan molestie, massa sem viverra ipsum, ut elementum turpis purus nec odio</Paragraph>
        </View>
        <Text onPress={()=>{
          auth()
          .signOut()
          .then(() => console.log('User signed out!'));
        }}>Logout</Text>
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
