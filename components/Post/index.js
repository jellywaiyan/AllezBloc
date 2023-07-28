import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity} from 'react-native';
import {Storage} from 'aws-amplify';
import {API, graphqlOperation} from 'aws-amplify';
import { Video, ResizeMode } from 'expo-av';
import styles from './styles';
import { getUser } from '../../src/graphql/queries';


const Post = forwardRef((props , ref) => {
  const [post, setPost] = useState(props.post);
  const [videoUri, setVideoUri] = useState('');
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);
  const [name, setName] = useState("");
  useImperativeHandle(ref, () => ({
    play,
    unload,
    stop
  }))

  
  const getVideoUri = async () => {
      if (post.videoUri.startsWith('http')) {
          setVideoUri(post.videoUri);
          return;
        }
        setVideoUri(await Storage.get(post.videoUri));
    };
    
    const syncUser = async () => {
        const userData = await API.graphql(graphqlOperation(getUser, { id: post.userID}));
        setName(userData.data.getUser.name);
        return;
    }

    useEffect(() => {
      getVideoUri();
      syncUser();
      return () => unload();

    
  },[]);

    /**
       * Plays the video in the component if the ref
       * of the video is not null.
       * 
       * @returns {void} 
       */

    const play = async () => {
      if (video.current == null) {
          return;
      }

      // if video is already playing return
      const status = await video.current.getStatusAsync();
      if (status?.isPlaying) {
          return;
      }
      try {
          await video.current.playAsync();
      } catch (e) {
          console.log(e)
      }
  }


  /**
   * Stops the video in the component if the ref
   * of the video is not null.
   * 
   * @returns {void} 
   */
  const stop = async () => {
      if (video.current == null) {
          return;
      }

      // if video is already stopped return
      const status = await video.current.getStatusAsync();
      if (!status?.isPlaying) {
          return;
      }
      try {
          await video.current.stopAsync();
      } catch (e) {
          console.log(e)
      }
  }


  /**
   * Unloads the video in the component if the ref
   * of the video is not null.
   * 
   * This will make sure unnecessary video instances are
   * not in memory at all times 
   * 
   * @returns {void} 
   */
  const unload = async () => {
      if (video.current == null) {
          return;
      }

      // if video is already stopped return
      try {
          await video.current.unloadAsync();
      } catch (e) {
          console.log(e)
      }
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }>
        <View>
          <Video
            ref={video}
            source={{uri: videoUri}}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay = {false}
            posterStyle={{ resizeMode: 'cover', height: '100%' }}
          />

          <View style={styles.uiContainer}>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>{name}</Text>
                <Text style={styles.description}>{post.description}</Text>
              </View>

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});

export default Post;
