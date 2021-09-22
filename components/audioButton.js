/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const FlatButton = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
     button:{
          width: 100,
          borderRadius:8,
          paddingVertical:18,
          paddingHorizontal:10,
          backgroundColor:'#f01d71',
     },
     text:{
          color:'white',
          fontWeight:'bold',
          textTransform:'uppercase',
          fontSize:16,
          textAlign:'center'
     }
  

});
