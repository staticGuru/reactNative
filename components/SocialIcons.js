/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
const SocialIcons = () => {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="placeholder"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <Pressable style={styles.box} onPress={() => console.log('Press Enter')}>
            <Text sytle={styles.value}>guru</Text>
          </Pressable>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
          <View style={styles.box}>
            <Text sytle={styles.value}>G</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  scrollView: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    //     flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    opacity: 0.7,
    //     padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    //   flex:1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
