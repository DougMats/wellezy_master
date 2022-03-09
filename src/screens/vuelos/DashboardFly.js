/*
  //   const [FocusDeparture, setFocusDeparture] = useState(false)
  //   const [FocusDestination, setFocusDestination] = useState(false)
  //   const [ShowCalendar, setShowCalendar] = useState(false)
  //   const [NameAirportDeparture, setNameAirportDeparture] = useState("")
  //   const [CodeAirpotyDeparture, setCodeAirpotyDeparture] = useState("")
  //   const [NameDestination, setNameDestination] = useState("")
  //   const [CodeAirpotyDestination, setCodeAirpotyDestination] = useState("")

  //   const [Rate, setRate] = useState("Economical")
  //   const [ListServices, setListServices] = useState([])
  //   const [Load, setLoad] = React.useState(false);
  //   const [ListAirport, setListAirport] = useState([]);
  //   const [rangeDate, setrangeDate] = useState(false);
  //   const [clases, setclases] = useState([{'text':'Economical'},{'text':'Business'},{'text':'FirstClass'}]);
  //   const [clasesActivated, setclasesActivated] = useState('Economical');


  //   function goToScreen(screen, category, name_category) {
  //     navigation.navigate(screen, { randomCode: Math.random(), DateDeparture, DateDestination })
  //   }

  //   async function goToBack() {
  //     props.navigation.navigate(props.route.params.from, { randomCode: Math.random() })
  //   }

  //   useEffect(() => {
  //     const backAction = () => {
  //       goToBack()
  //       return true;
  //     };
  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       backAction
  //     );
  //     return () => backHandler.remove();
  //   }, []);

  //   const color_grey_half = "#05293b"
  //   const color_primary = "#00afe8"

  //   function OpenActionShet() {
  //     ActionSheet.options({
  //       options: [
  //         { text: 'Economical', onPress: () => setRate("Economical") },
  //         { text: 'Business', onPress: () => setRate("Business") },
  //         { text: 'First class', onPress: () => setRate("First class") },
  //       ],
  //       cancel: { onPress: () => console.log('cancel') }
  //     })
  //   }

  //   const showActionSheet = () => {
  //     ActionSheet.show()
  //   }

  //   function SelectDeparture(name_airport, code_airport) {
  //     console.log(name_airport)
  //     setNameAirportDeparture(name_airport)
  //     setCodeAirpotyDeparture(code_airport)
  //     setFocusDeparture(false)
  //   }

  //   function SelectDestination(name_airport, code_airport) {
  //     console.log(name_airport)
  //     setNameDestination(name_airport)
  //     setCodeAirpotyDestination(code_airport)
  //     setFocusDestination(false)
  //   }

  //   function setDate(init, finish) {
  //     const date_init = new Date(init)
  //     const year_init = date_init.getFullYear()
  //     const day_init = date_init.getDate()
  //     const month_init = date_init.getMonth() + 1
  //     const date_finish = new Date(finish)
  //     const year_finish = date_finish.getFullYear()
  //     const day_finish = date_finish.getDate()
  //     const month_finish = date_finish.getMonth() + 1
  //     console.log(month_init)
  //     if (finish != null) {
  //       setTimeout(() => setShowCalendar(false), 1000)
  //     }
  //     setDateDeparture(`${year_init}-${month_init}-${day_init}`)
  //     setDateDestination(`${year_finish}-${month_finish}-${day_finish}`)
  //   }

  //   async function goToPay() {
  //     await navigation.navigate("PayToCard", {
  //       randomCode: Math.random(),
  //       amount_in_cents: props.route.params.quotation[0].total_detalle.total + props.route.params.quotation[0].total_detalle_add.total + props.route.params.quotation[0].amount_surgery,
  //       payment_concept: `${props.route.params.quotation[0].solicitud[0].name_ingles_sub}`,
  //       payment_method: {
  //         "type": "CARD",
  //       }
  //     })
  //   }

  //   async function OpenSetTravellers() {
  //     console.log("TRAVELS")
  //   }

  //   const SearchAirport = async (keywords) => {
  //     console.log(keywords)
  //     setNameAirportDeparture(keywords)
  //     console.log(base_url(serverAmadeus, `airports/${keywords}`))
  //     setLoad(true)
  //     await axios.get(base_url(serverAmadeus, `airports/${keywords}`)).then(function (response) {
  //       console.log(response.data)
  //       setListAirport(response.data)
  //       setLoad(false)
  //     })
  //       .catch(function (error) {
  //         console.log(error)
  //         setLoad(false)
  //       })
  //       .then(function () { });
  //   }
  //   const SearchAirportDestination = async (keywords) => {
  //     console.log(keywords)
  //     setNameDestination(keywords)
  //     console.log(base_url(serverAmadeus, `airports/${keywords}`))
  //     setLoad(true)
  //     await axios.get(base_url(serverAmadeus, `airports/${keywords}`)).then(function (response) {
  //       console.log(response.data)
  //       setListAirport(response.data)
  //       setLoad(false)
  //     })
  //       .catch(function (error) {
  //         console.log(error)
  //         setLoad(false)
  //       })
  //       .then(function () { });
  //   }
  //   function RangeGet(data) {
  //     console.log("rango obtenido")
  //     console.log("init: ", data[0])
  //     console.log("end: ", data[1])
  //   }
  //   function RangeCancel() {
  //     setrangeDate(false)
  //   }
  */


import React, { useState, useEffect, useContext } from 'react'
import { StatusBar, TextInput, Image, Modal, TouchableHighlight, BackHandler, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next';
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import UserContext from '../../../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import Calendary from '../../components/time/Calendary.js'
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
  color_star,
  color_fifth
} from '../../styles/Colors.js'
import { base_url, serverAmadeus, serverCrm } from '../../../Env'


// import axios from 'axios'
// import { ActionSheet } from 'react-native-cross-actionsheet'
// import DatepickerRange from 'react-native-range-datepicker';
// import GetDateRange from '../../../components/time/getDateRange'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DashboardFly(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props;
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [vertical, setvertical] = useState(false);
  const [tip, settip] = useState(1);
  const [countBabys, setcountBabys] = useState(0)
  const [countChilds, setcountChilds] = useState(0)
  const [countAdults, setcountAdults] = useState(1)
  const [itsSeletingPassengers, setitsSeletingPassengers] = useState(false);
  const [dateDeparture, setdateDeparture] = useState(null)
  const [selectingDateDeparture, setselectingDateDeparture] = useState(false)
  const [dateDestination, setdateDestination] = useState(null)
  const [selectingdateDestination, setselectingdateDestination] = useState(false)
  const [dateUndefined, setdateUndefined] = useState(false);

  const [FlyType, setFlyType] = useState([{ id: 1, 'text': 'ida y vuelta' }, { id: 2, 'text': 'solo ida' }, { id: 3, 'text': 'multidestino' }]);
  const [FlyTypeActivated, setFlyTypeActivated] = useState(null);
  const [selectingFlyTypeActivated, setselectingFlyTypeActivated] = useState(false);

  const [FlyCategory, setFlyCategory] = useState([{ id: 1, 'text': 'economy' }, { id: 2, 'text': 'premium economy' }, { id: 3, 'text': 'premium busines' }]);
  const [FlyCategoryActivated, setFlyCategoryActivated] = useState(null);
  const [selectingFlyCategoryActivated, setselectingFlyCategoryActivated] = useState(false);

  const config = {
    theme: "",//light / dark
    color: color_fifth,//"#FF008B",
    minDateNow: true,
    hour: false,
    rangeDate: false,
  }

  const [cabinas, setcabinas] = useState([
    { id: 1, name: "economy", columns: 2, seatingByRow: 3, rows: 30 },
    { id: 2, name: "premium economy", columns: 2, seatingByRow: 3, rows: 30 },
    { id: 3, name: "premium busines", columns: 2, seatingByRow: 3, rows: 30 }
  ]);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }


  useEffect(() => {
    if (dateUndefined) {
      // setdateDeparture(null)
      // setdateDestination(null)
    }
  }, [dateUndefined]);

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }


  function changeAdult(type) {
    if (type) {
      setcountAdults(countAdults + 1)
    } else {

      if ((countAdults - 1) > 0) {
        setcountAdults(countAdults - 1)
      } else {
        setcountAdults(1)
      }
    }
  }


  function changeChild(type) {
    if (type) {
      setcountChilds(countChilds + 1)
    } else {
      if ((countChilds - 1) > 0) {
        setcountChilds(countChilds - 1)
      } else {
        setcountChilds(0)
      }
    }
  }


  function changeBaby(type) {
    if (type) {
      setcountBabys(countBabys + 1)
    } else {
      if ((countBabys - 1) > 0) {
        setcountBabys(countBabys - 1)
      } else {
        setcountBabys(0)
      }
    }
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_fifth }}>
      <StatusBar backgroundColor={color_fifth} barStyle='light-content' translucent={false} />

      <View style={styles.barUp}>
        <View style={styles.barupSide}>
          <TouchableOpacity style={styles.barupSideBtn}>
            <Icon name={"arrow-ios-back-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
        </View>
        <View style={styles.barupCenter}>
          <Text style={styles.barupCenterText}>Wellezy-Fly</Text>
        </View>
        <View style={styles.barupSide}>
          <TouchableOpacity style={styles.barupSideBtn}>
            <Icon name={"more-vertical-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageBackground}>
        <Image style={{ ...styles.imgCover, opacity: 0.25 }} source={require("../../images/map.png")} />
      </View>

      <ScrollView scrollEventThrottle={16}>
        <View style={{
          paddingTop: windowWidth / 3,
          paddingBottom: 50
        }}>

          <View style={styles.menu}>
            <TouchableOpacity onPress={() => settip(1)} style={{ ...styles.menuBtn, borderBottomWidth: tip === 1 ? 1 : 0 }}>
              <Text style={{ ...styles.menuBtnText, color: tip === 1 ? color_white : color_grey_light }}>Fechas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => settip(2)} style={{ ...styles.menuBtn, borderBottomWidth: tip === 2 ? 1 : 0 }}>
              <Text style={{ ...styles.menuBtnText, color: tip === 2 ? color_white : color_grey_light }}>Asientos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => settip(3)} style={{ ...styles.menuBtn, borderBottomWidth: tip === 3 ? 1 : 0 }}>
              <Text style={{ ...styles.menuBtnText, color: tip === 3 ? color_white : color_grey_light }}>Destinos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>


            {tip === 1 &&
              <View style={styles.page}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>¿A dónde viajas?</Text>
                  <View style={styles.sectionBody}>
                  </View>
                </View>
                <TouchableOpacity style={styles.section} onPress={() => setitsSeletingPassengers(!itsSeletingPassengers)}>
                  <Text style={styles.sectionTitle}>¿Con quien viajas?</Text>
                  <View style={styles.sectionBody}>
                    <Icon name={"person-outline"} width={25} height={25} fill={color_grey_dark} />
                    <Text style={styles.sectionBodytext}>pasajeros: {countBabys + countChilds + countAdults}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>¿Cuando viajas?</Text>
                  <View style={{ ...styles.sectionBody, justifyContent: "space-between", paddingHorizontal: 10 }}>
                    {!dateUndefined &&
                      <TouchableOpacity onPress={() => setselectingDateDeparture(true)}
                        style={{ backgroundColor: "#f5f5f5", width: "45%", padding: 5, borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"calendar-outline"} width={25} height={25} fill={color_fifth} />
                        {dateDeparture === null ?
                          <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: "bold", color: color_fifth, }}>Salida</Text>
                          :
                          <View style={{ marginLeft: 10, flexDirection: "column" }}>
                            <Text style={{ fontSize: 12 }}>fecha de salida</Text>
                            <Text style={{ fontSize: 14, color: color_grey_dark, fontWeight: "bold" }}>{dateDeparture}</Text>
                          </View>
                        }
                      </TouchableOpacity>
                    }
                    {!dateUndefined &&
                      <TouchableOpacity onPress={() => setselectingdateDestination(true)}
                        style={{ backgroundColor: "#f5f5f5", width: "45%", padding: 5, borderRadius: 8, flexDirection: "row", alignItems: "center" }}>
                        <Icon name={"calendar-outline"} width={25} height={25} fill={color_fifth} />
                        {dateDestination === null ?
                          <Text style={{ marginLeft: 10, fontSize: 14, fontWeight: "bold", color: color_fifth, }}>Retorno</Text>
                          :
                          <View style={{ marginLeft: 10, flexDirection: "column" }}>
                            <Text style={{ fontSize: 12 }}>fecha de retorno</Text>
                            <Text style={{ fontSize: 14, color: color_grey_dark, fontWeight: "bold" }}>{dateDestination}</Text>
                          </View>
                        }
                      </TouchableOpacity>
                    }
                  </View>
                  <TouchableOpacity
                    onPress={() => setdateUndefined(!dateUndefined)}
                    style={{ marginVertical: 10, alignSelf: "center", flexDirection: "row", alignItems: "center" }}>
                    <Icon name={dateUndefined ? "checkmark-square-2-outline" : "square-outline"} width={25} height={25} fill={dateUndefined ? color_fifth : color_grey_dark} />
                    <Text style={{ marginLeft: 10, fontSize: 14, color: dateUndefined ? color_fifth : color_grey_dark }}>Aun no decido la fecha</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>¿Cómo viajas?</Text>
                  <View style={{ paddingTop: 5, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => setselectingFlyTypeActivated(true)}
                      style={{ backgroundColor: "#f5f5f5", width: "48%", padding: 5, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={"checkmark-square-2-outline"} width={25} height={25} fill={color_fifth} />
                      {FlyTypeActivated === null ?
                        <Text style={{ textAlign: "center", color: color_fifth, fontWeight: "bold", marginLeft: 10 }}>select a type </Text>
                        :
                        <Text style={{ textAlign: "center", color: color_fifth, fontWeight: "bold", marginLeft: 10 }}>{FlyTypeActivated.text}</Text>
                      }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setselectingFlyCategoryActivated(true)}
                      style={{ backgroundColor: "#f5f5f5", width: "48%", padding: 5, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={"checkmark-square-2-outline"} width={25} height={25} fill={color_fifth} />
                      {FlyCategoryActivated === null ?
                        <Text style={{ textAlign: "center", color: color_fifth, fontWeight: "bold", marginLeft: 5 }}>select a category </Text>
                        :
                        <Text style={{ textAlign: "center", color: color_fifth, fontWeight: "bold", marginLeft: 5 }}>{FlyCategoryActivated.text}</Text>
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }

            {tip === 2 &&
              <View style={styles.page}>
                {FlyCategoryActivated !== null ?
                  <Cabina cabinas={cabinas} select={FlyCategoryActivated} />
                  :
                  <View>
                    <Text>debes sellecioanr una categoria de vuelo</Text>
                  </View>
                }
              </View>
            }









            {tip === 3 &&
              <View style={styles.page}>

              </View>
            }

          </View>
        </View>
      </ScrollView>







      {/*
         <View style={{ padding: 5, marginVertical: 10, flexDirection: "row", justifyContent: "space-around", backgroundColor: "white" }}>
           {
             clases.map((i, key) => {
               return (
                 <TouchableOpacity onPress={() => setclasesActivated(i.text)}
                   style={{
                     color: clasesActivated === i.text ? "#00afe8" : "#ccc",
                     alignItems: "center"
                   }}>
                   <Icon name={clasesActivated === i.text ? 'checkmark-circle-2-outline' : 'radio-button-off-outline'} width={20} height={20} fill={clasesActivated === i.text ? "#00afe8" : "#ccc"} />
                   <Text style={{ color: clasesActivated === i.text ? "#00afe8" : "#ccc" }}>{i.text}</Text>
                 </TouchableOpacity>
               )
             })
           }
         </View>


         <View style={{ ...styles.Input, borderTopEndRadius: 10, borderTopStartRadius: 10 }} >
           <View style={{ position: "absolute", left: 10, top: 12, width: 30, borderBottomColor: "black", borderBottomWidth: 1 }}>
             <Image style={styles.Plane} source={require("../../../images/AVION-1.png")} />
           </View>
           <TextInput
             style={{ ...styles.inputText }}
             placeholder="Enter a city or airport"
             placeholdercolor_grey_half="#333"
             onFocus={() => setFocusDeparture(true)}
             onChangeText={text => SearchAirport(text)}
             value={NameAirportDeparture != "" ? NameAirportDeparture : ''}
           />
         </View>


         <View style={{ ...styles.Input, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }} >
           <View style={{ position: "absolute", left: 10, top: 12, width: 30, borderBottomColor: "black", borderBottomWidth: 1 }}>
             <Image style={styles.Plane} source={require("../../../images/AVION-2.png")} />
           </View>
           <TextInput
             style={{ ...styles.inputText }}
             placeholder="Enter a city or airport"
             placeholdercolor_grey_half="#333"
             onFocus={() => setFocusDestination(true)}
             onChangeText={text => SearchAirportDestination(text)}
             value={NameDestination != "" ? NameDestination : ''}
           />
         </View>



         
        {
          FocusDeparture &&
          <View style={styles.ListDeparture}>
            <Text>List of airports</Text>
            {Load &&
              <ActivityIndicator size="large" color={color_primary} />
            }
            {!Load && ListAirport.length > 0 &&
              ListAirport.map((item, key) => {
                return <TouchableOpacity style={styles.ListDepartureContent} onPress={() => SelectDeparture(item.name, item.iataCode)} >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image style={{ ...styles.Plane, width: 20, height: 20 }} ource={require("../../../images/flight.png")} />
                      <View>
                        <Text style={styles.ListDepartureTitle}>{item.name}</Text>
                        <Text>{item.address.cityName}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.iataCode}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              })
            }
          </View>
        }

        {
          FocusDestination &&
          <View style={styles.ListDeparture}>
            <Text>List of airports</Text>
            {Load &&
              <ActivityIndicator size="large" color={color_primary} />
            }
            {!Load && ListAirport.length > 0 &&
              ListAirport.map((item, key) => {
                return <TouchableOpacity style={styles.ListDepartureContent} onPress={() => SelectDestination(item.name, item.iataCode)} >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image style={{ ...styles.Plane, width: 20, height: 20 }}
                        source={require("../../../images/flight.png")}
                      />
                      <View>
                        <Text style={styles.ListDepartureTitle}>{item.name}</Text>
                        <Text>Medellin, Colombia</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.iataCode}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              })
            }
          </View>
        }

   {ShowCalendar &&
          <DatepickerRange
            startDate='13052017'
            untilDate='26062017'
            showReset={false}
            onConfirm={(startDate, untilDate) => setDate(startDate, untilDate)}
            onSelect={(startDate, untilDate) => setDate(startDate, untilDate)}
            onClose={() => setShowCalendar(false)}
            infoContainerStyle={{ marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end' }}
          />
        } 


        <TouchableOpacity onPress={() => setShowCalendar(true)} style={{ ...styles.Buttons, padding: 12, marginTop: 16, backgroundColor: "#fff", width: "100%" }}   >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name='calendar' width={24} height={24} fill={color_grey_half} />
            <Text style={{ marginLeft: 12 }}>{DateDeparture} - {DateDestination}</Text>
          </View>
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => setrangeDate(true)} style={{ ...styles.Buttons, padding: 12, marginTop: 16, backgroundColor: "#fff", width: "100%" }}   >
         <View style={{ flexDirection: "row", alignItems: "center" }}>
           <Icon name='calendar' width={24} height={24} fill={color_grey_half} />
           <Text style={{ marginLeft: 12 }}>{DateDeparture} - {DateDestination}</Text>
         </View>
       </TouchableOpacity>

       <GetDateRange
         color={colorBetta}
         mode="light" //dark
         show={rangeDate}
         RangeGet={RangeGet}
         RangeCancel={RangeCancel}
       />

       <View style={{ marginTop: 50, marginBottom: 20 }}>
         <Text>Opciones</Text>
       </View>

       <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
         <TouchableOpacity style={styles.Buttons} onPress={() => setmodalVisible(true)} >
           <View style={{ flexDirection: "row", alignItems: "center" }}>
             <Icon name='person' width={24} height={24} fill={color_grey_half} />
             <Text style={{ marginLeft: 12 }}>{CountAdults + CountBaby + CountChild + CountYoung} Viajeros</Text>
           </View>
         </TouchableOpacity>

         <TouchableOpacity style={styles.Buttons} onPress={() => OpenActionShet()}  >
           <View style={{ flexDirection: "row", alignItems: "center" }}>
             <Icon name='bookmark' width={24} height={24} fill={color_grey_half} />
             <Text style={{ marginLeft: 12 }}>{Rate}</Text>
           </View>
         </TouchableOpacity>

       </View>
       <TouchableOpacity style={{ ...styles.BtnPrimary, alignSelf: "center", marginTop: 20 }} onPress={() => goToScreen("ListFlights")}>
         <Text style={{ ...styles.loginText, color: "white" }}>Search Flights</Text>
       </TouchableOpacity>
     </ScrollView>




   </View>
 );
 }

*/}







      {/*

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setmodalVisible(false) }}>
        <View style={styles.backgroundModal}>

          {itsSeletingPassengers &&
            <View style={{ padding: 10, width: "90%", height: 300, backgroundColor: "white", borderRadius: 12 }}>
              <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 10 }}>







              {/* <View>
               <Text>
                 <Text style={{ fontSize: 17, color: color_grey_half, marginRight: 100 }}>Adults </Text>
                 <Text style={{ fontSize: 12, color: "#aaa" }}>over 18 years</Text>
               </Text>
             </View>
              */}


      {/*             
             <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                 onPress={() => { CountAdult(false); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                 </Text>
               </TouchableHighlight>

               <Text style={{ marginTop: 7, fontWeight: "bold", color: color_grey_half, fontSize: 17 }}>
                 {CountAdults}
               </Text>

               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: color_primary, marginTop: 10 }}
                 onPress={() => { CountAdult(true); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='plus' width={15} height={15} fill={"white"} />
                 </Text>
               </TouchableHighlight>
             </View>
             ****}
           </View>



            </View>
          }


          {/*
        

          


           <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 10 }}>
             <View>
               <Text>
                 <Text style={{ fontSize: 17, color: color_grey_half, marginRight: 100 }}>Young </Text>
                 <Text style={{ fontSize: 12, color: "#aaa" }}>12 - 17</Text>
               </Text>
             </View>
             <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                 onPress={() => { CountYoungs(false); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                 </Text>
               </TouchableHighlight>
               <Text style={{ marginTop: 7, fontWeight: "bold", color: color_grey_half, fontSize: 17 }}>
                 {CountYoung}
               </Text>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: color_primary, marginTop: 10 }}
                 onPress={() => { CountYoungs(true); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='plus' width={15} height={15} fill={"white"} />
                 </Text>
               </TouchableHighlight>
             </View>
           </View>


           <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 10 }}>
             <View>
               <Text>
                 <Text style={{ fontSize: 17, color: color_grey_half, marginRight: 100 }}>Child </Text>
                 <Text style={{ fontSize: 12, color: "#aaa" }}>2 - 11</Text>
               </Text>
             </View>

             <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                 onPress={() => { CountChilds(false); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                 </Text>
               </TouchableHighlight>
               <Text style={{ marginTop: 7, fontWeight: "bold", color: color_grey_half, fontSize: 17 }}>
                 {CountChild}
               </Text>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: color_primary, marginTop: 10 }}
                 onPress={() => { CountChilds(true); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='plus' width={15} height={15} fill={"white"} />
                 </Text>
               </TouchableHighlight>
             </View>
           </View>
           <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 10 }}>
             <View>
               <Text>
                 <Text style={{ fontSize: 17, color: color_grey_half, marginRight: 100 }}>Baby </Text>
                 <Text style={{ fontSize: 12, color: "#aaa" }}>less than 2</Text>
               </Text>
             </View>
             <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                 onPress={() => { CountBabys(false); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                 </Text>
               </TouchableHighlight>
               <Text style={{ marginTop: 7, fontWeight: "bold", color: color_grey_half, fontSize: 17 }}>
                 {CountBaby}
               </Text>
               <TouchableHighlight
                 style={{ ...styles.ButtonPlusMinus, backgroundColor: color_primary, marginTop: 10 }}
                 onPress={() => { CountBabys(true); }}>
                 <Text style={{ color: "white", textAlign: "center" }}>
                   <Icon name='plus' width={15} height={15} fill={"white"} />
                 </Text>
               </TouchableHighlight>
             </View>
           </View>
           <TouchableOpacity style={{ ...styles.BtnPrimary, alignSelf: "center", marginTop: 20 }} onPress={() => setmodalVisible(false)}>
             <Text style={{ ...styles.loginText, color: "white" }}>Close</Text>
           </TouchableOpacity>
         </View>
         ****}
        </View>
      </Modal>

        */}





      <Menu props={props} option={0} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }







      <Calendary
        data={dateDeparture}
        config={config}
        open={selectingDateDeparture}
        close={setselectingDateDeparture}
        getChange={setdateDeparture}
      />

      <Calendary
        data={dateDestination}
        config={config}
        open={selectingdateDestination}
        close={setselectingdateDestination}
        getChange={setdateDestination}
      />




      <Modal animationType="slide" transparent={true} visible={itsSeletingPassengers} onRequestClose={() => { setitsSeletingPassengers(false) }}>
        <View style={styles.backgroundModal}>
          <View style={styles.modalWrap}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>total pasajeros: {countBabys + countChilds + countAdults}</Text>
            </View>

            <View style={styles.formWrap}>
              <View style={styles.formWrapL}>
                <Text style={styles.formWrapLTitle}>Adultos</Text>
                <Text style={styles.formWrapLSubtitle}>Igual o mayor a 12 años</Text>
              </View>
              <View style={styles.formWrapR}>
                <TouchableOpacity style={styles.formWrapRBtn} onPress={() => changeAdult(false)}>
                  <Icon name={"minus-circle-outline"} width={25} height={25} fill={color_grey_half} />
                </TouchableOpacity>
                <View style={styles.formWrapRValue}>
                  <Text style={styles.formWrapRValueText}>{countAdults}
                  </Text>
                </View>
                <TouchableOpacity style={styles.formWrapRBtn} onPress={() => changeAdult(true)}>
                  <Icon name={"plus-circle-outline"} width={25} height={25} fill={color_grey_half} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formWrap}>
              <View style={styles.formWrapL}>
                <Text style={styles.formWrapLTitle}>Niños</Text>
                <Text style={styles.formWrapLSubtitle}>de 2 a 11 años</Text>
              </View>
              <View style={styles.formWrapR}>
                <TouchableOpacity style={styles.formWrapRBtn} onPress={() => changeChild(false)}>
                  <Icon name={"minus-circle-outline"} width={25} height={25} fill={color_grey_half} />
                </TouchableOpacity>
                <View style={styles.formWrapRValue}>
                  <Text style={styles.formWrapRValueText}>{countChilds}
                  </Text>
                </View>
                <TouchableOpacity style={styles.formWrapRBtn} onPress={() => changeChild(true)}>
                  <Icon name={"plus-circle-outline"} width={25} height={25} fill={color_grey_half} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formWrap}>
              <View style={styles.formWrapL}>
                <Text style={styles.formWrapLTitle}>bebes</Text>
                <Text style={styles.formWrapLSubtitle}>menores de 2 años</Text>
              </View>
              <View style={styles.formWrapR}>
                <TouchableOpacity style={styles.formWrapRBtn} onPress={() => changeBaby(false)}>
                  <Icon name={"minus-circle-outline"} width={25} height={25} fill={color_grey_half} />
                </TouchableOpacity>
                <View style={styles.formWrapRValue}>
                  <Text style={styles.formWrapRValueText}>{countBabys}
                  </Text>
                </View>
                <TouchableOpacity style={styles.formWrapRBtn} onPress={() => changeBaby(true)}>
                  <Icon name={"plus-circle-outline"} width={25} height={25} fill={color_grey_half} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.modalFootBtn}
              onPress={() => setitsSeletingPassengers(false)}>
              <Text style={styles.modalFootBtnText}>Guardar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>


      <Modal animationType="slide" transparent={true} visible={selectingFlyTypeActivated} >
        <View style={styles.backgroundModal}>
          <View style={styles.modalWrap}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}> {FlyTypeActivated === null ? "Select a type" : FlyTypeActivated.text}</Text>
            </View>
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              {
                FlyType.map((i, key) => {
                  let active, icon
                  if (FlyTypeActivated === null) {
                    active = color_grey_dark
                    icon = 'radio-button-off-outline'
                  }
                  else {
                    if (FlyTypeActivated.id === i.id) {
                      active = color_fifth;
                      icon = 'checkmark-circle-2-outline'
                    }
                    else { active = color_grey_dark; icon = 'radio-button-off-outline'; }
                  }
                  return (
                    <TouchableOpacity key={key} onPress={() => setFlyTypeActivated(i)} style={{ flexDirection: "row", alignItems: "center" }}>
                      <Icon name={icon} width={20} height={20} fill={active} />
                      <Text style={{ marginLeft: 10, fontSize: 14, textTransform: "capitalize", color: active }}>{i.text}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <TouchableOpacity style={styles.modalFootBtn}
              onPress={() => setselectingFlyTypeActivated(false)}>
              <Text style={styles.modalFootBtnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={selectingFlyCategoryActivated}>
        <View style={styles.backgroundModal}>
          <View style={styles.modalWrap}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}> {FlyCategoryActivated === null ? "Select a category" : FlyCategoryActivated.text}</Text>
            </View>
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              {
                FlyCategory.map((i, key) => {
                  let active, icon

                  if (FlyCategoryActivated === null) {
                    active = color_grey_dark
                    icon = 'radio-button-off-outline'
                  }
                  else {
                    if (FlyCategoryActivated.id === i.id) {
                      active = color_fifth;
                      icon = 'checkmark-circle-2-outline'
                    }
                    else { active = color_grey_dark; icon = 'radio-button-off-outline'; }
                  }
                  return (
                    <TouchableOpacity key={key} onPress={() => setFlyCategoryActivated(i)}
                      style={{
                        flexDirection: "row",
                        color: active,
                        alignItems: "center"
                      }}>
                      <Icon name={icon} width={20} height={20} fill={active} />
                      <Text style={{ marginLeft: 10, fontSize: 14, color: active }}>{i.text}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <TouchableOpacity style={styles.modalFootBtn}
              onPress={() => setselectingFlyCategoryActivated(false)}>
              <Text style={styles.modalFootBtnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}
export default DashboardFly;

const styles = StyleSheet.create({


  section: {
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "column",
    borderBottomColor: color_grey_light,
    borderBottomWidth: 0.5,
  },
  sectionTitle: {
    marginLeft: 30,
    fontSize: 14,
    color: color_grey_dark,
    textTransform: "capitalize",
  },
  sectionBody: {
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
  },
  sectionBodytext: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: color_grey_dark,
  },




  backgroundModal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 999
  },
  modalWrap: {
    overflow: "hidden",
    backgroundColor: color_white,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12
  },
  modalTitle: {
    backgroundColor: color_fifth,
    width: "100%",
    paddingVertical: 10,
  },
  modalTitleText: {
    color: color_white,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center"
  },
  formWrap: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: color_grey_light,
    borderBottomWidth: 0.5,
    flexDirection: "row",
  },
  formWrapL: {
    width: "50%",
    flexDirection: "column"
  },
  formWrapLTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: color_grey_dark
  },
  formWrapLSubtitle: {
    fontSize: 12,
    color: color_grey_half
  },
  formWrapR: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between"
  },
  formWrapRBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  formWrapRValue: {
    backgroundColor: "#f5f5f5",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  formWrapRValueText: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 30
  },
  modalFootBtn: {
    backgroundColor: color_fifth,
    width: "60%",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  modalFootBtnText: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 14
  },

















  barUp: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  barupSide: {
    alignItems: "center",
    justifyContent: "center",
    width: "15%"
  },
  barupSideBtn: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  barupCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%"
  },
  barupCenterText: {
    lineHeight: 30,
    color: color_white,
    fontWeight: "bold",
    fontSize: 16
  },

  imageBackground: {
    position: "absolute",
    zIndex: -1,
    width: windowWidth,
    height: windowWidth / 2,
    padding: 10
  },
  imgCover: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  menu: {
    flexDirection: "row",
    paddingBottom: 10,
    width: "100%",
    paddingHorizontal: 5,
  },
  menuBtn:
  {
    borderBottomColor: color_white,
    width: "25%",
    paddingVertical: 5,
  },
  menuBtnText: {
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "bold"
  },
  wrapper: {
    backgroundColor: color_white,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    //


  },
  page: {
    paddingBottom: 20,
    height: windowHeight
    //backgroundColor:"red"
  }










  // Input: {
  //   backgroundColor: "#fff",//"#e6ebef",
  //   marginBottom: 2
  // },
  // inputText: {
  //   paddingLeft: 50
  // },
  // Plane: {
  //   width: 30,
  //   height: 30,
  //   resizeMode: "contain",
  //   marginRight: 10,
  // },
  // Buttons: {
  //   backgroundColor: "white",
  //   padding: 14,
  //   width: "40%",
  //   borderRadius: 10,
  //   marginBottom: 10
  // },
  // ListDeparture: {
  //   backgroundColor: "white",
  //   height: "100%",
  //   padding: 10
  // },
  // ListDepartureContent: {
  //   marginTop: 10,
  //   marginBottom: 20
  // },
  // ListDepartureTitle: {
  //   fontWeight: "bold",
  //   fontSize: 16
  // },
  // modalView: {
  //   padding: 0,
  //   alignItems: "center",
  //   backgroundColor: 'white',
  //   height: "100%",
  //   shadowOffset: {
  //     width: 0,
  //     height: 0
  //   },
  //   shadowOpacity: 0,
  //   shadowRadius: 0,
  //   elevation: 0
  // },
  // ButtonPlusMinus: {
  //   backgroundColor: "red",
  //   borderRadius: 5,
  //   padding: 5
  // }
});

const Cabina = (props) => {

  const cabina = props.cabinas.find(obj => obj.id === props.select.id)




  {/* 
  const [cabinas, setcabinas] = useState([
    { id: 1, name: "economy", columns: 2, seatingByRow: 3, rows: 30 },
    { id: 2, name: "premium economy", columns: 2, seatingByRow: 3, rows: 30 },
    { id: 3, name: "premium busines", columns: 2, seatingByRow: 3, rows: 30 }
  ]);
*/}

  function builder() {
    // let column=[]
    // let rows =[]
    // let seat = {}
    // for(var x =0; x < cabina.columns; x++){}
    // for(var y =0; y < cabina.columns; y++){}
    // for(var z =0; z < cabina.columns; z++){}



    // for(var x =0;  < cabina.columns; x++){
    // for(var i =0; i < cabina.columns; i++){
    // let column = []
    // for(var g =0; g < cabina.seatingByRow; g++){
    //   column.push(" *")
    // }
    // tree.push(column)
    // }
    // }

    // for (var i=1;i<10;i++){ 
    //   tree.push("La tabla del " ++ "")
    //   for (var j=1;j<10;j++) { 
    //      tree.push(i + " x " + j + ": ") 
    //      tree.push(i*j) 
    //   } 
    // }
    // console.log("tree: ", tree)
    //   return tree
  }



  let tree = [
    { column: "l", },
    {
      column: "r",
      rows: [

      ]
    }
  ]




  return (
    <View style={{}}>
      <Text style={{}}>{cabina.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {tree.map((i, key) => {
          return (
            <View key={key} style={{ width: "40%", backgroundColor: "#f5f5f5", borderRadius: 8 }}>
              {/* <Text>{i.column}</Text> */}
              <Text>.</Text>
              <View>{/*
          tree.rows.map((g,k)=>{
            return (
            <Text>*
<Icon name={"square-outline"} width={30} height={30} fill={"red"} />

            </Text>
            
            )
          })
        */}
              </View>

            </View>
          )
        })
        }</View>


    </View>
  )
}