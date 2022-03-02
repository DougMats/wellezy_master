import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { profile, } from '../../../services/connection.js';
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
  color_fifth,
} from '../../../styles/Colors'

function ProfileNotifications(props) {
  const { t, i18n } = useTranslation();
  return (
    <View style={{paddingTop: 10}}>
      {props.data.length === 0 ?
        <View>
          <Text>empty</Text>
        </View>
        :
        props.data.map((i, key) => {
          return (
            <Notificaction key={key} data={i} goToScreenData={props.goToScreenData} update={props.update}/>
          )
        })
      }
    </View>
  )
}
export default ProfileNotifications;

const styles = StyleSheet.create({
  // card: {
  //   overflow: "hidden",
  //   marginBottom: 10,
  //   borderRadius: 8,
  //   width: "90%",
  //   alignSelf: "center",
  //   flexDirection: "column",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  // head: {},
  // body: {},
  // foot: {
  //   backgroundColor: "white"
  // },
  // footText: {
  //   width: "100%",
  //   color: color_secondary,
  //   fontSize: 12,
  //   textAlign: "center",
  //   marginVertical: 8
  // },
  // btn: {
  //   flexDirection: "row",
  //   borderColor: color_grey_dark,
  //   borderWidth: 0.25,
  //   borderRadius: 8,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10
  // },
  // btnText: {
  //   marginLeft: 5,
  //   fontSize: 14,
  //   fontWeight: "800",
  //   color: color_grey_half
  // }

})


const Notificaction = (props) => {
  const { t, i18n } = useTranslation();
  const [itsOpen, setitsOpen] = useState(false);
  const [itsRead, setitsRead] = useState(props.data.view === 1 ? true : false);
  return (
    <TouchableOpacity onPress={() => props.goToScreenData(props.data)}
      style={{
        borderColor: color_grey_light,
        borderWidth: itsRead ? 1 : 0,
        borderRadius: 8,
        backgroundColor: "white",
        width: "95%",
        alignSelf: "center",
        marginBottom: 10,
        flexDirection: "column",
        shadowColor: itsRead ? "transparent" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: itsRead ? 0 : 5,
      }}>
      <View style={{padding: 5,flexDirection: "row"}}>
        {!itsRead && <View style={{ borderRadius: 15, width: 15, height: 15, backgroundColor: "#2ECC71", position: "absolute", top: 10, right: 5, zIndex: 9 }}></View>}
        <View style={{ width: "15%", alignItems: "center", }}>
          <Image style={{ width: 50, height: 50, borderRadius: 50, resizeMode: "cover" }} source={{ uri: props.data.img }} />
        </View>
        <View style={{width: "60%",paddingLeft: 10,flexDirection: "column"}}>
          <Text style={{textTransform:"capitalize",fontSize: 16,color: color_fifth,fontWeight: "bold"}}>{props.data.title}</Text>
          <Text style={{ textAlign: "justify", fontSize: 14, color: color_grey_half }}>
            {
              props.data.description.length > 60 ?
                ((props.data.description.substring(0, 60 - 3)) + '...')
                :
                props.data.description
            }
          </Text>
        </View>
        <View style={{
          width: "25%",
          alignItems: "center",
          justifyContent: "space-around"
        }}>
          <TouchableOpacity onPress={() => [props.update(props.data.id),setitsOpen(!itsOpen)]} style={styles.btnFoot} >
            <Icon name={itsOpen ? 'close' : 'more-vertical'} width={25} height={25} fill={"silver"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 12, color: color_grey_half }}>{props.data.created_at.split(" ")[1]}</Text>
        </View>
      </View>
      <View style={{backgroundColor: "rgba(0,0,0,0.05)",padding: 10,flexDirection: "row",justifyContent: "space-around",display: itsOpen ? "flex" : "none"}}>
        <TouchableOpacity style={styles.btn}>
          <Icon name={'trash-2-outline'} width={20} height={20} fill={color_grey_half} />
          <Text style={styles.btnText}>Borrar</Text>
        </TouchableOpacity>
        {!itsRead &&
          <TouchableOpacity style={styles.btn}
          onPress={()=>[props.update(props.data.id), setitsRead(true)]}>
            <Icon name={'checkmark-circle-2-outline'} width={20} height={20} fill={color_grey_half} />
            <Text style={styles.btnText}>Marcar como leido</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity style={styles.btn}>
          <Icon name={'log-in-outline'} width={20} height={20} fill={color_grey_half} />
          <Text style={styles.btnText}>ir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

/*
  // function orderFecha(i, e) {
  //   let response
  //   let datas = i.split(" ");
  //   if (e === 0) {
  //     let data = datas[0].split("-")
  //     response = data[2] + "-" + data[1] + "-" + data[0]
  //   }
  //   else {
  //     console.log(datas[1]) // 10:56:29
  //     let data = datas[1].split(":")
  //     if (data[0] >= 12) {
  //       response = (data[0] - 12) + ":" + data[1] + ":" + data[2] + " PM"
  //       console.log("mayor: ", response)
  //     }
  //     else {
  //       response = data[0] + ":" + data[1] + ":" + data[2] + " AM"
  //       console.log("menor: ", response)
  //     }
  //   }
  //   return response;
  // }

  // function getDiferentTime(i) {
  //   let response
  //   let datas = i.split(" ");
  //   let horas = datas[1].split(":")
  //   let localHora = new Date().getHours();
  //   let localMin = new Date().getMinutes();
  //   let localSeg = new Date().getSeconds();
  //   let ValHora = horas[0]
  //   let ValMin = horas[1]
  //   let ValSeg = horas[2]
  //   let DifH = localHora - ValHora
  //   let DifM = localMin - ValMin
  //   let DifS = localSeg - ValSeg
  //   if (i18n.language === 'es') { }
  //   let lan = 'dsfdsfsdfdsfd'
  //   if (DifH > 0) {
  //     response = DifH + " " + t("hours")
  //   }
  //   else {
  //     if (DifM > 0) {
  //       response = DifM + " minutos"
  //     }
  //     else {
  //       response = DifS + " segundos"
  //     }
  //   }
  //   return response;
  // }

  // function AMPM(hora) {
  //   let response
  //   let Hora = hora.split(":")
  //   if (Hora[0] >= 12) {
  //     response = (Hora[0] - 12) + ":" + Hora[1] + ":" + Hora[2] + " PM"
  //     console.log("mayorok: ", response)
  //   }
  //   else {
  //     response = Hora[0] + ":" + Hora[1] + ":" + Hora[2] + " AM"
  //     console.log("menorok: ", response)
  //   }
  //   return response
  // }


function Index(props) {
  const [count, setcount] = useState(0);
  useEffect(() => {
    async function get() {
      const res = await notifications.GetNews(props.lang, props.user, props.rol)
      setcount(res.length)
    }
    get()
  }, [props]);

  return (
    <TouchableOpacity
    //onPress={()=>props.goToScreen(null,null)}
      style={{
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {count > 0 &&
        <View style={{
          backgroundColor: "red",
          width: 15,
          height: 15,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          zIndex: 9,
          top: -5,
          right: 0
        }}>
          <Text style={{
            color: "white", fontSize: 10, fontWeight: "bold", lineHeight: 12
          }}>{count}</Text>
        </View>
      }
      <Icon name={"bell-outline"} width={30} height={30} fill={"silver"} />
    </TouchableOpacity>
  )
}



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
*/
