import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { HOMECOLOURS } from "../../assets/color";
import { Auth, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { S3Image } from "aws-amplify-react-native";
import ImageView from "react-native-image-viewing";
import { TouchableOpacity } from "react-native-gesture-handler";

const Message = ({ message }) => {
  const [isUser, setIsUser] = useState(false);
  const [imageSources, setImageSources] = useState([]);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setIsUser(message.userID === authUser.attributes.sub);
    };
    isMyMessage();
  }, [])

  useEffect(() => {
    const downloadImages = async () => {
      if (message.images) {
        const imageUrls = await Promise.all(message.images.map(Storage.get));
  
        setImageSources(imageUrls.map((uri) => ({ uri })));
      }
    };
    downloadImages();
  }, [message.images]);

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
      {message.images?.length > 0 && (
        <>
        <TouchableOpacity onPress={() => setImageViewerVisible(true)}>
      <Image source={imageSources[0]} style={styles.image}/>
      </TouchableOpacity>
      <ImageView 
      images={imageSources} 
      imageIndex={0} 
      visible={imageViewerVisible}
      onRequestClose={() => setImageViewerVisible(false)}
      />
      </>
      )}
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
  image: {
    width: 200,
    height: 100,
    borderColor: "white",
    borderWidth: 1.5,
    borderRadius: 5,
  },
});

export default Message;