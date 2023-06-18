import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor, top }) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {},
            top ? {top: top} : {}
            ]}>
            <Text style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {},
                ]}>
                    {text}
                </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        top:30,
        padding:15,
        marginVertical:10,
        alignItems:'center',
        borderRadius:5,
    },

    container_PRIMARY: {
        backgroundColor:'#3B71F3',

    },
    container_TERTIARY: {
    },
    container_SECONDARY: {
        borderColor:'#3B71F3',
        borderWidth: 2
    },
    text: {
        color:'white',
        fontWeight:'bold'

    },

    text_SECONDARY: {
        color:'#3B71F3',
    },
    text_TERTIARY: {
        color:'grey'
    },
})



export default CustomButton;