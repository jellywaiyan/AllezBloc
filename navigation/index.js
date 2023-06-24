import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, SafeAreaView,Text, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import { Auth, Hub } from 'aws-amplify';
import { StyleSheet } from 'react-native';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import InChatScreen from '../screens/InChatScreen/InChatScreen';
import { HOMECOLOURS } from '../assets/color';
import GymScreen from '../screens/GymScreen/GymScreen';
import MainTabNavigator from './MainTabNavigator';
import FriendsListScreen from '../screens/FriendsListScreen/FriendsListScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    //After signin just refresh, will fix this at a later date
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

    // if (user == undefined) {
    //     return (
    //         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //             <Image 
    //   style={[styles.logo, {bottom:20}]}
    //   resizeMode='contain'
    //   source={require("./../assets/AllezBlocLogoFinal.jpg")}/>
    //   <Text>AllezBloc</Text>
    //         </View>
    //     );
    // };
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {user ? (       
                   // <Stack.Screen name= "GymScreen"component={GymScreen}/>  
                    <>     
            <Stack.Screen name="HomePage" component={MainTabNavigator}/>   
            <Stack.Screen name= "Chats" component={ChatScreen}/>
            <Stack.Screen name= "Chat" component={InChatScreen}
            options={{headerShown:true, headerStyle:{backgroundColor:HOMECOLOURS.dullwhite}}}
            />
            <Stack.Screen name="Friends List" component={FriendsListScreen}
            options={{headerShown:true, headerStyle:{backgroundColor:HOMECOLOURS.dullwhite}}}
            />
            </> 
                ) : (
                <>
            <Stack.Screen name= "Sign In"component={WelcomeScreen}/>
            <Stack.Screen name= "Sign Up"component={SignUpScreen}/>
            <Stack.Screen name= "Confirm Email"component={ConfirmEmailScreen}/>
            <Stack.Screen name= "Forgot Password"component={ForgotPasswordScreen}/>
            <Stack.Screen name= "Reset Password"component={ResetPasswordScreen}/>
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