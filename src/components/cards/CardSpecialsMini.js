import React, { useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../stars/ScoreStars.js';
import { file_server1 } from '../../../Env'
import { Name, zfill, currencyFormat, Offer } from '../Logic'
import {
  color_primary,
  color_secondary,
  color_tertiary,
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
const windowWidth = (Dimensions.get('window').width);
function CardSpecials(props) {
  const { t, i18n } = useTranslation();
  const [displayDescription, setdisplayDescription] = useState(false);
  const coin = "$"

  return (
    <TouchableOpacity
    onPress={()=>props.goToScreen("SpecialView",props.data)}
    style={styles.wrap}>
      <View style={styles.descount}>{Offer(props.data.price, props.data.price_offer, 12)}</View>
      <View style={styles.head}>
        <Image
          style={styles.img}
          source={{ uri: `${file_server1}/img/wellezy/specials/${props.data.banner}` }}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.priceTotal}>{currencyFormat(coin, props.data.price)}</Text>
        <Text style={styles.priceOffer}>{currencyFormat(coin, props.data.price_offer)}</Text>
        <Text style={styles.title}>{props.data.specialName}</Text>
        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Icon name="calendar-outline" width={15} height={15} fill={color_grey_half} />
          <Text style={{ color: color_grey_half, marginLeft: 5, fontSize: 12 }}>Vence: {props.data.date_limit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default React.memo(CardSpecials);

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: color_white,
    alignItems: "center",
    width: windowWidth / 2.5,
    marginHorizontal: 2,
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "column",
    shadowColor: color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  head: {
    marginTop: 15,
    width: windowWidth / 2.9,
    height: windowWidth / 2.9,
  },
  img: {
    borderRadius: 12,
    width: null,
    height: null,
    resizeMode: "cover",
    flex: 1
  },
  body: {
    paddingBottom: 20,
    width: "100%",
    top: 10,
    borderTopColor: color_grey_light,
    borderTopWidth: 0.5,
    flexDirection: "column",
    paddingHorizontal: 10
  },
  title: {
    color: color_black,
    fontWeight: "bold",
    fontSize: 16,
    width: "100%"
  },
  descount: {
    position: "absolute",
    zIndex: 999,
    top: 5,
    right: 5
  },
  priceTotal: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: "bold",
    fontSize: 12,
    color: "red"
  },
  priceOffer: {
    color: color_black,
    fontSize: 14,
    fontWeight: "bold"
  },
  btn: {
    marginTop: 5,
    backgroundColor: color_primary,
    width: "80%",
    alignSelf: "center",
    paddingVertical: 5,
    borderRadius: 8
  },
  btnText: {
    color: color_white,
    textAlign: "center"
  }
})