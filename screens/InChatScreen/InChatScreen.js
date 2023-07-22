import React, { useEffect, useState } from 'react';
import { View,Text, ImageBackground,StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import bckgrnd from "../../assets/BG.png";
import Message from '../../components/Message';
import MessageBox from '../../components/MessageBox';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listMessagesByChatRoom } from '../../src/graphql/queries';
import { onCreateMessage, onUpdateChatRoom } from '../../src/graphql/subscriptions';

const InChatScreen = () =>{
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();
  const chatroomID = route.params.id;
  
  //get chat rooms
  useEffect(() => {
    API.graphql(graphqlOperation(
      getChatRoom, { id: chatroomID })).then(
        result => {
          setChatRoom(result.data?.getChatRoom);
        });

        const chatRoomSubscription = API.graphql(graphqlOperation(
          onUpdateChatRoom, { filter: { id: { eq: chatroomID }}}
        )).subscribe({
          next: ({ value }) => {
            setChatRoom(chatrm => ({...chatrm || {}, ...value.data.onUpdateChatRoom}));
          },
          error: (e) => console.warn(e),
        })
        return () => chatRoomSubscription.unsubscribe();
  }, [chatroomID])

  //get messages 
  useEffect(() => {
    API.graphql(graphqlOperation(
      listMessagesByChatRoom, { chatroomID, sortDirection: "DESC" })).then(
        result => {
          setMessages(result.data?.listMessagesByChatRoom?.items);
        });
    //subscribe to new texts
    const subscription = API.graphql(graphqlOperation(
      onCreateMessage, { filter: { chatroomID: { eq: chatroomID }}})).subscribe({
      next: ({ value }) => {
        setMessages(msg => [value.data.onCreateMessage, ...msg])
      },
      error: (e) => console.warn(e),
    });
    return () => subscription.unsubscribe();
  }, [chatroomID])

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params]);
  
  if (!chatRoom) {
    return <ActivityIndicator/>
  }

    return (
        <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.bckgrnd}
    keyboardVerticalOffset={90}
  >
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
        <MessageBox chatroom= {chatRoom}/>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default InChatScreen;

const styles = StyleSheet.create({
    bckgrnd: {
      flex: 1,
    },
  });