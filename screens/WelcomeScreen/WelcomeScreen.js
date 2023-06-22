import React, {useState} from 'react';
import { useCallback } from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView, Alert} from 'react-native';
import { useFonts } from 'expo-font';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';

//to do : change font

function WelcomeScreen(props) {
  const {control, handleSubmit, formState:{errors}} = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSignInPress = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
    const response = await Auth.signIn(data.username, data.password);
    } catch(e) {
      Alert.alert("Oops", e.message)
    }
    setLoading(false);
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
      source={require("../../assets/allezlogo.jpg")}
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
          name="username"
          placeHolder='Username'
          control={control}
          rules={{required: 'Username is required'}}
          top={30}
          />
          <CustomInput
          name="password"
          placeHolder="Password"
          control={control}
          rules={{
            required: 'Password is required', 
            minLength:{value:8, message:"Password should be a minimum of 8 characters"}
          }}
          secureTextEntry
          top={25}
          />
          <CustomButton
          text={loading ? "Signing In... " : "Sign In"}
          onPress={handleSubmit(onSignInPress)}
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