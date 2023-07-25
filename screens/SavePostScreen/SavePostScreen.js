import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import {v4 as uuidv4} from 'uuid';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {createPost} from '../../src/graphql/mutations';

export default function SavePostScreen(props) {
    const [description, setDescription] = useState('');
    const [videoKey, setVideoKey] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();

    const uploadToStorage = async (imagePath) => {
        try {
            const response = await fetch(imagePath);

            const blob = await response.blob();

            const filename = `${uuidv4()}.mp4`;
            const s3Response = await Storage.put(filename, blob);

            setVideoKey(s3Response.key);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        uploadToStorage(route.params.videolink);
    }, []);

    const onPublish = async () => {
        // create post in the database (API)
        if (!videoKey) {
            console.warn('VIdeo is not yet uploaded');
        return;
        }

        try {
            const userInfo = await Auth.currentAuthenticatedUser();

            const newPost = {
                videoUri: videoKey,
                description: description,
                userID: userInfo.attributes.sub,
            };

            const response = await API.graphql(
                graphqlOperation(createPost, {input: newPost}),
            );
            navigation.navigate("Gyms", { screen: "GymScreen" });
        } catch (e) {
        ole.error(e);
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputText}
                    maxLength={50}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Describe your video"
                />
                <Image
                    style={styles.mediaPreview}
                    source={{ uri: route.params.videolink }}
                />
            </View>
            <View style={styles.spacer} />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onPublish()}
                    style={styles.postButton}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}