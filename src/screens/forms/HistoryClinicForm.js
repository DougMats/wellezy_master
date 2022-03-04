import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, TextInput, Modal, Text, Image, View, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native'
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import { formularios } from '../../services/connection.js';
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import {
  color_primary,
  color_secondary,
  color_fifth,
  color_white,
  color_screen,
} from '../../styles/Colors.js'

function HistoryClinicForm(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [getEPS, setgetEPS] = useState(false);
  const [float, setfloat] = useState({
    altura: 150,
    peso: 50,
    eps: ""
  });

  function onChangedFloat(text, key) {
    setfloat({
      ...float,
      [key]: text
    })
  }

  useEffect(() => {
    if (getEPS === false) {
      onChangedFloat("", 'eps')
    }
  }, [getEPS]);

  //hijos
  const [hijos, sethijos] = useState(1);
  const [gethijos, setgethijos] = useState(false);
  function countHijos(v) {
    let valor = hijos + v
    if (valor <= 0) {
      sethijos(1);
      Toast.show("Valor mínimo debe ser 1.")
    }
    else {
      sethijos(valor)
    }
  }

  //consume alcohol
  const [alcohol, setalcohol] = useState(false);
  //fuma
  const [fuma, setfuma] = useState(false);

  //operaciones realiadas
  const [operacionesGet, setoperacionesGet] = useState(false);
  const [operacionesLista, setoperacionesLista] = useState([]);
  const [operacion, setoperacion] = useState({ name: "" });
  function onChangeTextoperaciones(text, key) {
    setoperacion({
      ...operacion,
      [key]: text
    })
  }
  function operacionAdd() {
    if (operacion.name === "") {
      Toast.show("Debe ingresar la descripción.")
    }
    else {
      let count = operacionesLista.length + 1
      let array = { id: count, descripcion: operacion.name }
      setoperacionesLista([...operacionesLista, array])
      onChangeTextoperaciones("", 'name')
      console.log("array ", array)
    }
  }
  function operacionDel(e) {
    console.log(e)
    let update = []
    for (var i in operacionesLista) {
      if (operacionesLista[i].id !== e) {
        update = [...update, operacionesLista[i]]
      }
    }
    setoperacionesLista(update)
  }

  useEffect(() => {
    if (operacionesGet === false) {
      setoperacionesLista([]);
    }
  }, [operacionesGet]);


  //medicamentos
  const [medicamentosGet, setmedicamentosGet] = useState(false);
  const [medicamentosLista, setmedicamentosLista] = useState([]);
  const [medicamento, setmedicamento] = useState({ name: "" });
  function onChangeTextmedicamentos(text, key) {
    setmedicamento({
      ...medicamento,
      [key]: text
    })
  }
  function medicamentoAdd() {
    if (medicamento.name === "") {
      Toast.show("Debe ingresar la descripción.")
    }
    else {
      let count = medicamentosLista.length + 1
      let array = { id: count, descripcion: medicamento.name }
      setmedicamentosLista([...medicamentosLista, array])
      onChangeTextmedicamentos("", 'name')
      console.log("array ", array)
    }
  }
  function medicamentoDel(e) {
    console.log(e)
    let update = []
    for (var i in medicamentosLista) {
      if (medicamentosLista[i].id !== e) {
        update = [...update, medicamentosLista[i]]
      }
    }
    setmedicamentosLista(update)
  }

  useEffect(() => {
    if (medicamentosGet === false) {
      setmedicamentosLista([]);
    }
  }, [medicamentosGet]);

  //enfermedades
  const [enfermedadesGet, setenfermedadesGet] = useState(false);
  const [enfermedadesLista, setenfermedadesLista] = useState([]);
  const [enfermedad, setenfermedad] = useState({ name: "" });
  function onChangeTextenfermedades(text, key) {
    setenfermedad({
      ...enfermedad,
      [key]: text
    })
  }
  function enfermedadAdd() {
    if (enfermedad.name === "") {
      Toast.show("Debe ingresar la descripción.")
    }
    else {
      let count = enfermedadesLista.length + 1
      let array = { id: count, descripcion: enfermedad.name }
      setenfermedadesLista([...enfermedadesLista, array])
      onChangeTextenfermedades("", 'name')
      console.log("array ", array)
    }
  }
  function enfermedadDel(e) {
    console.log(e)
    let update = []
    for (var i in enfermedadesLista) {
      if (enfermedadesLista[i].id !== e) {
        update = [...update, enfermedadesLista[i]]
      }
    }
    setenfermedadesLista(update)
  }
  useEffect(() => {
    if (enfermedadesGet === false) {
      setenfermedadesLista([]);
    }
  }, [enfermedadesGet]);

  //alergias
  const [alergiasGet, setalergiasGet] = useState(false);
  const [alergiasLista, setalergiasLista] = useState([]);
  const [alergia, setalergia] = useState({ name: "" });
  function onChangeTextalergias(text, key) {
    setalergia({
      ...alergia,
      [key]: text
    })
  }
  function alergiaAdd() {
    if (alergia.name === "") {
      Toast.show("Debe ingresar la descripción.")
    }
    else {
      let count = alergiasLista.length + 1
      let array = { id: count, descripcion: alergia.name }
      setalergiasLista([...alergiasLista, array])
      onChangeTextalergias("", 'name')
      console.log("array ", array)
    }
  }
  function alergiaDel(e) {
    console.log(e)
    let update = []
    for (var i in alergiasLista) {
      if (alergiasLista[i].id !== e) {
        update = [...update, alergiasLista[i]]
      }
    }
    setalergiasLista(update)
  }
  useEffect(() => {
    if (alergiasGet === false) {
      setalergiasLista([]);
    }
  }, [alergiasGet]);

  //drogas
  const [drogasGet, setdrogasGet] = useState(false);
  const [drogasLista, setdrogasLista] = useState([]);
  const [droga, setdroga] = useState({ name: "" });
  function onChangeTextdrogas(text, key) {
    setdroga({
      ...droga,
      [key]: text
    })
  }

  function drogaAdd() {
    if (droga.name === "") {
      Toast.show("Debe ingresar la descripción.")
    }
    else {
      let count = drogasLista.length + 1
      let array = { id: count, descripcion: droga.name }
      setdrogasLista([...drogasLista, array])
      onChangeTextdrogas("", 'name')
      console.log("array ", array)
    }
  }

  function drogaDel(e) {
    console.log(e)
    let update = []
    for (var i in drogasLista) {
      if (drogasLista[i].id !== e) {
        update = [...update, drogasLista[i]]
      }
    }
    setdrogasLista(update)
  }

  useEffect(() => {
    if (drogasGet === false) {
      setdrogasLista([]);
    }
  }, [drogasGet]);

  const [TerminosCondiciones, setTerminosCondiciones] = useState(false);
  const url = "https://www.youtube.com/watch?v=VEDVL-Z_JhM&t=868s";
  const url1 = "https://pdtclientsolutions.com/phpmyadmin/sql.php?db=telesaludapp&token=47737e342000550ddf1993a8c8990c26&goto=db_structure.php&table=app_telesalud_citas&pos=0";
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const link = await Linking.canOpenURL(url);
      if (link) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return <Text style={styles.bold} onPress={handlePress}> {children} </Text>;
  };

  async function save() {
    if (TerminosCondiciones === false) {
      Toast.show("Debes aceptar los terminos y condiciones");
    }
    else {
      setmodal(true)
      setLoad(true)
      let data = {
        id_cita: props.route.params.data.id,
        id_medic: props.route.params.data.id_medic,
        id_client: props.route.params.data.id_client,
        hijos: hijos,
        eps: getEPS === false ? "no" : float.eps,
        fuma: fuma === true ? 'si' : 'no',
        alcohol: alcohol === true ? 'si' : 'no',
        peso: float.peso,
        altura: float.altura,
        operaciones: operacionesGet === true ? 'si' : 'no',
        operacionesLista: operacionesGet === true ? operacionesLista : 'N/A',
        medicamentos: medicamentosGet === true ? 'si' : 'no',
        medicamentosLista: medicamentosGet === true ? medicamentosLista : 'N/A',
        enfermedades: enfermedadesGet === true ? 'si' : 'no',
        enfermedadesLista: enfermedadesGet === true ? enfermedadesLista : 'N/A',
        alergias: alergiasGet === true ? 'si' : 'no',
        alergiasLista: alergiasGet === true ? alergiasLista : 'N/A',
        drogas: 'no',
        drogasLista: 'N/A'
      }
      if (data.peso === 0) { Toast.show("Debe completar el formulario") }
      else {
        const res = await formularios.saveHistoryClinic(data)
        console.log("res: ", res)
        setLoad(false)
        setsuccessful(true)
      }
    }
  }

  const [modal, setmodal] = useState(false);
  const [Load, setLoad] = useState(false);
  const [successful, setsuccessful] = useState(false);



  useEffect(() => {
    if (successful === true) {
      console.log("... finishing")
      setTimeout(() => {
        setmodal(false)
        setLoad(false)
        setsuccessful(false)
        goToScreen("ValorationView", { id: props.route.params.data.id })
      }, 5000);
    }
  }, [successful]);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (keyboardStatus === false && operacionesGet === true && operacion.name !== "") { operacionAdd() }
    if (keyboardStatus === false && medicamentosGet === true && medicamento.name !== "") { medicamentoAdd() }
    if (keyboardStatus === false && enfermedadesGet === true && enfermedad.name !== "") { enfermedadAdd() }
    if (keyboardStatus === false && alergiasGet === true && alergia.name !== "") { alergiaAdd() }
    if (keyboardStatus === false && drogasGet === true && droga.name !== "") { drogaAdd() }
  }, [keyboardStatus]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <LinearGradient colors={[color_secondary, color_primary, color_fifth, color_fifth, color_primary]}
        style={styles.imageBackground}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.wrap}>
              <View style={{ marginTop: 20, paddingBottom: 10, borderBottomColor: "silver", borderBottomWidth: 1, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, width: "90%", }}>Historia Clínica.</Text>
                <View style={{ width: 180, height: 140 }}>
                  <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={require("../../images/formOne.png")} />
                </View>
                <Text style={{ textAlign: "center", fontSize: 12, width: "90%", color: "#777", marginVertical: 10 }}>Complete el siguiente formulario correctamente.</Text>
              </View>

              <View style={[styles.bigGroup, { borderBottomColor: "silver", paddingVertical: 10, borderBottomWidth: 1 }]}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text style={{ marginLeft: 10, width: "30%", fontSize: 14, fontWeight: "bold", lineHeight: 35 }}>Altura (cm):</Text>
                  <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <TextInput
                      style={{ width: "70%", textAlign: "center", borderColor: "silver", lineHeight: 15, height: 40, fontSize: 14, borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, }}
                      keyboardType="numeric"
                      onChangeText={text => onChangedFloat(text, 'altura')}
                      value={`${float.altura}`}
                      maxLength={10}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.bigGroup, { borderBottomColor: "silver", paddingVertical: 10, borderBottomWidth: 1 }]}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text style={{ marginLeft: 10, width: "30%", fontSize: 14, fontWeight: "bold", lineHeight: 35 }}>Peso (Kg):</Text>
                  <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <TextInput
                      style={{ width: "70%", textAlign: "center", borderColor: "silver", lineHeight: 15, height: 40, fontSize: 14, borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, }}
                      keyboardType="numeric"
                      onChangeText={text => onChangedFloat(text, 'peso')}
                      value={`${float.peso}`}
                      maxLength={10}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.bigGroup, { borderBottomColor: "silver", paddingVertical: 10, borderBottomWidth: 1 }]}>
                <Text style={styles.bigGroupLabel}>Tiene Hijos?</Text>
                <TouchableOpacity onPress={() => setgethijos(false)} style={{ marginLeft: 10, flexDirection: "row" }}>
                  {gethijos === false ?
                    <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    :
                    <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                  }
                  <Text style={{ lineHeight: 25, marginLeft: 10, fontSize: 14 }}>No, no tengo hijos.</Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 10, flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity onPress={() => setgethijos(true)} style={{ flexDirection: "row", width: "50%" }}>
                    {gethijos === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                    <Text style={{ lineHeight: 25, marginLeft: 10, fontSize: 14 }}>Si.
                      {gethijos === true && <Text>   ¿Cuántos?</Text>}
                    </Text>
                  </TouchableOpacity>
                  {gethijos === true &&
                    <View style={{ flexDirection: "row", width: "50%", justifyContent: "center" }}>
                      <TouchableOpacity onPress={() => countHijos(-1)} style={{ marginHorizontal: 10 }}>
                        <Icon name='minus-circle-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                      <Text style={{ borderColor: "silver", borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, lineHeight: 25, marginLeft: 10, fontSize: 14 }}>{hijos}</Text>
                      <TouchableOpacity onPress={() => countHijos(+1)} style={{ marginHorizontal: 10 }}>
                        <Icon name='plus-circle-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>}
                </View>
              </View>

              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Ingiere Alcohol?</Text>
                  <TouchableOpacity onPress={() => setalcohol(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {alcohol === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setalcohol(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {alcohol === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Fuma?</Text>
                  <TouchableOpacity onPress={() => setfuma(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {fuma === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setfuma(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {fuma === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Operaciones?</Text>
                  <TouchableOpacity onPress={() => setoperacionesGet(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {operacionesGet === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setoperacionesGet(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {operacionesGet === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
                {operacionesGet === true &&
                  <View>
                    {operacionesLista.length >= 1 && operacionesLista.map((i, key) => {
                      return (
                        <View key={key} style={styles.bigGroupCard}>
                          <Text style={styles.bigGroupCardText}>{i.descripcion}</Text>
                          <TouchableOpacity style={styles.bigGroupCardBTN} onPress={() => operacionDel(i.id)}>
                            <Icon name='trash-outline' height={30} width={30} fill="silver" />
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                    <View style={styles.bigGroupFoot}>
                      <TextInput style={styles.bigGroupFootInput}
                        placeholderTextColor="#777" placeholder="Descripción de la operación." value={operacion.name} onChangeText={text => onChangeTextoperaciones(text, 'name')} />
                      <TouchableOpacity style={styles.bigGroupAdd} onPress={() => operacionAdd()}>
                        <Icon name='save-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>

              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Medicamentos?</Text>
                  <TouchableOpacity onPress={() => setmedicamentosGet(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {medicamentosGet === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setmedicamentosGet(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {medicamentosGet === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
                {medicamentosGet === true &&
                  <View>
                    {
                      medicamentosLista.length >= 1 && medicamentosLista.map((i, key) => {
                        return (
                          <View key={key} style={styles.bigGroupCard}>
                            <Text style={styles.bigGroupCardText}>{i.descripcion}</Text>
                            <TouchableOpacity style={styles.bigGroupCardBTN} onPress={() => medicamentoDel(i.id)}>
                              <Icon name='trash-outline' height={30} width={30} fill="silver" />
                            </TouchableOpacity>
                          </View>
                        )
                      })}
                    <View style={styles.bigGroupFoot}>
                      <TextInput style={styles.bigGroupFootInput}
                        placeholderTextColor="#777" placeholder="Indique el medicamento." value={medicamento.name} onChangeText={text => onChangeTextmedicamentos(text, 'name')} />
                      <TouchableOpacity style={styles.bigGroupAdd} onPress={() => medicamentoAdd()}>
                        <Icon name='save-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>

              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Enfermedades?</Text>
                  <TouchableOpacity onPress={() => setenfermedadesGet(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {enfermedadesGet === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setenfermedadesGet(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {enfermedadesGet === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
                {enfermedadesGet === true &&
                  <View>
                    {
                      enfermedadesLista.length >= 1 && enfermedadesLista.map((i, key) => {
                        return (
                          <View key={key} style={styles.bigGroupCard}>
                            <Text style={styles.bigGroupCardText}>{i.descripcion}</Text>
                            <TouchableOpacity style={styles.bigGroupCardBTN} onPress={() => enfermedadDel(i.id)}>
                              <Icon name='trash-outline' height={30} width={30} fill="silver" />
                            </TouchableOpacity>
                          </View>
                        )
                      })}
                    <View style={styles.bigGroupFoot}>
                      <TextInput style={styles.bigGroupFootInput}
                        placeholderTextColor="#777" placeholder="Que enfermedad padece?" value={enfermedad.name} onChangeText={text => onChangeTextenfermedades(text, 'name')} />
                      <TouchableOpacity style={styles.bigGroupAdd} onPress={() => enfermedadAdd()}>
                        <Icon name='save-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>
              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Alérgias?</Text>
                  <TouchableOpacity onPress={() => setalergiasGet(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {alergiasGet === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setalergiasGet(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {alergiasGet === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
                {alergiasGet === true &&
                  <View>
                    {alergiasLista.length >= 1 && alergiasLista.map((i, key) => {
                      return (
                        <View key={key} style={styles.bigGroupCard}>
                          <Text style={styles.bigGroupCardText}>{i.descripcion}</Text>
                          <TouchableOpacity style={styles.bigGroupCardBTN} onPress={() => alergiaDel(i.id)}>
                            <Icon name='trash-outline' height={30} width={30} fill="silver" />
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                    <View style={styles.bigGroupFoot}>
                      <TextInput style={styles.bigGroupFootInput}
                        placeholderTextColor="#777" placeholder="Describir alérgia." value={alergia.name} onChangeText={text => onChangeTextalergias(text, 'name')} />
                      <TouchableOpacity style={styles.bigGroupAdd} onPress={() => alergiaAdd()}>
                        <Icon name='save-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>

              <View style={styles.bigGroup}>
                <View style={styles.bigGroupHead}>
                  <Text style={styles.bigGroupLabel}>Drogas?</Text>
                  <TouchableOpacity onPress={() => setdrogasGet(true)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>Si</Text>
                    {drogasGet === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setdrogasGet(false)} style={styles.bigGroupBTN}>
                    <Text style={styles.bigGroupBTNText}>No</Text>
                    {drogasGet === true ?
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} /> :
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                    }
                  </TouchableOpacity>
                </View>
                {drogasGet === true &&
                  <View>
                    {drogasLista.length >= 1 && drogasLista.map((i, key) => {
                      return (
                        <View key={key} style={styles.bigGroupCard}>
                          <Text style={styles.bigGroupCardText}>{i.descripcion}</Text>
                          <TouchableOpacity style={styles.bigGroupCardBTN} onPress={() => drogaDel(i.id)}>
                            <Icon name='trash-outline' height={30} width={30} fill="silver" />
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                    <View style={styles.bigGroupFoot}>
                      <TextInput style={styles.bigGroupFootInput}
                        placeholderTextColor="#777" placeholder="Describir droga." value={droga.name} onChangeText={text => onChangeTextdrogas(text, 'name')} />
                      <TouchableOpacity style={styles.bigGroupAdd} onPress={() => drogaAdd()}>
                        <Icon name='save-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              </View>

              <View style={[styles.bigGroup, { borderBottomColor: "silver", paddingVertical: 10, borderBottomWidth: 1 }]}>
                <Text style={{ ...styles.bigGroupLabel, width: "100%", }}>Posees EPS, Seguro Social u otro?</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  <TouchableOpacity onPress={() => setgetEPS(true)} style={{ marginLeft: 10, flexDirection: "row" }}>
                    {getEPS === true ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                    <Text style={{ lineHeight: 25, marginLeft: 10, fontSize: 14 }}>Si.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setgetEPS(false)} style={{ marginLeft: 10, flexDirection: "row" }}>
                    {getEPS === false ?
                      <Icon name='checkmark-square-2-outline' height={30} width={30} fill={color_fifth} />
                      :
                      <Icon name='square-outline' height={30} width={30} fill={"silver"} />
                    }
                    <Text style={{ lineHeight: 25, marginLeft: 10, fontSize: 14 }}>No.</Text>
                  </TouchableOpacity>
                </View>

                {getEPS === true &&
                  <View style={{ alignItems: "center", marginTop: 10 }}>
                    <Text>¿Cúal posees?</Text>
                    <TextInput
                      style={{ width: "100%", marginTop: 10, textAlign: "center", borderColor: "silver", lineHeight: 15, height: 40, fontSize: 14, borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, }}
                      placeholder="EPS / Seguro Social / Otros"
                      onChangeText={text => onChangedFloat(text, 'eps')}
                      value={`${float.eps}`}
                    />
                  </View>
                }
              </View>


              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setTerminosCondiciones(!TerminosCondiciones)} style={{ flexDirection: "row" }}>
                  {TerminosCondiciones
                    ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={30} height={30} />
                    : <Icon name="square-outline" fill={"silver"} width={30} height={30} />
                  }
                </TouchableOpacity>
                <Text style={{ left: 10, textAlign: "center", fontSize: 12, width: "85%", }}>
                  Acepto las
                  <OpenURLButton url={url}><Text style={{ fontWeight: "bold" }}> Política de tratamientos de la información </Text></OpenURLButton>
                  de tratamiento de datos personales y Políticas de uso y seguridad.
                </Text>
              </View>
              <TouchableOpacity onPress={() => save()} style={{ width: "60%", backgroundColor: color_primary, flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: 20, borderRadius: 12, paddingVertical: 5 }}>
                <Icon name={"save-outline"} width={30} height={30} fill={color_white} />
                <Text style={{ marginLeft: 10, color: color_white, fontWeight: "bold" }}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Menu props={props} option={2} />
      </LinearGradient>
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }

      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
          <View style={{ backgroundColor: color_white, borderRadius: 20, width: "80%", padding: 20, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
            {Load &&
              <View>
                <ActivityIndicator color={color_primary} size={50} />
                <Text style={{ marginTop: 20, color: color_primary }}>Cargando...</Text>
              </View>
            }
            {!Load && successful === true &&
              <>
                <View style={{ width: 160, height: 160 }}>
                  <Image
                    style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                    source={require("../../images/formThree.png")}
                  />
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, width: "90%", marginVertical: 10 }}>Has completado los requisitos para entrar a la video valoración.</Text>
              </>
            }
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  wrapper: {
    paddingTop: 50,
    paddingBottom: 180,
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
  },
  wrap: {
    alignSelf: "center",
    flexDirection: "column",
    backgroundColor: color_white,
    marginBottom: 20,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20
  },
  bigGroup: {
    flexDirection: "column"
  },
  bigGroupHead: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  bigGroupLabel: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 30,
    paddingLeft: 10,
    textAlign: "left",
    width: "60%",
  },
  bigGroupBTN: {
    flexDirection: "row",
    width: "16%",
    marginHorizontal: "2%"
  },
  bigGroupBTNText: {
    lineHeight: 30
  },
  bigGroupCard: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row"
  },
  bigGroupCardText: {
    padding: 15,
    textAlign: "justify",
    color: "#555",
    width: "90%",
    fontSize: 14,
    lineHeight: 20
  },
  bigGroupCardBTN: {
    right: 10,
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  bigGroupFoot: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    marginBottom: 40
  },
  bigGroupFootInput: {
    backgroundColor: color_white,
    height: 50,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "silver",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10
  },
  bigGroupAdd: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: color_white,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "silver",
    borderWidth: 1
  },
});
export default HistoryClinicForm;