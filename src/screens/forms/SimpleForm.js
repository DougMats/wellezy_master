import React, { useState, useContext } from 'react';
import { SafeAreaView, ActivityIndicator, View, Text, Modal, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../contexts/UserContext'
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import { formularios, cartShop } from '../../services/connection.js';
import {
  color_primary,
  color_white,
  color_screen,
  color_fifth,
  color_grey_dark,
} from '../../styles/Colors.js'
import { file_server1 } from '../../../Env'

function SimpleForm(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const userDetails = useContext(UserContext).userDetails;
  const [Load, setLoad] = useState(false);
  const [FormOn, setFormOn] = useState(false);

  const [formInfo, setFormInfo] = useState(
    {
      Nombres: userDetails.name,
      Apellidos: userDetails.surname,
      Email: userDetails.email,
      Phone: userDetails.phone
    });

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  async function sendForm() {
    const data = { ...formInfo }
    if (
      data.Nombres == "" &&
      data.Apellidos == "" &&
      data.Phone == "",
      data.Email == ""
    ) {
      Toast.show("Debes llenar todos los campos");
    }
    else {
      setLoad(true);
      setFormOn(true);
      data.id_client = userDetails.id;
      data.id_medic = props.route.params.id_MedicSource,//props.route.params.id_Medic;
        data.id_procedure = props.route.params.data.id;
      data.id_category = props.route.params.data.id_category;
      const response = await formularios.SimpleFormulario(data);

      if (response !== false) {
        const toCar = {
          id_client: userDetails.id,
          items: [
            {
              type: "item",
              code: response.id,
              relation: "video valoration",
              name: `Video Valoración-(${props.route.params.data.name})`,
              description: "solicitud de video valoracion",
              price: 50,
              qty: 1,
              img: `${file_server1}/img/category/picture/${props.route.params.data.foto}`,
              coin: "$"
            }
          ]
        }
        const res = await cartShop.insertcartshop(toCar);
       
       
        if (res === true) {
          setLoad(false);
          setTimeout(() => {
            setFormOn(false);
            goToScreen("PaymentCart", null);
          }, 10000);
        }

        else {
          Toast.show("Error");
          setTimeout(() => {
            goToScreen("Home", null);
          }, 3000);
        }
      }
    }
  }


  function goToScreen(screen, data) {
    setFormOn(false);
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head
        props={props}
        return=""
        show={vertical}
        action={setvertical}
      />
      <View style={styles.wrap}>
        <View style={styles.head}>
          <TouchableOpacity
            onPress={() => [setFormOn(false), props.navigation.goBack()]}
            style={{
              position: "absolute",
              top: 10,
              left: 15
            }}>
            <Icon name="arrow-ios-back-outline" width={30} height={30} fill={"white"} />
          </TouchableOpacity>
          <Text style={styles.title}>Complete el formulario</Text>
        </View>
        <Text style={{ color: color_grey_dark, marginTop: 10 }}>(*) todos los campos son obligatorios.</Text>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>* Nombres</Text>
            <TextInput
              style={styles.text}
              placeholder="Ej."
              value={formInfo.Nombres}
              onChangeText={text => onChangeText(text, 'Nombres')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>* Apellidos</Text>
            <TextInput
              style={styles.text}
              placeholder="Ej."
              value={formInfo.Apellidos}
              onChangeText={text => onChangeText(text, 'Apellidos')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>* Telefono</Text>
            <TextInput
              style={styles.text}
              placeholder="Ej."
              value={formInfo.Phone}
              onChangeText={text => onChangeText(text, 'Phone')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>* Email</Text>
            <TextInput
              style={styles.text}
              placeholder="Ej."
              value={formInfo.Email}
              onChangeText={text => onChangeText(text, 'Email')}
            />
          </View>
          <TouchableOpacity onPress={() => sendForm()} style={styles.btnSend}>
            <Text style={styles.btnText}>{t("applyFor")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Menu props={props} option={0} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
      <Image source={{ uri: `${file_server1}/img/category/picture/${props.route.params.data.foto}` }}
        style={{
          opacity: 0.5,
          position: "absolute",
          zIndex: -99,
          flex: 1,
          justifyContent: "center",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }} />

      <Modal animationType="slide" transparent={true} visible={FormOn} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => [setFormOn(false), props.navigation.goBack()]}
            style={{ position: "absolute", top: 40, right: 20 }}>
            <Icon name='close' width={30} height={30} fill={color_white} />
          </TouchableOpacity>
          <View style={{ backgroundColor: color_white, width: "80%", flexDirection: "column", paddingVertical: 20, paddingHorizontal: 10, borderRadius: 20 }}>
            {Load &&
              <ActivityIndicator size="large" color={color_primary} />
            }
            {!Load &&
              <View style={{
                justifyContent: "center", alignItems: "center", alignContent: "center",
              }}>
                <Icon name='checkmark-circle-outline' width={50} height={50} fill={color_fifth} />
                <Text style={{ fontSize: 16, width: "90%", textAlign: "center", color: color_grey_dark }}>
                  Tus solicitud ha sido registrada correctamente...
                </Text>
                <Text style={{ fontSize: 14, marginTop: 20, width: "90%", textAlign: "center", textAlign: "justify", color: color_grey_dark }}>
                  Hemos añadido a tu carrito de compras la solicitud de la valoración para continuar, necesitamos comprobar el pago de la misma para agendar tu cita de video valoracón.
                </Text>
                <TouchableOpacity
                  onPress={() => goToScreen("PaymentCart", null)} style={{ backgroundColor: color_fifth, width: "50%", alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: 8, padding: 10, marginTop: 20 }}>
                  <Text style={{ color: color_white }}>Pagar ahora</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    borderRadius: 12,
    marginVertical: "25%",
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.8)",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden"
  },
  head: {
    flexDirection: "row",
    backgroundColor: color_primary,
    width: "100%",
    padding: 15,
    justifyContent: "center"
  },
  title: {
    color: color_white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  body: {
    alignSelf: "center",
    borderRadius: 12,
    width: "100%",
    padding: 20,
    alignContent: "center",
    alignItems: "center",
  },
  row: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "column"
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5
  },
  text: {
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#eee"
  },
  terminos: {
    marginTop: 20,
    flexDirection: "row"
  },
  condiciones: {
    textAlign: "center",
    fontSize: 12,
    width: "90%"
  },
  btn: {
    marginTop: 5
  },
  btnSend: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: color_primary,
    borderRadius: 20,
    padding: 8,
    width: "60%",
    justifyContent: "center"
  },
  btnText: {
    marginLeft: 10,
    textAlign: "center",
    color: color_white,
    fontWeight: "bold",
    fontSize: 14
  }
})
export default SimpleForm;