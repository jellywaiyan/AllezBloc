import React from 'react';
import { View,Text, ImageBackground,StyleSheet, FlatList } from 'react-native';
import bckgrnd from "../../assets/BG.png";
import Message from '../../components/Message';
import messages from "../../data/messages.json"
import MessageBox from '../../components/MessageBox';
import { SafeAreaView } from 'react-native-safe-area-context';

const InChatScreen = () =>{
    return (
        <ImageBackground
        source={bckgrnd}
        style={styles.bckgrnd}
        >
        <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={ item }/>}
        style={{padding:10}}
        inverted
        />
        <MessageBox/>
        </ImageBackground>
    );
}

export default InChatScreen;

const styles = StyleSheet.create({
    bckgrnd: {
      flex: 1,
    },
  });