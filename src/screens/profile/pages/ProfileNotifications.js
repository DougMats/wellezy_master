import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { profile, notifications } from '../../../services/connection.js';
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
        <View style={{
          marginTop:100,
          borderWidth:1.5,
          width:"80%",
          alignSelf:"center",
          justifyContent:"center",
          alignItems:"center",
          paddingVertical:25,
          borderRadius:20,
          borderColor: color_grey_half,
          borderStyle:"dashed"
        }}>
          <Text style={{
            color:color_grey_half,
            fontSize:16,
            fontWeight:"bold"
          }}>No tienes notificaciones...!</Text>
        </View>
        :
        props.data.map((i, key) => {
          return (
            <Notificaction key={key} data={i} goToScreen={props.goToScreen} update={props.update}/>
          )
        })
      } 
    </View>
  )
}
export default ProfileNotifications;

const styles = StyleSheet.create({
  notifiation:{
    borderColor: color_grey_light,
    borderRadius: 8,
    backgroundColor: "white",
    width: "95%",
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "column",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },




  
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
    <TouchableOpacity onPress={() => props.goToScreen(props.data)}
      style={{...styles.notifiation, borderWidth: itsRead ? 1 : 0, shadowColor: itsRead ? "transparent" : "#000", elevation: itsRead ? 0 : 5}}
    >
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
          <TouchableOpacity onPress={() => [props.update(props.data.id), setitsOpen(!itsOpen)]} style={styles.btnFoot} >
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