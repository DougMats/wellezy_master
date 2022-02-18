import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { profile } from '../../../services/connection.js';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

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
} from '../../../styles/Colors'


function ProfileNotifications(props) {
  const { t, i18n } = useTranslation();
  const [data, setdata] = useState(props.data);
  const [notificationsList, setnotificationsList] = useState([]);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    console.log("notifications")
    get()
  }, [props.data]);

  async function get() {
    console.log("->", props.data.id)
    const res = await profile.getNotificationsClients(props.data.id)
    setnotificationsList(res)
    setLoad(false)
  }

  return (
    <View style={{ paddingTop: 20 }}>
      {!Load &&
        notificationsList.map((i, key) => {
          return (
            <Notificaction key={key} data={i}  goToScreen={props.goToScreen}/>
          )
        })
      }
    </View>
  )
}
export default React.memo(ProfileNotifications);

const styles = StyleSheet.create({


  card: {
    overflow: "hidden",
    marginBottom: 10,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  head: {},
  body: {},
  foot: {
    backgroundColor: "white"
  },
  footText: {
    width: "100%",
    color: color_secondary,
    fontSize: 12,
    textAlign: "center",
    marginVertical: 8
  }

})



const Notificaction = (props) => {
  const { t, i18n } = useTranslation();
  function orderFecha(i, e) {
    let response
    let datas = i.split(" ");
    if (e === 0) {
      let data = datas[0].split("-")
      response = data[2] + "-" + data[1] + "-" + data[0]
    }
    else {
      console.log(datas[1]) // 10:56:29
      let data = datas[1].split(":")
      if (data[0] >= 12) {
        response = (data[0] - 12) + ":" + data[1] + ":" + data[2] + " PM"
        console.log("mayor: ", response)
      }
      else {
        response = data[0] + ":" + data[1] + ":" + data[2] + " AM"
        console.log("menor: ", response)
      }
    }
    return response;
  }

  function getDiferentTime(i) {
    let response
    let datas = i.split(" ");
    let horas = datas[1].split(":")
    let localHora = new Date().getHours();
    let localMin = new Date().getMinutes();
    let localSeg = new Date().getSeconds();
    let ValHora = horas[0]
    let ValMin = horas[1]
    let ValSeg = horas[2]
    let DifH = localHora - ValHora
    let DifM = localMin - ValMin
    let DifS = localSeg - ValSeg
    if (i18n.language === 'es') { }
    let lan = 'dsfdsfsdfdsfd'
    if (DifH > 0) {
      response = DifH + " " + t("hours")
    }
    else {
      if (DifM > 0) {
        response = DifM + " minutos"
      }
      else {
        response = DifS + " segundos"
      }
    }
    return response;
  }




  function AMPM(hora) {
    let response
    let Hora = hora.split(":")
    if (Hora[0] >= 12) {
      response = (Hora[0] - 12) + ":" + Hora[1] + ":" + Hora[2] + " PM"
      console.log("mayorok: ", response)
    }
    else {
      response = Hora[0] + ":" + Hora[1] + ":" + Hora[2] + " AM"
      console.log("menorok: ", response)
    }
    return response
  }





  return (
    <TouchableOpacity onPress={() => props.goToScreen(props.data)}>
      <LinearGradient colors={[color_primary, color_secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>


        <View style={{ justifyContent: "space-between", flexDirection: "row", borderBottomColor: color_white, borderBottomWidth: 0.5, width: "100%", paddingVertical: 5, paddingHorizontal: 15 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 14, color: color_white, fontWeight: "bold", textTransform: "uppercase" }}>{props.data.name}</Text>
            <Text style={{ fontSize: 12, color: color_white, fontWeight: "bold", textTransform: "uppercase" }}>{t("videovaluation")}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 12, color: color_white, textTransform: "uppercase" }}>{orderFecha(props.data.created_at, 0)}</Text>
            <Text style={{ fontSize: 12, color: color_white, textTransform: "uppercase" }}>{orderFecha(props.data.created_at, 1)}</Text>
            <Text style={{ fontSize: 12, color: color_white, }}>{getDiferentTime(props.data.created_at)}</Text>
          </View>
        </View>


        <View style={{ backgroundColor: "white", padding: 5, flexDirection: "row", borderBottomColor: color_secondary, borderBottomWidth: 0.5, }}>
          <Icon name="star" fill={color_secondary} width={20} height={20} style={{ top: 8, left: 3 }} />
          <View style={{ marginLeft: 10, flexDirection: "row" }}>
            <Text style={{ width: "95%", color: color_secondary, fontSize: 14 }}>
              <Text style={{ textTransform: "capitalize" }}>{props.data.names} {props.data.surnames}</Text>,
              {t("youHave")}: {props.data.scheduled_date}, {t("hour")}: {AMPM(props.data.scheduled_time)}
            </Text>
          </View>
          <View style={{}}>
          </View>
        </View>


        <View style={styles.foot}>
          <Text style={styles.footText}>
            {t("clicHere")}
          </Text>
        </View>

      </LinearGradient>
    </TouchableOpacity>
  )
}