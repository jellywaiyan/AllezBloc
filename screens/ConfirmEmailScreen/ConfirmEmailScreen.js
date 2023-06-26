import React, {useState} from 'react';
import { useCallback } from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { HOMECOLOURS } from '../../assets/color';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ConfirmEmailScreen = data => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });
  const username = watch("username");
  const navigation = useNavigation();

  const onConfirmPress = async (data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate("Sign In");
    } catch(e) {
      Alert.alert("Oops", e.message);
    }
  }

  const onBackToSignInPress = () => {
    navigation.navigate("Sign In");
  }
  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success", "Confirmation code has been resent to your email")
    } catch(e) {
      Alert.alert("Oops", e.message);
    }
  }

  // const [fontsLoaded] = useFonts({
  //   'Horta': require('../assets/fonts/Horta_demo.ttf'),
  // });

  // const onLayoutRootView = useCallback([fontsLoaded]);
  // if (!fontsLoaded) {
  //   return null;
  // }

    return (
      <ScrollView style={{backgroundColor:HOMECOLOURS.dullwhite}}>
        <View style={styles.container}>
          <Image 
          style={styles.logo}
          resizeMode='contain'
          source={require('../../assets/AllezBlocLogoFinal.jpg')}
          />
          <Text style={styles.title}>Email Confirmation</Text>

          <CustomInput
          name="username"
           placeHolder='Username'
           control={control}
           rules={{
            required: "Username is required"
           }}
           />
          <CustomInput
          name="code"
          placeHolder='Enter the code sent to your email'
          control={control}
          rules={{
           }}
           />
          <CustomButton
          text="Confirm"
          onPress={handleSubmit(onConfirmPress)}
          top={-1}
          />
          <CustomButton
          text="Resend code"
          onPress={handleSubmit(onResendPress)}
          type= "SECONDARY"
          top={-1}
          />
          <CustomButton
          text="Back to Sign In"
          onPress={handleSubmit(onBackToSignInPress)}
          type= "TERTIARY"
          fgColor='grey'
          top={-1}
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
      borderRadius:15
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

export default ConfirmEmailScreen;