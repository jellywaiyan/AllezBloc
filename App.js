import Home from "./screens/Home/Home";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "./AppContext";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import Navigation from "./navigation";

const Stack = createStackNavigator();

export default function App() {

  return (
    <AppProvider>
      <SafeAreaView style={{flex : 1}}>
    <Navigation/>
    </SafeAreaView>
    </AppProvider>
  );

  
};


/*

<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Welcome"
        component={Navigation}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
*/