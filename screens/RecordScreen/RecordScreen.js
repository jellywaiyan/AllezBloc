import { StyleSheet, Text, View, Button, SafeAreaView , TouchableOpacity , Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function RecordScreen() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasGalleryPermissions(galleryStatus.status === 'granted');

      if (galleryStatus.status === 'granted') {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return <Text>Requestion permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 60,
      mute: false
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      navigation.navigate('SavePost', { videolink: result.assets[0].uri });
    }
  };

  let saveVideo = () => {
    navigation.navigate('SavePost', { videolink: video.uri });
  };

  if (video) {

    return (
      <SafeAreaView style={styles.vidcontainer}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
          <Button title="Upload" onPress={saveVideo} />
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.camcontainer} ref={cameraRef}>
     <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
            <Button title={isRecording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} />
        </View>
        <View style={{ flex: 1 }}>
          {!isRecording ? (
            <TouchableOpacity onPress={() => pickFromGallery()} style={styles.galleryButton}>
              {galleryItems[0] == undefined ? <></> : <Image style={styles.galleryButtonImage} source={{ uri: galleryItems[0].uri }} />}
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Camera>
  );
}

