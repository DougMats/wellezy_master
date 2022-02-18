import React, { useCallback, useRef, useEffect, useState, useContext } from 'react'
import { Modal, Animated, Dimensions, ActivityIndicator, Touchable, TouchableHighlight, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ImageZoom from 'react-native-image-pan-zoom';
import { zfill, currencyFormat, offer } from '../../../components/Functions.js';
import Menu from '../../../components/generic/Menu.js';
import { colorAlfa, colorBetta, colorGamma, colorDelta, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorOmicron, colorPi, colorRo, colorSigma, colorTau, colorIpsilon, colorFi, colorji, colorPsi, colorOmega, colorPrimary } from '../../../styles/Colors.js';
import { hotels } from '../../../services/connection.js'
import { GetCiudades } from '../../../services/https.js';

// import ScoreStars from '../../components/stars/ScoreStars.js';
// import { colorAlfa, colorBetta, colorGamma, colorDelta, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorOmicron, colorPi, colorRo, colorSigma, colorTau, colorIpsilon, colorFi, colorji, colorPsi, colorOmega, colorPrimary } from '../../styles/Colors.js';
// import { zfill, currencyFormat } from '../Functions'

function HotelsRoomView(props) {
  const { t, i18n } = useTranslation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const coin = "¥"
  const sizeImage = 100
  const [zoom, setzoom] = useState(false);
  const [imageSelected, setimageSelected] = useState(false);



  const minWidth = (windowWidth) / 4

  const [Load, setLoad] = useState(true);

  const [display, setdisplay] = useState(false);

  const [displayDescription, setdisplayDescription] = useState(false);
  const opacity = new Animated.Value(0);
  const position = new Animated.Value(-100);

  const [images, setimages] = useState(false);
  const [services, setservices] = useState(false);




  // 

  // useEffect(() => {
  //   if (imageSelected !== false) {
  //     setzoom(true)
  //   }
  // }, [imageSelected]);
  // function closeZoom() {
  //   setzoom(false)
  //   setimageSelected(false)
  // }
  // const offer = (price, offer) => {
  //   let res = ((offer * 100) / price) - 100
  //   return (
  //     <Text
  //       style={{
  //         backgroundColor: res > 0 ? "green" : "red",
  //         color: "white",
  //         width: 35,
  //         height: 35,
  //         textAlign: "center",
  //         lineHeight: 35,
  //         borderRadius: 35,
  //         fontSize: 14,
  //         fontWeight: "bold"
  //       }}
  //     >
  //       {res}%
  //     </Text>
  //   )
  // }

  useEffect(() => {
    Get(props.route.params.data.id)
  }, [props.route.params.data]);

  async function Get(id) {
    const imgs = await hotels.roomsImages(id, i18n.language);
    const srvc = await hotels.roomsServices(id, i18n.language);
    setimages(imgs)
    setservices(srvc)
    setLoad(false)
  }


  
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colorZeta }}>
      <ScrollView scrollEventThrottle={16} horizontal={false} stickyHeaderIndices={[3]}>



        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 999,
            top: 20,
            right: 20

          }}>
          <Icon name="heart-outline" width={30} height={30} fill={colorZeta} />
        </TouchableOpacity>
        <Image source={{ uri: props.route.params.data.img }} style={{ width: windowWidth, height: windowWidth }} />
        <View style={{ marginTop: -sizeImage / 2, paddingBottom: 10, }}>

          {!Load &&
            <ScrollView horizontal
              onScroll={event => {
                const x = event.nativeEvent.contentOffset.x;
                console.log("x -", x)
              }}
            >
              {
                images.map((i, key) => {
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => setimageSelected(i)}
                      style={{ marginHorizontal: 5, borderRadius: 12, flexDirection: "column", padding: 10, backgroundColor: colorZeta }}>

                      <View style={{ width: sizeImage, height: sizeImage, overflow: "hidden" }}>
                        <Image source={{ uri: i.img }} style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} />
                      </View>
                      <Text style={{ width: windowWidth / 4, textAlign: "center" }}>{i.description}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>


          }
        </View>





        <View
          style={{
            backgroundColor: colorZeta,
            paddingVertical: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{props.route.params.data.name}</Text>
        </View>




        <View
          style={{ backgroundColor: colorZeta, paddingBottom: 100, paddingTop: 20, paddingHorizontal: 20, flexDirection: "column" }}>
          <View
            style={{ backgroundColor: colorZeta, flexDirection: "column" }}>
            {offer(props.route.params.data.price_per_night, props.route.params.data.price_per_night_offer, 30)}
            <Text style={{ fontSize: 10 }}>precio por noche</Text>
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 14, color: "red" }}>
              {currencyFormat(coin, props.route.params.data.price_per_night)}
            </Text>
            <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
              {currencyFormat(coin, props.route.params.data.price_per_night_offer)}
            </Text>
          </View>
          <Text style={{ textAlign: "center", textAlign: "justify", marginVertical: 20 }}>{props.route.params.data.description}</Text>












          <View>
            <Text style={{ fontWeight: "bold" }}>Servicios de confort</Text>
            <View>
            </View>
          </View>
          {!Load &&
            services.map((i, key) => {
              if (i.type === "comfort") {
                return (
                  <View key={key} style={{ flexDirection: "row", marginBottom: 15 }}>
                    <View style={{ width: "10%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="checkmark" width={25} height={25} fill={colorDelta} />
                    </View>
                    <Text style={{ textAlign: "left", paddingLeft: 10, width: "90%", fontSize: 14, lineHeight: 30 }}>{i.type}-{i.service}</Text>
                  </View>
                )
              }
            })
          }





          <View>
            <Text style={{ fontWeight: "bold" }}>Servicios de conveniencia</Text>
            <View>
            </View>
          </View>
          {!Load &&
            services.map((i, key) => {
              if (i.type === "convenience") {
                return (
                  <View key={key} style={{ flexDirection: "row", marginBottom: 15 }}>
                    <View style={{ width: "10%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="checkmark" width={25} height={25} fill={colorDelta} />
                    </View>
                    <Text style={{ textAlign: "left", paddingLeft: 10, width: "90%", fontSize: 14, lineHeight: 30 }}>{i.type}-{i.service}</Text>
                  </View>
                )
              }
            })
          }





          <TouchableOpacity>
            <Text>solicitar</Text>
          </TouchableOpacity>
        </View>



      </ScrollView>
      <Menu props={props} option={3} />



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
      </Modal>


    </SafeAreaView>
  )
}


export default HotelsRoomView;