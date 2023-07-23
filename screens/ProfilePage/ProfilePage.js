import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {getUser} from "../../src/graphql/queries"
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  
  const navigation = useNavigation();

  const onEditPress = () => {
    navigation.navigate("Edit Profile");
  }
  const onRefreshPress = () => {
      const syncUser = async () => {
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true,});
  
        const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub}));
        setUserData(userData.data.getUser);
        setName(userData.data.getUser.name);
        setStatus(userData.data.getUser.status);
        return;
      }
      syncUser();
  }
  useEffect(() => {
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true,});

      const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub}));
      setUserData(userData.data.getUser);
      setName(userData.data.getUser.name);
      setStatus(userData.data.getUser.status);
      return;
    }
    syncUser();
  },[]);

  return (
        <View style={{flex: 1,backgroundColor:HOMECOLOURS.dullwhite}}>
          <ScrollView 
          style={styles.container}
          contentContainerStyle={{justifyContent:"center", alignItems:'center'}}
          showsVerticalScrollIndicator={false}
          >
            <Image 
            style={styles.profilePic}
            source={{uri : userData.image}}/>
            <Text style={styles.usernameStyle}>{name}</Text>
            <Text style={styles.subTitle}>{status}</Text>
            <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
              <Text style={{fontWeight:"700", fontSize:13, color:"black"}}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={onRefreshPress}> 
            <Text style={{fontWeight:"700", fontSize:13, color:"black"}}>Refresh</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  usernameStyle: {
    fontWeight: "bold",
    fontSize:18,
    marginTop:10,
    marginBottom:10
  },
  content: {
    flex:1,
  },
  subTitle: {
    fontSize:12,
    fontWeight:"600",
    textAlign:"center",
    marginBottom:10
  },
  editButton: {
    width: '35%',
    padding:15,
    marginVertical:10,
    alignItems:'center',
    borderRadius:35,
    backgroundColor:"lightgray"
},
});

export default ProfilePage;