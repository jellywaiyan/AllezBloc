import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text} from 'react-native';
import { useChatClient } from '../../useChatClient';
import {Chat,Channel,ChannelList,MessageList, 
  MessageInput, OverlayProvider, } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from '../../config/chatConfig';
import { AppProvider } from "../../AppContext";
import { useAppContext } from '../../AppContext';

const chatClient = StreamChat.getInstance(chatApiKey);

const Stack = createStackNavigator();

const filters = {
  members: {
    '$in': [chatUserId]
  },
};

const sort = {
  last_message_at: -1,
};


const ChannelListScreen = props => {

  const { setChannel } = useAppContext();

  return (
    <ChannelList
      filters={filters}
      sort={sort}
      onSelect={(channel) => {
        const { navigation } = props;
        setChannel(channel);
        navigation.navigate('Chat');
      }}
    />
  );
};

const ChannelScreen = props => {
  const { channel } = useAppContext();
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

const NavigationStack = () => {

  const { clientIsReady } = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
        <Stack.Screen name="Channels" component={ChannelListScreen}/>
        <Stack.Screen name="Chat" component={ChannelScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export default function ChatScreen() {
  return (
    <AppProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaView>
    </AppProvider>
  );
};
