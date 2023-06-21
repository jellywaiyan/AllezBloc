import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import {AntDesign, MaterialIcons} from "@expo/vector-icons";

const MessageBox = () => {
    return (
        <SafeAreaView>
            <AntDesign 
            name="plus"
            size={24}
            color='royalblue'
            />
        </SafeAreaView>
    );
}

export default MessageBox;