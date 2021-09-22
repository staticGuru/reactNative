/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Preview = ({navigation,route}) => {
     console.log(route.params.reportedText,"reportedText")
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.params.reportedText}</Text>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
     container:{flex:1, margin:10,},
     text:{fontSize:18,}
});
