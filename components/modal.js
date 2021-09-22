/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Modal = ({inputData, getInputValue, inputValue,setValue}) => {
  const [data, setData] = useState([]);
  var Topic = [
    {
      name: 'parallel_database_alignment',
      subTitle: 'CEO letter cover',
      votes: '5',
      answer: '14',
    },
    {
      name: 'parallel_alignment',
      subTitle: 'CEO letter cover',
      votes: '5',
      answer: '14',
    },
    {
      name: 'parallel_database_alignment',
      subTitle: 'CEO letter cover',
      votes: '5',
      answer: '14',
    },
    {
      name: 'parallel_alignment',
      subTitle: 'CEO letter cover',
      votes: '5',
      answer: '14',
    },
    {
      name: 'parallel_database_alignment',
      subTitle: 'CEO letter cover',
      votes: '5',
      answer: '14',
    },
    {
      name: 'parallel_database_alignment',
      subTitle: 'CEO letter cover',
      votes: '5',
      answer: '14',
    },
  ];
  var User = [
    {
      name: 'Tony_stark_Brighten',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
    {
      name: 'Tony_stark_Brighten',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
    {
      name: 'Tony_stark_Brighten',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '5',
      answer: '14',
    },
  ];
  useEffect(() => {
    if (inputData === 'Topic') {
      setData(Topic);
    } else if (inputData === 'User') {
      setData(User);
    } else {
      setData([]);
    }
  }, [inputData]);

  const HandleInputText = value => {
    console.log(value);
    if (inputData == 'Topic') {
      getInputValue(inputValue + value + ' ');
      setValue(value)
    }
    if (inputData == 'User') {
      getInputValue(inputValue + value + ' ');
      setValue(value)
    }
  };

  return (
    <ScrollView>
      {data.length !== 0 &&
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => HandleInputText(item.name)}>
            <View style={styles.leftItem}>
              <Image
                source={require('../assets/profile.png')}
                style={{width: 40, height: 40}}
              />
            </View>
            <View style={styles.rightItem}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.name}>{item.name}</Text>
                <Image
                  source={require('../assets/quality.png')}
                  style={{width: 15, height: 15,top:5,left:3}}
                />
              </View>

              <Text style={styles.subTitle}>{item.subTitle}</Text>
              <View style={styles.response}>
                <Text style={styles.votes}>{item.votes} votes</Text>
                <Text style={styles.answer}>{item.answer} answers</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  rightItem: {
    flex: 4,
  },
  leftItem: {
    flex: 1,
  },
  votes: {
    flex: 1,
    color: '#664E88',
  },
  answer: {
    flex: 4,
    color: '#664E88',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  response: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    //     borderWidth: 0.5,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    //     borderRadius: 10,
    //     borderColor: 'gray',
    //     marginBottom: 30,
    //     borderWidth: 0.5,
    //     borderRadius: 10,
    //     borderColor: 'gray',
    padding: 10,
    //     padding: 20,
  },
});
