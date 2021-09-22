/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import FlatButton from './button';

const Form = props => {
  const [name, onChangeName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);
  const [addressLine1, setAddressLine1] = React.useState('');
  const [addressLine2, setAddressLine2] = React.useState('');
  const [nameError, setNameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [addressLine1Error, setAddressLine1Error] = useState(null);
  const [numberError, setNumberError] = useState(null);

  const HandleSubmission = e => {
    name.trim() === '' ? setNameError(true) : setNameError(false);
    number === null ? setPhoneNumberError(true) : setPhoneNumberError(false);
    addressLine1.trim() === ''
      ? setAddressLine1Error(true)
      : setAddressLine1Error(false);
    if (number !== null) {
      if (!Number.isInteger(parseInt(number))) {
        setNumberError(true);
      } else {
        setNumberError(false);
      }
    } else {
      setNumberError(false);
    }

    if (
      name.trim() !== '' &&
      number !== null &&
      addressLine1.trim() !== '' &&
      Number.isInteger(parseInt(number))
    ) {
      console.log('First name: ' + name);
      console.log('Last Name: ' + lastName);
      console.log('Phone number: ' + number);
      console.log('addressLine1: ' + addressLine1);
      console.log('addressLine2: ' + addressLine2);
      props.toggleModal();
    } else {
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.modal}>
        <Text style={styles.text}>Sign Up</Text>

        <TextInput
          style={nameError ? styles.error : styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="First Name"
        />
        {nameError && <Text style={{color: 'red'}}>*First name required.</Text>}
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
        />
        <TextInput
          style={phoneNumberError ? styles.error : styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Phone Number"
          keyboardType="numeric"
        />
        {phoneNumberError && (
          <Text style={{color: 'red'}}>*Phone Number required.</Text>
        )}

        {numberError && (
          <Text style={{color: 'red'}}>*Numberic value required.</Text>
        )}
        <TextInput
          style={addressLine1Error ? styles.error : styles.input}
          onChangeText={setAddressLine1}
          value={addressLine1}
          placeholder="Address line 1"
        />
        {addressLine1Error && (
          <Text style={{color: 'red'}}>*Address line 1 required.</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={setAddressLine2}
          value={addressLine2}
          placeholder="Address line 2"
        />

        <FlatButton
          text="Sign UP"
          onPress={e => HandleSubmission(e)}
          // props.toggleModal
          style={styles.hide}
        />
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 10,
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 10,
    marginTop: 10,
  },
  // hide:{
  //      alignItems:'center'
  // }
});
