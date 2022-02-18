import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Dimensions, ActivityIndicator, StyleSheet, ScrollView, Linking, TouchableOpacity, View, Image, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';

import { useTranslation } from 'react-i18next';
import { currencyFormat } from '../../components/Logic.js';
import _ from 'lodash';
import { file_server1 } from '../../../Env.js';
import MenuVertical from '../../components/generic/MenuVertical.js';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const WIDTH = windowWidth / 12

function CheckOut(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [data, setdata] = useState(props.route.params.data);
  const [totalPay, settotalPay] = useState(data.total)
  const [iAcceptTerms, setiAcceptTerms] = useState(false);
  const [iAcceptPorcent, setiAcceptPorcent] = useState(false);
  const [methodPay, setmethodPay] = useState(0);
  const [Load, setLoad] = useState(true);
  const porcentajeBancario = 5 // porcentaje agragado por gastos de transaccion

  const url = "https://www.youtube.com/watch?v=VEDVL-Z_JhM&t=868s";

  const metthoPayList = [
    { id: 1, route:"PayToCard", name: "Tarjetas de crédito/débito", logo: "card.png" },
    { id: 2, route:"PayToCard2", name: "PayPal", logo: "paypal.png" }
  ]



  useEffect(() => {
    let res = (porcentajeBancario / 100) * data.total
    if (iAcceptPorcent === true) {
      const value = res + data.total
      settotalPay(value)
    }
    else {
      if(totalPay>data.total){
        const value = totalPay - res
        settotalPay(value)
      }
    }
  }, [iAcceptPorcent]);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const link = await Linking.canOpenURL(url);
      if (!link) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <Text onPress={handlePress}> {children} </Text>;
  };

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }




function goToPay(){

const GoTo = _.find(metthoPayList, function(o) { return o.id === methodPay; });
let send ={
  total : totalPay,
  coin: data.coin
}
goToScreen(GoTo.route,send)
}



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>

      <View style={styles.head}>
        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.goBack()}>
          <Icon name={'arrow-ios-back-outline'} width={25} height={25} fill={"black"} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Ckeck Out
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => setvertical(true)}>
          <Icon name={'more-vertical'} width={25} height={25} fill={"black"} />
        </TouchableOpacity>
      </View>


      <ScrollView scrollEventThrottle={16}>
        <View style={styles.body}>
          <View style={styles.methodPaySection}>
            <Text style={styles.methodPayTitle}>Escoge tu método de pago</Text>
            <ScrollView horizontal={true} scrollEventThrottle={16}>
              {metthoPayList.map((i, key) => {
                return (<CardMethodPay key={key} data={i} active={methodPay} set={setmethodPay} />)
              })}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => setiAcceptPorcent(!iAcceptPorcent)} style={styles.iAgreeBtn}>
            <Icon name={iAcceptPorcent ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={iAcceptPorcent ? color_primary : color_grey_light} />
            <Text style={styles.iAgreeBtnText}>Pagar el {porcentajeBancario}% adicional por gastos bancarios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setiAcceptTerms(!iAcceptTerms)} style={styles.iAgreeBtn}>
            <Icon name={iAcceptTerms ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={iAcceptTerms ? color_primary : color_grey_light} />
            <Text style={styles.iAgreeBtnText}>
              Acepto las
              <OpenURLButton url={url}><Text style={{ fontWeight: "bold" }}> Política de tratamientos de la información </Text></OpenURLButton>
              de tratamiento de datos personales y Políticas de uso y seguridad.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>



      <View style={styles.foot}>
        <View style={styles.footUp}>
          <Text style={[styles.footUpText, styles.footUpLeft]}>Total Payment</Text>
          <Text style={[styles.footUpText, styles.footUpRight]}>{currencyFormat(data.coin, totalPay)}</Text>
        </View>
        {iAcceptTerms && iAcceptPorcent && methodPay !== 0?
          <TouchableOpacity style={styles.btnPay} onPress={() => goToPay()}>
            <Text style={styles.btnPayText}>To Pay</Text>
          </TouchableOpacity>
          :
          <View style={{ ...styles.btnPay, backgroundColor: "silver" }} >
            <Text style={styles.btnPayText}>To Pay</Text>
          </View>
        }
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
export default CheckOut;

const styles = StyleSheet.create({
  head: {
    backgroundColor: color_white,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 20
  },
  title: {
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


  body: {
    paddingBottom: 60
  },
  methodPaySection: {
    marginVertical: 10,
    backgroundColor: color_white,
    padding: 20
  },
  methodPayTitle: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: color_grey_dark
  },
  methodPay: {
    backgroundColor: color_white,
    overflow: "hidden",
    padding: 0,
    margin: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  methodPayActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color_white,
    width: 25,
    height: 25,
    borderRadius: 25,
    position: "absolute",
    zIndex: 999,
    bottom: 2,
    right: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iAgreeBtn: {
    backgroundColor: color_white,
    width: "100%",
    padding: 20,
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: 5
  },
  iAgreeBtnText: {
    marginLeft: 10,
    width: "90%",
    color: color_grey_dark
  },
  foot: {
    backgroundColor: color_white,
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    flexDirection: "column",
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "center",
  },
  footUp: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between"
  },
  footUpText: {
    fontSize: 16,
    fontWeight: "700"
  },
  footUpLeft: {},
  footUpRight: {},
  btnPay: {
    backgroundColor: "#30313c",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: "100%"
  },
  btnPayText: {
    textAlign: "center",
    color: color_white,
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "800"
  },
})


const CardMethodPay = (props) => {
  let active, route
  if (props.active === props.data.id) { active = true }
  else { active = false }
  const size = WIDTH * 4
  return (
    <TouchableOpacity
      style={{
        ...styles.methodPay,
        width: size,
        height: (size / 3) * 2,
        borderWidth: active ? 2 : 6,
        borderColor: active ? color_fifth : "transparent",
      }}
      onPress={() => props.set(props.data.id)}>
      {active &&
        <View style={styles.methodPayActive}>
          <Icon name={'checkmark-outline'} width={20} height={20} fill={color_fifth} />
        </View>
      }
      <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover", }}
        source={{ uri: `${file_server1}/img/wellezy/methodPay/${props.data.logo}` }}
      />
    </TouchableOpacity>
  )
}