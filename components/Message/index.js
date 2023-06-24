import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { HOMECOLOURS } from "../../assets/color";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

const Message = ({ message }) => {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setIsUser(message.userID === authUser.attributes.sub);
    };
    isMyMessage();
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isUser ? "#3FADF7" : "white",
          alignSelf: isUser ? "flex-end" : "flex-start",
          borderBottomRightRadius: isUser ? 3: 20,
          borderTopLeftRadius: isUser ? 20 : 3
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: "80%",

		// Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,

    elevation: 1,
  },
  message: {},
  time: {
    alignSelf: "flex-end",
    color: "#727272",
  },
});

export default Message;