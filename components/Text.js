/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet,ToastAndroid, Text, TextInput, View} from 'react-native';
import FlatButton from './audioButton';

const TextView = ({navigation,setText}) => {
     const textInputRef=useRef(null)
     const [inputValue, setInputValue] = useState('')
     useEffect(() => {
          setInputValue('')
     },[])
     const HandleSend=()=>{
          if(inputValue){
               navigation.navigate('Preview',{reportedText:inputValue})
               setInputValue('')
               setText(false)
          }
          else{
              
             ToastAndroid.show("your thoughts are empty", 1000)
            
          }

     }
  return (
    <View style={styles.textContainer}>
    
     <TextInput ref={textInputRef}
     multiline={true}
     numberOfLines={4}
     style={[
       styles.input1,
     
     ]}
     onChangeText={setInputValue}
     value={inputValue}
     placeholder="Share your thoughts"
      />
    
    <View style={styles.inputButton}>
       <FlatButton text="Send" onPress={HandleSend} /></View>
    </View>
  );
};

export default TextView;

const styles = StyleSheet.create({
     container:{
          flex: 1,
          backgroundColor:'red'
     },
     inputButton:{
          justifyContent: 'center',
          alignItems: 'center'
     },
     input1:{
          borderWidth:1,
          borderColor:'black',
          margin:10,
          borderRadius:10,
          fontSize:20,

     },
});
