import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput,TouchableOpacity,Image, Pressable } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';
import * as ImagePicker from "expo-image-picker";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { FlatList } from 'react-native-gesture-handler';

const MessageBox = ({ chatroom }) => {

const [text, setText] = useState('');
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);
const {control, handleSubmit, formState:{errors}} = useForm();

const onSend = async () => {
  if (loading) {
    return;
  }
  setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text: text.trim(),
      userID: authUser.attributes.sub,
    }

    if (images) {
      newMessage.images = await Promise.all(images.map(uploadFile));
      setImages([]);
    }

    const newTextData = await API.graphql(graphqlOperation(createMessage, { input: newMessage }));
   
    setText("");
    setLoading(false);
    await API.graphql(graphqlOperation(
      updateChatRoom, { input: {
        _version: chatroom._version, 
        chatRoomLastMessageId: newTextData.data.createMessage.id, 
        id: chatroom.id}}))
};

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    allowsMultipleSelection: true,
    selectionLimit:4
  });

  if (!result.canceled) {
    if (result.assets.length > 1) {
      // user selected multiple pics/vids
      setImages(result.assets.map(x => x.uri));
      return;
    } else {
    setImages([result.assets[0].uri]);
    }
  }
};

const uploadFile = async (fileUri) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const key = `${uuidv4()}.png`;

    await Storage.put(key, blob, {
      contentType: "image/png",
    });
    return key;
  } catch (err) {
    console.log("Error uploading file:", err);
  }
};

    return (
      <>
       {images.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <FlatList 
          data={images}
          horizontal
          renderItem={({item}) => (
            <>
            <Image 
          source={{ uri: item }} 
          style={styles.chosenImage}
          resizeMode='contain'
          />
          <Pressable
          onPress={() => setImages((existingImages) =>
            existingImages.filter((img) => img !== item)
            )}
          >
            <Image 
            source={require("../../assets/cancelIcon.png")}
            style={{height:20, width:20, bottom:90, right:0, position:"absolute"}}
            />
          </Pressable>
            </>
          )}
          />
        </View>
       )}

      <SafeAreaView style={styles.container}>
        <TouchableOpacity
        onPress={pickImage}
        >
          <Image
          source={require("../../assets/blueplus.png")}
          style={{height:32, width:32}}
          />
        </TouchableOpacity>
        <TextInput 
        value={text}
        onChangeText={setText}
        placeholder='Message'
        style={styles.input}
        />
        <TouchableOpacity onPress={images.length > 0 || text.trim().length != 0 ? handleSubmit(onSend) : () => {}}>
          <Image 
          source={require("../../assets/fisticon.png")}
          style={{height:32, width:32,backgroundColor:"#6cd2f4", borderRadius:15}}
          />
        </TouchableOpacity>
    </SafeAreaView>
    </>
    );
}

export default MessageBox;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: HOMECOLOURS.dullwhite,
      alignItems: "center",
    },
    input: {
      fontSize: 17,
      flex: 0.95,
      backgroundColor: "white",
      padding: 8,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      borderRadius: 40,
      borderWidth: StyleSheet.hairlineWdth,
      borderColor: "gray",
    },
    send: {
      backgroundColor: "#3FADF7",
      padding: 7,
      borderRadius:10,
      overflow: "hidden",
    },
    attachmentsContainer: {
	    alignItems: "flex-end",
	  },
	  chosenImage: {
	    height: 100,
	    width: 200,
	    margin: 5,
	  },
	  removeChosenImage: {
	    position: "absolute",
	    right: 10,
	    backgroundColor: "white",
	    borderRadius: 10,
	    overflow: "hidden",
	  },
  });

