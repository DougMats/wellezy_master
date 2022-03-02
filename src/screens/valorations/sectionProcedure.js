import React, { useState, useEffect } from 'react'
import { RefreshControl, Linking, Platform, StyleSheet, Dimensions, Clipboard, ScrollView, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator, Button } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';

import { file_server1 } from '../../../Env'

import { InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter } from '../../components/Logic.js'
import ScoreStars from '../../components/stars/ScoreStars.js';
import Calendary from '../../components/time/Calendary.js';
import GetHour from '../../components/time/getHour.js';

import { valorations } from '../../services/connection'
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import Compare, { Before, After, DefaultDragger, Dragger } from 'react-native-before-after-slider-v2';

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SectionClient(props) {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState({ scrollEnabled: true })

  const onMoveStart = () => {
    setState({ scrollEnabled: false });
  }
  const onMoveEnd = () => {
    setState({ scrollEnabled: true });
  }

  return (
    <View style={{ paddingBottom: 80 }}>
      <View style={{ borderColor: color_white, borderWidth: 2, marginTop: 20, width: 150, height: 150, borderRadius: 150, backgroundColor: "silver", alignSelf: "center", overflow: "hidden" }}>
        <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: `${file_server1}/img/category/picture/${props.data.foto}` }} />
      </View>
      <View style={{ marginTop: -30, zIndex: -9, backgroundColor: color_white, width: "90%", alignSelf: "center", paddingTop: 40, paddingHorizontal: 20 }}>
        <View style={styles.group}><Text style={styles.label}>Name</Text><Text style={styles.text}>{props.data.name}</Text></View>



        {/* <Text style={{}}>{props.data.rating}</Text>
        <Text style={{}}>{props.data.recommended}</Text>
        <Text style={{}}>{props.data.stars}</Text> */}



        {props.data.foto_bofore !== "" && props.data.foto_after !== "" &&
          <View style={{ marginTop: 10, overflow: "hidden", alignContent: "center", alignItems: "center" }}>
            <Compare initial={windowWidth / 2} draggerWidth={50} width={windowWidth - 20} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
              <Before>
                <Image source={{ uri: props.data.foto_bofore }} style={{ width: windowWidth - 20, height: windowWidth / 2 }} />
              </Before>
              <After>
                <Image source={{ uri: props.data.foto_after }} style={{ width: windowWidth - 20, height: windowWidth / 2 }} />
              </After>
              <DefaultDragger />
            </Compare>
          </View>
        }

        <TouchableOpacity onPress={() => props.goToScreen("Process", props.data)}
          style={{
            borderColor: color_fifth,
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            alignSelf: "center",
            padding: 8,
            borderRadius: 12,
          }}>
          <Text style={{ color: color_fifth }}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(SectionClient);

const styles = StyleSheet.create({
  group: {
    marginBottom: 15,
    paddingBottom: 5,
    flexDirection: "column",
    borderBottomColor: color_grey_light,
    borderBottomWidth: 0.5
  },
  label: {
    fontSize: 14,
    color: color_grey_half,
    textTransform: "capitalize"
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
    color: color_grey_dark,
    textTransform: "capitalize"
  }
})
