import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar, StyleSheet, TextInput, Image, Modal, TouchableHighlight, ActivityIndicator, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import Head from '../../../components/generic/Head'
import Menu from '../../../components/generic/Menu'

//import styles from '../../src/images/css/Dashboard'
//import { TextColor, colorPrimary } from '../../.../images/css/Global'

import { base_url, serverAmadeus, serverCrm } from '../../../../Env'
import axios from 'axios'
import { ActionSheet } from 'react-native-cross-actionsheet'
import DatepickerRange from 'react-native-range-datepicker';

import GetDateRange from '../../../components/time/getDateRange'
import { colorBetta } from '../../../styles/Colors';


function Vuelos(props) {




  async function goToBack() {
    props.navigation.navigate(props.route.params.from, { randomCode: Math.random() })
  }
  useEffect(() => {
    const backAction = () => {
      goToBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);




  const TextColor = "#05293b"
  const colorPrimary = "#00afe8"



  const { navigation } = props


  const [clases, setclases] = useState([
    { 'text': 'Economical' },
    { 'text': 'Business' },
    { 'text': 'FirstClass' }
  ]);
  const [clasesActivated, setclasesActivated] = useState('Economical');


  const [FlyType, setFlyType] = useState([
    { 'text': 'ida y vuelta' },
    { 'text': 'solo ida' },
    { 'text': 'multidestino' }
  ]);
  const [FlyTypeActivated, setFlyTypeActivated] = useState('ida y vuelta');



  function goToScreen(screen, category, name_category) {
    navigation.navigate(screen, { randomCode: Math.random(), DateDeparture, DateDestination })
  }
  const [FocusDeparture, setFocusDeparture] = useState(false)
  const [FocusDestination, setFocusDestination] = useState(false)
  const [ShowCalendar, setShowCalendar] = useState(false)
  const [NameAirportDeparture, setNameAirportDeparture] = useState("")
  const [CodeAirpotyDeparture, setCodeAirpotyDeparture] = useState("")
  const [NameDestination, setNameDestination] = useState("")
  const [CodeAirpotyDestination, setCodeAirpotyDestination] = useState("")
  const [DateDeparture, setDateDeparture] = useState(false)
  const [DateDestination, setDateDestination] = useState(false)
  const [CountAdults, setCountAdults] = useState(0)
  const [CountYoung, setCountYoung] = useState(0)
  const [CountChild, setCountChild] = useState(0)
  const [CountBaby, setCountBaby] = useState(0)
  const [Rate, setRate] = useState("Economical")
  const [ListServices, setListServices] = useState([])
  const [Load, setLoad] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ListAirport, setListAirport] = useState([]);

  const [rangeDate, setrangeDate] = useState(false);


  let randomCode
  // if(props.route.params){
  //randomCode = props.route.params.randomCode
  // }else{
  //     randomCode = 1
  // }
  // useEffect(() => {
  // }, [randomCode])


  function OpenActionShet() {
    ActionSheet.options({
      options: [
        { text: 'Economical', onPress: () => setRate("Economical") },
        { text: 'Business', onPress: () => setRate("Business") },
        { text: 'First class', onPress: () => setRate("First class") },
      ],
      cancel: { onPress: () => console.log('cancel') }
    })
  }

  const showActionSheet = () => {
    ActionSheet.show()
  }

  function SelectDeparture(name_airport, code_airport) {
    console.log(name_airport)
    setNameAirportDeparture(name_airport)
    setCodeAirpotyDeparture(code_airport)
    setFocusDeparture(false)
  }

  function SelectDestination(name_airport, code_airport) {
    console.log(name_airport)
    setNameDestination(name_airport)
    setCodeAirpotyDestination(code_airport)
    setFocusDestination(false)
  }

  function setDate(init, finish) {
    const date_init = new Date(init)
    const year_init = date_init.getFullYear()
    const day_init = date_init.getDate()
    const month_init = date_init.getMonth() + 1
    const date_finish = new Date(finish)
    const year_finish = date_finish.getFullYear()
    const day_finish = date_finish.getDate()
    const month_finish = date_finish.getMonth() + 1
    console.log(month_init)
    if (finish != null) {
      setTimeout(() => setShowCalendar(false), 1000)
    }
    setDateDeparture(`${year_init}-${month_init}-${day_init}`)
    setDateDestination(`${year_finish}-${month_finish}-${day_finish}`)
  }

  async function goToPay() {
    await navigation.navigate("PayToCard", {
      randomCode: Math.random(),
      amount_in_cents: props.route.params.quotation[0].total_detalle.total + props.route.params.quotation[0].total_detalle_add.total + props.route.params.quotation[0].amount_surgery,
      payment_concept: `${props.route.params.quotation[0].solicitud[0].name_ingles_sub}`,
      payment_method: {
        "type": "CARD",
      }
    })
  }

  async function OpenSetTravellers() {
    console.log("TRAVELS")
  }

  function CountAdult(type) {
    if (type) {
      setCountAdults(CountAdults + 1)
    } else {

      if ((CountAdults - 1) > 0) {
        setCountAdults(CountAdults - 1)
      } else {
        setCountAdults(0)
      }
    }
  }

  function CountYoungs(type) {
    if (type) {
      setCountYoung(CountYoung + 1)
    } else {

      if ((CountYoung - 1) > 0) {
        setCountYoung(CountYoung - 1)
      } else {
        setCountYoung(0)
      }
    }
  }

  function CountChilds(type) {
    if (type) {
      setCountChild(CountChild + 1)
    } else {
      if ((CountChild - 1) > 0) {
        setCountChild(CountChild - 1)
      } else {
        setCountChild(0)
      }
    }
  }

  function CountBabys(type) {
    if (type) {
      setCountBaby(CountBaby + 1)
    } else {
      if ((CountBaby - 1) > 0) {
        setCountBaby(CountBaby - 1)
      } else {
        setCountBaby(0)
      }
    }
  }

  const SearchAirport = async (keywords) => {
    console.log(keywords)
    setNameAirportDeparture(keywords)
    console.log(base_url(serverAmadeus, `airports/${keywords}`))
    setLoad(true)
    await axios.get(base_url(serverAmadeus, `airports/${keywords}`)).then(function (response) {
      console.log(response.data)
      setListAirport(response.data)
      setLoad(false)
    })
      .catch(function (error) {
        console.log(error)
        setLoad(false)
      })
      .then(function () { });
  }

  const SearchAirportDestination = async (keywords) => {
    console.log(keywords)
    setNameDestination(keywords)
    console.log(base_url(serverAmadeus, `airports/${keywords}`))
    setLoad(true)
    await axios.get(base_url(serverAmadeus, `airports/${keywords}`)).then(function (response) {
      console.log(response.data)
      setListAirport(response.data)
      setLoad(false)
    })
      .catch(function (error) {
        console.log(error)
        setLoad(false)
      })
      .then(function () { });
  }



  function RangeGet(data) {
    console.log("rango obtenido")
    console.log("init: ", data[0])
    console.log("end: ", data[1])
  }

  function RangeCancel() {
    setrangeDate(false)
  }



  console.log("rangeDate: ", rangeDate)
  return (
    <View style={stylesFligth.container}>
      <Head props={props} />
      <ScrollView style={{ width: "100%", paddingHorizontal: 20, marginBottom: 100 }}>



        <View style={{ padding: 5, marginVertical: 10, flexDirection: "row", justifyContent: "space-around", backgroundColor: "white" }}>
          {
            FlyType.map((i, key) => {
              return (
                <TouchableOpacity onPress={() => setFlyTypeActivated(i.text)}
                  style={{
                    color: FlyTypeActivated === i.text ? "#00afe8" : "#ccc",
                    alignItems: "center"
                  }}>
                  <Icon name={FlyTypeActivated === i.text ? 'checkmark-circle-2-outline' : 'radio-button-off-outline'} width={20} height={20} fill={FlyTypeActivated === i.text ? "#00afe8" : "#ccc"} />
                  <Text style={{ color: FlyTypeActivated === i.text ? "#00afe8" : "#ccc" }}>{i.text}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>



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



        <View style={{ ...stylesFligth.Input, borderTopEndRadius: 10, borderTopStartRadius: 10 }} >
          <View style={{ position: "absolute", left: 10, top: 12, width: 30, borderBottomColor: "black", borderBottomWidth: 1 }}>
            <Image style={stylesFligth.Plane} source={require("../../../images/AVION-1.png")} />
          </View>
          <TextInput
            style={{ ...stylesFligth.inputText }}
            placeholder="Enter a city or airport"
            placeholderTextColor="#333"
            onFocus={() => setFocusDeparture(true)}
            onChangeText={text => SearchAirport(text)}
            value={NameAirportDeparture != "" ? NameAirportDeparture : ''}
          />
        </View>




        <View style={{ ...stylesFligth.Input, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }} >
          <View style={{ position: "absolute", left: 10, top: 12, width: 30, borderBottomColor: "black", borderBottomWidth: 1 }}>
            <Image style={stylesFligth.Plane} source={require("../../../images/AVION-2.png")} />
          </View>
          <TextInput
            style={{ ...stylesFligth.inputText }}
            placeholder="Enter a city or airport"
            placeholderTextColor="#333"
            onFocus={() => setFocusDestination(true)}
            onChangeText={text => SearchAirportDestination(text)}
            value={NameDestination != "" ? NameDestination : ''}
          />
        </View>




        {
          FocusDeparture &&
          <View style={stylesFligth.ListDeparture}>
            <Text>List of airports</Text>
            {Load &&
              <ActivityIndicator size="large" color={colorPrimary} />
            }
            {!Load && ListAirport.length > 0 &&
              ListAirport.map((item, key) => {
                return <TouchableOpacity style={stylesFligth.ListDepartureContent} onPress={() => SelectDeparture(item.name, item.iataCode)} >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image style={{ ...stylesFligth.Plane, width: 20, height: 20 }} ource={require("../../../images/flight.png")} />
                      <View>
                        <Text style={stylesFligth.ListDepartureTitle}>{item.name}</Text>
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
          <View style={stylesFligth.ListDeparture}>
            <Text>List of airports</Text>
            {Load &&
              <ActivityIndicator size="large" color={colorPrimary} />
            }
            {!Load && ListAirport.length > 0 &&
              ListAirport.map((item, key) => {
                return <TouchableOpacity style={stylesFligth.ListDepartureContent} onPress={() => SelectDestination(item.name, item.iataCode)} >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image style={{ ...stylesFligth.Plane, width: 20, height: 20 }}
                        source={require("../../../images/flight.png")}
                      />
                      <View>
                        <Text style={stylesFligth.ListDepartureTitle}>{item.name}</Text>
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




        {/* {ShowCalendar &&
          <DatepickerRange
            startDate='13052017'
            untilDate='26062017'
            showReset={false}
            onConfirm={(startDate, untilDate) => setDate(startDate, untilDate)}
            onSelect={(startDate, untilDate) => setDate(startDate, untilDate)}
            onClose={() => setShowCalendar(false)}
            infoContainerStyle={{ marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end' }}
          />
        } */}
        {/* <TouchableOpacity onPress={() => setShowCalendar(true)} style={{ ...stylesFligth.Buttons, padding: 12, marginTop: 16, backgroundColor: "#fff", width: "100%" }}   >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name='calendar' width={24} height={24} fill={TextColor} />
            <Text style={{ marginLeft: 12 }}>{DateDeparture} - {DateDestination}</Text>
          </View>
        </TouchableOpacity> */}








        <TouchableOpacity onPress={() => setrangeDate(true)} style={{ ...stylesFligth.Buttons, padding: 12, marginTop: 16, backgroundColor: "#fff", width: "100%" }}   >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name='calendar' width={24} height={24} fill={TextColor} />
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
          <TouchableOpacity style={stylesFligth.Buttons} onPress={() => setModalVisible(true)} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name='person' width={24} height={24} fill={TextColor} />
              <Text style={{ marginLeft: 12 }}>{CountAdults + CountBaby + CountChild + CountYoung} Viajeros</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={stylesFligth.Buttons} onPress={() => OpenActionShet()}  >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name='bookmark' width={24} height={24} fill={TextColor} />
              <Text style={{ marginLeft: 12 }}>{Rate}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ ...stylesFligth.BtnPrimary, alignSelf: "center", marginTop: 20 }} onPress={() => goToScreen("ListFlights")}>
          <Text style={{ ...stylesFligth.loginText, color: "white" }}>Search Flights</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false) }}>
        <View style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "100%",
          height: "100%",
          justifyContent: 'center',
          alignItems: 'center',
          position: "absolute",
          zIndex: 999
        }}>
          <View style={{ padding: 10, width: "90%", height: 300, backgroundColor: "white", borderRadius: 12 }}>
            <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 10 }}>
              <View>
                <Text>
                  <Text style={{ fontSize: 17, color: TextColor, marginRight: 100 }}>Adults </Text>
                  <Text style={{ fontSize: 12, color: "#aaa" }}>over 18 years</Text>
                </Text>
              </View>
              <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                  onPress={() => { CountAdult(false); }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                  </Text>
                </TouchableHighlight>
                <Text style={{ marginTop: 7, fontWeight: "bold", color: TextColor, fontSize: 17 }}>
                  {CountAdults}
                </Text>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: colorPrimary, marginTop: 10 }}
                  onPress={() => { CountAdult(true); }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    <Icon name='plus' width={15} height={15} fill={"white"} />
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#eee", borderBottomWidth: 1, paddingBottom: 10 }}>
              <View>
                <Text>
                  <Text style={{ fontSize: 17, color: TextColor, marginRight: 100 }}>Young </Text>
                  <Text style={{ fontSize: 12, color: "#aaa" }}>12 - 17</Text>
                </Text>
              </View>
              <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                  onPress={() => { CountYoungs(false); }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                  </Text>
                </TouchableHighlight>
                <Text style={{ marginTop: 7, fontWeight: "bold", color: TextColor, fontSize: 17 }}>
                  {CountYoung}
                </Text>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: colorPrimary, marginTop: 10 }}
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
                  <Text style={{ fontSize: 17, color: TextColor, marginRight: 100 }}>Child </Text>
                  <Text style={{ fontSize: 12, color: "#aaa" }}>2 - 11</Text>
                </Text>
              </View>
              <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                  onPress={() => { CountChilds(false); }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                  </Text>
                </TouchableHighlight>
                <Text style={{ marginTop: 7, fontWeight: "bold", color: TextColor, fontSize: 17 }}>
                  {CountChild}
                </Text>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: colorPrimary, marginTop: 10 }}
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
                  <Text style={{ fontSize: 17, color: TextColor, marginRight: 100 }}>Baby </Text>
                  <Text style={{ fontSize: 12, color: "#aaa" }}>less than 2</Text>
                </Text>
              </View>
              <View style={{ width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: "#eee", marginTop: 10 }}
                  onPress={() => { CountBabys(false); }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    <Icon name='minus' width={15} height={15} fill={"#aaa"} />
                  </Text>
                </TouchableHighlight>
                <Text style={{ marginTop: 7, fontWeight: "bold", color: TextColor, fontSize: 17 }}>
                  {CountBaby}
                </Text>
                <TouchableHighlight
                  style={{ ...stylesFligth.ButtonPlusMinus, backgroundColor: colorPrimary, marginTop: 10 }}
                  onPress={() => { CountBabys(true); }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    <Icon name='plus' width={15} height={15} fill={"white"} />
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <TouchableOpacity style={{ ...stylesFligth.BtnPrimary, alignSelf: "center", marginTop: 20 }} onPress={() => setModalVisible(false)}>
              <Text style={{ ...stylesFligth.loginText, color: "white" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Vuelos;
const stylesFligth = StyleSheet.create({
  Input: {
    backgroundColor: "#fff",//"#e6ebef",
    marginBottom: 2
  },
  inputText: {
    paddingLeft: 50
  },
  Plane: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  Buttons: {
    backgroundColor: "white",
    padding: 14,
    width: "40%",
    borderRadius: 10,
    marginBottom: 10
  },
  ListDeparture: {
    backgroundColor: "white",
    height: "100%",
    padding: 10
  },
  ListDepartureContent: {
    marginTop: 10,
    marginBottom: 20
  },
  ListDepartureTitle: {
    fontWeight: "bold",
    fontSize: 16
  },
  modalView: {
    padding: 0,
    alignItems: "center",
    backgroundColor: 'white',
    height: "100%",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  ButtonPlusMinus: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5
  }
});