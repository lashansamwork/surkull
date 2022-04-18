import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, Image } from 'react-native';
import { Banner } from 'react-native-paper';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { AuthContext } from '../context-store/AuthContextProvider';
const _ = require('lodash');
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

function MessageScreen({ route, navigation }) {
  const { roomInfo } = route.params || {};
  const [messages, setMessages] = useState([]);
  const { user: userObject } = React.useContext(AuthContext);
  const currentUser = roomInfo.users.find((user)=>user.email == userObject.email);
  const [bannerVisible, setBannerVisible] = useState(true);
  const usersCollection = firestore().collection('Users');
  const messagesCollection = firestore().doc(roomInfo.path).collection('Messages');
  useEffect(() => {
    setTimeout(()=>{
      setBannerVisible(false);
    }, 2000)

    const subscriber = messagesCollection.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const updatedMessages = querySnapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: moment(doc.data().createdAt.toDate()),
        text: doc.data().text,
        user: doc.data().user
      }))
      setMessages(updatedMessages);
    });

    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    const { _id, createdAt, text, user } = messages[0];
    messagesCollection.add({
      _id, createdAt, text, user
    })
  }, [])

  const onAvatarPress = async (item) => {
    const userInfo = await usersCollection.doc(item._id).get();
    navigation.navigate('ProfileScreen', { user: userInfo.data() })
  }

  return (<View style={styles.container}>
      <Banner
        visible={bannerVisible}
        actions={[]}
      >
        Welcome to your new Surkull! Say Hi to {roomInfo.title}
      </Banner>
      <GiftedChat
        messages={messages}
        showUserAvatar={true}
        renderInputToolbar={(props)=><InputToolbar {...props} textInputStyle={{ color: 'black' }}/>}
        onPressAvatar={onAvatarPress}
        renderBubble={(props)=> <Bubble {...props} 
        textStyle={{
          left: {
            color: 'black'
          }
        }}
        wrapperStyle={{
            left: {
              backgroundColor: '#D3D3D3',
            }
          }} />}
        renderAvatarOnTop={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: userObject.email,
          avatar: currentUser.avatar
        }}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  }
});

export default MessageScreen;
