import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../context-store/AuthContextProvider';
import { Avatar, Caption, Divider, List } from 'react-native-paper';
import layout from '../theme/layout';
import FullScreenLoading from '../component/FullScreenLoading';
import _ from 'lodash';

function ChatScreen({ navigation }) {
  const chatRoomCollection = firestore().collection('ChatRooms');
  const { user: userObject } = React.useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    chatRoomCollection.where('emails', 'array-contains', userObject.email).get().then((chatRooms)=>{
      const chatsArray = chatRooms.docs.map((chatRoomInfo)=>{
        const roomPeople = chatRoomInfo.data().users.filter((user)=>user.email!==userObject.email);
        if(roomPeople.length == 0) {
          return null;
        }
        let title = `${_.initial(roomPeople).map((user)=>user.name).join(', ')}`;
        if(roomPeople.length > 1) {
          title+= `and ${ roomPeople[roomPeople.length-1].name}`
        } else {
          title+= roomPeople[roomPeople.length-1].name;
        }
        return {
          ...chatRoomInfo.data(),
          path: chatRoomInfo.ref.path,
          title
        };
      });
      setChatRooms(chatsArray.filter(Boolean));
      setLoading(false);
      setRefresh(false);
    });
  }, [refresh]);

  const onGroupPressed = (item) => {
    navigation.navigate('MessageScreen', { roomInfo: item });
  }

  if(loading) {
    return (<FullScreenLoading/>);
  }


  return (
    <View style={styles.container}>
        <FlatList
          refreshing={refresh}
          onRefresh={()=> setRefresh(true)}
          style={{ width: '100%'}}
          contentContainerStyle={{ padding: layout.padding.xxxLarge }}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={<Caption>No chats available</Caption>}
          data={chatRooms}
          renderItem={({ item })=><List.Item
            onPress={()=>onGroupPressed(item)}
            title={item.title}
            left={props => <Avatar.Image size={50} source={{ uri: 'https://picsum.photos/200'}}/>}
          />}
          keyExtractor={(item, index) => index}
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
