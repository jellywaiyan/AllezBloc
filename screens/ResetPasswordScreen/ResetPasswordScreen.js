import React, {useState} from 'react';
import { useCallback } from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { SendButton } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();
  
  const onResetPress = () => {
    navigation.navigate("Home");
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
          source={require('../../assets/AllezBlocAppLogo.jpg')}
          />
          <Text style={styles.title}>Reset Your Password</Text>
          <CustomInput
           placeHolder='Enter the code sent to your email'
           value={code}
           setValue={setCode}
           />
           <CustomInput
           placeHolder='Enter your new password'
           value={newPassword}
           setValue={setNewPassword}
           />
          <CustomButton
          text="Reset Password"
          onPress={onResetPress}
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