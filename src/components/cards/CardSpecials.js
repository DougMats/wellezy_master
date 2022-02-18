import React, { useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../components/stars/ScoreStars.js';
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

  //   function Name(t, n, s) {
  //     return t + ". " + n.split(" ")[0] + " " + s.split(" ")[0];
  //   }

  return (
    <View style={styles.contained}>
      <View style={styles.wrap}>
        <View style={{
          width: "100%",
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          backgroundColor: color_primary
        }}>
          <Text style={styles.title}>{props.data.specialName}</Text>
          <TouchableOpacity>
            <Icon name={props.data.favorite === true ? "heart" : "heart-outline"} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowUp}>
          <View style={[styles.wrapImage,
          {
            width: windowWidth / 3 - 5,
            height: windowWidth / 3 - 5
          }]}>
            <Image style={styles.image} source={{ uri: `${file_server1}/img/wellezy/specials/${props.data.banner}` }}/>
          </View>
          <View
            style={[styles.upWrapText, {
              width: (windowWidth / 3) * 2 - 5,
            }]}>
            <View style={{ position: "absolute", zIndex: 9, top: 0, right: 20 }}>
              {Offer(props.data.price, props.data.price_offer, 20)}
            </View>
            <Text style={styles.priceTotal}>{currencyFormat(coin, props.data.price)}</Text>
            <Text style={styles.priceOffer}>{currencyFormat(coin, props.data.price_offer)}</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon name="person-outline" width={20} height={20} fill={color_grey_half} />
              <Text style={{ textTransform: "capitalize", color: color_grey_half, marginLeft: 5 }}>{Name(props.data.title, props.data.name, props.data.surname)}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name="calendar-outline" width={20} height={20} fill={color_grey_half} />
              <Text style={{ color: color_grey_half, marginLeft: 5 }}>{props.data.date_limit} Fecha límite</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={{ textAlign: "justify" }}>
            {displayDescription === true ?
              props.data.description
              :
              props.data.description.length > 174 ?
                ((props.data.description.substring(0, 174 - 3)) + '...')
                :
                props.data.description
            }
          </Text>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnSmall}
              onPress={() => setdisplayDescription(!displayDescription)}>
              <Text style={styles.btnSmallText}>
                {displayDescription === true ? "ver menos" : "ver más"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.goToScreen("SpecialView", props.data)}
              style={styles.btnSmall}>
              <Text style={styles.btnSmallText}>ir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
export default React.memo(CardSpecials);

const styles = StyleSheet.create({
  contained: {
    alignItems: "center",
    width: windowWidth,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  wrap: {
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: color_white,
    borderRadius: 12,
    width: "100%",
    shadowColor: color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowUp: {
    padding: 10,
    flexDirection: "row"
  },
  wrapImage: {
    overflow: "hidden",
    borderRadius: 8,
    overflow: "hidden"
  },
  image: {
    width: null,
    height: null,
    resizeMode: "cover",
    flex: 1
  },
  upWrapText: {
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  title: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 18,
    width: "90%"
  },
  priceTotal: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: "bold",
    fontSize: 16,
    color: "red"
  },
  priceOffer: {
    color: color_black,
    fontSize: 20,
    fontWeight: "bold"
  },
  body: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: color_grey_light
  },
  footer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  btnSmall: {
    minWidth: "20%",
    borderRadius: 12,
    borderColor: color_primary,
    borderWidth: 1,
    marginLeft: 10
  },
  btnSmallText: {
    textAlign: "center",
    color: color_primary
  }
})

