import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { HelperText, Avatar, TextInput, Caption, ToggleButton, Button, IconButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import layout from '../theme/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from '../theme/colors';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

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
    confirmPassword: false,
    aboutMe: false,
  }
  dobStart.setFullYear(dobStart.getFullYear() - 18);

  const [userBio, setUserBio] = useState({
    imageUrl: require('../assets/male-placeholder.jpeg'),
    name: null,
    email: null,
    location: null,
    dob: dobStart,
    gender: genderTypes[0],
    password: null,
    aboutMe: null,
  });

  const [userBioErrors, setUserBioErrors] = useState(noErrorState);

  const [open, setOpen] = useState(false);

  const onNextPressed =  () => {
    Platform.OS == 'ios' && Geolocation.requestAuthorization();
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

  const onUploadPhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo'});
    console.log("🚀 ~ file: BioInfoScreen.js ~ line 69 ~ onUploadPhoto ~ result", result);
   
    const { uri, fileName } = result.assets[0];
    const reference = storage().ref(fileName);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const res = await reference.putFile(uploadUri);
    const url = await storage().ref(res.metadata.fullPath).getDownloadURL();
    setUserBio({ ...userBio, imageUrl: { uri: url} })
  }

  return (
    <View style={styles.container}>
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
          <IconButton
            icon="camera"
            style={{ position: 'absolute', bottom: 0, right: '30%' }}
            color={colors.themeLightColors.primary}
            size={30}
            onPress={() => onUploadPhoto()}
          />
          <HelperText type="error" visible={userBioErrors.imageUrl} style={{ marginHorizontal: layout.padding.medium }}>
            Avatar cannot be empty!
          </HelperText>
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
          <HelperText type="error" visible={userBioErrors.name} style={{ marginHorizontal: layout.padding.medium }}>
            Name is invalid!
          </HelperText>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            mode='outlined'
            label="Email"
            keyboardType="email-address"
            error={userBioErrors.email}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.email}
            onChangeText={email => setUserBio({ ...userBio, email })}
          />
          <HelperText type="error" visible={userBioErrors.email} style={{ marginHorizontal: layout.padding.medium }}>
            Email is invalid!
          </HelperText>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            mode='outlined'
            label="Password"
            secureTextEntry
            error={userBioErrors.password}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.password}
            onChangeText={password => setUserBio({ ...userBio, password })}
          />
          <HelperText type="error" visible={userBioErrors.password} style={{ marginHorizontal: layout.padding.medium }}>
            Password is invalid!
          </HelperText>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            mode='outlined'
            label="Confirm Password"
            secureTextEntry
            error={userBioErrors.confirmPassword}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.confirmPassword}
            onChangeText={confirmPassword => setUserBio({ ...userBio, confirmPassword })}
          />
          <HelperText type="error" visible={userBioErrors.confirmPassword} style={{ marginHorizontal: layout.padding.medium }}>
            Password does not match!
          </HelperText>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            mode='outlined'
            label="About me"
            error={userBioErrors.aboutMe}
            style={{ marginHorizontal: layout.padding.xxxLarge, height: 100, textAlignVertical: 'top'  }}
            value={userBio.aboutMe}
            multiline
            numberOfLines={5}
            onChangeText={aboutMe => setUserBio({ ...userBio, aboutMe })}
          />
          <HelperText type="error" visible={userBioErrors.aboutMe} style={{ marginHorizontal: layout.padding.medium }}>
            About me is invalid!
          </HelperText>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput
            mode='outlined'
            label="City"
            error={userBioErrors.location}
            style={{ marginHorizontal: layout.padding.xxxLarge }}
            value={userBio.location}
            onChangeText={location => setUserBio({ ...userBio, location })}
          />
          <HelperText type="error" visible={userBioErrors.location} style={{ marginHorizontal: layout.padding.medium }}>
            City is invalid!
          </HelperText>
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
            <ToggleButton style={{ width: '50%', backgroundColor: userBio.gender === genderTypes[0]? colors.themeLightColors.primary : 'transparent' }} icon={()=> <Text style={{ color: 'black' }}>Male</Text>} value={genderTypes[0]} />
            <ToggleButton size={50} style={{ width: '50%', backgroundColor: userBio.gender === genderTypes[1]? colors.themeLightColors.primary : 'transparent'  }} icon={()=> <Text style={{ color: 'black' }}>Female</Text>} value={genderTypes[1]} />
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
