import { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput,TouchableOpacity,Image } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';
//import {AntDesign, MaterialIcons} from "@expo/vector-icons"


const MessageBox = () => {

const [newText, setNewText] = useState('');

const onSend = () => {
    console.warn("Sending message", newText);
    setNewText('');
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
      value={newText}
      onChangeText={setNewText}
      placeholder='Message'
      style={styles.input}
      />
      <TouchableOpacity onPress={onSend}>
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
