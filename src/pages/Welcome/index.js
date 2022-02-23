import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
};

export default Welcome;
