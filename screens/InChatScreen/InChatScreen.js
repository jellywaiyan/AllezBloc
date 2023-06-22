import React, { useEffect } from 'react';
import { View,Text, ImageBackground,StyleSheet, FlatList } from 'react-native';
import bckgrnd from "../../assets/BG.png";
import Message from '../../components/Message';
import messages from "../../data/messages.json"
import MessageBox from '../../components/MessageBox';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

const InChatScreen = () =>{
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params]);
  
    return (
        <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.bckgrnd}
  >
        <ImageBackground
        source={bckgrnd}
        style={styles.bckgrnd}
        >
        <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={ item }/>}
        style={{padding:10}}
        inverted
        />
        <MessageBox/>
        </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default InChatScreen;

const styles = StyleSheet.create({
    bckgrnd: {
      flex: 1,
    },
  });