import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatListItem from '../../components/ChatListItem';
import { HOMECOLOURS } from '../../assets/color';
import chats from "../../data/chats.json"
import { FlatList } from 'react-native-gesture-handler';

const NewChatScreen = () => {
    return (
        <SafeAreaView>
        <FlatList
        data={chats}
        renderItem={({item}) => <ChatListItem chat={item} />}
        />
        </SafeAreaView>
    );
}

export default NewChatScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });