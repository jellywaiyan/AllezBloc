import React, {useState} from 'react';
import { useCallback } from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [username, setUsername ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState(''); 
  const [passwordRepeat, setPasswordRepeat] = useState('');
  
  const navigation = useNavigation();

  const onRegisterPress = () => {
    navigation.navigate("Confirm Email");
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
           placeHolder='Username'
           value={username}
           setValue={setUsername}
           />
           <CustomInput
           placeHolder='Email'
           value={email}
           setValue={setEmail}
           />
          <CustomInput
          placeHolder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          />
          <CustomInput
           placeHolder='Repeat Password'
           value={passwordRepeat}
           setValue={setPasswordRepeat}
           secureTextEntry={true}
           />
          <CustomButton
          text="Register"
          onPress={onRegisterPress}
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