import React, { useState, useEffect } from 'react'
import { RefreshControl, Modal, Linking, Platform, StyleSheet, Dimensions, Clipboard, ScrollView, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator, Button, unstable_batchedUpdates } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';

import { InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter } from '../../components/Logic.js'
import ScoreStars from '../../components/stars/ScoreStars.js';
import Calendary from '../../components/time/Calendary.js';
import GetHour from '../../components/time/getHour.js';
import { file_server1 } from '../../../Env'
import { valorations } from '../../services/connection'
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ValorationManager(props) {
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(false);
  const [data, setdata] = useState(null)
  const [vertical, setvertical] = useState(false);

  const [modal, setmodal] = useState(false);
  const [itsSaving, setitsSaving] = useState(false);
  const [itsUpdating, setitsUpdating] = useState(false);
  const [successful, setsuccessful] = useState(false);


  const [optionesList, setoptionesList] = useState([
    { id: 1, name: 'manage',  },
    { id: 2, name: 'client',  },
    { id: 3, name: 'procedure',  },
    { id: 4, name: 'clinicHistory',  },
    { id: 5, name: 'images', },
    { id: 6, name: 'scheduled',  },
    { id: 7, name: 'valoration',  },
    { id: 8, name: 'quote',  }
  ]);

  const [view, setview] = useState(selectView());

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }
  useEffect(() => {
    Get()
  }, [randomCode]);

  async function Get() {
    setLoad(true)
    const res = await valorations.getThisValoration(i18n.language, props.route.params.data.id)
    setdata(res)
    setLoad(false)
  }

  function selectView() {
    return optionesList[0]
  }

  async function updateDate(fecha, hora) {
    setmodal(true)
    setitsUpdating(true);
    const array = {
      'id_valoration': data.valoration.id,
      'scheduled_date': fecha,
      'scheduled_time': hora,
    }
    const update = await valorations.updateDateValoration(array)
    if (update === true) {
      setsuccessful(true)
      Get()
    }
  }

  async function saveDate(fecha, hora) {
    setmodal(true)
    setitsSaving(true);
    let keyRandom = "";
    let key, array;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) { keyRandom += possible.charAt(Math.floor(Math.random() * possible.length)); }
    key = "v" + data.valoration.id + "c" + data.valoration.id_client + "m" + data.valoration.id_medic + "K" + keyRandom;
    array = {
      'id_valoration': data.valoration.id,
      'key_generated': key,
      'scheduled_date': fecha,
      'scheduled_time': hora,
      'status': 0
    }
    const res = await valorations.newValorationscheduled(array)
    if (res === true) {
      const update = await valorations.updateStateValoration(data.valoration.id, "Procesada")
      if (update === true) {
        setsuccessful(true)
        Get()
      }
    }
  }

  useEffect(() => {
    if (successful === true) {
      setTimeout(() => {
        setmodal(false);
        setitsSaving(false);
        setitsUpdating(false);
        setsuccessful(false);
      }, 5000);
    }
  }, [successful]);


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_primary} barStyle='light-content' />
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => props.navigation.goBack()}>
            <Icon name={"arrow-back-outline"} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerCenterText}>Administración de valoraciones</Text>
        </View>
        <View style={styles.headerSide}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => setvertical(!vertical)}>
            <Icon name={"more-vertical"} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
        </View>
      </View>

      {Load && <ActivityIndicator color={color_primary} size={40} style={{ marginTop: 50 }} />}

      {!Load &&
        <View style={styles.sectionMenu}>
          <ScrollView horizontal scrollEventThrottle={16} showsHorizontalScrollIndicator={false}>
            {optionesList.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => setview(i)}
                  style={{ ...styles.sectionMenuBtn, backgroundColor: view.id === i.id ? color_white : "#F4F6F6" }}
                >
                  <Text style={{ ...styles.sectionMenuBtnText, color: view.id === i.id ? color_fifth : color_grey_half }}>
                    {i.name}
                  </Text>
                </TouchableOpacity>
              )
            })
            }
          </ScrollView>
        </View>
      }

      {!Load && data !== null &&
        <LinearGradient
          colors={[color_white, color_white, "#F5F5F5"]}
          start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          style={{ backgroundColor: color_white, flex: 1 }}
        >
          <ScrollView scrollEventThrottle={16} stickyHeaderIndices={[0]} refreshControl={<RefreshControl refreshing={Load} onRefresh={Get} />}>
            {view.name === 'client' && <Client data={data} setview={setview} goToScreen={goToScreen} />}
            {view.name === 'procedure' && <Procedure data={data} setview={setview} goToScreen={goToScreen} />}
            {view.name === 'manage' && <Manage data={data} setview={setview} goToScreen={goToScreen} saveDate={saveDate} updateDate={updateDate} />}
            {view.name === 'scheduled' && <Scheduled data={data} setview={setview} goToScreen={goToScreen} />}
            {view.name === 'clinicHistory' && <ClinicHistory data={data} setview={setview} goToScreen={goToScreen} />}
            {view.name === 'images' && <Images data={data} setview={setview} goToScreen={goToScreen} />}
            {view.name === 'valoration' && <Valoration data={data} setview={setview} goToScreen={goToScreen} />}
            {view.name === 'quote' && <Quote data={data} setview={setview} goToScreen={goToScreen} />}
          </ScrollView>
        </LinearGradient>
      }
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
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.modalWrap}>
          {itsSaving && <View style={styles.modalWrapper}>
            {successful ?
              <View style={styles.modalContained}>
                <Icon name={"checkmark-circle-outline"} width={80} height={80} fill={color_fifth} />
                <Text style={styles.modalText}>saved successful</Text>
              </View>
              :
              <View style={styles.modalContained}>
                <ActivityIndicator color={color_fifth} size={80} />
                <Text style={styles.modalText}>Saving...</Text>
              </View>
            }
          </View>
          }
          {itsUpdating && <View style={styles.modalWrapper}>
            {successful ?
              <View style={styles.modalContained}>
                <Icon name={"checkmark-circle-outline"} width={80} height={80} fill={color_fifth} />
                <Text style={styles.modalText}>Updated successful</Text>
              </View>
              :
              <View style={styles.modalContained}>
                <ActivityIndicator color={color_fifth} size={80} />
                <Text style={styles.modalText}>Updating...</Text>
              </View>
            }
          </View>
          }
        </View>
      </Modal>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({

  modalWrap: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  modalWrapper: {
    backgroundColor: color_white,
    borderRadius: 12,
    padding: 20,
    width: "60%"
  },
  modalContained: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    marginVertical: 15,
    color: color_grey_dark,
    fontSize: 14,
    fontWeight: "bold"
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 30,
    backgroundColor: color_primary
  },
  headerSide: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  headerCenter: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenterText: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
    textAlign: "center"
  },
  sectionMenu: {
    marginTop: -20,
    zIndex: -1,
    paddingTop: 20,
    backgroundColor: "#EAECEE",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  sectionMenuBtn: {
    marginHorizontal: 2,
    marginTop: 5,
    height: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    width: windowWidth / 3.5,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionMenuBtnText: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: "700",
  },
  page: {
    minHeight: "100%",
    alignItems: "center",
    flexDirection: "column",
    padding: 20
  },
  pageHead: {},
  pageHeadTitle: {},
  pageBody: {},

  btn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color_fifth
  },
  btnText: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 14
  },
  inputBtn: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    width: "80%",
    borderRadius: 12,
    backgroundColor: "#EAECEE"
  },
  inputBtnLabel: {
    lineHeight: 25,
    fontSize: 14,
    marginLeft: 10
  },
  inputBtnText: {
    lineHeight: 25,
    fontSize: 14,
    fontWeight: "bold"
  }
})

const Manage = (props) => {
  const { t, i18n } = useTranslation();
  const [fecha, setfecha] = useState(currentValue(0));
  const [hora, sethora] = useState(currentValue(1));
  const [openCalendary, setopenCalendary] = useState(false);
  const [openClock, setopenClock] = useState(false);

  const config = {
    theme: "",//light / dark
    color: color_fifth,//"#FF008B",
    minDateNow: true,
    hour: false,
    rangeDate: true,
  }
  function currentValue(type) {
    let res = null
    if (props.data.valoration.status === "Procesada" && props.data.scheduled !== null) {
      if (type === 0) { res = props.data.scheduled.scheduled_date }
      if (type === 1) { res = props.data.scheduled.scheduled_time }
    }
    return res
  }
  useEffect(() => {
    if (fecha !== null && hora === null) {
      setopenClock(true)
    }
  }, [fecha]);
  return (
    <View style={styles.page}>

      <Text>{props.data.valoration.status}</Text>
      <TouchableOpacity onPress={() => setopenCalendary(true)} style={styles.inputBtn}>
        <Icon name={"calendar-outline"} width={25} height={25} fill={color_grey_half} />
        <Text style={styles.inputBtnLabel}>Fecha: </Text>
        <Text style={styles.inputBtnText}>
          {fecha !== null && fecha}
          {fecha === null && "Seleccionar fecha"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setopenClock(true)} style={styles.inputBtn}>
        <Icon name={"calendar-outline"} width={25} height={25} fill={color_grey_half} />
        <Text style={styles.inputBtnLabel}>Hora: </Text>
        <Text style={styles.inputBtnText}>
          {hora !== null && hora}
          {hora === null && "Seleccionar hora"}
        </Text>
      </TouchableOpacity>
      {
        props.data.valoration.status === "Pendiente" && props.data.scheduled === null && fecha !== null && hora !== null &&
        <TouchableOpacity onPress={() => props.saveDate(fecha, hora)} style={styles.btn}>
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      }
      {
        props.data.valoration.status === "Procesada" && props.data.scheduled === null && fecha !== null && hora !== null &&
        <TouchableOpacity onPress={() => props.saveDate(fecha, hora)} style={styles.btn}>
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      }
      {
        props.data.valoration.status === "Procesada" && props.data.scheduled !== null && (fecha !== props.data.scheduled.scheduled_date || hora !== props.data.scheduled.scheduled_time) &&
        <TouchableOpacity onPress={() => props.updateDate(fecha, hora)} style={styles.btn}>
          <Text style={styles.btnText}>Actualizar</Text>
        </TouchableOpacity>
      }
      <Calendary
        data={fecha}
        config={config}
        open={openCalendary}
        close={setopenCalendary}
        getChange={setfecha}
      />
      <GetHour
        display={openClock}
        title={''}
        color={color_fifth}
        mode={'light'}// dark- light 
        onChange={sethora}
        cancel={setopenClock}
      />
    </View>
  )
}







const Client = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}>
      <Text>{props.data.client.id}</Text>
      <Text>{props.data.client.img}</Text>
      <Text>{props.data.client.phone}</Text>
      <Text>{props.data.client.name}</Text>
      <Text>{props.data.client.surname}</Text>
      <Text>{props.data.client.identificacion}</Text>
      <Text>{props.data.client.dateOfBirth}</Text>
      <Text>{props.data.client.country}</Text>
      <Text>{props.data.client.country_id}</Text>
      <Text>{props.data.client.distric}</Text>
      <Text>{props.data.client.city_id}</Text>
      <Text>{props.data.client.city}</Text>
      <Text>{props.data.client.adress}</Text>
      <Text>{props.data.client.facebook}</Text>
      <Text>{props.data.client.instagram}</Text>
      <Text>{props.data.client.twitter}</Text>
      <Text>{props.data.client.youtube}</Text>
      <Text>{props.data.client.created_at}</Text>
      <Text>{props.data.client.updated_at}</Text>
    </View>
  )
}



const Procedure = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}>

      {/* "id": 9,
		"name": "BLEFAROPLASTIA",
		"name_ingles": "BLEPHAROPLASTY",
		"name_italiano": "BLEFAROPLASTIA",
		"name_frances": "BLÉPHAROPLASTIE",
		"name_portugues": "BLEFAROPLASTIA",
		"id_category": 2,
		"state": 1,
		"description":
    "information": "",
		"foto": "Portadas cirugías_Otoplastia.png",
		"foto_before": "https:\/\/image.freepik.com\/foto-gratis\/gatito-pared-monocromatica-detras-ella_23-2148955134.jpg",
		"foto_after": "https:\/\/image.freepik.com\/foto-gratis\/gato-rojo-o-blanco-i-estudio-blanco_155003-13189.jpg",
		"rating": 5,
		"basedOn": 1,
		"stars": 5,
		"recommended": 0 */}


    </View>)
}

const ClinicHistory = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}></View>)
}

const Images = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}>
      {props.data.images === null ?
        <View>
          <Text>null</Text>
        </View>
        :
        <View>
          <Text>....</Text>
        </View>
      }


    </View>)
}

const Scheduled = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}></View>)
}

const Valoration = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}></View>)
}

const Quote = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.page}></View>)
}


/*
<Text>{props.data.basedOn}</Text>
<Text>{props.data.categori_img}</Text>
<Text>{props.data.category_id}</Text>
<Text>{props.data.category_name}</Text>
<Text>{props.data.category_photo}</Text>
<Text>{props.data.created_at}</Text>
<Text>{props.data.email}</Text>
<Text>{props.data.id}</Text>
<Text>{props.data.id_category}</Text>
<Text>{props.data.id_subcategory}</Text>
<Text>{props.data.rating}</Text>
<Text>{props.data.recommended}</Text>
<Text>{props.data.stars}</Text>
<Text>{props.data.sub_category_description}</Text>
<Text>{props.data.sub_category_id}</Text>
<Text>{props.data.sub_category_information}</Text>
<Text>{props.data.sub_category_name}</Text>
<Text>{props.data.sub_category_photo}</Text>
*/

export default ValorationManager;