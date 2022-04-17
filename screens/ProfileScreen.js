import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Avatar, Headline, Subheading, Chip, Paragraph, Button } from 'react-native-paper';
import layout from '../theme/layout';
import { AuthContext } from '../context-store/AuthContextProvider';
import firestore from '@react-native-firebase/firestore';
import images from '../theme/images'
import { ScrollView } from 'react-native-gesture-handler';

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

  const onJoinPress = () => {
    console.log('tadaaa....');
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
