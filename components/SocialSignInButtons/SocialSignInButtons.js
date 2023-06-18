import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

const SocialSignInButtons = ({top}) => {
    const onSignInGoogle = () => {
        console.warn("Google");
      }
      
    return (
        <>
            <CustomButton
          text="Sign In With Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
          style={top ? {top: top} : {}}
          />
        </>
    );
}

export default SocialSignInButtons;