import { View } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import { HOMECOLOURS } from '../../assets/color';
import { FlatList } from 'react-native-gesture-handler';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listChatRooms } from './queries';
import { useEffect, useState } from 'react';

const ChatScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const getChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
    )

    const rooms = response?.data?.getUser?.ChatRooms?.items || [];
    const sortedRooms = rooms.sort((room1, room2) => new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt));
    setChatRooms(sortedRooms);
    setLoading(false);
  }

  useEffect(() => {
    getChatRooms();
  }, [])

    return (
        <View style={{backgroundColor:HOMECOLOURS.dullwhite, flex:1}}>
        <FlatList
        data={chatRoom}
        renderItem={({item}) => <ChatListItem chat={item.chatRoom} />}
        refreshing={loading}
        onRefresh={getChatRooms}
        />
        </View>
    );
}

export default ChatScreen;