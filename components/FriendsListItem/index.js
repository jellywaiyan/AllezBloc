import {Image, Text, StyleSheet, View } from "react-native"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../src/graphql/mutations";
import { findOverlappingChatRooms } from "../../services/chatRoomService";

dayjs.extend(relativeTime);
const FriendsListItem = ({ user }) => {

  const navigation = useNavigation();

  const onPress = async () => {
    //See if there's already a chat room with the user selected
    const existingChatRoom = await findOverlappingChatRooms(user.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id })
      return;
    }

    const newChatData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {}})
      );

      if (!newChatData.data?.createChatRoom) {
        console.log("Error creating chat");
      }
      const newChatRoom = newChatData.data?.createChatRoom;
      //Add the selected user to the chatroom
      await API.graphql(graphqlOperation(createUserChatRoom, { 
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      }));
      //Add auth user to chatroom
      const authUser = await Auth.currentAuthenticatedUser();
      await API.graphql(graphqlOperation(createUserChatRoom, { 
        input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
      }));
      //Go to the new chat room
      navigation.navigate("Chat", { id: newChatRoom.id });
  };
    return (

        <TouchableOpacity 
        onPress={onPress}
        style={styles.container}>
          <Image 
          source={{uri: user.image}}
          style={styles.profilePic}
          />
          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
            <Text 
                numberOfLines={2}
                style={styles.subTitle}>
                {user.status}
                </Text>
          </View>
        </TouchableOpacity>
    )
}
export default FriendsListItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 5,
      height: 70,
    },
    profilePic: {
      width: 60,
      aspectRatio: 1,
      borderRadius: 30,
      marginRight: 10,
    },
    name: {
      fontWeight: "bold",
    },
    content: {
      flex:1,
    },
    subTitle: {
      color: "grey",
    },
  });