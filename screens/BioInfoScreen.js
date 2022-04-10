import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Appbar, Avatar, TextInput, ToggleButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import layout from '../theme/layout';

function BioInfoScreen() {

  const genderTypes = ['Male', 'Female'];
  const dobStart = new Date();
  dobStart.setFullYear(dobStart.getFullYear() - 18);

  const [userBio, setUserBio] = useState({
    imageUrl: null,
    name: null,
    email: null,
    location: null,
    dob: dobStart,
    gender: genderTypes[0]
  });

  const [open, setOpen] = useState(false)

  return (
    <View style={styles.container}>
      <Appbar style={layout.appBar}/>
      <DatePicker
        modal
        open={open}
        date={userBio.dob}
        onConfirm={(date) => {
          setOpen(false)
          setUserBio({ ...userBio, dob: date })
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Avatar.Image size={125} source={userBio.imageUrl} />
      </View>
      <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
        <TextInput
          label="Name"
          mode='outlined'
          style={{ marginHorizontal: layout.padding.xxxLarge }}
          value={userBio.name}
          onChangeText={name => setUserBio({ ...userBio, name })}
        />
      </View>
      <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
        <TextInput
          mode='outlined'
          label="Email"
          style={{ marginHorizontal: layout.padding.xxxLarge }}
          value={userBio.email}
          onChangeText={email => setUserBio({ ...userBio, email })}
        />
      </View>
      <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
        <TextInput
          mode='outlined'
          label="Location ( Postal code )"
          style={{ marginHorizontal: layout.padding.xxxLarge }}
          value={userBio.location}
          onChangeText={location => setUserBio({ ...userBio, location })}
        />
      </View>
      <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
        <TextInput
          mode='outlined'
          label="Date Of Birth"
          style={{ marginHorizontal: layout.padding.xxxLarge }}
          value={userBio.dob.toLocaleDateString("en-US")}
          onFocus={()=>{setOpen(true)}}
          onChangeText={()=>{}}
        />
      </View>
      <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
        <ToggleButton.Row
          onValueChange={gender => setUserBio({ ...userBio, gender })}
          value={userBio.gender}
        >
          <ToggleButton icon={<Text>Male</Text>} value="Male"></ToggleButton>
          <ToggleButton value="Female"><Text>Female</Text></ToggleButton>
        </ToggleButton.Row>
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

export default BioInfoScreen;
