import React from 'react';
import {StyleSheet, Text, 
  View, Image, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { HOMECOLOURS } from '../../assets/color';

const ForgotPasswordScreen = (data) => {

  const {control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSendPress = async(data) => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate("Reset Password");
    } catch(e) {
      Alert.alert("Oops", e.message);
    }
  }
  const onBackToSignInPress = () => {
    navigation.navigate("Sign In");
  }

    return (
      <ScrollView style={{backgroundColor:HOMECOLOURS.dullwhite}}>
        <View style={styles.container}>
          <Image 
          style={styles.logo}
          resizeMode='contain'
          source={require('../../assets/AllezBlocLogoFinal.jpg')}
          />
          <Text style={styles.title}>Reset Your Password</Text>
          <Text
          style={{right:125, top:5}}
          >Username *</Text>
          <CustomInput
          name="username"
          placeHolder='Enter your Username'
          control={control}
          rules={{
            required: "Username is required"
          }}
          />
          <CustomButton
          text="Send reset code via email"
          onPress={handleSubmit(onSendPress)}
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