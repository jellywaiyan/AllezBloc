import { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput,TouchableOpacity,Image } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';

const MessageBox = ({ chatroom }) => {

const [text, setText] = useState('');

const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    }
    const newTextData = await API.graphql(graphqlOperation(createMessage, { input: newMessage }));
   
    setText("");

    await API.graphql(graphqlOperation(
      updateChatRoom, { input: {
        _version: chatroom._version, 
        chatRoomLastMessageId: newTextData.data.createMessage.id, 
        id: chatroom.id}}))
}

    return (
        <SafeAreaView style={styles.container}>
      <TouchableOpacity>
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
