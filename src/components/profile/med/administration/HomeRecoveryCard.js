import React, { useState, useRef, useContext, useEffect } from 'react';
import { Animated, Dimensions, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../../stars/ScoreStars'
import { file_server1 } from '../../../../../Env'
import {
  color_primary,
  color_fifth,
  color_white,
  color_black,
  color_grey_half,
  color_transparent,
  color_star,
  color_grey_light,
  color_grey_dark
} from
  '../../../../styles/Colors'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const FixedWidth = (windowWidth / 10) * 9

export default function Card(props) {
  const { t, i18n } = useTranslation();
  const [show, setshow] = useState(false);
  //console.log("mini home recovery --->", props.data)
  /*
  {
    "adress": "Street 8 west 35 A -102 Neighoborhood Cristales",
    "basedOn": 0,
    "category": "", 
    "city": "Cali",
    "city_id": "2258",
    "country": "Colombia",
    "country_id": "COL",
    "created_at": "2021-11-29 17:15:33",
    "description": "In Harmony Recovery House, you will have the provision of the best facilities and an excellent team of professionals with best training, dedicated to the care and support you need while you stay in our country.",
    "distric": "Valle",
    "id": 3,
    "id_medic": 1,
    "img": "64173243-WHR.png",
    "latitud": "",
    "longitud": "",
    "name": "harmony recovery house",
    "rating": 0, 
    "recommended": 0, 
    "stars": 0, 
    "status": 0,
    "type": "premium",
    "update_at": "2021-11-29 17:15:33"
  }
  */
  const WIDTH = (windowWidth / 10) * 9
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeWidth = useRef(new Animated.Value(WIDTH)).current;

  const fadeIn = () => {
    Animated.timing(fadeWidth, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeWidth, {
      toValue: WIDTH,
      duration: 250,
      useNativeDriver: false
    }).start();
  };





  return (
    <View
      //onPress={() => props.goToScreen('HomeRecovery', props.data)}
      style={{
        backgroundColor: color_white,
        width: WIDTH,
        alignSelf: "center",

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        flexDirection: "column",
        borderRadius: 12,
        overflow: "hidden"
      }}>





      <Animated.View style={{
        width: WIDTH,
        transform: [{ translateX: fadeWidth }],
        backgroundColor: "rgba(0,0,0,0.8)",
        position: "absolute",
        zIndex: 999,
        top: 0,
        right: 0,
        flexDirection: "column",
        height: "100%",
      }}>
        <View style={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: WIDTH / 3,
          backgroundColor: color_white,
          position: "absolute",
          top: 0,
          right: 0
        }}>
          <View style={{
            flexDirection: "column",
            paddingTop: 10
          }}>
            <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 10, flexDirection: "row" }}><Icon name={"eye-outline"} width={20} height={20} fill={color_grey_dark} /><Text style={{ fontSize: 14, fontWeight: "bold", color: color_grey_dark, marginLeft: 5 }}>Ver</Text></TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 10, flexDirection: "row" }}><Icon name={"edit-outline"} width={20} height={20} fill={color_grey_dark} /><Text style={{ fontSize: 14, fontWeight: "bold", color: color_grey_dark, marginLeft: 5 }}>Editar</Text></TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 10, flexDirection: "row" }}><Icon name={"trash-2-outline"} width={20} height={20} fill={color_grey_dark} /><Text style={{ fontSize: 14, fontWeight: "bold", color: color_grey_dark, marginLeft: 5 }}>Eliminar</Text></TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => fadeOut()}
            style={{
              justifyContent: "center",
              flexDirection: "row",
              paddingVertical: 10,
              borderTopColor: color_grey_light,
              borderTopWidth: 0.5
            }}>
            <Icon name={"close"} width={20} height={20} fill={color_grey_dark} />
            <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: "bold", color: color_grey_dark }}>cerrar</Text>

          </TouchableOpacity>
        </View>
      </Animated.View>

      <TouchableOpacity
        onPress={() => fadeIn()}
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          backgroundColor: color_fifth,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 9,
          top: 5,
          right: 5
        }}>
        <Icon name={"more-vertical"} width={20} height={20} fill={color_white} />
      </TouchableOpacity>





      <View style={{ flexDirection: "row" }}>

        <View style={{
          overflow: "hidden",
          backgroundColor: "#E9E9E9",
          width: WIDTH / 3,
          height: WIDTH / 3,
          borderRadius: WIDTH / 3
        }}>
          <Image
            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
            source={{ uri: `${file_server1}/img/wellezy/home_recovery/${props.data.img}` }}
          />
        </View>


        <View style={{
          backgroundColor: "red",
          width: (WIDTH / 3) * 2,
          flexDirection: "column",
          padding: 10
        }}>
          <Text>{props.data.name}</Text>
          <Text>{props.data.category}</Text>
          <Text>{props.data.type}</Text>
        </View>
      </View>

      <Text>{props.data.adress}</Text>
      <Text>{props.data.country}. {props.data.city}. {props.data.distric}.</Text>

      <Text>{props.data.description}</Text>



      {/*
      <Text>{props.data.id}</Text>
      <Text>{props.data.id_medic}</Text>
      */}

      <Text>basedOn: {props.data.basedOn}</Text>
      <Text>rating {props.data.rating}</Text>
      <Text>recommended {props.data.recommended}</Text>
      <Text>stars {props.data.stars}</Text>
      <Text>status {props.data.status}</Text>



      {/* <View style={{ paddingBottom: 10, flexDirection: "row", borderBottomColor: color_grey_half, borderBottomWidth: 0.5 }}>
        <View style={{ backgroundColor: "rgba(0,0,0,0.1)", width: (FixedWidth / 2.5) - 40, height: (FixedWidth / 2.5) - 40, borderRadius: (FixedWidth / 2) - 40, overflow: "hidden" }}>
          <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
            source={{ uri: `${file_server1}/img/wellezy/home_recovery/${props.data.banner}` }} />
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
      <View style={styles.wrapL}>
        <View style={{ overflow: "hidden", backgroundColor: "#E9E9E9", width: minWidth + 20, height: minWidth + 20 }}>
          <Image style={{
            flex: 1, width: null, height: null, resizeMode: 'cover',
          }} source={{ uri: props.data.img }} />
        </View>
      </View>
      <View style={styles.wrapR}>
      <Text style={{ fontWeight: "bold", width: "65%", fontSize: 14, color: '#000', textTransform: "uppercase" }}>{props.data.name}</Text>
          <Text style={{ marginBottom: 5, fontSize: 14, color: '#00a7b4', textTransform: "capitalize" }}>{props.data.category}</Text>
          <ScoreStars stars={props.data.stars} size={20} color={colorDelta} />
          <Text style={{ marginTop: 5, fontSize: 14, color: '#000', textTransform: "capitalize" }}>{props.data.city} - {props.data.country}</Text>
      </View>
      {props.data.recommended > 0 &&
        <View
          style={{
            backgroundColor: colorBettaLight,
            padding: 5,
            position: "absolute",
            right: 0,
            top: 0,
            flexDirection: "column",
            width: minWidth,
            alignItems: "center",
            borderBottomLeftRadius: 8
          }}>
          <Text style={{ textAlign: "center", fontSize: 8, color: '#000', lineHeight: 10, }}>Recomiendado por:</Text>
          <Text style={{ textAlign: "center", fontSize: 24, color: '#fff', fontWeight: "bold", lineHeight: 30, }}>
            {props.data.recommended}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 10, color: '#000', lineHeight: 10, }}>personas</Text>
        </View>
      }
      {props.data.type === "premium" &&
        <View style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, paddingLeft: 10, position: "absolute", right: -4, bottom: 5, width: minWidth + 5, height: 25, backgroundColor: "white", flexDirection: "row", borderColor: "#00A7B4", borderWidth: 2 }}>
          <Icon name='award' fill="#00A7B4" width={15} height={15} style={{ right: 5, top: 3 }} />
          <Text style={{ color: "#00A7B4", lineHeight: 20 }}>Premium</Text>
        </View>
      } */}
    </View>
  )
}

const styles = StyleSheet.create({})



