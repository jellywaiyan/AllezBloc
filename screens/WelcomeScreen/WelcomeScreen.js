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


//to do : change font

function WelcomeScreen(props) {
  const [username, setUsername ] = useState('');

  const [password, setPassword ] = useState(''); 

  const navigation = useNavigation();

  const onSignInPress = () => {
    //validate user (backend WIP)
    navigation.navigate('Home');
  }

  const onForgotPasswordPress = () => {
    navigation.navigate("Forgot Password");
  }

  const onSignUpPress = () => {
    navigation.navigate("Sign Up")
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
      style={[styles.logo, {bottom:20}]}
      resizeMode='contain'
      source={require("../../assets/AllezBlocAppLogo.jpg")}
      />
      <Text style={{
        fontSize:20, 
        color:"black", 
        textShadowRadius:6,
        textShadowOffset:{width:3,height:3},
        textShadowColor:'#317DFF',}}>
            ALLEZBLOC
          </Text>
          <CustomInput
           placeHolder='Username'
           value={username}
           setValue={setUsername}
           top={30}
           />
          <CustomInput
          placeHolder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          top={25}
          />
          <CustomButton
          text="Sign In"
          onPress={onSignInPress}
          top={0}
          />
          <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPress}
          type= "TERTIARY"
          fgColor='grey'
          />
          <SocialSignInButtons/>
          <CustomButton
          text="Don't Have An Account? Sign Up Here!"
          onPress={onSignUpPress}
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
      flex: 1,
      backgroundColor:"",
      paddingTop:"35%"
    },

    logo: {
      height: 110,
      width: 110,
      borderRadius:15
    }
})

export default WelcomeScreen;