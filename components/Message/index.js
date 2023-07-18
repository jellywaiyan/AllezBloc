import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from "react-native";
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
  const { width } = useWindowDimensions();

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

  const imageContainerWidth = width * 0.8 - 30;

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
      {imageSources.length > 0 && (
        <View style={[{ width: imageContainerWidth }, styles.images]}>
        {imageSources.map((imageSource) => (
        <TouchableOpacity 
        style={[styles.imageContainer,
        imageSources.length == 1 && { width:200, height:200 },]}
        onPress={() => setImageViewerVisible(true)}>
      <Image source={imageSource} style={[styles.image, {borderColor: isUser ? "white" : "gray" }]}/>
      </TouchableOpacity>))}

      <ImageView 
      images={imageSources} 
      imageIndex={0} 
      visible={imageViewerVisible}
      onRequestClose={() => setImageViewerVisible(false)}
      />
      </View>
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
  images: {
    flexDirection: "row",
    flexWrap:"wrap",
  },
  imageContainer: {
    width:"50%",
    height: 100,
    aspectRatio: 1,
    padding:3
  },
  image: {
    flex:1,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Message;