import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import GymScreen from "../screens/GymScreen/GymScreen";
import ProfilePage from "../screens/ProfilePage/ProfilePage";
import RecordScreen from "../screens/RecordScreen/RecordScreen";
import { Image, StyleSheet } from "react-native";
import { HOMECOLOURS } from "../assets/color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { getUser } from "../src/graphql/queries";

const Tab = createBottomTabNavigator();


const MainTabNavigator = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true,});

      const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub}));
      setUserData(userData.data.getUser);
      return;
    }
    syncUser();
  },[]);

    return (
        <Tab.Navigator initialRouteName="Gyms"
        screenOptions={{tabBarInactiveBackgroundColor:HOMECOLOURS.dullwhite,
        tabBarActiveBackgroundColor:"lightgray",
        tabBarLabelStyle:{fontWeight:"bold"},
        headerStyle:{backgroundColor:HOMECOLOURS.dullwhite},
        }}
        >
            <Tab.Screen 
            name= "Record" 
            component={RecordScreen}
            options={{headerShown:false,tabBarIcon: () => (<Image source={require("../assets/Logos/UploadLogo.png")} style={styles.logo}/>),}}
            />
            <Tab.Screen name="Gyms" component={GymScreen}
            options={{headerShown:false, tabBarIcon: () => (<Image source={require("../assets/Logos/GymScreenLogo.png")} style={{height:35, width:35}}/>),}}
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
            options={{tabBarIcon: () => (<Image source={{uri: userData.image}} style={{height:30, width:30, borderRadius: 25}}/>),}}
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