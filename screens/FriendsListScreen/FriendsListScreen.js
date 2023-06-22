import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HOMECOLOURS } from '../../assets/color';
import FriendsListItem from '../../components/FriendsListItem';
import { API, graphqlOperation } from 'aws-amplify';
import {listUsers} from "../../src/graphql/queries"

const FriendsListScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result) => {
        console.log(result);
        setUsers(result.data?.listUsers?.items);
    })
    },[])
    return (
        <FlatList
        data={users}
        renderItem={({item}) => <FriendsListItem user={item} />}
        style={{backgroundColor:HOMECOLOURS.dullwhite}}
        />
    );
}

export default FriendsListScreen;