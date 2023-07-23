import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HOMECOLOURS } from '../../assets/color';
import FriendsListItem from '../../components/FriendsListItem';
import { API,Auth,graphqlOperation } from 'aws-amplify';
import {listUsers} from "../../src/graphql/queries"
import { getUser } from '../../src/graphql/queries';

const FriendsListScreen = () => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const syncUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true,});
      
            const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub}));
            setUserData(userData.data.getUser);
            return;
          }
          syncUser();

        API.graphql(graphqlOperation(listUsers)).then((result) => {
        setUsers(result?.data?.listUsers?.items);
    })
    },[])
    return (
        <FlatList
        data={users.filter(x => x.id != userData.id)}
        renderItem={({item}) => <FriendsListItem user={item} />}
        style={{backgroundColor:HOMECOLOURS.dullwhite}}
        />
    );
}

export default FriendsListScreen;