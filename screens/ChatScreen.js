import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import layout from '../theme/layout';

function ChatScreen() {

  return (
    <View style={styles.container}>
        <Text>Chat tab</Text>
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
