import React, { useState, useContext, useEffect } from 'react';
import { StatusBar, ActivityIndicator, StyleSheet, SafeAreaView, Dimensions, Modal, TouchableOpacity, View, Text, TextInput, Image, ScrollView } from 'react-native';
// import Head from '../components/Head';
// import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
// import LinearGradient from 'react-native-linear-gradient';
// import Toast from 'react-native-simple-toast';
// import md5 from 'md5';
// import { serverCrm, base_url, file_server1 } from '../Env'
// import axios from 'axios'
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
} from '../../styles/Colors';


// import JitsiMeet, { JitsiMeetView, JitsiMeetEvents } from 'react-native-jitsi-meet';
// import UserContext from '../contexts/UserContext'
// import { globalStatusValoration } from '../components/Time/logic.js';
// import BTN from '../components/BTN.js';
// import ImageZoom from 'react-native-image-pan-zoom';
import _ from 'lodash';


function ViewHistoryClinic({data}) {
  const [ViewData, setViewData] = useState(true);
  const [ViewHC, setViewHC] = useState(false);
  console.log("hc data: ", data)
/*
 {
   "client_email": "art@gmail.com",
   "client_id": 1,
   "client_name": "douglas jesus",
   "client_phone": "+573124348384",
   "client_surname": "matos parra",
   "historyClinic": {"allergicList": {},
   "diseaseList": {},
    "drugsList": {},

    "errorInfo": ["42S02", 1146, "Table 'wellezy.client_clinic_history' doesn't exist"],
    "medicationList": {},
    "surgeryList": {}},
    "images": [],
    "status": 2,
    "valoration_date": "05-03-2022",
    "valoration_hour": "16:00:00",
    "valoration_id": 119,
    "valoration_keyToMeet":
    "v118c1m1KAAovM"
  }
*/
  return (
    <View style={styles.wrapper}>
      <ScrollView scrollEventThrottle={16}>

        <TouchableOpacity onPress={() => setViewData(!ViewData)} style={styles.head}>
          <Text style={styles.title}>Detos Personales</Text>
          <Icon name={ViewData ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={color_white} style={{ position: "absolute", right: 20 }} />
        </TouchableOpacity>




       {ViewData === true &&
          <View style={styles.wrap}>
             {/* <View style={styles.row}>
              <Text style={styles.rowUp}>nombres:</Text>
              <Text style={styles.rowDown}>{paciente.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>apellidos:</Text>
              <Text style={styles.rowDown}>{paciente.surname}</Text>
            </View> */}

             {/* 
           
            <View style={styles.row}>
              <Text style={styles.rowUp}>edad:</Text>
              <Text style={styles.rowDown}>{paciente.age}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>identification:</Text>
              <Text style={styles.rowDown}>{paciente.identification}</Text>
            </View>
             */}

            {/* <View style={styles.row}>
              <Text style={styles.rowUp}>email:</Text>
              <Text style={styles.rowDown}>{paciente.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>Teléfono:</Text>
              <Text style={styles.rowDown}>{paciente.phone}</Text>
            </View> */}

            {/*

            <View style={styles.row}>
              <Text style={styles.rowUp}>estrato social:</Text>
              <Text style={styles.rowDown}>{paciente.socialStratum}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowUp}>genero:</Text>
              <Text style={styles.rowDown}>{paciente.gender === 1 ? "Masculino" : "Femenino"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowUp}>ocupación:</Text>
              <Text style={styles.rowDown}>{paciente.occupation}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowUp}>Fecha de nacimiento:</Text>
              <Text style={styles.rowDown}>{paciente.dateBirthDay}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowUp}>usuario desde:</Text>
              <Text style={styles.rowDown}>{paciente.created_at}</Text>
            </View>

            */}
          </View>
        } 



        <TouchableOpacity onPress={() => setViewHC(!ViewHC)} style={styles.head}>
          <Text style={styles.title}>Historia Clínica</Text>
          <Icon name={ViewHC ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={color_white} style={{ position: "absolute", right: 20 }} />
        </TouchableOpacity>

    
        {ViewHC === true &&

          <View style={styles.wrap}>
             <View style={styles.row}>
              <Text style={styles.rowUp}>EPS:</Text>
              <Text style={styles.rowDown}>{data.historyClinic.eps} Kg.</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowUp}>Peso:</Text>
              <Text style={styles.rowDown}>{data.historyClinic.weight} Kg.</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>Altura:</Text>
              <Text style={styles.rowDown}>{data.historyClinic.height} cm.</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>alcohol:</Text>
              <Text style={styles.rowDown}>{data.historyClinic.alcohol}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>fuma:</Text>
              <Text style={styles.rowDown}>{data.historyClinic.smoke}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowUp}>hijos:</Text>
              <Text style={styles.rowDown}>{data.historyClinic.children}</Text>
            </View>
            <HCLISTYPE title="allergic"   value={data.historyClinic.allergic}   list={data.historyClinic.allergicList} />
            <HCLISTYPE title="surgery"    value={data.historyClinic.surgery}    list={data.historyClinic.surgeryList} />
            <HCLISTYPE title="disease"    value={data.historyClinic.disease}    list={data.historyClinic.diseaseList} />
            <HCLISTYPE title="medication" value={data.historyClinic.medication} list={data.historyClinic.medicationList} />
            <HCLISTYPE title="drugs"      value={data.historyClinic.drugs}      list={data.historyClinic.drugsList} />
          </View>
        }
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color_white,
  },
  head: {
    borderBottomWidth: 0.8,
    borderBottomColor: color_secondary,
    backgroundColor: color_fifth,
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 5
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: color_white,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 2
  },
  wrap: {
    marginTop: -1,
    borderColor: color_fifth,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: color_primary
  },
  rowUp: {
    width: "40%",
    textTransform: "capitalize"
  },
  rowDown: {
    fontSize: 14,
    fontWeight: "bold",
    width: "60%",
    textTransform: "capitalize"
  },
})



function HCLISTYPE(props){
  const [show, setshow] = useState(false);

  let lista = props.list// _.filter(props.list, { 'tipo': props.title });



  return (
    <View style={{ flexDirection: "column", width: "100%", minHeight: 45 }}>
      
      

      <View style={{
        flexDirection: "row",
        width: "100%",
        height: 45,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: color_primary,
        backgroundColor: show? color_primary :color_white
        }}>
        {props.value === "si" &&
          <TouchableOpacity onPress={() => setshow(!show)} style={{ left: 10, height: 45, width: "100%", position: "absolute", zIndex: 9, justifyContent: "center", alignContent: "flex-end", alignItems: "flex-end" }}>
            <Icon name={show ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={"#777"} />
          </TouchableOpacity>
        }
        <Text style={{...styles.rowUp, fontSize: 16 }}>{props.title}:</Text>
        <Text style={styles.rowDown}>{props.value}</Text>
      </View>




      {show === true && lista.length > 0 &&
        <View style={{ backgroundColor: "#eee" }}>
          {lista.map((i, key) => {
            return (
              <Text key={key} style={{ paddingVertical: 10, paddingHorizontal: 20, color: "#000", fontSize: 14, lineHeight: 20, borderBottomColor: "#ddd", borderBottomWidth: 1 }}>{key+1}- {i.description}</Text>
            );
          })}
        </View>
      }

{/* 
      {show === true && lista.length === 0 &&
        <View style={{ backgroundColor: "#eee" }}>
          <Text style={{
            //backgroundColor:"red",
            paddingVertical: 10,
            color: "#777",
            textAlign: "center",
            ontSize: 14,
            lineHeight: 20,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1
          }}>
            No se especificó esta información
          </Text>
        </View>
      }  */}
    </View>
  );
}

export default ViewHistoryClinic;