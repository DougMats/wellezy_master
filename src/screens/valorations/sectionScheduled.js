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
    <View style={{ backgroundColor: color_white, paddingHorizontal: 20, paddingBottom: 80 }}>
      <Text>{props.data.valoration.id}</Text>
      <Text>{props.data.valoration.status}</Text>
      <Text>{props.data.valoration.id_medic}</Text>
      <Text>{props.data.valoration.id_client}</Text>
      <Text>{props.data.valoration.names}</Text>
      <Text>{props.data.valoration.surnames}</Text>
      <Text>{props.data.valoration.phone}</Text>
      <Text>{props.data.valoration.email}</Text>
      <Text>{props.data.valoration.id_category}</Text>
      <Text>{props.data.valoration.id_subcategory}</Text>
      <Text>{props.data.valoration.created_at}</Text>
      <Text>{props.data.valoration.updated_at}</Text>
      <Text>{props.data.valoration.category_name}</Text>
      <Text>____________________________</Text>
      <Text>{props.data.scheduled.id}</Text>
      <Text>{props.data.scheduled.id_valoration}</Text>
      <Text>{props.data.scheduled.status}</Text>
      <Text>{props.data.scheduled.key_generated}</Text>
      <Text>{props.data.scheduled.scheduled_date}</Text>
      <Text>{props.data.scheduled.scheduled_time}</Text>
      <Text>{props.data.scheduled.created_at}</Text>
      <Text>{props.data.scheduled.updated_at}</Text>


{/* 
<View style={styles.group}><Text style={styles.label}>Key</Text><Text style={styles.text}>{props.data.key_generated}</Text></View> */}




{/* 
      <View>
        <TouchableOpacity onPress={() => props.setview("manage")} style={styles.btn}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setview("manage")} style={styles.btn}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
      </View> */}


      <TouchableOpacity onPress={() => props.setview("manage")} style={styles.btn}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>


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
  },
  btn: {
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
  },
  btnText: {
    color: color_fifth
  }
})
