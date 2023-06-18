import React from 'react';
import { SafeAreaView,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name= "Sign In"component={WelcomeScreen}/>
            <Stack.Screen name= "Sign Up"component={SignUpScreen}/>
            <Stack.Screen name= "Confirm Email"component={ConfirmEmailScreen}/>
            <Stack.Screen name= "Forgot Password"component={ForgotPasswordScreen}/>
            <Stack.Screen name= "Reset Password"component={ResetPasswordScreen}/>
            <Stack.Screen name= "Home"component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;