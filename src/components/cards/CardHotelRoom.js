import React, { useCallback, useRef, useEffect, useState, useContext } from 'react'
import { Modal, Animated, Dimensions, ActivityIndicator, Touchable, TouchableHighlight, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../stars/ScoreStars.js';
import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_quarter,
  color_fifth,
  color_white,
  color_white_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark,
  color_transparent,
  color_screen,
  color_star
} from '../../styles/Colors.js'



import {
  extractDate,
  InitialsName,
  Offer,
  Name,
  GetDiference2,
  GetDiference,
  zfill,
  currencyFormat,
  globalStatusValoration,
  letterCounter
} from '../Logic.js'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CardHotelRoom(props) {
  const { t, i18n } = useTranslation();

  const coin = "¥"

  // const sizeImage = 100
  // const [zoom, setzoom] = useState(false);
  // const [imageSelected, setimageSelected] = useState(false);
  // useEffect(() => {
  //   if (imageSelected !== false) {
  //     setzoom(true)
  //   }
  // }, [imageSelected]);
  // function closeZoom() {
  //   setzoom(false)
  //   setimageSelected(false)
  // }
  // const [favorite, setfavorite] = useState(false);
  // function AdminFavorite() {
  //   setfavorite(true)
  // }
  // useEffect(() => {
  //   if (favorite === true) {
  //     setTimeout(() => {
  //       setfavorite(false)
  //     }, 3000);
  //   }
  // }, [favorite]);
  // const AnimationOne = (props) => {
  //   const MoveToLeft = useRef(new Animated.Value(windowHeight)).current
  //   React.useEffect(() => {
  //     Animated.timing(
  //       MoveToLeft,
  //       {
  //         toValue: 0,
  //         duration: 2000,
  //         useNativeDriver: true
  //       },
  //     ).start();
  //   }, [MoveToLeft])
  //   return (
  //     <Animated.View
  //       style={{
  //         ...props.style,
  //         transform: [{ translateY: MoveToLeft }]
  //       }}
  //     >
  //       {props.children}
  //     </Animated.View>
  //   );
  // }
  // const AnimationTwo = (props) => {
  //   const MoveToLeft = useRef(new Animated.Value(-windowHeight)).current
  //   React.useEffect(() => {
  //     Animated.timing(
  //       MoveToLeft,
  //       {
  //         toValue: 0,
  //         duration: 2000,
  //         useNativeDriver: true
  //       },
  //     ).start();
  //   }, [MoveToLeft])
  //   return (
  //     <Animated.View
  //       style={{
  //         ...props.style,
  //         transform: [{ translateY: MoveToLeft }]
  //       }}
  //     >
  //       {props.children}
  //     </Animated.View>
  //   );
  // }


  return (
    <TouchableOpacity
onPress={()=>props.goToScreen("Room",props.data)}
      //props.data

      style={{
        width: windowWidth / 2.2,
        backgroundColor: color_white,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 12
      }}
    >


      <View style={{
        width: windowWidth / 2.2,
        height: windowWidth / 4,
        overflow: "hidden",
        borderRadius: 12
      }}>

        <Image source={{ uri: props.data.img }} style={{
          width: null, height: null, flex: 1, resizeMode: "cover"
        }} />
      </View>



      <View
        style={{
          height: windowWidth / 3,
          padding: 10,
          paddingTop: 5,
          justifyContent: "space-around"
        }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 14,
          textTransform: "capitalize",
          color: color_fifth,
        }}>{props.data.name}</Text>

        <View style={{ flexDirection: "column" }}>
          <Text style={styles.priceTotal}>{currencyFormat(coin, props.data.price_per_night)}</Text>
          <Text style={styles.priceOffer}>{currencyFormat(coin, props.data.price_per_night_offer)}</Text>
          <View
            style={{
              alignSelf: "flex-end",
              // top: windowWidth / 4 - 10,
              right: 0,
              position: "absolute"
            }}>
            {Offer(props.data.price_per_night, props.data.price_per_night_offer, 16)}
          </View>
        </View>


      

        <View style={{marginleft:10, top:5, alignItems: "center", flexDirection: "row" }}>
          {/* <Icon name={"person"} width={30} height={30} fill={"black"} /> */}
          <Text style={{ color: "black", fontSize: 24, marginRight: 5, fontWeight: "bold" }}>{props.data.capacity}</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 12, color: "black", fontWeight: "700", lineHeight: 14 }}>personas</Text>
            <Text style={{ fontSize: 12, color: "black", fontWeight: "700", lineHeight: 14 }}>de capacidad</Text>
          </View>
        </View>
      

        <View style={{ top: 5, alignItems: "center" }}>
          <ScoreStars stars={4.5} size={20} color={color_star} />
        </View>



      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  priceTotal: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: "bold",
    fontSize: 12,
    color: "red"
  },
  priceOffer: {
    color: color_black,
    fontSize: 16,
    fontWeight: "bold"
  },
})











/*
onPress={() => console.log("big botom")}
onLongPress={() => AdminFavorite()}
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
  flexDirection: "row"
}}
<TouchableOpacity onPress={() => setimageSelected({ img: "https://img.blogs.es/anexom/wp-content/uploads/2016/08/hoteles-w-920x515.jpg", description: "rgetrtyrteyrty" })} style={styles.wrapImage}>
  <Image source={{ uri: "https://img.blogs.es/anexom/wp-content/uploads/2016/08/hoteles-w-920x515.jpg" }}
    style={styles.img}
  />
</TouchableOpacity>
<View style={{ flexDirection: "column" }}>
  <Text style={styles.nameHotel}>nombre del hotel</Text>
  <Text style={styles.nameRoom}>nombre de la habitacion</Text>
</View>
<Modal animationType="slide" transparent={true} visible={favorite} >
  <View style={{ backgroundColor: colorKappa, width: "100%", height: "100%", position: "absolute", zIndex: 999, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
    <AnimationOne style={{ position: "absolute" }}>
      <Icon name="heart" width={(windowWidth / 2)} height={(windowWidth / 2)} fill={"rgba(0,117,180,0.5)"} />
    </AnimationOne>
    <AnimationTwo style={{ position: "absolute" }}>
      <Icon name="heart" width={(windowWidth / 2)} height={(windowWidth / 2)} fill={"rgba(0,117,180,0.5)"} />
    </AnimationTwo>
    <View style={{ position: "absolute" }}>
      <Text style={{ color: colorZeta }}>Añadido a favoritos</Text>
    </View>
  </View>
</Modal>
<Modal animationType="slide" transparent={true} visible={zoom} >
  <View style={{ backgroundColor: colorKappa, width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
    <TouchableOpacity
      onPress={() => closeZoom()}
      style={{
        zIndex: 999,
        position: "absolute", right: 20, top: 20
      }}>
      <Icon name="close" fill={colorZeta} width={30} height={30} />
    </TouchableOpacity>
    <ImageZoom
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={600}
      imageHeight={400}>
      <Image
        style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
        source={{ uri: imageSelected.img }}
      />
    </ImageZoom>
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 10
      }}>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 14,
        }}>
        {imageSelected.description}</Text>
    </View>
  </View>
</Modal> */