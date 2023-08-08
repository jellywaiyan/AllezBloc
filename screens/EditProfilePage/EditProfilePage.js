import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HOMECOLOURS } from '../../assets/color';
import { getUser } from '../../src/graphql/queries';
import { Auth, API, graphqlOperation,Storage } from 'aws-amplify';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from "expo-image-picker";
import { updateUser } from '../../src/graphql/mutations';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const EditProfilePage = () => {
    const [userData, setUserData] = useState([]);
    const [image, setImage] = useState([]);    
    const [newName, setNewName] = useState('');    
    const [newStatus, setNewStatus] = useState('');  
    const {control, handleSubmit, formState:{errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [imageSource, setImageSource] = useState([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [newImage, setNewImage] = useState(null);
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,    
        });

        if (!result.canceled) {
          setImage([result.assets[0].uri]);
        }
    };

    const onChangePicture = async () => {
        if (loading) {
            return;
        }
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();

    const variables = {
        input: {
        id: authUser.attributes.sub,
        _version: userData._version
        }
    }

    if (image) {
        const uploadedImage = await Promise.all(image.map(uploadFile));
        const imageUrls = await Promise.all(uploadedImage.map(Storage.get));
        variables.input.image = imageUrls[0];
        setNewImage(imageUrls[0]);
        setImage([]);
      }
    const updatedUser = await API.graphql(graphqlOperation(updateUser, variables));
    setImageSource([]);
    userData._version += 1;
    setLoading(false);
};

const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
  
      await Storage.put(key, blob, {
        contentType: "image/png",
        level:"public"
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

    const onChangeDetails = async () => {
        if (loading) {
            return;
        }
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();
    const variables = {
        input: {
        id: authUser.attributes.sub,
        name: newName.trim().length != 0 ? newName.trim() : name ,
        _version: userData._version,
        status: newStatus.trim().length != 0 ? newStatus.trim() : status
        }
    }
    const updatedUser = await API.graphql(graphqlOperation(updateUser, variables));
    setName(newName.trim().length != 0 ? newName.trim() : name);
    setStatus(newStatus.trim().length != 0 ? newStatus.trim() : status);
    setNewName("");
    setNewStatus('');
    userData._version += 1;
    setLoading(false);
};

    useEffect(() => {
        const syncUser = async () => {
          const authUser = await Auth.currentAuthenticatedUser({bypassCache: true,});
          const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub}));
          setUserData(userData.data.getUser);
          setName(userData.data.getUser.name);
          setStatus(userData.data.getUser.status);
          setNewImage(userData.data.getUser.image);
          return;
        }
        syncUser();
      },[]);

    return (
        
        <SafeAreaView style={{flex: 1,backgroundColor:HOMECOLOURS.dullwhite, alignItems:"center"}}>
        <Image 
        style={styles.profilePic}
        source={{uri : newImage}}/>
        <Text style={{padding:5, fontWeight:"700"}}>Current Profile Picture</Text>
        <Text style={{padding:5, fontWeight:"700"}}> Current Name: {name}</Text>
        <Text style={{padding:5, fontWeight:"700", textAlign:"center", maxWidth:"80%", maxHeight:"10%"}}> Current status: {status}</Text>
        <FlatList
        scrollEnabled="false"
        style={{padding:15}}
          data={image}
          renderItem={({item}) => (
            <Image 
          source={{ uri: item }} 
          style={[styles.chosenImage]}/>)}
          />
          <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
          <View style={{flexDirection:"row",bottom:110, alignSelf:"center"}}>
        <TouchableOpacity style={styles.pictureButton} onPress={pickImage}>
            <Text style={{fontWeight:"700", fontSize:13, color:"black"}}>Change Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pictureButton}
         onPress={image.length != 0 ? handleSubmit(onChangePicture) : () => {}}
         >
            <Text style={{fontWeight:"700", fontSize:13, color:"black"}}>Confirm Profile Picture</Text>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",bottom:90}}>
        <TextInput value={newName}
        onChangeText={setNewName}
        maxLength={24}
        placeholder='New Name'
        style={styles.input}/>
        <TouchableOpacity style={[styles.pictureButton]} onPress={newName.trim().length != 0 || newStatus.trim().length != 0 ? handleSubmit(onChangeDetails) : () => {}}>
            <Text style={{fontWeight:"700", fontSize:13, color:"black"}}>Change Name/Status</Text>
        </TouchableOpacity>
        </View>
       
        <View style={{flexDirection:"row",bottom:80}}>
        <TextInput value={newStatus}
        onChangeText={setNewStatus}
        maxLength={60}
        placeholder='New Status'
        style={[styles.input]}/>
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
        
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
      bottom:50,
      marginVertical:10,
      alignItems:'center',
      borderRadius:35,
      backgroundColor:"lightgray",
  },
  chosenImage: {
    height: 150,
    width: 150,
    borderRadius:75,
  },
  pictureButton: {
    width:150,
    padding:10,
    backgroundColor:"lightgray",
    marginHorizontal:10,
    borderRadius:35,
    alignItems:"center",
  },
  input: {
    fontSize: 17,
    backgroundColor: "white",
    padding: 15,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    width:200,
    borderRadius: 40,
    borderWidth: StyleSheet.hairlineWdth,
    borderColor: "gray",
  },
  });
export default EditProfilePage;