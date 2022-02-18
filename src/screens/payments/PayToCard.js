import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,

  Alert,
  Linking,
  Picker,
  ActionSheetIOS,
  Button,
  Modal
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { currencyFormat } from '../../components/Logic.js';

import UserContext from '../../../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';

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


//import CheckBox from '@react-native-community/checkbox';


// import { serverQa, base_url, token_wompi, ApiWompi } from '../Env'
// import axios from 'axios'
// import Menu from '../components/Menu';















function PayToCard(props) {
  const { navigation } = props
  const userDetails = useContext(UserContext).userDetails;

  const { t, i18n } = useTranslation(); //variables de lenguajes
  const [vertical, setvertical] = useState(false); // abre menu vertical lateral derecho

  const data = props.route.params.data // monto, tipo de moneda
  const [Error, setError] = useState(false) // estado de error false
  const [Terminos, setTerminos] = useState("#") //url de los terminos y condiciones de uso de la plataforma de pago
  const [mssg, setmssg] = useState("");

  const [iAcceptTerminos, setiAcceptTerminos] = useState(false);
  const [MonthExpiredCard, setMonthExpiredCard] = useState("")
  const [YearExpiredCard, setYearExpiredCard] = useState("")
  const [CvcCard, setCvcCard] = useState("")
  const [NumberCard, setNumberCard] = useState("")
  const [NameCard, setNameCard] = useState("")


  //const [modal, setmodal] = useState(true); //estado del modal para todos
  // const [requesting, setRequesting] = useState(false)
  // const [acceptance_token, setacceptance_token] = useState(false)
  // const [ShowInstructions, setShowInstructions] = useState(false)





  let randomCode;
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = Math.random() }




  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const link = await Linking.canOpenURL(url);
      if (link) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <Text style={{ fontWeight: "bold" }} onPress={handlePress}> {children} </Text>;
  };



  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }
















  /*
    const onPressCardMonth = () =>
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: optionsMonth,
        },
        buttonIndex => {
          setMonthExpiredCard(optionsMonth[buttonIndex])
        }
      );
  */


  //

  /*
  const onPressCardYear = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: optionsYear,
      },
      buttonIndex => {
        setYearExpiredCard(optionsYear[buttonIndex])
      }
    );
*/

  /*
    useEffect(() => {
      axios.get(`${ApiWompi}merchants/${token_wompi}`).then(function (response) {
        const acceptance_token = response.data.data.presigned_acceptance.acceptance_token
        setacceptance_token(acceptance_token)
        setTerminos(response.data.data.presigned_acceptance.permalink)
      })
        .catch(function (error) {
          console.log('Error al enviar formulario')
          console.log(error);
          console.log(error.response);
        })
        .then(function () {
        });
    }, [randomCode])
  */














  function goToPay() {


    if (
      !iAcceptTerminos
      // MonthExpiredCard === "" &&
      // YearExpiredCard === "" &&
      // CvcCard === "" &&
      // NumberCard === "" &&
      // NameCard === ""
    ) {
      setmssg("debes completar el formulario")
      setError(true)
    }
    else {



      // amount_in_cents: props.route.params.amount_in_cents,
      // payment_concept: props.route.params.payment_concept,
      // payment_method: payment_method,
      // acceptance_token: acceptance_token,
      // id_fee: props.route.params.id_fee


      // const payment_method = {
      //   "type": props.route.params.payment_method.type,
      //   "phone_number": NumberPhone
      // }


      const DATA = {
        id_client:userDetails.id,
        total_invoice:  data.total,
        method_pay: "card credit",
        reference_pay: "123abc",
        status: 1,
        coin: data.coin,
      }

      goToScreen("PaymentSummary",DATA)
      //setmodal(true)

    }

    // const [iAcceptTerminos, setiAcceptTerminos] = useState(false);
    // const [MonthExpiredCard, setMonthExpiredCard] = useState("")
    // const [YearExpiredCard, setYearExpiredCard] = useState("")
    // const [CvcCard, setCvcCard] = useState("")
    // const [NumberCard, setNumberCard] = useState("")
    // const [NameCard, setNameCard] = useState("")


    // const userDetails = useContext(UserContext).userDetails;

    // const data = props.route.params.data // monto, tipo de moneda
    // const [Error, setError] = useState(false) // estado de error false
    // const [Terminos, setTerminos] = useState("#") //url de los terminos y condiciones de uso de la plataforma de p




    // if (!isSelected) {
    //   Toast.show("Debes aceptar los terminos y condiciones")
    //   return false;
    // }


    // setRequesting(true)
    // let config = {
    //   headers: {
    //     "Authorization": `Bearer ${token_wompi}`,
    //   }
    // }


    // const data_card = {
    //   "number": NumberCard,
    //   "cvc": CvcCard,
    //   "exp_month": MonthExpiredCard,
    //   "exp_year": YearExpiredCard,
    //   "card_holder": NameCard
    // }

    // axios.post(`${ApiWompi}/tokens/cards`, data_card, config).then(function (response) {
    //   setRequesting(false)
    //   const token_card = response.data.data.id
    //   const payment_method = {
    //     "type": props.route.params.payment_method.type,
    //     "token": token_card,
    //     "installments": 1,
    //   }

    //   console.log(response.data.data.id, "Token Tarjeta")
    //   setError(false)
    //   let from = "PayToCard";
    //   navigation.navigate("PaymentSummary", {
    //     randomCode: Math.random(),
    //     amount_in_cents: props.route.params.amount_in_cents,
    //     payment_concept: props.route.params.payment_concept,
    //     payment_method: payment_method,
    //     data_card,
    //     acceptance_token: acceptance_token,
    //     id_fee: props.route.params.id_fee
    //   })

    //   goToScreen("PaymentSummary", from)
    //   /*
    //   setUserDetails({
    //       ...userDetails,
    //       acceptance_token
    //   })*/
    // }).catch(function (error) {
    //   console.log('Error al enviar formulario')
    //   //   console.log(error);
    //   console.log(error.response, "EL ERROR");
    //   setRequesting(false)
    //   setError(true)
    // }).then(function () {
    // });
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_white} barStyle="dark-content" />

      <SimpleAlert
        init={Error}
        time={5000}  //milisecunds
        icon={"alert-triangle-outline"}     //by 'react-native-eva-icons'
        text={mssg}     //string
        change={setError} //setstate return !props.init
        float={"top"} //top - bottom,
        theme={"danger"} //warning - danger - success
      />

      <View style={styles.head}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.btn} onPress={() => props.navigation.goBack()}>
            <Icon name={'arrow-ios-back-outline'} width={25} height={25} fill={"black"} />
          </TouchableOpacity>
          <Text style={styles.title}>Pay card</Text>
          <TouchableOpacity style={styles.btn} onPress={() => setvertical(true)}>
            <Icon name={'more-vertical'} width={25} height={25} fill={"black"} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 14, color: color_grey_half }}>Paga tu pedido desde wellezy, fácil, rapido y seguro.</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: color_fifth }}>{currencyFormat(data.coin, data.total)}</Text>
        </View>
      </View>

      <ScrollView scrollEventThrottle={16}>
        <View style={styles.card}>

          <View style={styles.contentAcceptCard}>
            <Text style={styles.contentAcceptCardText} >ACEPTAMOS</Text>
            <Image style={{ width: 50, height: 50, resizeMode: "contain", }} source={require('../../images/methodpay/mastercard.png')} />
            <Image style={{ width: 50, height: 50, resizeMode: "contain", }} source={require('../../images/methodpay/visa.png')} />
            <Image style={{ width: 50, height: 50, resizeMode: "contain", }} source={require('../../images/methodpay/american.png')} />
          </View>

          <View style={styles.inputView} >
            <Text style={styles.inputViewText}>NÚMERO DE LA TARJETA</Text>
            <TextInput
              style={styles.inputText}
              placeholder="EJ: 5524881234123456"
              placeholderTextColor="#777"
              onChangeText={text => setNumberCard(text)}
              keyboardType={'numeric'}
              value={NumberCard}
            />
          </View>

          <View style={styles.inputView} >
            <Text style={styles.inputViewText}>NOMBRE DEL TARJETAHABIENTE</Text>
            <TextInput
              style={styles.inputText}
              placeholder="EJ: Aaron Navas"
              placeholderTextColor="#777"
              onChangeText={text => setNameCard(text)}
              value={NameCard}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <SelectMonth value={MonthExpiredCard} get={setMonthExpiredCard} />
            <SelectYear value={YearExpiredCard} get={setYearExpiredCard} />
            <SelectCODE value={CvcCard} get={setCvcCard} />
            <ShowInfo />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={() => setiAcceptTerminos(!iAcceptTerminos)}>
              <Icon name={iAcceptTerminos ? 'checkmark-circle-2-outline' : 'radio-button-off-outline'} width={30} height={30} fill={iAcceptTerminos ? color_fifth : color_grey_half} />
            </TouchableOpacity>
            <Text style={{ width: "80%", textAlign: "justify", margin: 8, fontSize: 14, color: color_grey_dark, lineHeight: 20 }}>
              Acepto haber leído los <OpenURLButton url={Terminos}>Términos y Condiciones y la Política de Privacidad</OpenURLButton> para hacer esta compra.
            </Text>
          </View>

        </View>
      </ScrollView>

      <View style={styles.foot}>
        <TouchableOpacity style={styles.btnPay} onPress={() => goToPay()}>
          <Text style={styles.btnPayText}>Pay</Text>
        </TouchableOpacity>
      </View>

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
export default PayToCard;



const SelectMonth = (props) => {
  const [open, setopen] = useState(false);
  const [mounths, setmounths] = useState([]);
  function build() {
    let count = []
    for (var i = 0; i < 12; i++) {
      count.push(i + 1)
    }
    setmounths(count)
  }
  useEffect(() => {
    if (open === true && mounths.length === 0) {
      build()
    }
  }, [open]);
  return (
    <View style={{ marginRight: 1, width: "28%" }}>
      <TouchableOpacity onPress={() => setopen(true)} style={{
        backgroundColor: "#eee",
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: color_primary
      }}>
        <Text style={{
          textAlign: "center",
          fontSize: 14,
          lineHeight: 50,
          color: "#777",
        }}>{props.value === "" ? "mounth" : props.value}</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={open} >
        <View style={styles.modalShadow}>
          <View style={styles.modalWrap}>
            <View style={styles.modalWrapHead}>
              <Text style={{ color: color_white }}>select mounth</Text>
              <TouchableOpacity onPress={() => setopen(false)}>
                <Icon name={'close'} width={25} height={25} fill={"white"} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalWrapBody}>
              <ScrollView scrollEventThrottle={16}>
                {mounths.length !== 0 && mounths.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => [props.get(i), setopen(false)]} style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 5, borderBottomColor: color_grey_light, borderBottomWidth: 0.5 }}>
                      <Text style={{ color: color_grey_dark }}>{i}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            {/* <View style={styles.modalWrapFoot}></View> */}
          </View>
        </View>
      </Modal>
    </View>
  )
}


const SelectYear = (props) => {
  const [open, setopen] = useState(false);
  const [years, setyears] = useState([]);
  function build() {
    let count = []
    const toDay = new Date();
    const yearCurrent = toDay.getFullYear()
    const minYear = yearCurrent - 10
    const maxYear = yearCurrent + 11
    for (var i = minYear; i < maxYear; i++) {
      count.push(i)
    }
    setyears(count)
  }
  useEffect(() => {
    if (open === true && years.length === 0) {
      build()
    }
  }, [open]);
  return (
    <View style={{ marginRight: 1, width: "28%" }}>
      <TouchableOpacity onPress={() => setopen(true)} style={{
        backgroundColor: "#eee",
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: color_primary
      }}>
        <Text style={{
          textAlign: "center",
          fontSize: 14,
          lineHeight: 50,
          color: "#777",
        }}>{props.value === "" ? "year" : props.value}</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={open} >
        <View style={styles.modalShadow}>
          <View style={styles.modalWrap}>
            <View style={styles.modalWrapHead}>
              <Text style={{ color: color_white }}>select year</Text>
              <TouchableOpacity onPress={() => setopen(false)}>
                <Icon name={'close'} width={25} height={25} fill={"white"} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalWrapBody}>
              <ScrollView scrollEventThrottle={16}>
                {years.length !== 0 && years.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => [props.get(i), setopen(false)]} style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 5, borderBottomColor: color_grey_light, borderBottomWidth: 0.5 }}>
                      <Text style={{ color: color_grey_dark }}>{i}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            {/* <View style={styles.modalWrapFoot}></View> */}
          </View>
        </View>
      </Modal>
    </View>
  )
}


const SelectCODE = (props) => {
  return (
    <View style={styles.inputComponent}>
      <TextInput
        value={props.value}
        onChangeText={text => props.get(text)}
        style={{ ...styles.inputText, textAlign: "center" }}
        placeholder="CVC"
        placeholderTextColor="#777"
        maxLength={4}
        keyboardType={'numeric'}
      />
    </View>
  )
}




const ShowInfo = () => {
  const [open, setopen] = useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.infoBtn} onPress={() => setopen(true)}>
        <Text style={styles.infoBtnText}>?</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={open} >
        <View style={styles.modalShadow}>
          <View style={styles.modalWrap}>
            {/* <View style={styles.modalWrapHead}></View> */}
            <View style={styles.modalWrapBody}>
              <Text style={{ textAlign: "center", marginBottom: 10, color: color_grey_dark, lineHeight: 18 }}>
                Puedes encontrar el código de seguridad (3 dígitos) en <Text style={styles.bold} >el reverso</Text> de tu tarjeta.
              </Text>
              <Text style={{ textAlign: "center", marginBottom: 10, color: color_grey_dark, lineHeight: 18 }}>
                ¿Tienes American Express? Encontrarás el código de seguridad (4 dígitos) en el <Text style={styles.bold} >frente</Text> de tu tarjeta.
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Image style={{ resizeMode: "contain", width: 120 }} source={require('../../images/methodpay/card_atras.png')} />
                <Image style={{ resizeMode: "contain", width: 120 }} source={require('../../images/methodpay/card_frente.png')} />
              </View>
            </View>
            <View style={styles.modalWrapFoot}>
              <TouchableOpacity style={{ width: "60%", backgroundColor: color_fifth, borderRadius: 8, padding: 10, alignItems: "center", justifyContent: "center", }} onPress={() => setopen(false)}   >
                <Text style={{ color: color_white, fontSize: 16, fontWeight: "bold" }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}


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
    alignItems:"center",
    justifyContent:"center",
    width: "100%",
    padding: 5
  },
  inputComponent: {
    backgroundColor: "#eee",
    width: "30%",
    borderBottomWidth: 1,
    borderBottomColor: color_primary
  },
  inputText: {
    height: 49,
    width: "100%",
    lineHeight: 25,
    fontSize: 14,
    color: "#777",
    backgroundColor: "#eee",
    paddingLeft: 10,
  },
  modalWrapFoot: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderTopColor: color_grey_half,
    borderTopWidth: 0.5
  },
  head: {
    backgroundColor: color_white,
    flexDirection: "column",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 20
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    lineHeight: 40
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
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
    color: color_grey_half,
    fontSize: 12,
  },
  inputView: {
    width: "100%",
    borderBottomColor: color_fifth,
    borderBottomWidth: 1,
    justifyContent: "center",
    paddingStart: 0,
    marginBottom: 20
  },
  inputViewText: {
    color: color_grey_dark,
    fontWeight: "bold",
    fontSize: 14,
  },
  foot: {
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    flexDirection: "column",
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  btnPay: {
    backgroundColor: color_fifth,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: "80%"
  },
  btnPayText: {
    textAlign: "center",
    color: color_white,
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "bold"
  },
  infoBtn: {
    marginLeft: 2,
    backgroundColor: "#3f4a56",
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  infoBtnText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
})