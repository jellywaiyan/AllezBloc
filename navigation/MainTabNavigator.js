import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import GymScreen from "../screens/GymScreen/GymScreen";
import HomePage from "../screens/HomePage/HomePage";
import ProfilePage from "../screens/ProfilePage/ProfilePage";
import UploadPage from "../screens/UploadPage/UploadPage";
import { Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { HOMECOLOURS } from "../assets/color";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();


const MainTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
        screenOptions={{tabBarInactiveBackgroundColor:HOMECOLOURS.dullwhite,
        tabBarActiveBackgroundColor:"lightgray",
        tabBarLabelStyle:{fontWeight:"bold"},
        headerStyle:{backgroundColor:HOMECOLOURS.dullwhite},
        }}
        >
            <Tab.Screen 
            name= "Upload" 
            component={UploadPage}
            options={{tabBarIcon: () => (<Image source={require("../assets/Logos/UploadLogo.png")} style={styles.logo}/>),}}
            />
            <Tab.Screen name="GymScreen" component={GymScreen}
            options={{headerShown:false, tabBarIcon: () => (<Image source={require("../assets/Logos/GymScreenLogo.png")} style={{height:35, width:35}}/>),}}
            />
            <Tab.Screen name= "Home" component={HomePage}
            options={{tabBarIcon: () => (<Image source={require("../assets/Logos/HomeLogo.png")} style={{height:35, width:35}}/>),}}
            />
            <Tab.Screen name= "Chats" component={ChatScreen}
            options={({ navigation }) => ({
            tabBarIcon: () => (<Image source={require("../assets/Logos/ChatLogo.png")} style={{height:40, width:40}}/>),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Friends List")}> 
                <Image
                  source={require('../assets/Logos/NewMessage.jpeg')}
                  style={{ marginRight: 15, height:25, width:25 }}
                />
                </TouchableOpacity>
              ),
        })}
            />
            <Tab.Screen name= "Profile" component={ProfilePage}
            options={{tabBarIcon: () => (<Image source={require("../assets/Logos/ProfilePageLogo.png")} style={{height:30, width:30}}/>),}}
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigator;

const styles = StyleSheet.create({
    logo: {
      height:50,
      width:50,
    },
  });