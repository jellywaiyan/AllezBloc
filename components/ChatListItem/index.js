import { View, Image, Text, StyleSheet,Pressable } from "react-native"
import { HOMECOLOURS } from "../../assets/color";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

dayjs.extend(relativeTime);
const ChatListItem = ({ chat }) => {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const userItem = chat.users.items.find(item => item.user.id !== authUser.attributes.sub);
      setUser(userItem?.user);
    }
    getUser();
  },[]);

    return (

        <TouchableOpacity 
        onPress={() => navigation.navigate("Chat", {id: chat.id, name: user?.name})}
        style={styles.container}>
            <Image 
            source={{uri: user?.image}}
            style={styles.profilePic}
            />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text 
                    numberOfLines={1}
                    style={styles.name}>
                        {user?.name}
                    </Text>
                    <Text style={styles.subTitle}>{dayjs(chat.lastMessage?.timeSent).fromNow(true)}</Text>
                </View>
                <Text 
                numberOfLines={2}
                style={styles.subTitle}>
                {chat.lastMessage?.text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
export default ChatListItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "stretch",
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
    content: {
      flex: 1,
      borderBottomColor: "lightgray",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: {
      flexDirection: "row",
      marginBottom: 5,
    },
    name: {
      fontWeight: "bold",
      flex: 1,
    },
    subTitle: {
      color: "grey",
    },
  });