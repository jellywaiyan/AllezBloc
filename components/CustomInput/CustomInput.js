import React from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';

const CustomInput = ({ value, setValue, placeHolder, secureTextEntry, top}) => {
    return (
        <View style={[styles.container,
             top ? {top: top} : {} ]}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeHolder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '85%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:5,
        paddingVertical:15,
        marginVertical:8,
    },
    input: {},
})

export default CustomInput;