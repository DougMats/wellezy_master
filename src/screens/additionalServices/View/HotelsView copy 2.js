import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TextInput, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, ImageBackground, } from 'react-native'
import { useTranslation } from 'react-i18next'
import { showLocation } from 'react-native-map-link'
import { Icon } from 'react-native-eva-icons'

import Head from '../../../components/generic/Head'
import Menu from '../../../components/generic/Menu'
import MenuVertical from '../../../components/generic/MenuVertical.js'

import Rating from '../../../components/stars/Rating'
import RatingSimple from '../../../components/stars/RatingSimple'
import ScoreStars from '../../../components/stars/ScoreStars'
import Pagination from '../../../components/filters/Pagination'

import { file_server1 } from '../../../../Env'
import { hotels } from '../../../services/connection.js'
//import { extractDate, InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter} from '../../../components/Logic.js'
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
} from '../../../styles/Colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import HotelsReserva from './HolsReserva';
// 

import CardHotelRoom from '../../../components/cards/CardHotelRoom';

function HotelsView(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [data, setdata] = useState(props.route.params.data);
  const [displayDescription, setdisplayDescription] = useState(false);
  const [rooms, setrooms] = useState(false);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }
  useEffect(() => {
    Get(props.route.params.data.id)
  }, [randomCode, search]);

  async function Get(id) {
    setLoad(true);
    const res = await hotels.roomsList(data.id, i18n.language, search, page);
    setrooms(res);
    setLoad(false);
  }

  function GotoMaps(lat, lon) {
    showLocation({
      latitude: lat,
      longitude: lon,
      googleForceLatLon: false,
    })
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  function getPage(v) {
    setpage(v)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />

      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        stickyHeaderIndices={[2]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          //console.log(y)
        }}
      >


        <TouchableOpacity
          onPress={() => setvertical(true)}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 999,
            backgroundColor: "rgba(255,255,255,0.2)",
            width: 35,
            height: 35,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Icon name="more-vertical-outline" width={30} height={30} fill={color_white} />
        </TouchableOpacity>


        <View style={styles.upperOptionsWrapLeft}>
          <TouchableOpacity style={{ marginVertical: 10 }}>
            <Icon name={"star-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginVertical: 10 }}>
            <Icon name={"heart-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginVertical: 10 }}>
            <Icon name={"smiling-face-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
        onPress={()=>goToScreen("Reservation", data)}
          style={styles.upperBtn}>
          <Text style={styles.upperBtnText}>Reservation</Text>
        </TouchableOpacity>


        <View style={styles.banner}>
          <Image
            source={{ uri: data.img }}
            style={styles.img} />
        </View>


        <View style={styles.titleWrap}>
          <Text style={styles.title}>{data.name}</Text>
        </View>






        <View style={{
          borderBottomColor: color_grey_light,
          borderBottomWidth: 0.5,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 15,
          backgroundColor: color_white,
          alignItems: data.type === "premium" ? "flex-start" : "center",
          flexDirection: "row"
        }}>
          <Icon name={"pricetags"} width={20} height={20} fill={color_fifth} />
          <Text style={{
            marginLeft: 10,
            fontWeight: "bold",
            fontSize: 16,
            color: color_fifth
          }}>{data.category}</Text>
          {data.type === "premium" &&
            <View
              style={{
                position: "absolute",
                zIndex: 9,
                top: 8,
                right: -20,
                backgroundColor: color_white,
                paddingHorizontal: 15,
                paddingVertical: 2,
                borderRadius: 12,
                borderColor: color_fifth,
                borderWidth: 2,
                flexDirection: "row",
                paddingRight: 40,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>

              <Icon name={"award"} width={20} height={20} fill={color_fifth} />

              <Text style={{
                marginLeft: 5,
                textTransform: "uppercase",
                color: color_fifth
              }}>{data.type}</Text>
            </View>
          }
        </View>




        <Text>


General
Info
Fotos
Opiniones
Ofertas



</Text>







        {/* <View style={{...styles.descriptionWrap}}>
          <Text style={styles.description}>
            {displayDescription === false ?
              ((data.description).length > 100) ? (((data.description).substring(0, 100 - 3)) + '...') : data.description
              :
              data.description
            }
          </Text>
          <TouchableOpacity onPress={() => setdisplayDescription(!displayDescription)}
            style={styles.viewMoreBtn}>
            <Icon name={displayDescription === true ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} fill={color_grey_dark} width={20} height={20} />
            <Text style={styles.viewMoreBtnText}> {
              displayDescription === true ? "ver menos" : "ver mas"
            }
            </Text>
          </TouchableOpacity>
        </View> */}












        {/* 
        <Text>{data.country}</Text>
        <Text>{data.city}</Text>
        <Text>{data.departament}</Text>
        <Text>{data.adress}</Text>
        */}

        {/* 
        <Text>{data.city_id}</Text>
        <Text>{data.country_id}</Text>
        */}

        {/* 
        <Text>{data.basedOn}</Text>
        <Text>{data.rating}</Text>
        <Text>{data.recommended}</Text>
        <Text>{data.stars}</Text>
        */}

        {/*
        {Load && <View style={{marginTop:100}}><ActivityIndicator color={color_primary} size={40} /></View>}
        */}

        {/* 
        {!Load && rooms.data.length !== 0 &&
          <View style={{
            borderTopColor: color_grey_light, borderTopWidth: 0.5
          }}>
            <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 20, justifyContent: "space-between" }}>
              <Text style={{ color: color_fifth, textTransform: "uppercase", lineHeight: 40, fontSize: 20, fontWeight: "bold" }}>rooms:</Text>
              <TouchableOpacity style={{ ...styles.viewMoreBtn, transform: [{ scale: 0.9 }], top: -5 }}>
                <Text style={styles.viewMoreBtnText}>ver mas</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              paddingHorizontal: 5,
              flexDirection: 'row',
              width: "100%",
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
            }}>
              {!Load && rooms !== false && rooms.data.length !== 0 && rooms.data.map((i, key) => {
                return (
                  <CardHotelRoom key={key} data={i} goToScreen={goToScreen} />
                )
              })
              }
            </View>
            {!Load && rooms.last_page > 1 &&
              <Pagination page={page} lastPage={rooms.last_page} getPage={getPage} />
            }
          </View>
        } */}

        {/* {!Load && rooms.data.length !== 0 &&
          <View style={{
            display:"none",
            borderTopColor: color_grey_light, borderTopWidth: 0.5
          }}>
            <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 20, justifyContent: "space-between" }}>
              <Text style={{ color: color_fifth, textTransform: "uppercase", lineHeight: 40, fontSize: 20, fontWeight: "bold" }}>Hoteles Relacionados:</Text>
              <TouchableOpacity style={{ ...styles.viewMoreBtn, transform: [{ scale: 0.9 }], top: -5 }}>
                <Text style={styles.viewMoreBtnText}>ver mas</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal>
              {!Load && rooms !== false && rooms.data.length !== 0 && rooms.data.map((i, key) => {
                return (
                  <CardHotelRoom key={key} data={i} goToScreen={goToScreen} />
                )
              })
              }
            </ScrollView>
          </View>
        }
        */}








        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Menu props={props} option={7} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  upperOptionsWrapLeft: {
    padding: 15,
    position: "absolute",
    zIndex: 9999,
    flexDirection: "column"
  },
  upperBtn: {
    position: "absolute",
    zIndex: 999,
    top: windowWidth / 1.5 - 50,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color_fifth,
    borderColor: color_white,
    borderWidth: 1,
    borderRadius: 5,
    width: windowWidth / 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  upperBtnText: {
    marginLeft: 5,
    color: color_white,
    fontWeight: "bold",
    fontSize: 14
  },
  banner: {
    backgroundColor: color_grey_light,
    width: windowWidth,
    alignSelf: "center",
    height: windowWidth / 1.5,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },


  titleWrap: {
    backgroundColor: color_white,
    height: 80,
    justifyContent: "flex-end",
    marginTop: -25,
    zIndex: -1,
  },
  title: {
    lineHeight: 50,
    textAlign: "center",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    color: color_primary,
    textTransform: "capitalize"
  },

  descriptionWrap: {
    backgroundColor: color_white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  description: {
    lineHeight: 18,
    color: color_grey_dark,
    fontSize: 14,
    fontWeight: "400",
    width: "100%",
    textAlign: "justify"
  },

  viewMoreBtn: {
    marginTop: 10,
    backgroundColor: color_grey_light,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignSelf: "flex-end",
    borderRadius: 8
  },
  viewMoreBtnText: {
    fontWeight: "900",
    color: color_grey_dark
  },
});
export default HotelsView;