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
import BarRating from '../stars/BarRating.js'
import { extractDate } from '../../components/Logic.js'


const windowWidth = Dimensions.get('window').width;

function CardOpinion(props) {
  const { t, i18n } = useTranslation();
  const [open, setopen] = useState(false);
  const [viewList, setviewList] = useState(false);
  const score = (props.data.location + props.data.bedrooms + props.data.service + props.data.cleaning + props.data.price_quality + props.data.comfort + props.data.facilities + props.data.edifice + props.data.breakfast + props.data.meal ) / 10



  var randomColor, qualification
  if (score * 10 <= 20) { qualification = "malo"; randomColor = "#E74C3C" }
  if (score * 10 >= 21 && score * 10 <= 40) { qualification = "regular"; randomColor = "#F39C12" }
  if (score * 10 >= 41 && score * 10 <= 60) { qualification = "bueno"; randomColor = "#F1C40F" }
  if (score * 10 >= 61 && score * 10 <= 80) { qualification = "muy bueno"; randomColor = "#2ECC71" }
  if (score * 10 > 81) { qualification = "excelente"; randomColor = "#27AE60" }



  const max = (windowWidth / 12) * 10
  const maxLetters = 100

  /* 
  props.data.id
  props.data.id_bill
  props.data.id_client
  props.data.id_hotel
  */


  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "white",
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 10
      }}>
      <View style={{
        marginBottom:10,
        flexDirection: "row",
        justifyContent: "space-between"
      }}>
        <View style={{ width: "25%", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
          <View style={{ backgroundColor: randomColor, width: 60, height: 60, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: color_white, textAlign: "center" }}>{score}/10</Text>
          </View>

          <Text style={{textTransform:"capitalize", color: randomColor}}>{qualification}</Text>
        </View>

        <View style={{paddingVertical:5, justifyContent:"space-around", width: "70%", flexDirection: "column" }}>
        <View style={{ flexDirection: "row", width:"100%", }}>
          <Text style={{ width: "60%", fontSize: 14, color: color_grey_dark }}>Fecha de la opinión:</Text>
          <Text style={{ width: "40%", fontSize: 14, color: color_grey_dark, fontWeight:"bold",}}>{extractDate(props.data.create_at, 0)}</Text>
        </View>
        <View style={{ flexDirection: "row", width:"100%", }}>
          <Text style={{ width: "60%", fontSize: 14, color: color_grey_dark }}>Fecha de la estadía:</Text>
          <Text style={{ width: "40%", fontSize: 14, color: color_grey_dark, fontWeight:"bold",}}>No disponible</Text>
        </View>
        </View>
      </View>

      <Text style={{
        textAlign: "justify",
        lineHeight: 20,
        fontSize: 14,
        color: color_grey_dark
      }}>
        {open === true ?
          props.data.opinion
          :
          props.data.opinion.length > maxLetters ?
            ((props.data.opinion.substring(0, maxLetters - 3)) + '...')
            :
            props.data.opinion
        }
      </Text>

      {
        props.data.opinion.length > maxLetters &&
        <TouchableOpacity onPress={() => setopen(!open)}
          style={{
            alignSelf: "flex-end",
            flexDirection: "row"
          }}>
          <Text style={{ color: color_grey_half, fontSize: 14 }}>
            {open ? "ver menos" : "ver mas"}</Text>
        </TouchableOpacity>
      }

      <BarRating max={max} value={props.data.bedrooms} title={t("bedrooms")} />
      <BarRating max={max} value={props.data.service} title={t("service")} />
      {viewList === true &&
        <>
          <BarRating max={max} value={props.data.location} title={t("location")} />
          <BarRating max={max} value={props.data.cleaning} title={t("cleaning")} />
          <BarRating max={max} value={props.data.price_quality} title={t("priceQuality")} />
          <BarRating max={max} value={props.data.comfort} title={t("comfort")} />
          <BarRating max={max} value={props.data.facilities} title={t("facilities")} />
          <BarRating max={max} value={props.data.edifice} title={t("edifice")} />
          <BarRating max={max} value={props.data.breakfast} title={t("breakfast")} />
          <BarRating max={max} value={props.data.meal} title={t("meal")} />
        </>
      }


      <TouchableOpacity onPress={() => setviewList(!viewList)}
        style={{
          // borderWidth: 0.5,
          // borderColor: color_grey_half,
          width: 30,
          height: 30,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
        }}>
        <Icon name={viewList ? 'arrow-ios-upward-outline' : 'arrow-ios-downward-outline'} width={20} height={20} fill={color_grey_half} />
      </TouchableOpacity>


    </View>
  );
}
const styles = StyleSheet.create({

});
export default CardOpinion;