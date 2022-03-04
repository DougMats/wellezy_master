import { get } from 'lodash'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, RefreshControl, Image, TouchableOpacity, Dimensions, ScrollView, View, Text, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { valorations } from '../../services/connection'
import MenuVertical from '../../components/generic/MenuVertical';
import Small from '../../components/time/Small.js'
import {
  // toBase64Format,
  // GotoMaps,
  // extractDate,
  // InitialsName,
  // Offer,
  // Name,
  GetDiference2,
  GetDiference,
  // zfill,
  // currencyFormat,
  // globalStatusValoration,
  // letterCounter 
} from '../../components/Logic.js'

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ValorationView(props) {
  const { t, i18n } = useTranslation();
  const [data, setdata] = useState(null);
  const [Load, setLoad] = useState(true);
  const [vertical, setvertical] = useState(false);
  const [pagesList, setpagesList] = useState([
    "scheduled",
    "valoration",
    "medic",
    "procedure",
    "clinicHistory",
    "images",
    "client",
  ]);


  const [page, setpage] = useState(pagesList[0]);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    get()
  }, [randomCode]);




  async function get() {
    console.log("valoration view get()")
    setLoad(true)
    const res = await valorations.getThisValoration(i18n.language, props.route.params.data.id)
    setdata(res)
    setLoad(false)
  }


  function goToMeet(key) {
    console.log("meet")
    let key_conference = key
    props.navigation.navigate("Sala", { randomCode: Math.random(), data, key_conference })
  }


  




  function goToScreen(screen, data) {
    console.log("go to screen ---------- data: ", data)



    //let data = data
    // if(screen === "HistoryClinicForm"){
    //   data={
    // id:"",
    // id_medic:"",
    // id_cliente:""
    //   }
    //id_cita: props.route.params.data.id,
    //id_medic: props.route.params.data.id_medic,
    //id_client: props.route.params.data.id_cliente,
    //}


    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }





  /*
  
  
  // else{screen = 'Home';}
  // // let key_conference = data.key_generated;
  // // if (data.status === 0) { screen = 'HistoryClinicForm'; }
  // // if (data.status === 1) { screen = 'UploadPictures'; }
  // // if (data.status === 2) { screen = 'Sala'; }
  // props.navigation.navigate(screen, { randomCode: Math.random(), data, key_conference })

    data:  {
      "client":{ "adress": null, "city": "", "city_id": null, "country_id": null, "created_at": "2021-12-21 14:25:43", "dateOfBirth": null, "distric": "", "facebook": null, "id": 1, "identificacion": "1123009452", "img": "default-user.png", "instagram": null, "name": "angie katherine", "phone": "3127023197", "surname": "acosta henao", "twitter": null, "updated_at": "2021-12-21 14:25:43", "youtube": null},  
      "clinicHistory": null,
      "images": null,
      "procedure": {"basedOn": 1, "description": "", "foto": "Portadas cirugías_Otoplastia.png", "foto_after": "https://image.freepik.com/foto-gratis/gato-rojo-o-blanco-i-estudio-blanco_155003-13189.jpg", "foto_before": "https://image.freepik.com/foto-gratis/gatito-pared-monocromatica-detras-ella_23-2148955134.jpg", "id": 9, "id_category": 2, "information": "", "name": "BLEFAROPLASTIA", "name_frances": "BLÉPHAROPLASTIE", "name_ingles": "BLEPHAROPLASTY", "name_italiano": "BLEFAROPLASTIA", "name_portugues": "BLEFAROPLASTIA", "rating": 5, "recommended": 0, "stars": 5, "state": 1},
      "scheduled": {"created_at": "2021-07-19 12:56:26", "id": 1, "id_valoration": 119, "key_generated": "v118c1m1KAAovM", "scheduled_date": "05-03-2022", "scheduled_time": "16:00:00", "status": 2, "updated_at": "2021-07-24 11:56:26"},
      "valoration": {"created_at": "2022-03-02 09:30:06", "email": "art@gmail.com", "id": 119, "id_category": 2, "id_client": 1, "id_medic": 1, "id_subcategory": 9, "names": "douglas jesus", "phone": "+573124348384", "status": "Procesada", "surnames": "matos parra", "updated_at": "2022-03-02 09:30:06"}
    }
  */




  return (
    <SafeAreaView style={{
      flex: 1, backgroundColor: color_screen
    }}>
      <StatusBar backgroundColor={color_white} barStyle='dark-content' />

      <ScrollView
        scrollEventThrottl={16}
        showsHorizontalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={Load}
            onRefresh={get}
          />
        }>


        <View style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30, flexDirection: "row", justifyContent: "space-between", backgroundColor: color_white, paddingHorizontal: 20, paddingBottom: 10, paddingTop: 40, }}>
          <View style={{}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon name="arrow-ios-back-outline" width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={{ lineHeight: 30, color: color_grey_half, fontSize: 14, fontWeight: "bold" }}>Valoration</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity onPress={() => setvertical(true)}>
              <Icon name="more-vertical" width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>
          </View>
        </View>


        {!Load &&
          <View style={styles.srollOption} >
            <ScrollView horizontal>
              {
                pagesList.map((i, key) => {
                  return (
                    <TouchableOpacity onPress={() => setpage(i)} key={key} style={{
                      ...styles.srollOptionBtn,
                      borderColor: page === i ? color_fifth : "transparent"
                    }} >
                      <Text style={{ ...styles.srollOptionText, color: page === i ? color_fifth : color_grey_half }}>{i}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        }



        {Load && <ActivityIndicator color={color_primary} size={40} style={{ marginTop: 150 }} />}
        {!Load && page === "scheduled" && <Scheduled category={data.category} data={data.scheduled} valoration={data.valoration} goToMeet={goToMeet} goToScreen={goToScreen} />}
        {!Load && page === "valoration" && <View><Text>valoration</Text></View>}
        {!Load && page === "client" && <View><Text>client</Text></View>}
        {!Load && page === "clinicHistory" && <ClinicHistory data={data.clinicHistory}/>}
        {!Load && page === "images" && <View><Text>images</Text></View>}
        {!Load && page === "procedure" && <View><Text>procedure</Text></View>}

        {!Load && page === "medic" && <Medic data={data.medic} />}

      </ScrollView>
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView>
  )
}
export default ValorationView;

const styles = StyleSheet.create({
  srollOption: {
    marginTop: 10,
  },
  srollOptionBtn: {
    backgroundColor: color_white,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 5,
    marginHorizontal: 3,
    width: windowWidth / 4,
    alignItems: "center",
    paddingVertical: 8
  },
  srollOptionText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  body: {
    marginTop: 10,
    paddingHorizontal: 20,
  },




  row: {
    backgroundColor: color_white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "column"
  },
  label: {
    textTransform: "capitalize",
    color: color_grey_half,
    fontSize: 14
  },
  text: {
    color: color_grey_dark,
    fontSize: 16,
    fontWeight: "bold"
  },

  btn: {
    marginTop: 20,
    backgroundColor: color_fifth,
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    alignSelf: "center"
  },
  btnText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: color_white
  }
})






const Scheduled = (props) => {
  return (
    <View style={styles.body}>
      {props.valoration.status === "Sin pagar" &&
        <View style={{ backgroundColor: color_white, padding: 20, flexDirection: "column", borderRadius: 12 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 14, color: color_grey_dark, textTransform: "uppercase" }}>debes pagar la video valoración</Text>
          <View style={{
            marginTop: 10,
            alignSelf: "center",
            width: 200,
            height: 200,
          }}>
            <Image source={require('../../images/toPay.png')} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => props.goToScreen("PaymentCart", null)}>
            <Text style={styles.btnText}>ir</Text>
          </TouchableOpacity>
        </View>
      }

      {props.valoration.status === "Pendiente" &&
        <View style={{ backgroundColor: color_white, padding: 20, flexDirection: "column", borderRadius: 12 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 14, color: color_grey_dark, textTransform: "uppercase" }}>procesando...</Text>
          <View style={{
            marginTop: 10,
            alignSelf: "center",
            width: 200,
            height: 200,
          }}>
            <Image source={require('../../images/procesando.png')} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
          </View>
        </View>
      }

      {props.valoration.status === "Realizada" &&
        <View style={{ backgroundColor: color_white, padding: 20, flexDirection: "column", borderRadius: 12 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 14, color: color_grey_dark, textTransform: "uppercase" }}>tu valoracion ya fue realizada! compartenos tu experiencia</Text>
          <TouchableOpacity style={styles.btn} onPress={() => props.goToMeet(props.data.key_generated)}>
            <Text style={styles.btnText}>ir</Text>
          </TouchableOpacity>
        </View>
      }

      {props.valoration.status === "Procesada" && <View>
        {props.data.status < 2 &&
          <View style={{ backgroundColor: color_white, padding: 20, flexDirection: "column", borderRadius: 12, marginBottom: 20 }}>
            <Text style={{ color: "red", fontSize: 14, textTransform: "uppercase", textAlign: "center" }}>
              aun no puedes unirte a la video llamada, debes completar los requisitos:
            </Text>
            <View style={{ marginTop: 10, alignSelf: "center", width: 200, height: 200, }}>
              <Image source={require('../../images/formOne.png')} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
            </View>

            {props.data.status < 1 &&
              <TouchableOpacity onPress={() => props.goToScreen("HistoryClinicForm", props.valoration)} style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 10 }}>
                <Icon name="arrow-ios-forward" width={20} height={20} fill={color_primary} />
                <Text style={{ color: color_primary, textTransform: "uppercase" }}>llenar historial clinico</Text>
              </TouchableOpacity>
            }
            {props.data.status < 2 &&
              <TouchableOpacity onPress={() => props.goToScreen("UploadPictures", {
                "id_valoration": props.data.id_valoration,
                "id_valoration_scheduled": props.data.id,
                "scheduled_date": props.data.scheduled_date,
                "scheduled_time": props.data.scheduled_time,
                "category_name": props.category.name_ingles,
                "key_generated": props.data.key_generated
              })} style={{ flexDirection: "row", paddingHorizontal: 20, marginTop: 10 }}>
                <Icon name="arrow-ios-forward" width={20} height={20} fill={color_primary} />
                <Text style={{ color: color_primary, textTransform: "uppercase" }}>subir fotos</Text>
              </TouchableOpacity>
            }
          </View>
        }
        <View style={styles.row}>
          <Text style={styles.label}>código de acceso:</Text>
          <Text style={styles.text}>{props.data.key_generated}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dia</Text>
          <Text style={styles.text}>{props.data.scheduled_date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>hora:</Text>
          <Text style={styles.text}>{props.data.scheduled_time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tiempo restante</Text>
          <Small
            days={props.data.scheduled_date}
            hours={props.data.scheduled_time}
            size={14}
            color={color_grey_dark}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Agendado desde:</Text>
          <Text style={styles.text}>{props.data.created_at.split(" ")[0]}, {props.data.created_at.split(" ")[1]}</Text>
        </View>
        {props.data.status === 2 &&
          <TouchableOpacity style={styles.btn} onPress={() => props.goToMeet(props.data.key_generated)}>
            <Text style={styles.btnText}>unirme a la llamada</Text>
          </TouchableOpacity>
        }
      </View>
      }
    </View>
  )
}



const Medic = (props) => {
  return (
    <View style={styles.body}>
      <Text>{props.data.id}</Text>
      <Text>{props.data.id_medic}</Text>
      <Text>{props.data.name}</Text>
      <Text>{props.data.surname}</Text>
      <Text>{props.data.identification}</Text>
      <Text>{props.data.title}</Text>
      <Text>{props.data.specialty}</Text>
      <Text>{props.data.img}</Text>
      <Text>{props.data.phone}</Text>
      <Text>{props.data.dateOfBirth}</Text>
      <Text>{props.data.placeOfBirth}</Text>
      <Text>{props.data.country_id}</Text>
      <Text>{props.data.country}</Text>
      <Text>{props.data.distric}</Text>
      <Text>{props.data.city_id}</Text>
      <Text>{props.data.city}</Text>
      <Text>{props.data.adress}</Text>
      <Text>{props.data.description}</Text>
      <Text>{props.data.rating}</Text>
      <Text>{props.data.basedOn}</Text>
      <Text>{props.data.stars}</Text>
      <Text>{props.data.type}</Text>
      <Text>{props.data.facebbok}</Text>
      <Text>{props.data.instagram}</Text>
      <Text>{props.data.twitter}</Text>
      <Text>{props.data.youtube}</Text>
      <Text>{props.data.created_at}</Text>
      <Text>{props.data.updated_at}</Text>
    </View>
  )
}

const ClinicHistory =(props) =>{
  return(
<View>
{/* 

// {
// 	"clinicHistory": {
// 		"id": 1,
// 		"id_client": 1,
// 		"id_valoration": 119,
// 		"eps": "Salud total",
// 		"height": "150",
// 		"weight": "50",
// 		"children": "1",
// 		"alcohol": "si",
// 		"smoke": "no",
// 		"surgery": "si",
// 		"disease": "no",
// 		"medication": "si",
// 		"allergic": "si",
// 		"drugs": "no",
// 		"created_at": "2022-03-03 14:44:42",
// 		"updated_at": "2022-03-03 14:44:42",
// 		"enfermedades": [],
// 		"alergias": [
// 			{
// 				"description": "Ingerir alcohol - urticaria"
// 			},
// 			{
// 				"description": "qwerty"
// 			}
// 		],
// 		"medicamentos": [
// 			{
// 				"description": "Gotas para los ojos"
// 			}
// 		],
// 		"operaciones": [
// 			{
// 				"description": "Apendice"
// 			}
// 		],
// 		"drogas": []
// 	}
// } */}



</View>
  )
}

