import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TextEdit = () => {
  var strArray = '';
  var output = '';
  var outputArray = [];
  function Edit(data) {
    strArray = data.split(' ');
    output = strArray.forEach((value, index) => {
      if (value.startsWith('@')) {
        return outputArray.push(
          <Text style={{color: 'blue'}} onPress={() => console.log('clicked')}>
            {value}{' '}
          </Text>,
        );
      } else {
        return outputArray.push(<Text style={{color: 'black'}}>{value} </Text>);
      }
    });
    console.log(outputArray);
    return strArray ? (
      <Text>{outputArray.map(e => e)}</Text>
    ) : (
      <Text>no text</Text>
    );
  }
  return (
    <View>{Edit('Hi @Guruvignesh, how are you? I am fine @sommesh')}</View>
  );
};

export default TextEdit;

const styles = StyleSheet.create({});
