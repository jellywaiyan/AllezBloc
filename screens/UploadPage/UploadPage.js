import React from 'react';
import { View, Text } from 'react-native';
import { HOMECOLOURS } from '../../assets/color';

const UploadPage = () => {
    return (
        <View style={{flex: 1,backgroundColor:HOMECOLOURS.dullwhite}}>
          <Text> Upload a video or picture </Text>
        </View>
    );
}

export default UploadPage;