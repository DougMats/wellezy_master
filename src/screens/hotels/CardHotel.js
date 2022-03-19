import React, { useState, useEffect } from 'react';
import { Dimensions, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../components/stars/ScoreStars'

import {
  color_fifth,
  color_white,
  color_star
} from '../../styles/Colors.js';

const windowWidth = Dimensions.get('window').width;

function Card(props) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => props.goToScreen('HotelsView', props.data)}
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
      }}
    >

      {
        props.data.type === "premium" &&
        <TouchableOpacity style={{
          backgroundColor: "rgba(255,255,255,1)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center",
          position: "absolute", zIndex: 9, top: 5, left: 10
        }}>
          <Icon name={"star"} width={20} height={20} fill={color_fifth} />
        </TouchableOpacity>
      }

      <TouchableOpacity style={{
        backgroundColor: "rgba(255,255,255,0.4)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center",
        position: "absolute", zIndex: 9, top: 5, right: 10
      }}>
        <Icon name={"heart-outline"} width={20} height={20} fill={color_white} />
      </TouchableOpacity>


      <View style={{
        width: windowWidth / 2 - 15,
        height: windowWidth / 3 - 15,
      }}>
        <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover', }} source={{ uri: props.data.img }} />
      </View>

<View style={{
  height:windowWidth / 3.5 ,
  flexDirection:"column",
  width:"100%",
  alignItems:"center",
  justifyContent:"space-around"
}}>




      <Text style={{
        width: "100%",
        paddingHorizontal: 10,
        color: '#000',
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize"
      }}>{props.data.name}</Text>
      <Text style={{width: "100%", marginBottom:5, paddingHorizontal: 10, color: color_fifth }}>{props.data.category}</Text>
      <ScoreStars stars={props.data.stars} size={20} color={color_star} />
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
        <Text style={{color: color_fifth, marginLeft: 5, fontSize: 10, textTransform:"capitalize" }}>
          {props.data.city}. {props.data.country}.
    </Text>
      </View>

      </View>
    </TouchableOpacity>
  )
}

export default React.memo(Card);



