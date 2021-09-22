/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FlatButton from './button';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from '@ubaids/react-native-material-textfield';
const OrientationForm = props => {
  const [name, onChangeName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);
  const [addressLine1, setAddressLine1] = React.useState('');
  const [addressLine2, setAddressLine2] = React.useState('');
  const [nameError, setNameError] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState(true);
  const [addressLine1Error, setAddressLine1Error] = useState(true);
  const [numberError, setNumberError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [screenHight, setScreenHight] = useState(null);
  useEffect(() => {
    OnLayout();
  }, [Dimensions.get('window').width]);
  useEffect(() => {
    if (numberError) {
      number === null || number === ''
        ? setPhoneNumberError(true)
        : setPhoneNumberError(false);
      addressLine1.trim() === ''
        ? setAddressLine1Error(true)
        : setAddressLine1Error(false);
      name.trim() === '' ? setNameError(true) : setNameError(false);
    }
  }, [numberError]);
  const OnLayout = e => {
    console.log('onLayout changed....');
    setScreenWidth(Dimensions.get('window').width);
    setScreenHight(Dimensions.get('window').height);
  };
  const HandleSubmission = e => {
    setNumberError(true);
    number === null || number === ''
      ? setPhoneNumberError(true)
      : setPhoneNumberError(false);
    addressLine1.trim() === ''
      ? setAddressLine1Error(true)
      : setAddressLine1Error(false);
    name.trim() === '' ? setNameError(true) : setNameError(false);

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
    }

    setNumberError(true);
  };
  console.log(nameError, phoneNumberError, addressLine1Error, 'address1');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.heading}>
        <Text style={styles.text}>Sign Up</Text>
      </View>

      <View
        style={
          screenWidth < screenHight ? styles.modal : styles.landscapeModal
        }>
        <OutlinedTextField
          inputContainerStyle={[
            screenWidth < screenHight ? styles.input : styles.inputLandscape,
            nameError ? styles.alignment : null,
          ]}
          error={numberError && nameError ? 'First name required' : ''}
          errorColor={
            numberError && nameError ? 'rgb(215, 0, 0)' : 'rgb(0, 100, 0)'
          }
          onChangeText={onChangeName}
          value={name}
          fontSize={18}
          labelFontSize={16}
          label="First Name"
        />
        {/*nameError && <Text style={{color: 'red'}}>*First name required.</Text>*/}
        <OutlinedTextField
          inputContainerStyle={[
            screenWidth < screenHight ? styles.input : styles.inputLandscape,
           nameError ? styles.alignment : null,
          ]}
          onChangeText={setLastName}
          value={lastName}
          error={numberError && nameError ? '.' : ''}
          errorColor="rgb(215,215,215)"
          label="Last Name"
          fontSize={18}
          labelFontSize={16}
        />
          {/*nameError && <Text style={{color: 'red'}}>*First name required.</Text>*/}
        <OutlinedTextField
          inputContainerStyle={[
            screenWidth < screenHight ? styles.input : styles.inputLandscape,
            phoneNumberError ? styles.alignment : null,
          ]}
          onChangeText={onChangeNumber}
          error={numberError && phoneNumberError ? 'Phone Number quired.' : ''}
          errorColor={
            numberError && phoneNumberError
              ? 'rgb(215, 0, 0)'
              : 'rgb(0, 100, 0)'
          }
          value={number}
          label="Phone Number"
          keyboardType="numeric"
          fontSize={18}
          labelFontSize={16}
          errorTextStyle={styles.error}
        />

        <OutlinedTextField
          inputContainerStyle={[
            screenWidth < screenHight ? styles.input : styles.inputLandscape,
            addressLine1Error ? styles.alignment : null,
          ]}
          onChangeText={setAddressLine1}
          error={
            numberError && addressLine1Error ? 'Address line 1 required.' : ''
          }
          errorColor={
            numberError && addressLine1Error
              ? 'rgb(215, 0, 0)'
              : 'rgb(0, 100, 0)'
          }
          value={addressLine1}
          label="Address line 1"
          fontSize={18}
          labelFontSize={16}
        />
        {/*addressLine1Error && (
          <Text style={{color: 'red'}}>*Address line 1 required.</Text>
        )*/}
        <OutlinedTextField
          inputContainerStyle={
            screenWidth < screenHight ? styles.input : styles.inputLandscape
          }
          onChangeText={setAddressLine2}
          value={addressLine2}
          label="Address line 2"
          fontSize={18}
          labelFontSize={16}
        />
      </View>
      <View style={styles.hide}>
        <FlatButton
          text="Sign UP"
          onPress={e => HandleSubmission(e)}
          // props.toggleModal
        />
      </View>
    </ScrollView>
  );
};

export default OrientationForm;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {alignItems: 'center', justifyContent: 'center'},
  alignment: {
    marginBottom: 0,
  },
  landscapeModal: {
    //   position: 'relative',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
  },
  input: {
    position: 'relative',
    fontSize: 18,
    //     borderWidth: 1,
    //     borderColor: 'gray',
    //     borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 10,
    marginTop: 10,
  },
  inputLandscape: {
    fontSize: 18,
    position: 'relative',
    //     borderWidth: 1,
    //     borderColor: 'gray',
    //     borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  error: {
    //     fontSize: 18,
    //     //     borderWidth: 1,
    //     //     borderColor: 'red',
    //     //     borderRadius: 5,
    //     padding: 10,
    //     width: 300,
    //     marginBottom: 10,
    //     marginTop: 10,
    color: 'blue',
  },
  hide: {
    justifyContent: 'center',
    alignItems: 'center',
    //     marginLeft: 50,
  },
});
