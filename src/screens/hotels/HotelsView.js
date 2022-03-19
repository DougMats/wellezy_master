import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TextInput, SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image, ScrollView, View, Text, ActivityIndicator, ImageBackground, } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Icon } from 'react-native-eva-icons'
import Head from '../../components/generic/Head'
import Menu from '../../components/generic/Menu'
import MenuVertical from '../../components/generic/MenuVertical.js'
import Rating from '../../components/stars/Rating'
import RatingSimple from '../../components/stars/RatingSimple'
import ScoreStars from '../../components/stars/ScoreStars'
import Pagination from '../../components/filters/Pagination'
import { file_server1 } from '../../../Env'
import { hotels } from '../../services/connection.js'

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
} from '../../styles/Colors'

import MenuView        from '../additionalServices/sections/Menu'
import SectionGeneral  from '../additionalServices/sections/SectionGeneral'
import SectionInfo     from '../additionalServices/sections/SectionInfo'
import SectionImages   from '../additionalServices/sections/SectionImages'
import SectionOpinions from '../additionalServices/sections/SectionOpinions.js'
import SectionOffers   from '../additionalServices/sections/SectionOffers.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HotelsView(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [data, setdata] = useState(props.route.params.data);
  const [sticky, setsticky] = useState(false);
  const [label, setlabel] = useState(1);
  const [labelList, setlabelList] = useState([
    { id: 1, name: "General" },
    { id: 2, name: "Info" },
    { id: 3, name: "Fotos" },
    { id: 4, name: "Opiniones" },
    { id: 5, name: "Ofertas" },
    //{ id: 6, name: "Habitaiones" }
  ]);

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    Get(props.route.params.data.id)
  }, [randomCode]);

  async function Get(id) {
    setLoad(true);
    const res = await hotels.hotelInfo(data.id, i18n.language);
    setdata({ ...data, ...res });
    setLoad(false);
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /* translucent*/ barStyle='dark-content' backgroundColor={"transparent"} />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        stickyHeaderIndices={[5]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= windowWidth / 1.5 + 70) {
            setsticky(true)
          }
          else{
            if (y < windowWidth / 1.5 + 70) {
              setsticky(false)
            }
          }
        }}
      >
        <TouchableOpacity onPress={() => setvertical(true)}
          style={{ position: "absolute", top: 15, right: 15, zIndex: 999, backgroundColor: "rgba(255,255,255,0.2)", width: 35, height: 35, borderRadius: 35, justifyContent: "center", alignItems: "center"}}>
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

        <TouchableOpacity onPress={() => goToScreen("Reservation", data)}
          style={styles.upperBtn}>
          <Text style={styles.upperBtnText}>Reservation</Text>
        </TouchableOpacity>

        <View style={styles.banner}>
          <Image source={{ uri: data.img }} style={styles.img} />
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>{data.name}</Text>
        </View>

        <MenuView data={labelList} set={setlabel} value={label} />
        {Load && <ActivityIndicator size={40} color={color_fifth} />}
        {Load === false && label === 1 && <SectionGeneral  data={data} setlabel={setlabel} />}
        {Load === false && label === 2 && <SectionInfo     data={data} setlabel={setlabel} />}
        {Load === false && label === 3 && <SectionImages   data={data} setlabel={setlabel} />}
        {Load === false && label === 4 && <SectionOpinions data={data} setlabel={setlabel} />}
        {Load === false && label === 5 && <SectionOffers   data={data} setlabel={setlabel} goToScreen={goToScreen}/>}
        <View style={{ height: 80 }}></View>
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
});
export default HotelsView;