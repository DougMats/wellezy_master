import React, { useState } from 'react';
import { Modal, Linking, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../components/stars/ScoreStars.js';
import { file_server1 } from '../../../Env'

import {
  color_primary,
  color_fifth,
  color_white,
  color_black,
  color_grey_half,
  color_transparent,
  color_star
} from '../../styles/Colors.js';

function CardMedics(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [modal, setmodal] = useState(false);
  const [Load, setLoad] = useState(false);
  const [ViewMore, setViewMore] = useState(false);

  return (
    <>
      <View style={styles.card}>
        {
          props.data.type === "premium" &&
          <View style={{ position: "absolute", right: -8, top: 5 }}>
            <View style={{
              borderTopColor: "#00A7B4",
              borderLeftColor: "#00A7B4",
              borderBottomColor: "#00A7B4",
              borderRightColor: "#fff",
              borderWidth: 1,
              backgroundColor: "#fff",
              height: 24,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 4,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              flexDirection: "row"
            }}>
              <Icon name='award' fill="#00A7B4" width={15} height={15} />
              <Text style={{ marginLeft: 5, lineHeight: 15, color: "#00A7B4", fontSize: 12, fontWeight: "600", textTransform: "capitalize" }}>
                {props.data.type}
              </Text>
            </View>
          </View>
        }
        <View style={{ padding: 1, flexDirection: "row", height: 80, marginBottom: 10 }}>
          <View style={{ borderColor: "#eee", borderWidth: 2, overflow: "hidden", backgroundColor: "#E9E9E9", width: 80, height: 80, borderRadius: 40 }}>
            <Image
              style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
              source={{ uri: `${file_server1}/img/wellezy/medics/${props.data.img}` }}
            />
          </View>
          <View style={{ flexDirection: "column", width: "65%", padding: 10 }}>
            <Text style={{ fontSize: 14 }}>{props.data.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <ScoreStars scale={props.data.basedOn} value={props.data.rating} stars={props.data.stars} size={15} color='orange' />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name='map-outline' width={15} height={15} fill='#555' style={{ top: 3, marginRight: 10 }} />
              <View style={{ top: 3 }}>
                <Text style={{ fontSize: 10 }}>
                  {props.data.city}, {props.data.departament}.
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {props.data.country}.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          marginTop: 10,
          height: ViewMore ? null : 45,
          overflow: "hidden"
        }}>
          <Text style={styles.textCard}>
            {props.data.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setViewMore(!ViewMore)}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={{ fontSize: 10, color: "#777" }}>
            {ViewMore ? t("seeLess") : t("seeMore")}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-around", top: 10, }}>
          <TouchableOpacity onPress={() => props.goToScreen("MedicsView", props.data)} style={{ height: 30, borderRadius: 15, margin: 2, backgroundColor: "orange", paddingHorizontal: 10, }}>
            <Text style={{ lineHeight: 28, textAlign: "center", color: "#000" }}>{t("watch")}</Text>
          </TouchableOpacity>
        </View>
        {/* 
         <Modal animationType="slide" transparent={true} visible={true} >
           <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
             <View style={{ top: "20%" }}>
               <TouchableOpacity
                 onPress={() => setmodal(!modal)}
                 style={{
                   position: "absolute", right: -10, top: 10
                 }}>
                 <Icon name="close-circle-outline" fill="#FFF" width={40} height={40} />
               </TouchableOpacity>
               <View style={{
                 alignContent: "center", alignItems: "center",
                 backgroundColor: "#FFF", marginTop: "15%", padding: 20, borderRadius: 20, minWidth: "90%"
               }}>
                 <Text style={{ textTransform: "capitalize", marginBottom: 20, fontSize: 18, borderBottomWidth: 1, borderBottomColor: "#009B9A", color: "#777", fontWeight: "bold" }}>{t("requestBudget")}</Text>
                 {
                   Load &&
                   <ActivityIndicator size="large" color="#009B9A" />
                 }
                 <TouchableOpacity
                   onPress={() => requestBudget()}
                   style={{ backgroundColor: "#009B9A", marginTop: 20, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 8, }}>
                   <Text style={{ textTransform: "capitalize", color: "#FFF", textAlign: "center" }}>{t("continue")}</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </View>
         </Modal>
         */}
      </View>
      {
        props.data.type === "premium" &&
        <View style={{ position: "absolute", right: 13, top: 5, zIndex: -99 }}>
          <View
            style={{ backgroundColor: "#00A7B4", top: 12, width: 24, height: 24, right: 4, zIndex: -9999999, transform: [{ rotate: "-45deg" }] }}></View>
        </View>
      }
    </>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: color_white,
    width: "90%",
    marginBottom: 10,
    padding: 20
  },
  textCard: {
    color: "#777",
    textAlign: "justify",
    fontSize: 12
  }
});

export default CardMedics;