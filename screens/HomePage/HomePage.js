import React from 'react';
import { View, Text } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';

const HomePage = () => {
    return (
        <View style={{flex: 1,backgroundColor:HOMECOLOURS.dullwhite}}>
            <Text> HOME PAGE </Text>
        </View>
    );
}

export default HomePage;