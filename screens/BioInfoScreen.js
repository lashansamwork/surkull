import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Appbar, Avatar, TextInput, Caption, ToggleButton, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import layout from '../theme/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from '../theme/colors';

function BioInfoScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const genderTypes = ['Male', 'Female'];
  const dobStart = new Date();
  const noErrorState = {
    imageUrl: false,
    name: false,
    email: false,
    location: false,
    dob: false,
    password: false,
    confirmPassword: false
  }
  dobStart.setFullYear(dobStart.getFullYear() - 18);

  const [userBio, setUserBio] = useState({
    imageUrl: require('../assets/male-placeholder.jpeg'),
    name: null,
    email: null,
    location: null,
    dob: dobStart,
    gender: genderTypes[0],
    password: null
  });

  const [userBioErrors, setUserBioErrors] = useState(noErrorState);

  const [open, setOpen] = useState(false);

  const onNextPressed =  () => {
    setUserBioErrors(noErrorState);
    const errorState = {};
    let noErrors = true;
    for (const [key, value] of Object.entries(userBio)) {
      if(!!!value) {
        errorState[key] = true;
        noErrors = false;
      }
    }

    if(userBio['password'] !== userBio['confirmPassword']) {
      errorState.password = true;
      errorState.confirmPassword = true;
    }

    if(noErrors) {
      navigation.navigate('InterestInfoScreen', { userBio });
    } else {
      setUserBioErrors({...userBioErrors, ...errorState});
    }
  };

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
      <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: layout.padding.xxxLarge, paddingBottom: insets.bottom + 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar.Image size={125} source={userBio.imageUrl} />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
          <TextInput
            label="Name"
            mode='outlined'
            error={userBioErrors.name}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.name}
            onChangeText={name => setUserBio({ ...userBio, name })}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
          <TextInput
            mode='outlined'
            label="Email"
            keyboardType="email-address"
            error={userBioErrors.email}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.email}
            onChangeText={email => setUserBio({ ...userBio, email })}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
          <TextInput
            mode='outlined'
            label="Password"
            secureTextEntry
            error={userBioErrors.password}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.password}
            onChangeText={password => setUserBio({ ...userBio, password })}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
          <TextInput
            mode='outlined'
            label="Confirm Password"
            secureTextEntry
            error={userBioErrors.confirmPassword}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.confirmPassword}
            onChangeText={confirmPassword => setUserBio({ ...userBio, confirmPassword })}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
          <TextInput
            mode='outlined'
            label="Location ( Postal code )"
            error={userBioErrors.location}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.location}
            onChangeText={location => setUserBio({ ...userBio, location })}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge }}>
          <TextInput
            mode='outlined'
            label="Date Of Birth"
            error={userBioErrors.dob}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.dob.toLocaleDateString("en-US")}
            onFocus={()=>{setOpen(true)}}
            onChangeText={()=>{}}
          />
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge, paddingHorizontal: layout.padding.xxxLarge }}>
          <Caption style={{ paddingBottom: layout.padding.small }}>Gender</Caption>
          <ToggleButton.Row onValueChange={gender => setUserBio({ ...userBio, gender })} value={userBio.gender}>
            <ToggleButton style={{ width: '50%', backgroundColor: userBio.gender === genderTypes[0]? colors.themeLightColors.primaryLight : 'transparent' }} icon={()=> <Text style={{ color: 'black' }}>Male</Text>} value={genderTypes[0]} />
            <ToggleButton size={50} style={{ width: '50%', backgroundColor: userBio.gender === genderTypes[1]? colors.themeLightColors.primaryLight : 'transparent'  }} icon={()=> <Text style={{ color: 'black' }}>Female</Text>} value={genderTypes[1]} />
          </ToggleButton.Row>
        </View>
        <View style={{ width: '100%', paddingTop: layout.padding.xxxLarge*2, paddingHorizontal: layout.padding.xxxLarge }}>
          <Button mode="contained" onPress={() => onNextPressed()}>
              Next
            </Button>
        </View>
      </KeyboardAwareScrollView>
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
