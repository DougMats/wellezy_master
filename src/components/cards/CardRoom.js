import React, { useCallback, useRef, useEffect, useState, useContext } from 'react'
import { Modal, Animated, Dimensions, ActivityIndicator, Touchable, TouchableHighlight, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../components/stars/ScoreStars.js';
import { colorAlfa, colorBetta, colorGamma, colorDelta, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorOmicron, colorPi, colorRo, colorSigma, colorTau, colorIpsilon, colorFi, colorji, colorPsi, colorOmega, colorPrimary } from '../../styles/Colors.js';
import { zfill, currencyFormat, offer } from '../Functions'




export default function CardRoom(props) {
  const { t, i18n } = useTranslation();
  const [display, setdisplay] = useState(false);
  const [zoom, setzoom] = useState(false);
  const [imageSelected, setimageSelected] = useState(false);

  const [displayDescription, setdisplayDescription] = useState(false);


  const opacity = new Animated.Value(0);
  const position = new Animated.Value(-100);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const minWidth = (windowWidth) / 4
  const coin = "BsF. "

  useEffect(() => {
    if (imageSelected !== false) {
      setzoom(true)
    }
  }, [imageSelected]);

  function closeZoom() {
    setzoom(false)
    setimageSelected(false)
  }



  return (
    <View
      style={{
        width: "95%",
        backgroundColor: "white",
        alignSelf: "center",
        marginBottom: 20,
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "column"
      }}>
      <TouchableOpacity
        onPress={() => props.goToScreen("HotelsRoomView", props.data)}
        style={{
          backgroundColor: colorZeta,
          width: "100%",
          position: "relative",
          zIndex: 2,
          flexDirection: "row"
        }}
      >




        {
          //props.data.price_per_night_offer === 0.00 ?
          props.data.price_per_night_offer > 0 &&
          <View style={{ position: "absolute", zIndex: 9, top: 15, right: 15 }}>
            {offer(props.data.price_per_night, props.data.price_per_night_offer, 15)}
          </View>
        }
        <View style={{
          padding: 10,
          minWidth: minWidth,
        }}>
          <View style={{ width: minWidth - 10, height: minWidth - 10, overflow: "hidden", }}>
            <Image source={{ uri: props.data.img }} style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} />
          </View>
        </View>
        <View style={{
          minWidth: minWidth * 3,
          paddingVertical: 5,
          flexDirection: "column"
        }}>
          <Text
            style={{
              position: "relative",
              fontSize: 18,
              fontWeight: "bold",
              color: colorBetta,
              textTransform: "capitalize"
            }}>
            {props.data.name}
          </Text>
          <View style={{ flexDirection: "row", }}>
            <View style={{ flexDirection: "column", paddingHorizontal: 10, width: minWidth }}>
              <Text style={{ fontSize: 14, textAlign: "center" }}>capacidad máx: </Text>
              <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold", lineHeight: 25 }}>{props.data.capacity}</Text>
              <Text style={{ fontSize: 14, textAlign: "center" }}>adultos</Text>
            </View>
            {props.data.price_per_night_offer === 0.00 ?
              <View style={{ paddingHorizontal: 10, width: minWidth * 1.5 }}>
                <View
                  style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 10 }}>precio por noche</Text>
                  <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 14, color: "red" }}>
                    {currencyFormat(coin, props.data.price_per_night)}
                  </Text>
                  <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
                    {currencyFormat(coin, props.data.price_per_night_offer)}
                  </Text>
                </View>
              </View>
              :
              <View style={{ paddingTop: 15, paddingHorizontal: 10, width: minWidth * 1.5 }}>

                <Text style={{ fontSize: 10 }}>precio por noche</Text>

                <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
                  {currencyFormat(coin, props.data.price_per_night)}
                </Text>


              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}