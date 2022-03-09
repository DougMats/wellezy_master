import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { serverCrm, base_url, file_server1 } from '../../../Env'
import ScoreStars from '../../components/stars/ScoreStars.js';

// import { GetThisServicesFavorite, ServicesFavoriteAdd, ServicesFavoriteDel } from '../../services/https.js'

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


function ProcessHead(props) {
  const { t, i18n } = useTranslation();
  const [favorite, setfavorite] = useState(props.thisfavorite);
  //console.log("head process this favorite?", favorite);

  function ThisFavorite() {
    if (favorite === false) {
      return (
        <TouchableOpacity onPress={() => props.ServicesFavoriteAdd(props.Data.id, props.d_client)} style={styles.Favorites}>
          <Icon name='star-outline' width={30} height={30} fill="#00A7B4" />
        </TouchableOpacity>
      )
    }
    if (favorite === true) {
      return (
        <TouchableOpacity onPress={() => props.ServicesFavoriteDel(props.Data.id, props.d_client)} style={styles.Favorites}>
          <Icon name='star' width={30} height={30} fill="#00A7B4" />
        </TouchableOpacity>
      );
    }
  }


  // function BTN() {
  //   if (props.Data.id_father <= 3) {
  //     return (
  //       <TouchableOpacity style={styles.BTN} onPress={() => props.showfromFather()}>
  //         <Icon name="calendar-outline" width={20} height={20} fill="orange" />
  //         <Text style={{ textAlign: "center", color: "orange", marginLeft: 5, textTransform: "capitalize", fontWeight: "bold" }}>
  //           {t("applyFor")}
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   }
  //   else {
  //     return (
  //       <TouchableOpacity style={styles.BTN} onPress={() => props.Cotizar()}>
  //         <Icon name="calendar-outline" width={20} height={20} fill="orange" />
  //         <Text style={{ textAlign: "center", color: "orange", marginLeft: 5, textTransform: "capitalize", fontWeight: "bold" }}>
  //           {t("applyFor")}
  //         </Text>
  //       </TouchableOpacity>);
  //   }
  // }

  //  console.log("---> father: ", props.Data)

  // "id": 9,
  // "id_category": 2,
  // "id_father": 2,
  // "information": "",
  // "name": "BLEPHAROPLASTY",
  // "rating": 5,
  // "recommended": 0,
  // "stars": 5,
  // "state": 1



  return (
    <LinearGradient colors={[color_secondary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.header}>





      <View style={styles.left}>
        <View style={styles.head}>
          {/* <Text style={[styles.title, styles.titleSmall]}>{props.Data.father}</Text> */}
          <Text style={[styles.title, styles.titleBig]}>{props.Data.name}</Text>
        </View>
        <View style={styles.foot}>
          <View style={styles.group}>
            <Text style={styles.smallTitle}>{t("worthIt")}</Text>
            <View style={styles.row}>
              <Text style={styles.number}>{props.Data.stars}</Text>
              <View style={styles.doubleLine}>
                <Text style={styles.smallText}>{t("basedOn")}:</Text>
                <Text style={styles.mediumText}> {props.Data.basedOn} {t("experiences")}</Text>
              </View>
            </View>
          </View>
          <ScoreStars stars={props.Data.stars} size={25} color='white' />
          <View style={styles.group}>
            <Text style={styles.smallTitle}>{t("recommendedBy")}:</Text>
            <View style={styles.row}>
              <Icon name="smiling-face-outline" width={40} height={40} fill="#FFF" style={{ top: 3 }} />
              <View style={styles.doubleLine}>
                {/* <Text style={styles.smallText}>{t("accordingTo")}:</Text> */}
                <Text style={[styles.mediumText, { marginTop: 5 }]}> {props.Data.recommended} {t("patients")}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>




      <View style={styles.right}>


        {/* {props.rol === "client" &&
          <View style={styles.up}>{ThisFavorite()}</View>
        } */}

        <TouchableOpacity
          style={{
            position:"absolute",
            width: 60,
            height: 45,
            right: 0,
            top:30,
            backgroundColor: "#FFF",
            justifyContent: "center",
            alignItems:"center",
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
      }}
          onPress={() => props.action(!props.show)}>
          <Icon name="more-vertical" width={30} height={30} fill={color_primary} />
        </TouchableOpacity>

        {props.rol === "client" &&
          <TouchableOpacity style={styles.BTN} onPress={() => props.goToScreen('SimpleForm', props.Data)}>
            <Icon name="calendar-outline" width={20} height={20} fill="orange" />
            <Text style={{ textAlign: "center", color: "orange", marginLeft: 5, textTransform: "capitalize", fontWeight: "bold" }}>
              {t("applyFor")}
            </Text>
          </TouchableOpacity>
        }
      </View>







      <View style={styles.backBannerImage}>
        <View
          style={{
            opacity: 0.2,
            backgroundColor: "black",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 9999
          }}>
        </View>
        <Image
          source={{ uri: `${file_server1}/img/category/picture/${props.Data.foto}` }}
          style={styles.bannerImage}
        />
      </View >
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  BTN: {
    position: "absolute",
    zIndex: 9999,
    right: 20,
    bottom: 20,
    justifyContent: "center",
    flexDirection: "row",
    width: 100,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },


  header: {
    width: "100%",
    overflow: "hidden",
    // backgroundColor: "#00A7B4",
    flexDirection: "row",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    minHeight: 300,
    //paddingTop:40
  },


  left: {
    position: "relative",
    zIndex: 999,
    width: "60%",
    padding: 10,
    paddingTop: 60,
    left: 10
  },
  head: {
    flexDirection: "column"
  },
  title: {
    color: "#FFF",
    textTransform: "capitalize",
  },
  titleSmall: {
    fontWeight: "bold",
    fontSize: 20
  },
  titleBig: {
    fontWeight: "bold",
    fontSize: 28
  },
  foot: {
    position: "absolute",
    flexDirection: "column",
    bottom: 20,
    left: 10,
  },
  group: {
    marginTop: 20,
    marginBottom: -5
  },
  smallTitle: {
    color: "#FFF",
    fontSize: 14,
    textTransform: "capitalize",
    lineHeight: 15,
    marginBottom: -10
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
  },

  number: {
    top: -2,
    color: "#FFF",
    fontSize: 40,
    lineHeight: 50,
    left: 5
  },
  doubleLine: {
    marginTop: 5,
    flexDirection: "column",
    left: 10
  },
  smallText: {
    color: "#FFF",
    fontSize: 14
  },
  mediumText: {
    color: "#FFF",
    fontSize: 16,
    marginTop: -3,
  },



  right: {
    //backgroundColor:"rgba(255,0,0,0.5)",
    position: "relative",
    zIndex: 999,
    width: "40%",
    //paddingHorizontal: 10,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 60
  },

  up: {
    marginTop: 0
  },

  Favorites: {
    width: 60,
    height: 45,
    right: -10,
    backgroundColor: "#FFF",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingLeft: 10,



        // alignContent: "center",
    // alignItems: "center",


    //  paddingTop: 8,
    //  borderBottomLeftRadius: 30,
    //  borderBottomEndRadius: 30,
    //  shadowColor: "#000",
    //  shadowOffset: {
    //    width: 0,
    //    height: 6,
    //   },
    //   shadowOpacity: 0.7,
    //   shadowRadius: 7.49,
    //   elevation: 12,
  },

  FavoritesText: {
    color: "#000",
    fontSize: 10,
    textAlign: "center"
  },

  backBannerImage: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  bannerImage: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
});
export default ProcessHead;