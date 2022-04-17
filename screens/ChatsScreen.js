import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../context-store/AuthContextProvider';
import { Caption } from 'react-native-paper';
import layout from '../theme/layout';
import FullScreenLoading from '../component/FullScreenLoading';

function ChatScreen() {
  const chatRoomCollection = firestore().collection('Users');
  const { user: userObject } = React.useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    chatRoomCollection.doc(userObject.email).collection('ChatRooms').get().then((chatRooms)=>{
      const chatsArray = chatRooms.docs.map((chatRoomInfo)=>{
        return {
          roomId: chatRoomInfo.data().roomId,
          users: chatRoomInfo.data().users,
          avatar: chatRoomInfo.data().avatar
        };
      })
      setChatRooms(chatsArray);
      setLoading(false);
      setRefresh(false);
    })
  }, [refresh]);

  if(loading) {
    return (<FullScreenLoading/>);
  }


  return (
    <View style={styles.container}>
        <FlatList
          refreshing={refresh}
          onRefresh={()=> setRefresh(true)}
          contentContainerStyle={{ padding: layout.padding.xxxLarge }}
          ListEmptyComponent={<Caption>No chats available</Caption>}
          data={chatRooms}
          renderItem={()=><></>}
          keyExtractor={(item) => item.id}
        />
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

export default ChatScreen;
