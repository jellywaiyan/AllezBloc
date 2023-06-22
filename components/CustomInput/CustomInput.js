import React from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({control, name, placeHolder, rules={} , secureTextEntry, top}) => {
    return (
    <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState:{error}}) => 
       <>
        <View style={[styles.container,top ? {top: top} : {} ,
        {borderColor: error ? 'red' : '#e8e8e8'}]}>
            <TextInput 
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeHolder}
            style={[styles.input, {}]}
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
            />
        </View>
        {error && <Text style={[top ? {top:top - 5} : top,
        {color:'red', alignSelf:'stretch', left:30}]}>{error.message || "Error "}</Text>}
        </>
        }
    />
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