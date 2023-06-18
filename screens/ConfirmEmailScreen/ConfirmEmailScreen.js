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

function ConfirmEmailScreen(props) {
  const [emailCode, setEmailCode] = useState('');

  const navigation = useNavigation();

  const onConfirmPress = () => {
    navigation.navigate("Home");
  }
  const onBackToSignInPress = () => {
    navigation.navigate("Sign In");
  }
  const onResendPress = () => {
    console.warn("Resend");
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
          <Text style={styles.title}>Email Confirmation</Text>

          <CustomInput
           placeHolder='Enter the code sent to your email'
           value={emailCode}
           setValue={setEmailCode}
           />
          <CustomButton
          text="Confirm"
          onPress={onConfirmPress}
          top={-1}
          />
          <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type= "SECONDARY"
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

export default ConfirmEmailScreen;