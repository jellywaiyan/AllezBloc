import React from 'react';
import { View, Text } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';

const ProfilePage = () => {
    return (
        <View style={{flex: 1,backgroundColor:HOMECOLOURS.dullwhite}}>
          <Text>PROFILE</Text>  
        </View>
    );
}

export default ProfilePage;