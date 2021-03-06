import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator, View, Text, Modal, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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
import styles from '../../styles/styles.js'
import RNFetchBlob from "rn-fetch-blob";

function SimpleForm(props) {
  const fs = RNFetchBlob.fs;
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const userDetails = useContext(UserContext).userDetails;
  const [Load, setLoad] = useState(false);
  const [FormOn, setFormOn] = useState(false);

  // console.log("**********")
  // console.log("****", props.route.params.id_MedicSource, "***")
  // console.log("**********")

  const [formInfo, setFormInfo] = useState({
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
      data.id_medic = props.route.params.id_MedicSource,
        data.id_procedure = props.route.params.data.id;
      data.id_category = props.route.params.data.id_category;
      const response = await formularios.SimpleFormulario(data);
      //console.log("1- res:", response)

      if (response !== false) {
        setLoad(false)
        setFormOn(true);

        setTimeout(() => {
          setFormOn(false);
          //goToScreen("PaymentCart", null);
          props.navigation.goBack()
        }, 10000);
      }
      /*
            if (response !== false) {
              let imagen = "cart_shop.png"
              // let imagen = props.route.params.data.foto
              // if (imagen !== undefined) { imagen = "cart_shop.png"}
              // let newImagen, imagePath = null;
              // newImagen = await RNFetchBlob.config({ fileCache: true }).fetch("GET", imagen)
              //   .then(resp => { imagePath = resp.path(); return resp.readFile("base64");})
              //   .then(base64Data => {
              //     return base64Data
              //     //return fs.unlink(imagePath);
              //   });
                
              const toCar = {
                id_client: userDetails.id,
                id_medic: 2,
                items: [
                  {
                    type: "item",
                    code: response.id,
                    relation: "valoration",
                    name: `valoration. ${props.route.params.data.name}`,
                    description: `solicitud de video valoracion para ${props.route.params.data.name}`,
                    price: 50,
                    qty: 1,
                    coin: "$",
                    id_service:props.route.params.data.id,
                    type_service:"sub_category",
                    img: "video_valoration.png"
                  }
                ]
              }
              const res = await cartShop.insertcartshop(toCar);
              console.log("2- res:", res)
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
      */
      else {
        setLoad(false)
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
      <ScrollView>
        <View style={styles2.wrap}>
          <View style={styles2.head}>
            <TouchableOpacity
              onPress={() => [setFormOn(false), props.navigation.goBack()]}
              style={{
                position: "absolute",
                top: 10,
                left: 15
              }}>
              <Icon name="arrow-ios-back-outline" width={30} height={30} fill={"white"} />
            </TouchableOpacity>
            <Text style={styles2.title}>Complete el formulario</Text>
          </View>
          <Text style={{ color: color_grey_dark, marginTop: 10 }}>(*) todos los campos son obligatorios.</Text>
          <View style={styles.formBody}>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>* Nombres</Text>
              <TextInput
                style={styles.formText}
                placeholder="Ej."
                value={formInfo.Nombres}
                onChangeText={text => onChangeText(text, 'Nombres')}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>* Apellidos</Text>
              <TextInput
                style={styles.formText}
                placeholder="Ej."
                value={formInfo.Apellidos}
                onChangeText={text => onChangeText(text, 'Apellidos')}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>* Telefono</Text>
              <TextInput
                style={styles.formText}
                placeholder="Ej."
                value={formInfo.Phone}
                onChangeText={text => onChangeText(text, 'Phone')}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>* Email</Text>
              <TextInput
                style={styles.formText}
                placeholder="Ej."
                value={formInfo.Email}
                onChangeText={text => onChangeText(text, 'Email')}
              />
            </View>
            <TouchableOpacity onPress={() => sendForm()} style={{ ...styles.bigButton, width: "60%" }}>
              <Text style={styles.bigButtonText}>{t("applyFor")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
                <Icon name='checkmark-circle-outline' width={100} height={100} fill={color_fifth} />
                <Text style={{ marginTop: 20, fontSize: 18, width: "90%", textAlign: "center", color: color_grey_dark }}>
                  Tus solicitud ha sido registrada correctamente...
                </Text>
                <Text style={{ fontSize: 14, marginTop: 20, width: "90%", textAlign: "justify", color: color_grey_dark }}>
                  Estamos evaluando tus datos, pronto un asesor o asesora se comunicar?? contigo...
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 20, width: "100%", textAlign: "center", color: color_fifth }}>
                  ??Gracias por confiar en nosotros!
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()} style={{ backgroundColor: color_fifth, width: "50%", alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: 8, padding: 10, marginTop: 20 }}>
                  <Text style={{ color: color_white }}>Aceptar</Text>
                </TouchableOpacity>
                {/* 
                <Text style={{ fontSize: 14, marginTop: 20, width: "90%", textAlign: "center", textAlign: "justify", color: color_grey_dark }}>
                  Hemos a??adido a tu carrito de compras la solicitud de la valoraci??n para continuar, necesitamos comprobar el pago de la misma para agendar tu cita de video valorac??n.
                </Text>
                <TouchableOpacity
                  onPress={() => goToScreen("PaymentCart", null)} style={{ backgroundColor: color_fifth, width: "50%", alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: 8, padding: 10, marginTop: 20 }}>
                  <Text style={{ color: color_white }}>Pagar ahora</Text>
                </TouchableOpacity> */}
              </View>
            }
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles2 = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    borderRadius: 12,
    marginTop: 20,
    marginBottom: "25%",
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