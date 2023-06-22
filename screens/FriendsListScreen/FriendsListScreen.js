import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HOMECOLOURS } from '../../assets/color';
import FriendsListItem from '../../components/FriendsListItem';
import chats from "../../data/chats.json"

const FriendsListScreen = () => {
    return (
        <FlatList
        data={chats}
        renderItem={({item}) => <FriendsListItem user={item.user} />}
        style={{backgroundColor:HOMECOLOURS.dullwhite}}
        />
    );
}

export default FriendsListScreen;