import React, {useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity} from 'react-native';
import {Storage} from 'aws-amplify';

import { Video, ResizeMode } from 'expo-av';
import styles from './styles';


const Post = (props) => {
  const [post, setPost] = useState(props.post);

  const [videoUri, setVideoUri] = useState('');
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);



  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }
    setVideoUri(await Storage.get(post.videoUri));
  };

  useEffect(() => {
    getVideoUri();
  },[]);

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
            onError={(e) => console.log(e)}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onLoad={() =>  {video.current.playAsync()}}
            shouldPlay = {true}
          />

          <View style={styles.uiContainer}>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.description}>{post.description}</Text>
              </View>

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;