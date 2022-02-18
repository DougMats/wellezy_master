import React, { useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../stars/ScoreStars.js';
import { file_server1 } from '../../../Env'
import {
  color_primary,
  color_fifth,
  color_white,
  color_black,
  color_grey_half,
  color_transparent,
  color_star
} from '../../styles/Colors.js';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const FixedWidth = (windowWidth / 10) * 9

function Card(props) {
  const { t, i18n } = useTranslation();
  const [show, setshow] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => props.goToScreen('HomeRecovery', props.data)}
      style={{
        alignSelf: "center",
        backgroundColor: color_white,
        alignItems: "center",
        alignContent: "center",
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: "column",
        overflow: "hidden",
        width: windowWidth / 2 - 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      {/* {
        props.data.type === "premium" &&
        <TouchableOpacity style={{
          backgroundColor: "rgba(255,255,255,1)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center",
          position: "absolute", zIndex: 9, top: 5, left: 10
        }}>
          <Icon name={"star"} width={20} height={20} fill={color_fifth} />
        </TouchableOpacity>
      } */}
      {/* <TouchableOpacity style={{
        backgroundColor: "rgba(255,255,255,0.4)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center",
        position: "absolute", zIndex: 9, top: 5, right: 10
      }}>
        <Icon name={"heart-outline"} width={20} height={20} fill={color_white} />
      </TouchableOpacity> */}

      <View style={{
        width: windowWidth / 2 - 15,
        height: windowWidth / 3 - 15,
      }}>
        <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover', }} source={{ uri: `${file_server1}/img/wellezy/home_recovery/${props.data.img}` }} />
      </View>
      <View
        style={{
          alignItems:"center",
          height: windowWidth / 4,
          flexDirection: "column",
          justifyContent: "space-around"
        }}>

        <Text style={{
          //backgroundColor: "red",
          // width: "100%",
          paddingHorizontal: 10,
          color: '#000',
          fontSize: 14,
          fontWeight: "700",
          textTransform: "capitalize",
          textAlign:"center"
        }}>
          {props.data.name}
        </Text>

        <ScoreStars stars={5} size={20} color={color_star} />


        {/*       
      <Text style={{width: "100%", marginBottom:5, paddingHorizontal: 10, color: color_fifth }}>{props.data.category}</Text>
     
      */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row"
          }}
        >
          <Icon name='pin' fill={color_fifth} width={15} height={15} />
          <Text style={{ color: color_fifth, marginLeft: 5, fontSize: 10 }}>{props.data.country}, {props.data.city}</Text>
        </View>
        {/* 
      <View style={{ paddingBottom: 10, flexDirection: "row", borderBottomColor: color_grey_half, borderBottomWidth: 0.5 }}>
        <View style={{ width: (FixedWidth / 2.5) - 40, height: (FixedWidth / 2.5) - 40, borderRadius: (FixedWidth / 2.5) - 40, overflow: "hidden" }}>
          <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
            />
        </View>
        <View style={{marginLeft:20, width: (FixedWidth / 2) + 40 }}>
          <Text>{props.data.name}</Text>
          <Text>{props.data.country}</Text>
          <Text>{props.data.distrito}</Text>
          <Text>{props.data.city}</Text>
          <Text>{props.data.adress}</Text>
        </View>
      </View>
      <View>
        <Text>{props.data.description}</Text>
      </View>
      */}
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(Card);