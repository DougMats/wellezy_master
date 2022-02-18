import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert, Picker, ActionSheetIOS, Button, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { currencyFormat } from '../../components/Logic.js';
import UserContext from '../../../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';
import { cartShop } from '../../services/connection.js';
import MenuVertical from '../../components/generic/MenuVertical.js';
import SimpleAlert from '../../components/alerts/SimpleAlert.js'

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
} from '../../styles/Colors.js';


// import axios from 'axios'
// import Menu from '../components/Menu';
// import { Api, serverQa, base_url, token_wompi, ApiWompi } from '../Env'

function PaymentSumamary(props) {

  const { t, i18n } = useTranslation(); //variables de lenguajes
  const userDetails = useContext(UserContext).userDetails;
  const [Load, setLoad] = useState(false);

  const data = props.route.params.data


  const [success, setsuccess] = useState(false);
  const [IdTransaction, setIdTransaction] = useState()
  const [RefferedPay, setRefferedPay] = useState();



  async function GotoPay() {
    // const data = {
    //   id_client: null,
    //   total_invoice: null,
    //   method_pay: null,
    //   reference_pay: null,
    //   status: null,
    //   coin: null
    // }


    setLoad(true)
    const res = await cartShop.savePayment(data)
    if (res) {
      setLoad(false)
      setsuccess(true)
    }
    else {
      console.log("error")
    }


  }




  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  //console.log("--------->", props.route.params.data)


  //   {
  //     "coin": "$",
  //   "id_client": 1,
  //   "method_pay": "card credit",
  //   "reference_pay": "123abc",
  //   "status": 1,
  //   "total_invoice": 52.5
  // }
function finish(){


  props.navigation.goBack()
}



  return (
    <SafeAreaView style={{ backgroundColor: color_screen, flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <View><Text style={styles.tittleHeader}>Resumen del pago</Text></View>
        <View><Text style={styles.SubtittleHeader}>Confirma y procesa tu pago de {props.route.params.reference_pay}.</Text></View>
        <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{currencyFormat(props.route.params.data.coin, props.route.params.data.total_invoice)}</Text></Text></View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>

          <Text style={styles.card_item}><Text style={styles.card_item_bold}>Concepto: </Text>{props.route.params.reference_pay}</Text>
          <Text style={styles.card_item}><Text style={styles.card_item_bold}>Referencia: </Text>{/*RefferedPay*/}</Text>
          <Text style={styles.card_item}><Text style={styles.card_item_bold}>Monto: </Text>{currencyFormat(props.route.params.data.coin, props.route.params.data.total_invoice)}</Text>








{/* 

          <TouchableOpacity style={styles.footBtn} onPress={() => finish()}   >
                <Text style={styles.footBtnTest}>Finalizar</Text>
              </TouchableOpacity> */}


          <TouchableOpacity style={styles.loginBtn} onPress={() => GotoPay()}>
            <Text style={styles.loginText}>Pagar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={() => props.navigation.goBack()}>
            <Text style={styles.loginText}>Volver</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>









      {/* <Modal animationType="slide" transparent={true} visible={open} >
        <View style={styles.modalShadow}>
          <View style={styles.modalWrap}>
            <View style={styles.modalWrapHead}></View>
            <View style={styles.modalWrapBody}></View>
            <View style={styles.modalWrapFoot}></View>
          </View>
        </View>
      </Modal> */}





      <Modal animationType="slide" transparent={true} visible={Load} >
        <View style={styles.modalShadow}>
          <View style={styles.modalWrap}>
            <ActivityIndicator color={color_primary} size={40} />
            <Text style={{}}>Estamos procesando tu pago . . .</Text>

            {/*
            <View style={styles.modalWrapHead}></View>
            <View style={styles.modalWrapBody}></View>
            <View style={styles.modalWrapFoot}></View>
            */}
          </View>
        </View>
      </Modal>


      <Modal animationType="slide" transparent={true} visible={success} >
        <View style={styles.modalShadow}>
          <View style={styles.modalWrap}>
            {/* <View style={styles.modalWrapHead}></View> */}
           
            <View style={styles.modalWrapBody}>
              <Icon name='checkmark-circle-2-outline' width={200} height={200} fill='#2ECC71' />
              <Text style={styles.title_succesfull} >Transacción APROBADA</Text>
              <Text style={styles.title}>Información de la transacción</Text>
              <Text style={styles.item_succesfull}>Transacción</Text>
              <Text style={styles.item_succesfull_bold}>{IdTransaction}.........</Text>
              <Text style={styles.item_succesfull}>Referencia</Text>
              <Text style={styles.item_succesfull_bold}>{RefferedPay}..........</Text>
             <Text style={styles.title} >Información del pagador</Text>
              <Text style={styles.item_succesfull}>Nombre</Text>
              <Text style={styles.item_succesfull_bold}>{userDetails.name}</Text>
              <Text style={styles.item_succesfull}>Email</Text>
              <Text style={styles.item_succesfull_bold}>{userDetails.email}.......</Text>
            </View>

            <View style={styles.modalWrapFoot}>
              <TouchableOpacity style={styles.footBtn} onPress={() => finish()}>
                <Text style={styles.footBtnTest}>Finalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>





    </SafeAreaView>
  )
}


//   console.log("value monto: ", props.route.params.amount_in_cents)
//   const userDetails = useContext(UserContext)
//   const { setUserDetails } = useContext(UserContext)
//   const [requesting, setRequesting] = useState(false)
//   const [requestingNequi, setRequestingNequi] = useState(false)
//   const [PaySuccess, setPaySuccess] = useState(false)
//   const [PayDeclined, setPayDeclined] = useState(false)
//   const [MessageError, setMessageError] = useState(false)

//   const [Car, setCar] = useState()

//   const { navigation } = props

//   let randomCode
//   if (props) {
//     randomCode = props.route.params.randomCode
//     //randomCode = Math.random()
//   } else {
//     randomCode = Math.random()
//   }



//   function goToScreen(screen) {
//     setPayDeclined(false)
//     navigation.navigate(screen, { randomCode: Math.random() })
//   }
// console.log("from: ", props.route.params.from)
//   function goToScreenBack(){
//     let screen = props.route.params.from
//        navigation.navigate(screen, { randomCode: Math.random() })
//         console.log("back: ", screen)
//       }
//   useEffect(() => {
//     setRequesting(false)
//     setRequestingNequi(false)
//     setPaySuccess(false)
//     setPayDeclined(false)
//     setMessageError(false)
//     setRefferedPay(`${props.route.params.payment_concept}-${Math.floor(Math.random() * 999999999)}`)
//     console.log(props.route.params.id_fee, "FEE")
//   }, [randomCode])
//   function GotoPay() {
//     // console.log(userDetails, "USER DETAILS")
//     // return false
//     const data = {
//       "acceptance_token": props.route.params.acceptance_token,
//       "amount_in_cents": props.route.params.amount_in_cents * 100,
//       //"amount_in_cents"  : 15883100,
//       "currency": "COP",
//       "customer_email": userDetails.email,
//       "payment_method": props.route.params.payment_method,
//       "reference": RefferedPay
//     }
//     console.log(props.route.params.acceptance_token)
//     const config = {
//       headers: {
//         "Authorization": `Bearer ${token_wompi}`,
//       }
//     }
//     if (props.route.params.payment_method.type == "NEQUI") {
//       setRequestingNequi(true)
//     } else {
//       setRequesting(true)
//     }
//     axios.post(`${ApiWompi}/transactions`, data, config).then(function (response) {
//       console.log(response.data.data, "PAGO EXISTOSO")
//       console.log(response.data.data.id, "ID DE TRANSACCION")
//       setIdTransaction(response.data.data.id)
//     }).catch(function (error) {
//       setRequestingNequi(false)
//       setRequesting(false)
//       console.log('Error al enviar formulario2')
//       //console.log(error);
//       console.log(error.response, "EL ERROR2");
//       setMessageError("Error en al transaccion")
//     }).then(function () {
//     });
//     // console.log(data, "DATA PAY")
//   }

//   function verifyTransaction() {
//     console.log("EJECUTANDO VERIFICACION")
//     console.log(`${ApiWompi}transactions/${IdTransaction}`)
//     axios.get(`${ApiWompi}transactions/${IdTransaction}`).then(function (response) {
//       console.log(response.data.data.status, "STATUS")
//       if (response.data.data.status == "PENDING") {
//         verifyTransaction()
//       } else {
//         if (response.data.data.status == "APPROVED") {
//           console.log(response.data.data.status, "STATUS DE TRANSACCION")
//           saveDataStudyCredit()
//           setPaySuccess(true)
//           setRequesting(false)
//           setRequestingNequi(false)
//         } else {
//           setPayDeclined(true)
//           setRequesting(false)
//           setRequestingNequi(false)
//           setMessageError(response.data.data.status_message)
//         }
//       }

//     }).catch(function (error) {
//       console.log('Error al enviar formulariossssssssssssss')
//       console.log(error);
//       console.log(error.response, "EL ERRORsssssss");
//     }).then(function () {
//     });
//   }

//   useEffect(() => {
//     async function Get() {
//       //const car = await getCar(userDetails.id)
//       const car = JSON.parse(await AsyncStorage.getItem('carrito'))
//       setCar(car.data)
//     }
//     Get()
//   }, [randomCode])

//   function saveDataStudyCredit() {
//     console.log("exito guardando la data")
//     console.log("nuevo pedido")
//     let status = "Pendiente"
//     let newPedido = {
//       "id_client": userDetails.id_cliente,
//       "total_invoice": props.route.params.amount_in_cents, // * 100
//       "method_pay": props.route.params.payment_method.type,
//       "reference_pay": RefferedPay,
//       "status": status,
//       "products": Car
//     }
//     console.log("**** datos enviados para crear nuevo pedido")
//     console.log(newPedido)
//     axios.post(base_url(Api, `order`), newPedido).then(function (response) {
//       console.log("orden creada con exito")
//       console.log("destroy local car")
//       //deleteCar(userDetails.id)
//     })
//       .catch(function (error) {
//         console.log("this my error ")
//         console.log(error.response.data)
//       })
//       .then(function () { });
//   }

//   async function test() {
//     console.log("test")
//     try {
//       // await AsyncStorage.removeItem('carrito'); // aqui se supone que borar el local storage
//       let data = {
//         "data": [],
//         "total": "0,00",
//         "total_pay": 0
//       }
//       await AsyncStorage.setItem('carrito', JSON.stringify(data))
//       await goToScreen("Mypurchases")
//     } catch (error) {
//     }
//   }

//   useEffect(() => {
//     verifyTransaction()
//   }, [IdTransaction])




//   if (requestingNequi) {
//     return (
//       <View style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1
//       }}>
//         <Loading color={primaryColor} />
//         <Text style={{
//           width: "80%",
//           lineHeight: 25,
//           fontSize: 19,
//           textAlign: "center"
//         }}>Por favor confirma la transacción en tu celular cuando te llege la <Text style={{ fontWeight: "bold" }}>Notificacion</Text>. Si no te ha llegado, verifica que tengas Nequi instalado en tu celular y que ya estés registrado</Text>
//       </View>)
//   }











//   if (PayDeclined) {
//     console.log("PayDeclined")
//     return (
//       <View style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//         backgroundColor: "white"
//       }}>
//         <View><Icon name='close-circle-outline' width={200} height={200} fill='#e34c4c' /></View>
//         <Text style={styles.title_succesfull} >Transacción DECLINADA</Text>
//         {MessageError &&
//           <Text>{MessageError}</Text>
//         }
//         <Text style={styles.title} >Información de la transacción</Text>
//         <Text style={styles.item_succesfull}>Transacción # <Text style={styles.item_succesfull_bold}>{IdTransaction}</Text></Text>
//         <Text style={styles.item_succesfull}>Referencia <Text style={styles.item_succesfull_bold}>{RefferedPay}</Text></Text>
//         <Text style={styles.item_succesfull}>Email <Text style={styles.item_succesfull_bold}>{userDetails.email}</Text> </Text>
//         <Text style={styles.title} >Información del pagador</Text>
//         <Text style={styles.item_succesfull}>Nombre <Text style={styles.item_succesfull_bold}>{userDetails.name}</Text></Text>
//         <TouchableOpacity style={styles.loginBtn} onPress={() => test()}   >
//           <Text style={styles.loginText}>Finalizar</Text>
//         </TouchableOpacity>
//       </View>)
//   }
//   function currencyFormat(num) {
//     return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
//   }





const styles = StyleSheet.create({


  modalShadow: {
    position: "absolute",
    zIndex: 999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center"
  },
  modalWrap: {
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "column",
    alignSelf: "center",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapHead: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: color_fifth
  },
  modalWrapBody: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 5
  },
  modalWrapFoot: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderTopColor: color_grey_half,
    borderTopWidth: 0.5
  },





  footBtn:{
    width:"80%",
    backgroundColor: color_fifth,
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:10,
    borderRadius:8
  },
  footBtnTest:{
    color: color_white,
    fontWeight:"bold",
    fontSize:14
  },




  header: {
    padding: 30,
    backgroundColor: 'white',
    paddingBottom: 20,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    width: "100%"
  },
  menu: {
    padding: 10,
    width: "100%",
    backgroundColor: 'white',
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    borderTopColor: "#ddd",
    borderTopWidth: 1
  },
  itemMenu: {
    alignItems: "center"
  },
  texMenu: {
    color: "#777"
  },
  texMenuActive: {
    color: "#f27072"
  },
  ItemsHeaderFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    height: "100%",
    backgroundColor: '#eee',
    flexDirection: "column"
    // backgroundColor: '#eee',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: "100%",
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: -20
  },
  profile: {
    width: 50,
    height: 50,
    marginTop: -10
  },
  tittleHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },
  SubtittleHeader: {
    color: '#777'
  },
  SubtittlePrice: {
    color: color_primary,
    fontSize: 20,
    marginTop: 10
  },
  Price: {
    fontWeight: "bold"
  },
  scrollView: {
    width: "90%",
    marginHorizontal: "5%",
    height: "100%",
    paddingTop: 80,
    marginTop: -80,
    zIndex: -2
    // marginTop : 1,
    // marginHorizontal: 90,
    // marginBottom: 80,
    // width : "90%",
    // height : "100%"
  },
  card: {
    color: '#777',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    width: "100%",
    borderRadius: 5,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
    // borderLeftColor: color_primary,
    // borderLeftWidth: 5
  },
  card_item: {
    padding: 7
  },
  card_item_bold: {
    fontWeight: "bold"
  },
  card_content_title: {
    width: "80%",
    justifyContent: "space-evenly"
  },
  loginBtn: {
    width: "100%",
    backgroundColor: color_primary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderLeftColor: color_fifth,
    borderLeftWidth: 15
  },
  loginText: {
    color: "white"
  },
  btnQuote: {
    width: "100%",
    backgroundColor: "#f27072",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  form: {
    width: "100%"
  },
  card_image_content: {
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    paddingRight: 10
  },
  selects_row: {
    flexDirection: "row",
  },
  select_month_content: {
    width: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f27072",
    backgroundColor: "#eee",
    marginRight: 20
  },
  select_month: {
    height: 40,
    color: "#777",
  },
  select_year_content: {
    width: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f27072",
    backgroundColor: "#eee"
  },
  select_year: {
    width: 100,
    height: 40,
    color: "#777",
  },
  Instrucciones: {
    padding: 10,
    marginTop: 15,
    backgroundColor: "#f2f9ff",
    borderRadius: 5,
    borderColor: "#bfe1ff",
    borderWidth: 1,
  },
  TextInstrucciones: {
    marginBottom: 10,
    color: "#3f4a56",
    lineHeight: 18
  },
  bold: {
    fontWeight: "bold"
  },
  contentImageCard: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ImageCard: {
    resizeMode: "contain",
    width: 120
  },
  contentAcceptCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7f9fa",
    borderColor: "#dfe6ee",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  contentAcceptCardText: {
    color: "#777",
    fontSize: 12
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color: "#777",
    lineHeight: 20
  },
  title_succesfull: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10
  },
  title: {
    fontWeight: "bold",
    color: color_fifth,
    padding: 5
  },




  item_succesfull: {
  backgroundColor:"red",
    //padding: 5
    textAlign:"left"
  },
  item_succesfull_bold: {
    backgroundColor:"yellow",
    fontWeight: "bold"
  }
});

export default PaymentSumamary;