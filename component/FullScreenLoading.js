import React, { useState, useRef, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, Linking, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../theme/colors';

function FullScreenLoading() {
    return (<View style={{ ...styles.container, justifyContent: 'center'}}>
    <ActivityIndicator animating={true} color={colors.themeLightColors.primary} />
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default FullScreenLoading;
