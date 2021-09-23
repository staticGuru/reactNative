/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from './modal';
import {MentionInput} from '../src/lib/react-native-controlled-mentions';

const TextView = () => {
  const [inputValue, setInputValue] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [inputData, setInputData] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [count, setCount] = useState('invite experts');
  const [symbol, setSymbol] = useState('');
  const [value, setValue] = useState('');
  const [mentionInputValue, setMentionInputValue] = useState('');
  const [globelArray, setGlobelArray] = useState([]);
  const [backspace, setBackspace] = useState(false);
  var splitDataNumber = secondInputValue.split(' ').length;
  //   console.log(showUserModal, 'showUserModal');
  const textInputRef = useRef(null);

  const HandleInputChange = e => {
    //   // if(inputValue){
    //   //   setInputValue(e)
    //   // }else{
    //   setSecondInputValue(e);
    //   // }
    //   // HandleString('guru guru     @Tony_  guru');
  };

  const handleKeyPress = ({nativeEvent: {key: keyValue}}) => {
    if (keyValue === 'Backspace') {
      setBackspace(true);
    } else {
      setBackspace(false);
    }
    console.log(backspace, 'backspace');
  };

  const HandleString = str => {
    var stringSplitStart = str.search('@');
    var stringSplitEnd = 0;
    var strlen = str.length - stringSplitStart + 1;
    for (let i = stringSplitStart; i < str.length; i++) {
      if (str[i] == ' ') {
        stringSplitEnd = i;
        break;
      }
    }
    console.log(
      inputValue
        .split(' ')
        .filter(e => e !== '')
        .map(text => text.charAt(0)),
      'inputValue',
      secondInputValue,
      'secondInputValue',
      splitDataNumber,
    );

    // {str.replace(str.slice(stringSplitStart, stringSplitEnd),<Text style={{color:'red'}}>{str.slice(stringSplitStart, stringSplitEnd)}</Text>)}
    return (
      <Text>
        {str.substring(0, stringSplitStart)}
        <Text style={{color: 'red'}}>
          {str.slice(stringSplitStart, stringSplitEnd)}
        </Text>
        {str.substring(stringSplitEnd, str.length)}
      </Text>
    );
  };

  const suggestionsForHashtags = [
    {
      name: 'parallel_database_alignment',
      subTitle: 'CEO letter cover',
      votes: '1',
      answer: '14',
    },
    {
      name: 'parallel_alignment',
      subTitle: 'CEO letter cover',
      votes: '2',
      answer: '14',
    },
    {
      name: 'parallel_database_alignment',
      subTitle: 'CEO letter cover',
      votes: '3',
      answer: '14',
    },
    {
      name: 'parallel_alignment',
      subTitle: 'CEO letter cover',
      votes: '4',
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
      votes: '6',
      answer: '14',
    },
  ];
  const suggestions = [
    {
      name: 'Tony_stark_Brighten',
      subTitle: 'CEO in Bright Mind labs',
      votes: '1',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '2',
      answer: '14',
    },
    {
      name: 'Tony_stark_Brighten',
      subTitle: 'CEO in Bright Mind labs',
      votes: '3',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '4',
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
      votes: '6',
      answer: '14',
    },
    {
      name: 'Tony_stark',
      subTitle: 'CEO in Bright Mind labs',
      votes: '7',
      answer: '14',
    },
  ];

  const renderSuggestions = ({keyword, onSuggestionPress}) => {
    if (keyword == null) {
      return null;
    }
    // const value = 'Hello @[David Tabaka]! How are you?';
    if (backspace) {
      console.log(
        mentionInputValue.search(`@${keyword}`) + keyword.length + 1,
        mentionInputValue.length,
      );
      if (keyword.endsWith('..')) {
        return setMentionInputValue(
          mentionInputValue.replace(`@${keyword}`, ''),
        );
      } else if (
        mentionInputValue.search(`@${keyword}`) + keyword.length + 1 ===
          mentionInputValue.length &&
        mentionInputValue.length !== 1
      ) {
        return setMentionInputValue(
          mentionInputValue.replace(`@${keyword}`, ''),
        );
      } else {
        const start = mentionInputValue.search(`@${keyword}`);
        for (let i = start; i <= mentionInputValue.length; i++) {
          if (mentionInputValue.endsWith('...', i)) {
            setMentionInputValue(
              mentionInputValue.replace(mentionInputValue.slice(start, i), ''),
            );

            break;
          }
        }
      }
    }

    return (
      <ScrollView>
        {suggestions
          .filter(one =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .map(one => (
            <TouchableOpacity
              key={one.votes}
              style={styles.item}
              onPress={() => onSuggestionPress(one)}>
              <View style={styles.leftItem}>
                <Image
                  source={require('../assets/profile.png')}
                  style={{width: 40, height: 40}}
                />
              </View>
              <View style={styles.rightItem}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.name}>{one.name}</Text>
                  <Image
                    source={require('../assets/quality.png')}
                    style={{width: 15, height: 15, top: 5, left: 3}}
                  />
                </View>

                <Text style={styles.subTitle}>{one.subTitle}</Text>
                <View style={styles.response}>
                  <Text style={styles.votes}>{one.votes} votes</Text>
                  <Text style={styles.answer}>{one.answer} answers</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };
  const renderSuggestionsForHashtags = ({keyword, onSuggestionPress}) => {
    if (keyword == null) {
      return null;
    }
    if (backspace) {
      if (keyword.endsWith('..')) {
        setMentionInputValue(mentionInputValue.replace(`#${keyword}`, ''));
      } else if (
        mentionInputValue.search(`#${keyword}`) + keyword.length + 1 ===
          mentionInputValue.length &&
        mentionInputValue.length !== 1
      ) {
        return setMentionInputValue(
          mentionInputValue.replace(`#${keyword}`, ''),
        );
      } else {
        const start = mentionInputValue.search(`#${keyword}`);
        for (let i = start; i <= mentionInputValue.length; i++) {
          if (mentionInputValue.endsWith('...', i)) {
            setMentionInputValue(
              mentionInputValue.replace(mentionInputValue.slice(start, i), ''),
            );

            break;
          }
        }
      }

      // setMentionInputValue()
    }
    return (
      <ScrollView>
        {suggestionsForHashtags
          .filter(one =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .map(one => (
            <TouchableOpacity
              key={one.votes}
              style={styles.item}
              onPress={() => onSuggestionPress(one)}>
              <View style={styles.leftItem}>
                <Image
                  source={require('../assets/profile.png')}
                  style={{width: 40, height: 40}}
                />
              </View>
              <View style={styles.rightItem}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.name}>{one.name}</Text>
                  <Image
                    source={require('../assets/quality.png')}
                    style={{width: 15, height: 15, top: 5, left: 3}}
                  />
                </View>

                <Text style={styles.subTitle}>{one.subTitle}</Text>
                <View style={styles.response}>
                  <Text style={styles.votes}>{one.votes} votes</Text>
                  <Text style={styles.answer}>{one.answer} answers</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };
  const MentionSuggestionsProps = ({keyword}) => {
    console.log(keyword);
  };
  function onSuggestionPress({suggestion}) {
    console.log('called', suggestion);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <MentionInput
          value={mentionInputValue}
          onChange={setMentionInputValue}
          style={styles.input1}
          placeholder="Share your thoughts"
          MentionSuggestionsProps={[{keyword: '@', onSuggestionPress}]}
          partTypes={[
            {
              trigger: '@', // Should be a single character like '@' or '#'
              renderSuggestions,
              textStyle: {fontWeight: 'bold', color: '#3EDBF0'}, // The mention style in the input
              getPlainString: text =>
                text.name.toString().length > 14
                  ? '@' + text.name.substring(0, 17 - 3) + '...' + ' '
                  : '@' + text.name + ' ',
            },
            {
              trigger: '#',
              renderSuggestions: renderSuggestionsForHashtags,
              textStyle: {fontWeight: 'bold', color: '#3EDBF0'},
              getPlainString: text =>
                text.name.toString().length > 14
                  ? '#' + text.name.substring(0, 17 - 3) + '...' + ' '
                  : '#' + text.name + ' ',
            },
          ]}
          containerStyle={styles.containerStyle}
          isBottomMentionSuggestionsRender={true}
          onKeyPress={handleKeyPress}
          isInsertSpaceAfterMention={true}
          allowedSpacesCount={1}
        />
      </ScrollView>

      {/* <View>{HandleString('guruvingesh guru...     @Tony_  guru')}</View>*/}

      <View style={styles.modal}>
        {showUserModal ? (
          <Modal
            inputData={inputData}
            getInputValue={setSecondInputValue}
            inputValue={secondInputValue}
            setValue={setValue}
          />
        ) : null}
      </View>
      <View style={styles.inputbox}>
        <View style={styles.leftIcons}>
          <Image
            source={require('../assets/arroba.png')}
            style={{width: 30, height: 30}}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={HandleInputChange}
          value={count}
          placeholder="Share your thoughts"
        />

        <View style={styles.icons}>
          <View style={styles.rightIcon}>
            <Image
              source={require('../assets/hashtag.png')}
              style={{width: 30, height: 30}}
            />
          </View>
          <Image
            source={require('../assets/right-arrow.png')}
            style={{width: 30, height: 30}}
          />
        </View>
      </View>
    </View>
  );
};

export default TextView;

const styles = StyleSheet.create({
  topInputBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerStyle: {
    // flex:0.5,
    flexDirection: 'column-reverse',

    // bottom:100,
  },
  textResult: {
    fontSize: 18,
    fontWeight: '800',
  },
  input1: {
    fontSize: 18,
    fontWeight: '800',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#FEFBF3',
  },

  input: {
    position: 'absolute',
    flex: 1,
    borderWidth: 1,
    borderColor: '#80ED99',
    borderRadius: 50,
    paddingLeft: 50,
    paddingRight: 70,
    fontSize: 18,
    fontWeight: '600',
  },
  rightIcon: {
    marginRight: 20,
    justifyContent: 'center',
    marginLeft: 5,
    top: 0,
  },
  icons: {
    paddingLeft: 300,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    // justifyContent: 'space-between',
  },
  leftIcons: {
    marginLeft: 5,
    top: 9,
    marginBottom: 10,
    position: 'absolute',
  },

  textResultBox: {
    //     flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: 9,
  },
  inputbox: {
    //   flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  modal: {
    flex: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
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

    borderBottomColor: 'gray',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,

    padding: 10,
  },
});
