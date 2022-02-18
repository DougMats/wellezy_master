import React, { useState, useEffect } from 'react'
import { Linking, Platform, StyleSheet, Dimensions, Clipboard, ScrollView, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator, Button } from 'react-native'
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { valorations } from '../../services/connection'
import { InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter } from '../../components/Logic.js'

// import ImageZoom from 'react-native-image-pan-zoom';
// import DateTimePicker from '@react-native-community/datetimepicker';
import ScoreStars from '../../components/stars/ScoreStars.js';

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
} from '../../styles/Colors'

function ValorationManager(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const { navigation } = props;
  const [date, setDate] = useState(0);
  const [Load, setLoad] = useState(false);

  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);
  // const [dia, setdia] = useState("");
  // const [hora, sethora] = useState("");

  const [successful, setsuccessful] = useState(false);
  // const [ValuationProcessed, setValuationProcessed] = useState(null);
  const [PhotosValoration, setPhotosValoration] = useState(false); // almacena las fotos de la valoracion 

  const [ValuationCarriedOut, setValuationCarriedOut] = useState(null);

  const [HC, setHC] = useState(false);
  // const [ListHC, setListHC] = useState(null); //almacena la historia clinica
  // const [zoom, setzoom] = useState(null);

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    // var hoy = new Date();
    // setDate(hoy)
    // console.log("id:", props.route.params.data.id, " status: ", props.route.params.data.status_valoration)
    Get()
  }, [randomCode]);

  async function Get() {


    
    if (props.route.params.data.status_valoration === "Procesada") {
      console.log("res 1 ")

      const res = await valorations.getValorationWhenProcessed(props.route.params.data.id)

      if (res.status !== 0) {
        const res_HC = await valorations.getClientHC(props.route.params.data.id_cliente)
        setHC(res_HC)
      }


      // if (Valoration.status === 2) {
      //   getImgsValoration(props.route.params.data.id)
      //setPhotosValoration
      // }


    }


    if (props.route.params.data.status_valoration === "Realizada") {
      console.log("res 2 ")
      const res = await valorations.getValorationWhenCarriedOut(props.route.params.data.id)
      //setValuationCarriedOut(res)
    }


  }

  useEffect(() => {
    if (successful) {
      setTimeout(() => {
        setsuccessful(false)
        // goToScreen("Dashboard")
      }, 5000);
    }
  }, [successful]);





  // useEffect(() => {
  //   if (date !== 0) {
  //     var hoy = date
  //     let year = hoy.getFullYear()
  //     let month = hoy.getMonth() + 1;
  //     let day = hoy.getDate();
  //     let hour = hoy.getHours()
  //     let minute = (hoy.getMinutes())
  //     let second = hoy.getSeconds()
  //     var fecha = zfill(day, 2) + '-' + zfill(month, 2) + '-' + year;
  //     var hora = zfill(hour, 2) + ':' + zfill(minute, 2) + ':' + "00";
  //     setdia(fecha);
  //     sethora(hora);
  //   }
  // }, [date]);







  /*

  async function getValorationWhenProcessed(id) {
    console.log("getting valoration Processed by: ", id);
    let Valoration
    await axios.get(base_url(serverCrm, `get/valoration/processed/${id}`)).then(function (response) {
      Valoration = response.data
    })
      .catch(function (error) { console.log("?", error) })
      .then(function () { });
    setValuationProcessed(Valoration);

    if (Valoration.status !== 0) {
      getClientHC(props.route.params.data.id_cliente);
      if (Valoration.status === 2) {
        getImgsValoration(props.route.params.data.id)
      }
      else { console.log("aun no ah cargado las fotos") }
    }
    else { console.log("no tiene historia clinica") }
  }




  async function getClientHC(id_client) {
    console.log("aqui se busca la gistoria clinica")
    let HistoryC
    await axios.get(base_url(serverCrm, `clients/history/clinic/${id_client}`)).then(function (response) {
      HistoryC = response.data
    })
      .catch(function (error) { console.log("HistoryC?", error) })
      .then(function () { });
    //console.log("HistoryC", HistoryC)
    setListHC(HistoryC);
  }

  async function getImgsValoration(id) {
    setLoad(true);
    console.log("buscando las imagenes...")
    let PhotosValoration
    //console.log(base_url(serverCrm, `get/images/valoration//${id}`))
    await axios.get(base_url(serverCrm, `get/images/valoration/${id}`)).then(function (response) {
      PhotosValoration = response.data
    })
      .catch(function (error) { console.log("PhotosValoration?", error) })
      .then(function () { });
    //console.log("PhotosValoration: ", PhotosValoration);
    setPhotosValoration(PhotosValoration);
    setLoad(false);
  }

  async function getValorationWhenCarriedOut(id) {
    console.log("datos de la valoracion Realizada");
    let Valoration
    //console.log(base_url(serverCrm, `get/valoration/carried_out/${id}`))
    await axios.get(base_url(serverCrm, `get/valoration/carried_out/${id}`)).then(function (response) {
      Valoration = response.data
    })
      .catch(function (error) { console.log("?", error) })
      .then(function () { });
    setValuationCarriedOut(Valoration);
  }

  function zfill(number, width) {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";
    if (width <= length) {
      if (number < 0) {
        return ("-" + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  }



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };



  async function save() {
    console.log("saving...")
    setLoad(true);
    let idV = props.route.params.data.id;
    let idC = props.route.params.data.id_cliente;
    let idM = props.route.params.data.id_medic;
    let keyRandom = "";
    let key, array;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) { keyRandom += possible.charAt(Math.floor(Math.random() * possible.length)); }
    key = "v" + idV + "c" + idC + "m" + idM + "K" + keyRandom;
    array = { 'id_valoration': idV, 'key_generated': key, 'scheduled_date': dia, 'scheduled_time': hora, 'status': 0 }
    await axios.post(base_url(serverCrm, `new/valoration/scheduled`), array).then(function (response) {
      setsuccessful(response.data);
      if (response.data === true) {
        SimpleFormulario(idV, "Procesada");
      }
    })
      .catch(function (error) { console.log("?", error) })
      .then(function () { });
    setLoad(false);
  }



  async function SimpleFormulario(id, state) {
    console.log("actualizando")
    let msj
    await axios.get(base_url(serverCrm, `update/valoration/state/${id}/${state}`)).then(function (response) {
      msj = response.data
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    console.log("actualizó? ", msj)
    return msj;
  }
  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }
  function goToScreenData(screen, data) {
    let from = 'DashboardManage';
    navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }
  function goToCall(key_conference) {
    let from = 'DashboardManage'
    let HC = ListHC
    let photos = PhotosValoration
    props.navigation.navigate('Sala', { randomCode: Math.random(), from, key_conference, HC, photos })
  }
  function createLink(e) {
    let key_conference = md5(e);
    // console.log(`https://meet.jit.si/${key_conference}`)
    return `https://meet.jit.si/${key_conference}`;
  }
  const ToWeb = async (link) => {
    await Linking.openURL(createLink(link))
  }
  const copyToClipboard = (text) => {
    let copy = createLink(text)
    Clipboard.setString(copy);
    Toast.show("Copiado!")
  }
*/








  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_white} barStyle='dark-content' />
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />

      <ScrollView scrollEventThrottle={16}>

        <View style={{
          alignItems: "center",
          alignContent: "center",
          paddingBottom: 100
        }}>

          <User data={props.route.params.data} />
          <HistoryClinic data={HC} />
          <Images data={PhotosValoration} />
          <Category data={props.route.params.data} goToScreenData={goToScreen} />






          {
            successful &&
            <View style={{ width: "100%", height: "100%", position: "absolute", zIndex: 99999, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center" }}>
              <View style={{ backgroundColor: color_white, width: "80%", padding: 20, borderRadius: 12, height: 300, alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: 240, height: 200, overflow: "hidden" }}>
                  {/* <Image source={require("../../src/images/medic.png")} style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} /> */}
                </View>
                <Text style={{ textAlign: "center", marginTop: 10, fontSize: 16, fontWeight: "bold" }}>Has programado una video valoración exitosamente,</Text>
              </View>
            </View>
          }







          {
            //props.route.params.data.status_valoration === "Realizada" &&
            <View style={styles.card}>
              <View style={styles.cardHead}>
                {/* <Text style={styles.cardtitle}>Realizada</Text> */}
                <TouchableOpacity onPress={() => goToScreen("Cotization", null)}>
                  <Text style={styles.cardtitle}>Administrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          }




        </View>
      </ScrollView>
      <Menu
        props={props}
        option={1}
        alert={0}
      />
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







/*
             



         
            {props.route.params.data.status_valoration === "Pendiente" &&
              <View style={styles.card}>
                <View style={styles.cardHead}>
                  <Text style={styles.cardtitle}>Programar Valoración</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: "row", overflow: "hidden", borderWidth: 1, borderColor: color_primary, width: "90%", height: 50, borderRadius: 12, marginVertical: 5 }} onPress={showDatepicker} >
                  <View style={{ backgroundColor: color_primary, width: 50, justifyContent: "center", alignItems: "center" }}>
                    <Icon name={'calendar-outline'} width={20} height={48} fill={color_white} />
                  </View>
                  <Text style={{ marginLeft: 10, lineHeight: 50, textTransform: "capitalize", fontSize: 16 }}>Fecha: {dia}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", overflow: "hidden", borderWidth: 1, borderColor: color_primary, width: "90%", height: 50, borderRadius: 12, marginVertical: 5 }} onPress={showTimepicker} >
                  <View style={{ backgroundColor: color_primary, width: 50, justifyContent: "center", alignItems: "center" }}>
                    <Icon name={'clock-outline'} width={20} height={48} fill={color_white} />
                  </View>
                  <Text style={{ marginLeft: 10, lineHeight: 50, textTransform: "capitalize", fontSize: 16 }}>hora: {hora}</Text>
                </TouchableOpacity>
                {!Load &&
                  <TouchableOpacity style={{ width: "100%", alignContent: "center", alignItems: "center" }} onPress={() => save()}>
                    <LinearGradient style={styles.btnPrimary} colors={[color_tertiary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                      <Icon name={'save-outline'} width={30} height={30} fill={color_white} />
                      <Text style={styles.btnPrimaryText}>save</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                }

                {Load &&
                  <TouchableOpacity style={{ width: "100%", alignContent: "center", alignItems: "center" }} onPress={() => save()}>
                    <LinearGradient style={styles.btnPrimary} colors={[color_tertiary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                      <ActivityIndicator size="large" color={color_white} />
                    </LinearGradient>
                  </TouchableOpacity>
                }

                {show && (
                  <DateTimePicker
                    //testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                
              </View>
            }



            {props.route.params.data.status_valoration === "Procesada" && ValuationProcessed !== null &&
              <View style={styles.card}>
                <View style={styles.cardHead}>
                  <Text style={styles.cardtitle}>Valoración programada</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.rowUp}>Programada el dia:</Text>
                  <Text style={styles.rowDown}>08-sep-2021{ValuationProcessed.created_at}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.rowUp}>Editada el dia:</Text>
                  <Text style={styles.rowDown}>08-sep-2021{ValuationProcessed.updated_at}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.rowUp}>Fecha de la programacion:</Text>
                  <Text style={styles.rowDown}>09-sep-2021{ValuationProcessed.scheduled_date}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.rowUp}>Hora de la programacion:</Text>
                  <Text style={styles.rowDown}>03:00:00 PM{ValuationProcessed.scheduled_time}</Text>
                </View>
              </View>
            }



            {ValuationProcessed !== null && ValuationProcessed.status === 2 &&
              <View style={styles.card}>
                <View style={styles.cardHead}>
                  <Text style={styles.cardtitle}>meet</Text>
                </View>
                <View style={{ padding: 2, borderWidth: 1, borderColor: color_primary, borderRadius: 8, width: "100%", marginBottom: 5 }}>
                  <Text style={{ fontSize: 14, textAlign: "center", width: "100%" }}>{createLink(ValuationProcessed.key_generated)}</Text>
                </View>
                <View style={{ flexDirection: "row", width: "100%", alignItems: "center", alignContent: "center" }}>
                  <TouchableOpacity onPress={() => copyToClipboard(ValuationProcessed.key_generated)} style={{ marginHorizontal: "1%", width: "49%" }}>
                    <LinearGradient style={styles.btnPrimary} colors={[color_tertiary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                      <Icon name={'copy-outline'} width={25} height={25} fill={color_white} />
                      <Text style={{ textAlign: "center", marginLeft: 10, color: color_white, fontWeight: "bold", fontSize: 14 }}>Copy</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => ToWeb(ValuationProcessed.key_generated)} style={{ marginHorizontal: "1%", width: "49%" }}>
                    <LinearGradient style={styles.btnPrimary} colors={[color_tertiary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} >
                      <Icon name={'globe-2-outline'} width={25} height={25} fill={color_white} />
                      <Text style={{ textAlign: "center", marginLeft: 10, color: color_white, fontWeight: "bold", fontSize: 14 }}>join in Web</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: "100%", alignContent: "center", alignItems: "center" }} onPress={() => goToCall(ValuationProcessed.key_generated)}>
                  <LinearGradient style={styles.btnPrimary} colors={[color_tertiary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                    <Icon name={'video-outline'} width={30} height={30} fill={color_white} />
                    <Text style={styles.btnPrimaryText}>join meet in App</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            }


           
            }
*/



const styles = StyleSheet.create({
  card: {
    backgroundColor: color_white,
    width: "90%",
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignContent: "center"
  },
  cardHead: {
    width: "100%"
  },
  cardtitle: {
    fontSize: 18,
    color: color_primary,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  cardRow: {
    flexDirection: "row",
    width: "100%"
  },
  rowUp: {
    width: "60%",
    textTransform: "capitalize"
  },
  rowDown: {
    fontSize: 14,
    fontWeight: "bold",
    width: "40%",
    textTransform: "capitalize"
  },
  btnPrimary: {
    marginVertical: 10,
    backgroundColor: color_primary,
    width: "80%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 12,
  },
  btnPrimary2: {
    marginTop: 10,
    backgroundColor: color_primary,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  btnPrimaryText: {
    color: color_white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginLeft: 15
  }
});












export default ValorationManager;


/*
{"basedOn": 1,
"categori_img": "https://pdtclientsolutions.com/crm-public/img/category/picture/Portadas%20cirug%C3%ADas_Otoplastia.png",
"category_id": 2,
"category_name": "Facial",
"category_photo": "w1.jpg",
"created_at": "2021-07-26 10:39:17",
"email": "art@gmail.com",
"id": 119,
"id_category": 2,
"id_cliente": 1,
"id_medic": 1,
"id_subcategory": 8,
"names": "douglas jesus",
"phone": "+573124348384"
 "rating": 4,
 "recommended": 1,
 "stars": 4,
 "status_valoration": "Procesada",
 "sub_category_description": "<div></div>",
 "sub_category_id": 8,
 "sub_category_information": "",
 "sub_category_name": "OTOPLASTIA",
 "sub_category_photo": "Portadas cirugías_Otoplastia.png",
 "surnames": "matos parra"
},
*/

const Category = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <Text style={styles.cardtitle}>{t("requestedProcedure")}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowUp}>{t("typeOfTreatment")}: </Text>
        <Text style={styles.rowDown}>{props.data.category_name}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowUp}>{t("name")}: </Text>
        <Text style={styles.rowDown}>{props.data.sub_category_name}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <ScoreStars stars={props.data.stars} size={30} color='orange' />
      </View>
      <TouchableOpacity style={{ width: "100%", alignContent: "center", alignItems: "center" }} onPress={() => props.goToScreenData("Process", props.data)}>
        <LinearGradient style={styles.btnPrimary} colors={[color_primary, color_primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
          <Icon name={'eye-outline'} width={30} height={30} fill={color_white} />
          <Text style={styles.btnPrimaryText}>Ver detalles</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}










const User = ({ data }) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <Text style={styles.cardtitle}>datos del paciente</Text>
      </View>
      <View style={{ width: 120, height: 120, backgroundColor: color_white, borderRadius: 60, overflow: "hidden", marginBottom: 20 }}>
        <Image style={{ backgroundColor: "silver", width: null, height: null, resizeMode: "cover", flex: 1 }} source={{ uri: data.photo_profile }} />
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowUp}>{t("name")}:</Text>
        <Text style={styles.rowDown}>{data.names}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowUp}>{t("surname")}:</Text>
        <Text style={styles.rowDown}>{data.surnames}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowUp}>{t("country")}:</Text>
        <Text style={styles.rowDown}>{data.country} - {data.city}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.rowUp}>{t("dateOfBirth")}:</Text>
        <Text style={styles.rowDown}>{data.fecha_nacimiento}</Text>
      </View>
    </View>
  )
}














const HistoryClinic = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [open, setopen] = useState(false);
  //console.log("HC: ", data)
  if (data === false) {
    return <></>
  }
  else {
    return (
      <View>
        <TouchableOpacity
          style={{ width: "100%", alignContent: "center", alignItems: "center" }}
          onPress={() => setopen(!open)}
        >
          <LinearGradient style={styles.btnPrimary2} colors={[color_white, color_white]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
            <Text style={{
              //styles.btnPrimaryText
            }}>Ver Historia Clinica</Text>
            <Icon name={open === false ? 'arrow-ios-forward-outline' : 'arrow-ios-downward-outline'} width={30} height={30} fill={"silver"} />
          </LinearGradient>
        </TouchableOpacity>
        {open === true &&
          <View style={{ marginTop: -1, borderWidth: 1, paddingBottom: 10, flexDirection: "column", borderColor: color_primary, width: "100%", borderBottomLeftRadius: 12, borderBottomRightRadius: 12, }}>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>Alcohol:</Text>
              <Text style={styles.rowDown}>{data.alcohol}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>Alergias:</Text>
              <Text style={styles.rowDown}>{data.allergic}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>allergic medication</Text>
              <Text style={styles.rowDown}>{data.allergic_medication}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>children</Text>
              <Text style={styles.rowDown}>{data.children}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>created at</Text>
              <Text style={styles.rowDown}>{data.created_at}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>disease</Text>
              <Text style={styles.rowDown}>{data.disease}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>drink medication</Text>
              <Text style={styles.rowDown}>{data.drink_medication}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>drugs</Text>
              <Text style={styles.rowDown}>{data.drugs}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>drugs check</Text>
              <Text style={styles.rowDown}>{data.drugs_check}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>eps</Text>
              <Text style={styles.rowDown}>{data.eps}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>height</Text>
              <Text style={styles.rowDown}>{data.height} cm</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>id client</Text>
              <Text style={styles.rowDown}>{data.id_client}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>id_clinic_history</Text>
              <Text style={styles.rowDown}>{data.id_clinic_history}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>id valoration</Text>
              <Text style={styles.rowDown}>{data.id_valoration}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>id valoration scheduled</Text>
              <Text style={styles.rowDown}>{data.id_valoration_scheduled}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>major disease</Text>
              <Text style={styles.rowDown}>{data.major_disease}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>medication</Text>
              <Text style={styles.rowDown}>{data.medication}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>number_children</Text>
              <Text style={styles.rowDown}>{data.number_children}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>previous surgery</Text>
              <Text style={styles.rowDown}>{data.previous_surgery}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>smoke</Text>
              <Text style={styles.rowDown}>{data.smoke}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>surgery</Text>
              <Text style={styles.rowDown}>{data.surgery}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>updated_at</Text>
              <Text style={styles.rowDown}>{data.updated_at}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", paddingVertical: 5, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: color_primary }}>
              <Text style={styles.rowUp}>weight</Text>
              <Text style={styles.rowDown}>{data.weight} Kg.</Text>
            </View>
          </View>
        }
      </View>
    )
  }



  // "id_clinic_history": 5,
  // "id_client": 1,
  // "id_valoration": 118,
  // "id_valoration_scheduled": 2,
  // "eps": null,
  // "height": "168",
  // "weight": "60",
  // "children": null,
  // "number_children": 0,
  // "alcohol": "no",
  // "smoke": "no",
  // "surgery": null,
  // "previous_surgery": "No",
  // "disease": null,
  // "major_disease": "2",
  // "medication": null,
  // "drink_medication": "No",
  // "allergic": null,
  // "allergic_medication": "Hgfhguhugu",
  // "drugs_check": null,
  // "drugs": null,
  // "created_at": "2021-07-21 17:40:26",
  // "updated_at": "2021-07-21 17:40:26"
  // }


  // {
  //   "alcohol": "no",
  //   "allergic": null,
  //   "allergic_medication": "Hgfhguhugu",
  //   "children": null,
  //   "created_at": "2021-07-21 17:40:26",
  //   "disease": null,
  //   "drink_medication": "No",
  //   "drugs": null,
  //   "drugs_check": null,
  //   "eps": null,
  //   "height": "168",
  //   "id_client": 1,
  //   "id_clinic_history": 5,
  //   "id_valoration": 118,
  //   "id_valoration_scheduled": 2,
  //   "major_disease": "2",
  //   "medication": null,
  //   "number_children": 0,
  //   "previous_surgery": "No",
  //   "smoke": "no",
  //   "surgery": null,
  //   "updated_at": "2021-07-21 17:40:26",
  //   "weight": "60"
  // }















}


const Images = ({ data }) => {
  const { t, i18n } = useTranslation();
  // {
  //   PhotosValoration !== null && !Load &&
  //   //props.route.params.data.status_valoration === "Procesada" &&
  //   //props.route.params.data.status === 2 &&
  //   <View style={{ flexDirection: "column", marginTop: 20, width: "100%" }}>
  //     <Text style={styles.rowUp}>imagenes subidas</Text>
  //     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
  //       {PhotosValoration.map((i, key) => {
  //         return (
  //           <TouchableOpacity onPress={() => setzoom(i.img)} key={key} style={{ overflow: "hidden", width: 80, height: 80, borderRadius: 5, marginHorizontal: 5, marginVertical: 10 }}>
  //             <View style={{ opacity: 0.8, position: "absolute", zIndex: 999999, top: 25, left: 25 }}>
  //               <Icon name='search-outline' fill={color_white} width={30} height={30} />
  //             </View>
  //             <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: `${file_server1}/img/wellezy/valorations/${i.img}` }} />
  //           </TouchableOpacity>
  //         )
  //       })}
  //     </ScrollView>
  //   </View>
  // }
  // {zoom !== null &&
  //   <View style={{ backgroundColor: color_white, padding: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, elevation: 5, }}>
  //     <TouchableOpacity onPress={() => setzoom(null)} style={{ padding: 5, position: "absolute", top: 5, right: 10, zIndex: 9999 }}>
  //       <Icon name={'close-circle-outline'} width={30} height={30} fill={color_primary} />
  //     </TouchableOpacity>
  //     <ImageZoom
  //       cropWidth={Dimensions.get('window').width}
  //       cropHeight={Dimensions.get('window').width}
  //       imageWidth={300}
  //       imageHeight={400}>
  //       <Image
  //         style={{ borderRadius: 8, width: null, height: null, flex: 1, resizeMode: "cover" }}
  //         source={{ uri: `${file_server1}/img/wellezy/valorations/${zoom}` }}
  //       />
  //     </ImageZoom>
  //   </View>
  // }
  return (
    <View>
      <Text>imagenes</Text>
    </View>
  )
}
