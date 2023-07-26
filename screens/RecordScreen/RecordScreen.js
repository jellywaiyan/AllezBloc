import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { Audio , Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'


import styles from './styles'


/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
export default function RecordScreen() {
    // const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)

    const [galleryItems, setGalleryItems] = useState([])

    const [cameraRef, setCameraRef] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)

    const [isCameraReady, setIsCameraReady] = useState(false)
    const isFocused = useIsFocused()
    const [video, setVideo] = useState();
    const [isRecording, setIsRecording] = useState(false);

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            // const cameraStatus = await Camera.requestPermissionsAsync()
            // setHasCameraPermissions(cameraStatus.status == 'granted')

            // const cameraStatus = await Camera.requestPermissionsAsync()
            // setHasCameraPermissions(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
                setGalleryItems(userGalleryMedia.assets)
            }
        })()
    }, [])

    // if (hasCameraPermissions === undefined || hasAudioPermissions === undefined) {
    //     return <Text>Requesting permissions...</Text>;
    //   } else if (!hasCameraPermissions) {
    //     return <Text>Permission for camera not granted.</Text>;
    //   }



    // from gallery
    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        if (!result.canceled) {
            // pass video uri into save component
            navigation.navigate('SavePost' , {videolink : result.assets[0].uri})
        }
    }

    // if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    //     return (
    //         <View></View>
    //     )
    // }

    const recordVideo = async () => {
        setIsRecording(true);
        if (cameraRef) {
            try {
                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480'] }
                const videoRecordPromise = cameraRef.recordAsync(options)
                setI
                if (videoRecordPromise) {
                    const data = await videoRecordPromise;
                    const source = data.uri
                    //TODO: pass video uri into save component
                    navigation.navigate('SavePost' , {videolink : source})
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        setIsRecording(false);
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    let saveVideo = () => {
        navigation.navigate('SavePost' , {videolink : video.uri})
      };

    if (video) {  
        return (
          <SafeAreaView style={styles.container}>
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
        <View style={styles.container}>
            {isFocused ?
                <Camera
                    ref={ref => setCameraRef(ref)}
                    style={styles.camera}
                    ratio={'16:9'}
                    type={cameraType}
                    flashMode={cameraFlash}
                    onCameraReady={() => setIsCameraReady(true)}
                />
                : null}


            <View style={styles.bottomBarContainer}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.recordButtonContainer}>
                {!isRecording ? 
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onPress={() => recordVideo()}
                        style={styles.recordButton}
                    />
                     :
                    <TouchableOpacity
                        onPress={() => stopVideo()}
                        style={styles.recordingButton}
                    />
                }
                </View>
                {!isRecording ? 
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => pickFromGallery()}
                        style={styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />}
                    </TouchableOpacity>
                </View> : <></>
}
            </View>
        </View>
    )
}