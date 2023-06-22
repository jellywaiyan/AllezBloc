import React, {useState} from 'react';
import { useCallback } from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const ResetPasswordScreen = (data) => {

  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();
  
  const onResetPress = async(data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate("Sign In");
    } catch(e) {
      Alert.alert("Oops", e.message);
    }
  }

  const onBackToSignInPress = () => {
    navigation.navigate("Sign In");
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
          source={require('../../assets/AllezBlocLogoFinal.jpg')}
          />
          <Text style={styles.title}>Reset Your Password</Text>
          <CustomInput
          name="username"
          placeHolder='Username'
          control={control}
          rules={{
            required:"Username is required"
          }}
          />
          <CustomInput
          name="code"
          placeHolder='Enter the code sent to your email'
          control={control}
          secureTextEntry={false}
          rules={{
            required:"Code is required"
          }}
          />
          <CustomInput
          name="password"
          placeHolder='Enter your new password'
          control={control}
          secureTextEntry={true}
          rules={{
            required: 'Password is required', 
            minLength:{value:8, message:"Password should be a minimum of 8 characters"}
          }}
          />
          <CustomButton
          text="Reset Password"
          onPress={handleSubmit(onResetPress)}
          top={-1}
          />
          <CustomButton
          text="Back to Sign In"
          onPress={onBackToSignInPress}
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

export default ResetPasswordScreen;