import React, {useState} from 'react';
import { useCallback } from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {

  const {control, handleSubmit, watch} = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPress = async(data) => {
    const {name, username, password, email} = data;
    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username}
      });
      navigation.navigate("Confirm Email", {username})
    } catch(e) {
      Alert.alert("Oops", e.message);
    }
  }

  const onSignInPress = () => {
    navigation.navigate("Sign In")
  }
  const onTermsPressed = () => {
    console.warn("Terms");
  }
  const onPrivacyPolicyPressed = () => {
    console.warn("Private");
  }
  // const [fontsLoaded] = useFonts({
  //   'Horta': require('../assets/fonts/Horta_demo.ttf'),
  // });

  // const onLayoutRootView = useCallback([fontsLoaded]);
  // if (!fontsLoaded) {
  //   return null;
  // }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image 
          style={styles.logo}
          resizeMode='contain'
          source={require('../../assets/AllezBlocAppLogo.jpg')}
          />
          <Text style={styles.title}>Create Account</Text>

          <CustomInput
          name="name"
          placeHolder='Name'
          control={control}
          rules={{
            required:"Name is required",
          }}
          />
          <CustomInput
          name="username"
          placeHolder='Username'
          control={control}
          rules={{
            required:"Username is required",
            minLength:{value:4, message:"Username should be at least 4 characters long"},
            maxLength:{value:24, message:"Username should not be longer than 14 characters"}
          }}
          />
          <CustomInput
          name="email"
          placeHolder='Email'
          control={control}
          rules={{
            required:"Email is required",
            pattern:{value:EMAIL_REGEX, message:"A valid email is required"}
          }}
          />
          <CustomInput
          name="password"
          placeHolder="Password"
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Password is required', 
            minLength:{value:8, message:"Password should be a minimum of 8 characters"}
          }}
          />
          <CustomInput
          name="password-retype"
           placeHolder='Retype Password'
           control={control}
           secureTextEntry={true}
           rules={{
            validate: value => 
            value == pwd ? true : "Passwords do not match",
           }}
           />
          <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPress)}
          top={-1}
          />
          <Text style={styles.text}>
            By registering, you are confirming that you accept our{' '}
             <Text
              style={styles.link}
              onPress={onTermsPressed}
              >Terms of Use </Text> and {' '}
             <Text
              style={styles.link}
              onPress={onPrivacyPolicyPressed}
              >Privacy Policy</Text>.
          </Text>
          <SocialSignInButtons 
          />
          <CustomButton
          text="Have an account? Sign In!"
          onPress={onSignInPress}
          type= "TERTIARY"
          fgColor='grey'
          />
        </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      paddingTop:"25%"
    },

    logo: {
      height: 110,
      width: 110,
      borderRadius:15,
    },
    title: {
      fontSize: 24,
      fontWeight:'bold',
      color:"#051C60",
      margin:10,
    },
    text: {
      color:'grey',
    },
    link: {
      color:"#FDB075"
    }
})

export default SignUpScreen;