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

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const onSendPress = () => {
    navigation.navigate("Reset Password");
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
          <Text
          style={{right:125, top:5}}
          >Username *</Text>
          <CustomInput
           placeHolder='Enter your Username'
           value={username}
           setValue={setUsername}
           />
          <CustomButton
          text="Send reset code via email"
          onPress={onSendPress}
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

export default ForgotPasswordScreen;