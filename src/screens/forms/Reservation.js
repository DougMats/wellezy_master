import React, { useState, useEffect, useContext } from 'react';
import { Modal, StatusBar, SafeAreaView, Dimensions, ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../contexts/UserContext'
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import { formularios } from '../../services/connection.js';
import CalendaryRange from '../../components/time/CalendaryRange.js'
import Calendary from '../../components/time/Calendary.js'
import {
  color_primary,
  color_white,
  color_screen,
  color_star,
  color_fifth,
  color_secondary,
  color_grey_half,
  color_grey_dark,
  color_grey_light,
} from '../../styles/Colors.js'
import {
  extractDate,
  InitialsName,
  Offer,
  Name,
  GetDiference2,
  GetDiference,
  zfill,
  currencyFormat,
  globalStatusValoration,
  letterCounter
}
  from '../../components/Logic.js'

import { file_server1 } from '../../../Env'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Reservation(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);

  const [displayFilter, setdisplayFilter] = useState(false);

  const [reserving, setreserving] = useState({
    priceTotal: 0, // precio total a pagar
    price: 96000,
    totalDays: 1, //dias totales
    coin: "$", //moneda a cobrar
    kids: 0, // niños
    Adults: 1, // adultos
    departure: "", //fecha de salida
    arrival: "", //fecha de llegada
    beds: 1, //camas
  });


  // onChangeText={text => onChangeText(text, 'password')} 
  //console.log("data: ", props.route.params.data)
  // {"adress": "",
  // "basedOn": 5,
  // "category": "Hotel",
  // "city": "Medellín",
  // "city_id": "2259",
  // "country": "Colombia",
  // "country_id": "COL",
  // "created_at": "2021-06-05 11:06:26",
  // "departament": "Antioquia",
  // "description": "We're 11 minutes from El Dorado International Airport, just off Avenida Calle 26 – we'll pick you up in our free airport shuttle. Visit the Museum of Modern Art and the Colombian National Museum in downtown Bogota, just 20 minutes away. Enjoy free WiFi and free hot breakfast.", "id": 1, "img": "https://cdn.forbes.co/2020/02/sofitel-legend-santa-clara-outdoor-pool.jpg",
  // "latitud": "",
  // "longitud": "",
  // "name": "bahia paraiso",
  // "rating": 25,
  // "recommended": 5,
  // "stars": 5, "type":
  // "default",
  // "updated_at": "2021-06-05 11:06:26"
  // }




  function uploadNumber(num, item) {
    const count = reserving[item]
    const value = count + num
    if (item === "Adults" || item === "beds") {
      if (value === 0) {
        onChangeText(1, item)
      }
      else {
        onChangeText(value, item)
      }
    }
    if (item === "kids") {
      if (value < 0) {
        onChangeText(0, item)
      }
      else {
        onChangeText(value, item)
      }
    }
  }


  function onChangeText(text, key) {
    setreserving({
      ...reserving,
      [key]: text
    })
  }










  const [getDate, setgetDate] = useState(false);
  function changeDate(values) {
    setreserving({
      ...reserving,
      arrival: values[0],
      departure: values[1],
      totalDays: values[2]
    })
    setgetDate(false)
  }







  const [additionalServices, setadditionalServices] = useState([
    { id: 0, state: true, name: "Estacionamiento", price: 40000 },
    { id: 1, state: true, name: "Piscina", price: 5000 },
    { id: 2, state: true, name: "Wifi", price: 15000 },
    { id: 3, state: true, name: "Traslado", price: 25000 },
    { id: 4, state: true, name: "No fumadores", price: 55000 },
    { id: 5, state: true, name: "Aire acondicionado", price: 45600 }
  ]);

  function changeServices(value) {
    additionalServices[value.id].state = !value.state;
    setadditionalServices([...additionalServices])
  }


  useEffect(() => {
    updatePriceTotal_services()
    checkingStatusAllServices()
  }, [additionalServices]);


  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  const [checkAllServices, setcheckAllServices] = useState(true);

  function checkingStatusAllServices() {
    let count = 0
    for (var i in additionalServices) {
      if (additionalServices[i].state === true) {
        count += 1
      }
    }
    if (count === additionalServices.length) {
      setcheckAllServices(true)
    }
    else {
      setcheckAllServices(false)
    }
  }

  function checkingAllServices(status) {
    for (var i in additionalServices) {
      additionalServices[i].state = status;
    }
    setadditionalServices([...additionalServices])
  }

  function updatePriceTotal_services() {
    let count = 0
    for (var i in additionalServices) {
      if (additionalServices[i].state === true) {
        count += additionalServices[i].price
      }
    }
    const value = reserving.price + count
    onChangeText(value, 'priceTotal')
  }




  useEffect(() => {

    console.log("updating reserving")
    let count = 0
    count += reserving.totalDays * 1000
    count += reserving.kids * 1000
    count += reserving.Adults * 1000
    count += reserving.beds * 1000
    const value = reserving.price + count
    onChangeText(value, 'priceTotal')
  }, [
    reserving.totalDays,
    reserving.kids,
    reserving.Adults,
    reserving.beds
  ]);





  const [openSingle, setopenSingle] = useState(false);
  function getChangeSingle(data) { console.log("single data: ", data) }

  const [openRange, setopenRange] = useState(false);
  function getChangeRange(data) { console.log("range data: ", data) }


  const config = {
    theme: "",//light / dark
    color: "#FF008B",
    minDateNow : false,
    hour: false,
    rangeDate: true,
  }




  const config2 = {
    theme: "dark",//light
    color: "#00C5FF",
    minDateNow : false,
    hour: true,
    rangeDate: true,
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor={"transparent"}
      />
      {/* <Head
        props={props}
        return=""
        show={vertical}
        action={setvertical}
      /> */}

      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        stickyHeaderIndices={[2]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          //console.log(y)
        }}

      >

        <LinearGradient start={{ x: -1, y: 0 }} end={{ x: 1, y: 1 }} colors={[color_primary, "#00cdde", color_primary, color_secondary]}
          style={{
            height: windowWidth / 3,
            width: "100%",
            paddingTop: 30,
            paddingBottom: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
            // backgroundColor: color_white,
          }}>
          {/* <Text style={{ color: color_white }}>nombre del hotel</Text> */}
          <Text style={{ color: color_white, fontWeight: "bold", fontSize: 22, textTransform: "capitalize" }}>{props.route.params.data.name}</Text>
        </LinearGradient>




        {/* 
  <View style={styles.dateWrap}>
    <TouchableOpacity onPress={() => setgetDate(true)}
    style={{ ...styles.dateOption, borderTopLeftRadius: 15, borderBottomLeftRadius: displayFilter ? 15 : 0, }}>
      {reserving.arrival !== "" &&
        <Icon name="calendar-outline" width={25} height={25} fill={color_fifth} />
      }
      <View style={styles.dateText}>
        <Text style={styles.dateName}>Check-in</Text>
        <Text style={styles.dateValue}>{reserving.arrival}</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.dateMiddle}>
      <Icon name="arrowhead-right-outline" width={20} height={20} fill={color_fifth} />
    </View>
    <TouchableOpacity onPress={() => setgetDate(true)} style={{ ...styles.dateOption, borderTopRightRadius: 15, borderBottomRightRadius: displayFilter ? 15 : 0, }}>
      {reserving.departure !== "" &&
       
      }
      <View style={styles.dateText}>
        <Text style={styles.dateName}>Check-out</Text>
        <Text style={styles.dateValue}>{reserving.departure}</Text>
      </View>
    </TouchableOpacity>
  </View>
*/}








        <View style={{ width: "90%", flexDirection: "column", alignSelf: "center", backgroundColor: color_white, marginTop: -20, borderRadius: 12, overflow: "hidden" }}>
          <View style={{ borderBottomColor: color_grey_light, borderBottomWidth: 0.5, flexDirection: "row", padding: 5, justifyContent: "space-around", alignSelf: "center" }}>


            <View style={{ width: "20%", flexDirection: "row" }}>
              <Icon name="calendar-outline" width={25} height={25} fill={color_fifth} />
              <Text style={{ fontSize: 25, color: color_fifth, fontWeight: "bold", lineHeight: 28 }}>{reserving.totalDays}</Text>
            </View>




            <TouchableOpacity onPress={() => setgetDate(true)} style={{ width: "40%", }}>
              <Text style={{}}>Check-in</Text>
              <Text style={{}}>{reserving.arrival}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setgetDate(true)} style={{ width: "40%", }}>
              <Text style={{}}>Check-out</Text>
              <Text style={{}}>{reserving.departure}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setdisplayFilter(!displayFilter)}
              style={{
                width: 35,
                height: 35,
                position: "absolute",
                top: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Icon name={displayFilter ? "arrow-ios-upward" : "arrow-ios-downward"} width={25} height={25} fill={color_fifth} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", flexDirection: "row", padding: 5, justifyContent: "space-around", alignSelf: "center" }}>
            <View style={{ flexDirection: "row" }}>
              {/* <Icon name="person" width={20} height={20} fill={color_fifth} /> */}
              <Text style={{ marginLeft: 5, fontSize: 14, lineHeight: 25 }}>Personas: {reserving.Adults + reserving.kids}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              {/* <Icon name="star" width={20} height={20} fill={color_fifth} /> */}
              <Text style={{ marginLeft: 5, fontSize: 14, lineHeight: 25 }}>Camas: {reserving.beds}</Text>
            </View>
          </View>
        </View>





        <TouchableOpacity onPress={()=>setopenSingle(!openSingle)}><Text>open calendary</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setopenRange(!openRange)}><Text>open calendary range</Text></TouchableOpacity>



        {/* 
const [openSingle, setopenSingle] = useState(false);
  function getChangeSingle(data){ console.log("single data: ", data)}

  const [openRange, setopenRange] = useState(false);
  function getChangeRange(data){ console.log("range data: ", data)}


const config ={
  theme:"dark",
  color: "red",
  min: 4,
  max: 90,
} */}



        <Calendary
          config={config}
          open={openSingle}
          close={setopenSingle}
          getChange={getChangeRange}
        />

        <CalendaryRange
          config={config2}
          open={openRange}
          close={setopenRange}
          getChange={getChangeSingle}
        />






        {/*           
        <Modal animationType="slide" transparent={true} visible={getDate} >
          <CalendaryRange
            open={getDate}
            close={setgetDate}
            init={reserving.arrival}
            end={reserving.departure}
            color={color_fifth}
            theme={""}
            changeDate={changeDate}
          />
        </Modal> */}


        {displayFilter &&
          <>

            <View style={styles.settingNumber}>
              <View style={styles.settingNumberL}>
                <Text style={styles.settingNumberTitle}>Adults:</Text>
              </View>
              <View style={styles.settingNumberR}>
                <TouchableOpacity onPress={() => uploadNumber(-1, "Adults")} style={styles.settingNumberBtn}>
                  <Icon name="minus-circle-outline" width={30} height={30} fill={color_grey_light} />
                </TouchableOpacity>
                <Text style={styles.settingNumberBtnValue}>{reserving.Adults}</Text>
                <TouchableOpacity onPress={() => uploadNumber(+1, "Adults")} style={styles.settingNumberBtn}>
                  <Icon name="plus-circle-outline" width={30} height={30} fill={color_grey_light} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingNumber}>
              <View style={styles.settingNumberL}>
                <Text style={styles.settingNumberTitle}>Kids:</Text>
              </View>
              <View style={styles.settingNumberR}>
                <TouchableOpacity onPress={() => uploadNumber(-1, "kids")} style={styles.settingNumberBtn}>
                  <Icon name="minus-circle-outline" width={30} height={30} fill={color_grey_light} />
                </TouchableOpacity>
                <Text style={styles.settingNumberBtnValue}>{reserving.kids}</Text>
                <TouchableOpacity onPress={() => uploadNumber(+1, "kids")} style={styles.settingNumberBtn}>
                  <Icon name="plus-circle-outline" width={30} height={30} fill={color_grey_light} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingNumber}>
              <View style={styles.settingNumberL}>
                <Text style={styles.settingNumberTitle}>beds:</Text>
              </View>
              <View style={styles.settingNumberR}>
                <TouchableOpacity onPress={() => uploadNumber(-1, "beds")} style={styles.settingNumberBtn}>
                  <Icon name="minus-circle-outline" width={30} height={30} fill={color_grey_light} />
                </TouchableOpacity>
                <Text style={styles.settingNumberBtnValue}>{reserving.beds}</Text>
                <TouchableOpacity onPress={() => uploadNumber(+1, "beds")} style={styles.settingNumberBtn}>
                  <Icon name="plus-circle-outline" width={30} height={30} fill={color_grey_light} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <Text style={styles.sectionTitle}>servicios adicionales</Text>
                <TouchableOpacity
                  onPress={() => checkingAllServices(!checkAllServices)}
                  style={styles.sectionHeadBtn}>
                  <Text style={styles.sectionHeadBtnText}>
                    {checkAllServices ? "uncheck all" : "check all"}
                  </Text>
                  <Icon name={checkAllServices ? "checkmark-circle-2-outline" : "radio-button-off-outline"} width={30} height={30} fill={checkAllServices ? color_star : color_grey_dark} />
                </TouchableOpacity>
              </View>
              <View style={styles.sectionbody}>
                {additionalServices.map((i, key) => {
                  return (
                    <AditionalServises key={key} data={i} changeServices={changeServices} coin={reserving.coin} />
                  )
                })}
              </View>
            </View>


          </>}








        {/*         
        <Text>
          Aspectos destacados
          Servicios principales
          50 habitaciones para no fumadores
          Servicio de limpieza diario
          Restaurantes y bar
          1 piscina cubierta y 4 bañeras de hidromasaje
          Traslado desde/hacia el aeropuerto gratis
          Sauna
          Atracciones cerca del hotel
          A orillas del río
          Parque Nacional Torres del Paine (1 minutos a pie)
          Cascadas de Salto Chico (7 minutos a pie)
          Cascada Salto Grande (8,4 km)
        </Text> */}

































        <View style={{ height: 120 }}></View>

      </ScrollView>
      <View style={styles.foot}>
        <View style={styles.footRow}>
          <Text style={styles.footTitle}>Total:</Text>
          <Text style={styles.footPrice}>
            {currencyFormat(reserving.coin, reserving.priceTotal)}
          </Text>
        </View>
        <View style={{ ...styles.footRow, marginTop: 15 }}>
          <TouchableOpacity style={styles.footBtnSmall}>
            <Icon name="arrow-back-outline" width={30} height={30} fill={color_fifth} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footBtnBig}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} colors={["#00cdde", color_fifth, color_fifth, "#03808a"]} style={styles.gradient}>
              <Icon name="credit-card-outline" width={30} height={30} fill={color_white} />
              <Text style={styles.footBtnText}>To Pay</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>





      {/* <Menu props={props} option={0} /> */}
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
export default Reservation;







const AditionalServises = (props) => {
  return (
    <TouchableOpacity style={styles.optionCheck} onPress={() => props.changeServices(props.data)}>
      <View style={styles.optionCheckInfo}>
        <Text style={styles.optionCheckTitle}>{props.data.name}</Text>
        <Text style={styles.optionCheckSubTitle}>
          {currencyFormat(props.coin, props.data.price)}
        </Text>
      </View>
      <Icon name={props.data.state ? "checkmark-circle-2-outline" : "radio-button-off-outline"} width={30} height={30} fill={props.data.state ? color_star : color_grey_dark} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  settingNumber: { backgroundColor: color_white, borderRadius: 12, marginVertical: 5, flexDirection: "row", width: "90%", alignSelf: "center", paddingVertical: 5 },
  settingNumberL: { width: "30%" },
  settingNumberTitle: { lineHeight: 40, width: "100%", textAlign: "right", color: color_grey_dark },
  settingNumberR: { width: "70%", justifyContent: "center", flexDirection: "row" },
  settingNumberBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  settingNumberBtnValue: { color: color_fifth, width: 80, height: 40, textAlign: "center", lineHeight: 40 },


  section: { paddingVertical: 20, flexDirection: "column" },
  sectionHead: { marginBottom: 10, flexDirection: "row", paddingHorizontal: 20, justifyContent: "space-between" },
  sectionTitle: { fontWeight: "bold", color: color_fifth, lineHeight: 40, fontWeight: "bold", fontSize: 18, textTransform: "capitalize" },
  sectionHeadBtn: { backgroundColor: "rgba(0,0,0,0.05)", paddingHorizontal: 10, marginRight: 10, paddingVertical: 2, borderRadius: 8, flexDirection: "row", alignItems: "center" },
  sectionHeadBtnText: { marginRight: 15, color: color_grey_dark, fontWeight: "900", textTransform: "capitalize" },
  sectionbody: {},


  optionCheck: { flexDirection: "row", marginBottom: 5, backgroundColor: color_white, alignSelf: "center", width: "90%", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, alignItems: "center", justifyContent: "space-between" },
  optionCheckInfo: { flexDirection: "column" },
  optionCheckTitle: { fontSize: 12, color: color_grey_dark, lineHeight: 20 },
  optionCheckSubTitle: { fontSize: 16, color: color_grey_dark, lineHeight: 20, fontWeight: "bold" },







  // dateWrap: {
  //   width: "100%",
  //   marginTop: 10,
  //   flexDirection: "row",
  //   justifyContent: "center"
  // },
  // dateOption: {
  //   borderColor: color_fifth,
  //   backgroundColor: color_white,
  //   borderWidth: 1,
  //   width: "45%",
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 10,
  // },
  // dateText: {
  //   flexDirection: "column"
  // },
  // dateName: {
  //   textAlign: "center",
  //   color: color_fifth,
  //   fontWeight: "600",
  //   fontSize: 14
  // },
  // dateValue: {
  //   textAlign: "center",
  //   color: color_fifth,
  //   fontWeight: "bold",
  //   fontSize: 15
  // },
  // dateMiddle: {
  //   position: "absolute",
  //   backgroundColor: color_white,
  //   borderColor: color_fifth,
  //   borderWidth: 1,
  //   zIndex: 999,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 40,
  //   top: 10,
  //   left: windowWidth / 2 - 20,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },







  foot: {
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    backgroundColor: color_white,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footTitle: {
    color: color_grey_dark,
    fontSize: 16,
    fontWeight: "600"
  },
  footPrice: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold"
  },
  footBtnSmall: {
    padding: 5,
    backgroundColor: color_white,
    borderColor: color_fifth,
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 40
  },
  footBtnBig: {
    width: (windowWidth / 10) * 6.5
  },
  gradient: {
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row",
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  footBtnText: {
    marginLeft: 10,
    color: color_white,
    fontWeight: "bold"
  }
})