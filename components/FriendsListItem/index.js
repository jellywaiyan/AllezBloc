import {Image, Text, StyleSheet, View } from "react-native"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FriendsListItem = ({ user }) => {

  const navigation = useNavigation();
    return (

        <TouchableOpacity 
        onPress={() => {}}
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