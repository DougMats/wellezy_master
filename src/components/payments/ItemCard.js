import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
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
import { zfill, currencyFormat } from '../../services/Functions.js';

function ItemCard(props) {
  const [open, setopen] = useState(false);
  const [viewDescription, setviewDescription] = useState(false);
  const maxString = 100
  
  function haloDate(data, item) {
    const date = data.split(" ")[item]
    const hour = data.split(" ")[item]
    let res = "..."
    if (item === 0) {
      let y = date.split("-")[0]
      let m = date.split("-")[1]
      let d = date.split("-")[2]
      res = d + "-" + m + "-" + y
    }
    else {
      let h = hour.split(":")[0]
      let m = hour.split(":")[1]
      let H = h > 12? (h-12): h
      res = zfill(H, 2) + ":" + zfill(m, 2) + (h > 12 ? " PM" : " AM")
    }
    return res
  }



  return (
    <View style={styles.package}>
      <LinearGradient colors={["#0689f7", "#01b8f6"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.packageHead}>
        <View style={styles.packageHeadWrap}>
          <Text style={styles.packageTitle}>{props.data.title}</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Icon name={"calendar-outline"} width={15} height={15} fill={color_white} />
            <Text style={styles.packageDate}>{haloDate(props.data.created_at, 0)}</Text>
            <Icon name={"clock-outline"} width={15} height={15} fill={color_white} />
            <Text style={styles.packageDate}>{haloDate(props.data.created_at, 1)}</Text>
          </View>
        </View>

        {props.data.items.length > 0 &&
          <TouchableOpacity onPress={() => setopen(!open)}>
            <Icon name={open ? "arrow-ios-downward-outline" : "arrow-ios-forward-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
        }
      </LinearGradient>
      <View style={styles.packageBody}>
        <Text style={styles.packageDescription}>
          {viewDescription === true ?
            props.data.description : props.data.description.length > maxString ?
              ((props.data.description.substring(0, maxString - 3)) + '...') : props.data.description
          }
        </Text>
        {props.data.description.length > maxString &&
          <TouchableOpacity onPress={() => setviewDescription(!viewDescription)} style={styles.packageDescriptionViewBtn}>
            <Text style={styles.packageDescriptionViewBtnText}>
              {viewDescription ? "ver menos" : "ver más"}
            </Text>
          </TouchableOpacity>
        }
        {open &&
          <View style={styles.includesWrap}>
            <Text style={styles.includesTitle}>This package include:</Text>
            {props.data.items.map((i, key) => {
              return (
                <View key={key} style={styles.include}>
                  <Icon name={"checkmark-outline"} width={25} height={25} fill={color_star} />
                  <Text style={styles.includeText}>{i.type}</Text>
                </View>
              )
            })}
          </View>
        }
        <Text style={styles.price}>{currencyFormat(props.data.coin, props.data.price)}</Text>
        <Text style={styles.priceOffer}>{currencyFormat(props.data.coin, props.data.priceOffert)}</Text>
      </View>
      <View style={styles.packageFoot}>
        <TouchableOpacity onPress={() => props.goToScreen("PackageDescription", props.data)} style={styles.packageFootBtn}>
          <Text style={styles.packageFootBtnText}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default ItemCard;

const styles = StyleSheet.create({
  package: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden"
  },
  packageHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  packageHeadWrap: {
    flexDirection: "column"
  },

  packageTitle: {
    color: color_white,
    fontSize: 18,
    lineHeight: 25,
    textTransform: "uppercase",
    fontWeight: "bold"
  },

  packageDate: {
    lineHeight: 15,
    fontSize: 14,
    marginLeft: 5,
    marginRight: 15,
    color: color_white
  },




  packageBody: {
    padding: 20,
    flexDirection: "column"
  },
  packageDescription: {
    textAlign: "justify",
    color: color_grey_dark,
    fontSize: 14,
  },
  packageDescriptionViewBtn: {
    marginTop: 5,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    borderColor: color_grey_half,
    borderWidth: 0.5,
    borderRadius: 12
  },
  packageDescriptionViewBtnText: {
    color: color_grey_half
  },
  includesWrap: {
    paddingVertical: 20
  },
  includesTitle: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    color: color_grey_dark
  },
  include: {
    flexDirection: "row"
  },
  includeText: {
    marginLeft: 5,
    fontSize: 14,
    textTransform: "capitalize",
    color: color_grey_dark
  },
  price: {
    color: "red",
    fontSize: 14,
    lineHeight: 25,
    fontWeight: "bold",
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  priceOffer: {
    color: color_grey_dark,
    fontSize: 24,
    lineHeight: 25,
    fontWeight: "bold"
  },
  packageFoot: {
    borderTopWidth: 0.5,
    borderTopColor: color_grey_light
  },
  packageFootBtn: {
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    borderColor: color_primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 2
  },
  packageFootBtnText: {
    color: color_primary
  }
});

