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
  color_star,
  color_fifth
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

      <View style={styles.descount}>{Offer(props.data.price, props.data.price_offer, 10)}
      </View>




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
          <Text style={{textAlign:"center", color: color_grey_half, marginLeft: 5, fontSize: 10 }}>Vence: {props.data.date_limit}</Text>
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
  justifyContent:"space-between",
  width: windowWidth / 3,
  margin:5,
  borderRadius: 12,
  paddingVertical:5,
  //   overflow: "hidden",
  flexDirection: "column",
  //   shadowColor: color_black,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  },
  head: {
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
  },
  img: {
    borderRadius: 12,
    width: null,
    height: null,
    resizeMode: "cover",
    flex: 1
  },

  body: {
paddingTop:5,
width:"100%",
paddingHorizontal:5,

// borderTopColor:color_fifth,
// borderTopWidth:0.5,
// borderTopLeftRadius:12,
// borderTopRightRadius:12,
// backgroundColor: "yellow",//color_white,
// paddingBottom: 20,
// borderTopColor: color_grey_light,
// borderTopWidth: 0.5,
// flexDirection: "column",
// paddingHorizontal: 10
  },

  title: {
    marginTop:5,
    lineHeight:15,
    color: color_fifth,
    fontWeight: "bold",
    fontSize: 14,
    textAlign:"center"
  },

  descount: {
    position: "absolute",
    zIndex: 999,
    top: 5,
    right: 5,
    transform: [
      { rotateZ: "15deg" }
    ]
  },

  priceTotal: {
    textAlign:"center",
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: "bold",
    fontSize: 11,
    color: "red"
  },

  priceOffer: {
    textAlign:"center",
    color: color_grey_dark,
    fontSize: 14,
    lineHeight:15,
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