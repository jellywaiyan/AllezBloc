import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import {HOMECOLOURS} from '../../assets/color';
import {Categories} from '../../data/dummy';
import Material from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
// code

const GymScreen = () => {
  const [currentSelected, setCurrentSelected] = useState([0]);
  const navigation = useNavigation(); 

  const signOut = () => {
    Auth.signOut();
  }
  const renderGym = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCurrentSelected(index)}>
        <View
          style={{
            width: 120,
            height: 180,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor:
              currentSelected == index ? HOMECOLOURS.accent : HOMECOLOURS.white,
            borderRadius: 20,
            margin: 10,
            elevation: 5,
          }}>
          <View style={{width: 60, height: 60}}>
            <Image
              source={item.image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              color: HOMECOLOURS.black,
              fontWeight: '600',
            }}>
            {item.name}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor:
                currentSelected == index ? HOMECOLOURS.white : HOMECOLOURS.accentRed,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <Image source={
              currentSelected !== index 
              ? require("../../assets/Logos/FAAngleRight.png")
              : require("../../assets/Logos/FAAngleDown.png")
            }
            style={{height:30, width:30, 
              backgroundColor: currentSelected == index ? HOMECOLOURS.accentRed : HOMECOLOURS.white,
            borderRadius:20
            }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBranch = (data, index) => {

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={{
          width: '100%',
          height: 180,
          justifyContent: 'center',
          alignItems: 'center',
          elevation : 5
        }}
        onPress={() => navigation.navigate("Videos")}>
        <View
          style={{
            width: '93%',
            height: 160,
            backgroundColor: HOMECOLOURS.white,
            borderRadius: 20,
            elevation: 4,
            position: 'absolute',
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <View style={{width: 150, height: 150}}>
                <Image
                    source={data.image}
                    style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                    borderRadius:10,
                    }}
                />
            </View>
            <View style={{marginBottom: 50 ,  right : 50, bottom:40, position:"absolute"}}>
                <Text
                style={{
                    fontSize: 24,
                    color: HOMECOLOURS.black,
                    fontWeight: 'bold',
                }}>
                {data.name}
                </Text>
            </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              right: 0, // Set the right property to 0 to position the item on the absolute right
            }}>
            <View
              style={{
                width: 85,
                height: 50,
                backgroundColor: HOMECOLOURS.accent,
                borderTopLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Entypo
                name="plus"
                style={{fontSize: 18, color: HOMECOLOURS.black}}
              /> */}
              <Image source={require("../../assets/plusicon.png")}
              style={{height:40, width:40}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

    //UI

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: HOMECOLOURS.dullwhite,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: HOMECOLOURS.dullwhite,
            position: 'relative',
          }}>
          <StatusBar backgroundColor={HOMECOLOURS.white} barStyle="dark-content" />
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
              }}>
              <Image
              source={require('../../assets/profile.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  borderRadius: 500,
                  left:15,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={signOut}
            > 
            <Text style={{top:16,right:30, fontSize:20}}>Sign out</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontSize: 40,
                color: HOMECOLOURS.accentGreen,
                fontWeight: '600',
                letterSpacing: 2,
              }}>
              DISCOVER
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={require("../../assets/Logos/searchIcon.png")}
            style={{height:28, width:28}}
            />
            <TextInput
              placeholder="Search..."
              style={{
                color: HOMECOLOURS.black,
                fontSize: 16,
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: HOMECOLOURS.black + 20,
                width: '90%',
                marginLeft: 10,
                letterSpacing: 1,
              }}
            />
          </View>
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: '700',
              color: HOMECOLOURS.black,
              letterSpacing: 1,
            }}>
            Climbing Gyms
          </Text>
          <FlatList
            data={Categories}
            horizontal={true}
            renderItem={renderGym}
            showsHorizontalScrollIndicator={false}
          />
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: '700',
              color: HOMECOLOURS.black,
            }}>
            Locations
          </Text>
          {Categories[currentSelected].branches.map(renderBranch)}
          <TouchableOpacity
            style={{
              margin: 30,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: HOMECOLOURS.black,
                borderBottomWidth: 1,
                borderBottomColor: HOMECOLOURS.black,
              }}>
              Load more
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GymScreen;