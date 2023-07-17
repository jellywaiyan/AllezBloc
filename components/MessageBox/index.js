import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput,TouchableOpacity,Image, Pressable } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';
import * as ImagePicker from "expo-image-picker";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const MessageBox = ({ chatroom }) => {

const [text, setText] = useState('');
const [image, setImage] = useState(null);

const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    }

    if (image) {
      newMessage.images = [await uploadFile(image)];
      setImage(null);
    }

    const newTextData = await API.graphql(graphqlOperation(createMessage, { input: newMessage }));
   
    setText("");

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
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
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
       {image && (
        <View style={styles.attachmentsContainer}>
          <Image 
          source={{ uri: image }} 
          style={styles.chosenImage}
          resizeMode='contain'
          />
          <Pressable
          onPress={() => setImage(null)}
          >
            <Image 
            source={require("../../assets/cancelIcon.png")}
            style={{height:20, width:20, bottom:105, right:5}}
            />
          </Pressable>
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
        <TouchableOpacity onPress={text !== "" ? onSend : () => {}}>
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

  /*
   <SafeAreaView style={styles.container}>
      <AntDesign name="plus" size={24} color="#3FADF7" />
      <TextInput style={styles.input} />
      <MaterialIcons 
      style={styles.send} 
      name="send" 
      size={24} 
      color="white" 
      onPress={onSend}
      />
    </SafeAreaView>
  */
