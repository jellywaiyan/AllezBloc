import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../../components/Post';
import {API, graphqlOperation} from 'aws-amplify';

import {listPosts} from '../../src/graphql/queries';

const VideoScreen = () => {
  const [posts, setPosts] = useState([]);
  const mediaRefs = useRef([])

  useEffect(() => {
    const fetchPost = async () => {
      // fetch all the posts
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPost();
  }, []);

    const onViewableItemsChanged = useRef(({ changed }) => {
      changed.forEach(element => {
          const cell = mediaRefs.current[element.key]
          if (cell) {
              if (element.isViewable) {
                  cell.play()
              } else {
                  cell.stop()
              }
          }

      });
  })

  const renderItem = ({ item, index }) => {
    return (
      <Post post={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)}></Post>
    )
}

  return (
    <View>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
            itemVisiblePercentThreshold: 100
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item.id}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
/>
    </View>
  );
};

export default VideoScreen;