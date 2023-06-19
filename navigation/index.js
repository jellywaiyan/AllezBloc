import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, SafeAreaView,Text, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import Home from '../screens/Home/Home';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import { Auth, Hub } from 'aws-amplify';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    //Auth.signIn("ur username","Put ur pw here");
    //If u have issues/its stuck on the loading page when u refresh u uncomment,
    //put in the login details and save and run then comment out the Auth.signin,
    //refresh and it should work as normal
    //working on a fix for this
    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser); 
        } catch(e) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, [])

    // useEffect(() => {
    //     const listener = data => {
    //         console.log(data);
    //     };

    //     Hub.listen("auth", listener);
    // }, []);

    if (user == undefined) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image 
      style={[styles.logo, {bottom:20}]}
      resizeMode='contain'
      source={require("./../assets/AllezBlocAppLogo.jpg")}/>
      <Text>AllezBloc</Text>
            </View>
        );
    };
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {user ? (          
                <> 
                <Stack.Screen name= "Home"component={Home}/>
                <Stack.Screen name= "Sign In"component={WelcomeScreen}/>
                <Stack.Screen name= "Sign Up"component={SignUpScreen}/>
                <Stack.Screen name= "Confirm Email"component={ConfirmEmailScreen}/>
                <Stack.Screen name= "Forgot Password"component={ForgotPasswordScreen}/>
                <Stack.Screen name= "Reset Password"component={ResetPasswordScreen}/>
                </>
                ) : (
                <>
            <Stack.Screen name= "Sign In"component={WelcomeScreen}/>
            <Stack.Screen name= "Sign Up"component={SignUpScreen}/>
            <Stack.Screen name= "Confirm Email"component={ConfirmEmailScreen}/>
            <Stack.Screen name= "Forgot Password"component={ForgotPasswordScreen}/>
            <Stack.Screen name= "Reset Password"component={ResetPasswordScreen}/>
            <Stack.Screen name= "Chat"component={ChatScreen}/>
            </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
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

export default Navigation;