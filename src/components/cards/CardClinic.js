import React, { useState, useEffect } from 'react';
import { Dimensions, Modal, Linking, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
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
} from '../../styles/Colors.js';

function CardClinic(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [modal, setmodal] = useState(false);
  const [Load, setLoad] = useState(false);
  const [ViewMore, setViewMore] = useState(false);
  
  async function requestBudget(e) {
    setLoad(true)
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => props.goToScreen("ClinicView", props.data)}>
      <View style={styles.wrapperImg}>
        {
          props.data.logo === ''
            ? <Image source={require("../../images/logo2.png")} style={styles.img2} />
            : <Image source={{ uri: props.data.logo }} style={styles.img} />
        }
      </View>
      <View style={styles.wrapperText}>
        <Text style={styles.textBig}>{props.data.nombre}</Text>
        <Text style={styles.textSmall}>{props.data.direccion}</Text>
        <Text style={styles.textSmall}>{props.data.city}, {props.data.country}.</Text>
      </View>
      <View style={styles.wrapperStars}>
        <ScoreStars scale={props.data.basedOn} value={props.data.rating} stars={props.data.stars} size={22} color={color_primary} />
      </View>
      {/* <TouchableOpacity style={styles.btn} onPress={()=>props.goToScreen(props.data)}>
        <Text style={styles.btnText}>{t("watch")}</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    margin: 8,
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "45%",
    borderRadius: 10,
    marginTop: 10
  },
  wrapperImg: {
    width: "100%",
    height: 100,
    overflow: "hidden",
    backgroundColor: "white",
    //borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "center"
  },
  img2: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain"
  },
  wrapperText: {
    padding: 10
  },
  textBig: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 14
  },
  textSmall: {
    fontSize: 12,
    color: "#555"
  },
  wrapperStars: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center"
  },
  btn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: color_primary,
    width: 70,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 8
  },
  btnText: {
    width: "100%",
    textAlign: "center",
    color: "red"
  }
});
export default CardClinic;