import { View } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import { HOMECOLOURS } from '../../assets/color';
import { FlatList } from 'react-native-gesture-handler';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listChatRooms } from './queries';
import { useEffect, useState } from 'react';

const ChatScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  useEffect(() => {
    const getChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      )
      setChatRooms(response.data.getUser.ChatRooms.items);
    }
    getChatRooms();
  }, [])

    return (
        <View style={{backgroundColor:HOMECOLOURS.dullwhite, flex:1}}>
        <FlatList
        data={chatRoom}
        renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
        />
        </View>
    );
}

export default ChatScreen;