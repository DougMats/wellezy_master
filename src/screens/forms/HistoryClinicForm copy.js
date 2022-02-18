import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Image, ActivityIndicator, ScrollView, StatusBar, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
// import UserContext from '../../../contexts/UserContext'
// import Head from '../../components/generic/Head';
// import Menu from '../../components/generic/Menu';
// import MenuVertical from '../../components/generic/MenuVertical.js';
// import { formularios } from '../../services/connection.js';

// import {
//   color_primary,
//   color_secondary,
//   color_tertiary,
//   color_white,
//   color_white_a,
//   color_black,
//   color_black_a,
//   color_grey_light,
//   color_grey_half,
//   color_grey_dark,
//   color_transparent,
//   color_screen,
//   color_star,
//   color_fifth,
// } from '../../styles/Colors.js'

// //clientCreateHC 
function HistoryClinicForm(props) {

console.log("HistoryClinicForm")

//   const { t, i18n } = useTranslation();
//   const [vertical, setvertical] = useState(false);
//   const userDetails = useContext(UserContext).userDetails;
//   //   const { navigation } = props;
//   const [TerminosCondiciones, setTerminosCondiciones] = useState(false);
//   const [formInfo, setFormInfo] = useState(
//     {
//       Estatura: "168",
//       Peso: "60",
//       Hijos: "0",
//       // Alcohol: "no",
//       // Fuma: "no",
//       CirugiasAnteriores: "1",
//       Enfermedades: "2",
//       Medicamentos: "3",
//       Alergias: "4"
//     }
//   )
//   const [sexo, setsexo] = useState(0);
//   const [men, setmen] = useState(false);
//   const [women, setwomen] = useState(false);
//   const [Fuma, setFuma] = useState(false);
//   const [Alcohol, setAlcohol] = useState(false);
//   const [Load, setLoad] = useState(true);
//   const [FormOn, setFormOn] = useState(false);
//   const [loaded, setloaded] = useState(false);
//   function getSexo(e) {
//     if (e === 1) {
//       setwomen(!women);
//       setsexo(e);
//       if (men === true) { setmen(!men) }
//     }
//     else {
//       setmen(!men);
//       setsexo(e);
//       if (women === true) { setwomen(!women) }
//     }
//   }
//   useEffect(() => {
//     if (men == false && women == false) {
//       setsexo(0)
//     }
//   }, [men || women]);
//   function onChangeText(text, key) {
//     setFormInfo({
//       ...formInfo,
//       [key]: text
//     })
//   }
//   async function sendForm() {
//         const data = { ...formInfo }
//         console.log("data: ", data)
//         if (TerminosCondiciones === false) {
//           Toast.show("Debes aceptar los terminos y condiciones");
//         }
//         else {
//           if (
//             sexo === 0 ||
//             data.Estatura === "" ||
//             data.Peso === "" ||
//             data.Hijos === "" ||
//             // data.Alcohol === "" ||
//             // data.Fuma === "" ||
//             data.CirugiasAnteriores === "" ||
//             data.Enfermedades === "" ||
//             data.Medicamentos === "" ||
//             data.Alergias === ""
//           ) {
//             Toast.show("Debes llenar todos los campos");
//           } else {
//             setFormOn(true);
//             setLoad(true);
//             let newHC = {
//               "id_valoration": props.route.params.data.id_valoration,
//               "id_valoration_scheduled": props.route.params.data.id,
//               "id_client": userDetails.id_client,
//               //"eps": "",
//               "height": data.Estatura,
//               "weight": data.Peso,
//               //"children": "",
//               "number_children": data.Hijos,
//               "alcohol": Alcohol ? "si" : "no",
//               "smoke": Fuma ? "si" : "no",
//               //"surgery": "",
//               "previous_surgery": data.CirugiasAnteriores,
//               //"disease": "",
//               "major_disease": data.Enfermedades,
//               //"medication": "",
//               "drink_medication": data.Medicamentos,
//               //"allergic": "",
//               "allergic_medication": data.Alergias,
//               // "drugs_check": "",
//               // "drugs": "",
//             }
//             console.log("send newHC ", newHC);
//             const response = await clientCreateHC(newHC);
//             if (response === true) {
//               setLoad(false);
//               Toast.show("Datos guardados con exito");
//               setTimeout(() => {
//                  setloaded(true)
//                }, 3000);
//             }
//             else {
//               setLoad(false);
//               Toast.show("Error, Datos no guardados");
//               setFormOn(false);
//             }
//           }
//         }
//   }
//   function goToScreen(screen,data) {
//       let data = props.route.params.data
//       let screen = 'UploadPictures';
//       let from = "Profile";
//       props.navigation.navigate(screen, { randomCode: Math.random() , data, from  })
//   }


  return (
    <SafeAreaView style={{ flex: 1, }}>
<Text>rer</Text>

{/*


      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />


    <ScrollView scrollEventThrottle={16} horizontal={false}>
  <View style={styles.wrapper}>
        <View style={styles.wrap}>
        <Text style={{ textAlign: "center", color: "#777" }}>Para continuar debes completar el siguiente formulario, de este modo podemos ofrecerle un mejor servicio.</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{t("sayGender")}</Text>
          <View style={{
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 35,
            paddingTop: 3,
            backgroundColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-around"
          }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => getSexo(1)} style={styles.btn}>
                {women
                  ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
                  : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
                }
              </TouchableOpacity>
              <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>{t("feminine")}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => getSexo(2)} style={styles.btn}>
                {men
                  ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
                  : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
                }
              </TouchableOpacity>
              <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>{t("male")}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estatura en centimetros (cm)</Text>
          <TextInput
            style={styles.text}
            placeholder={t("example")}
            value={formInfo.Estatura}
            onChangeText={text => onChangeText(text, 'Estatura')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Peso en Kilogramos (Kg)</Text>
          <TextInput
            style={styles.text}
            placeholder={t("example")}
            value={formInfo.Peso}
            onChangeText={text => onChangeText(text, 'Peso')}
          />
        </View>
        {sexo === 1 &&
          <View style={styles.row}>
            <Text style={styles.label}>Hijos</Text>
            <TextInput
              style={styles.text}
              placeholder={t("example")}
              value={formInfo.Hijos}
              onChangeText={text => onChangeText(text, 'Hijos')}
            />
          </View>
        }
        <View style={styles.row}>
          <Text style={styles.label}>Fumas?</Text>
          <View style={{
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 35,
            paddingTop: 3,
            backgroundColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-around"
          }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setFuma(!Fuma)} style={styles.btn}>
                {Fuma
                  ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
                  : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
                }
              </TouchableOpacity>
              <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>si</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setFuma(!Fuma)} style={styles.btn}>
                {!Fuma
                  ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
                  : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
                }
              </TouchableOpacity>
              <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>no</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Alcohol?</Text>
          <View style={{
            borderRadius: 8,
            paddingHorizontal: 10,
            height: 35,
            paddingTop: 3,
            backgroundColor: "#eee",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setAlcohol(!Alcohol)} style={styles.btn}>
                {Alcohol
                  ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
                  : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
                }
              </TouchableOpacity>
              <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>si</Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <TouchableOpacity onPress={() => setAlcohol(!Alcohol)} style={styles.btn}>
//                   {!Alcohol
//                     ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
//                     : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
//                   }
//                 </TouchableOpacity>
//                 <Text style={[styles.label, { marginLeft: 10, marginTop: 5 }]}>no</Text>
//               </View>
//             </View>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Cirugias Anteriores</Text>
//             <TextInput
//               style={styles.text}
//               placeholder={t("example")}
//               value={formInfo.CirugiasAnteriores}
//               onChangeText={text => onChangeText(text, 'CirugiasAnteriores')}
//             />
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Sufre de algunas enfermedades importantes? escriba cuales.</Text>
//             <TextInput
//               style={styles.text}
//               placeholder={t("example")}
//               value={formInfo.Enfermedades}
//               onChangeText={text => onChangeText(text, 'Enfermedades')}
//             />
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>Toma algun medicamento? escriba cuales.</Text>
//             <TextInput
//               style={styles.text}
//               placeholder={t("example")}
//               value={formInfo.Medicamentos}
//               onChangeText={text => onChangeText(text, 'Medicamentos')}
//             />
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.label}>A que medicamento o suturas es alergico?</Text>
//             <TextInput
//               style={styles.text}
//               placeholder={t("example")}
//               value={formInfo.Alergias}
//               onChangeText={text => onChangeText(text, 'Alergias')}
//             />
//           </View>
//           <View style={styles.terminos}>
//             <TouchableOpacity onPress={() => setTerminosCondiciones(!TerminosCondiciones)} style={styles.btn}>
//               {TerminosCondiciones
//                 ? <Icon name="checkmark-square-2-outline" fill={color_primary} width={20} height={20} />
//                 : <Icon name="square-outline" fill={color_fifth} width={20} height={20} />
//               }
//             </TouchableOpacity>
//             <Text style={styles.condiciones}>
//               Acepto las Políticas de tratamiento de datos personales y Políticas de uso y seguridad.
//             </Text>
//           </View>
//           </View>
//           <TouchableOpacity onPress={() => sendForm()} style={styles.btnSend}>
//             <Icon name="checkmark-circle-outline" fill={color_white} width={20} height={20} />
//             <Text style={styles.btnText}>{t("save")}</Text>
//           </TouchableOpacity>
//         </View> 
//       </ScrollView>
//       <Menu props={props} option={0} />
//       {vertical === true &&
//         <MenuVertical
//           width={280}
//           show={vertical}
//           action={setvertical}
//           goToScreen={goToScreen}
//         />
//       }
//       {
//         FormOn &&
//         <View style={{ alignItems: "center", alignContent: "center", position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, justifyContent: "center" }}>
//           {
//             Load &&
//             <View style={{ backgroundColor: "white", width: 200, minHeight: 200, borderRadius: 12, justifyContent: "center", alignItems: "center", alignContent: "center", }}>
//               <ActivityIndicator size="large" color={color_primary} />
//             </View>
//           }
//           {
//             !Load && !loaded &&
//             <View style={{ backgroundColor: "white", width: 200, minHeight: 200, borderRadius: 12, justifyContent: "center", alignItems: "center", alignContent: "center", }}>
//               <Icon name='checkmark-outline' width={50} height={50} fill={color_grey_half} />
//               <Text style={{ width: "90%", textAlign: "center" }}>
//                 Tus datos han sido enviados correctamente...
//               </Text>
//             </View>
//           }
//           {
//             !Load && loaded &&
//             <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", backgroundColor: color_white, width: 300, height: 300, borderRadius: 12 }}>
//               <View style={{ width: 180, height: 180 }}>
//                 <Image
//                   style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
//                   source={require("../../images/listComplete.png")}
//                 />
//               </View>
//               <Text style={{ width: "90%", textAlign: "center" }}>
//                 Aun no has completado los requisitos necesarios para acceder a la video consulta.
//               </Text>
//               <TouchableOpacity onPress={() => goToScreen()} style={{ marginTop: 10, justifyContent: "center", backgroundColor: "#00A7B4", width: "60%", height: 30, borderRadius: 8 }}>
//                 <Text style={{ color: "white", fontSize: 14, fontWeight: "bold", textAlign: "center" }}>Continuar</Text>
//               </TouchableOpacity>
//             </View>
//           }
//         </View>
//       }

              */}
 </SafeAreaView>
 );
} 

// const styles = StyleSheet.create({
//   wrapper: {
//     alignItems: "center",
//     alignContent: "center",
//   },
//   wrap: {
//     borderRadius: 12,
//     marginTop: 20,
//     width: "90%",
//     padding: 20,
//     backgroundColor: "white"
//   },
//   row: {
//     marginVertical: 10,
//     width: "100%",
//     flexDirection: "column"
//   },
//   label: {
//     fontSize: 12,
//     fontWeight: "600",
//     marginBottom: 5
//   },
//   text: {
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     backgroundColor: "#eee"
//   },
//   terminos: {
//     marginTop: 20,
//     flexDirection: "row"
//   },
//   condiciones: {
//     textAlign: "center",
//     fontSize: 12,
//     width: "90%"
//   },
//   btn: {
//     marginTop: 5
//   },
//   btnSend: {
//     flexDirection: "row",
//     marginTop: 20,
//     backgroundColor: color_fifth,
//     borderRadius: 20,
//     padding: 8,
//     width: "60%",
//     justifyContent: "center"
//   },
//   btnText: {
//     marginLeft: 10,
//     textAlign: "center",
//     color: color_white
//   }
// })

export default HistoryClinicForm;





// import React, { useState, useEffect, useCallback } from 'react';
// import { SafeAreaView, StatusBar, ScrollView, StyleSheet, TextInput, Modal, Text, Image, View, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native'

// import UserContext from '../../../contexts/UserContext'
// import Head from '../../components/generic/Head';
// import Menu from '../../components/generic/Menu';
// import MenuVertical from '../../components/generic/MenuVertical.js';
// import { formularios } from '../../services/connection.js';
// import Toast from 'react-native-simple-toast';
// import { Icon } from 'react-native-eva-icons';
// import { useTranslation } from 'react-i18next';
// import LinearGradient from 'react-native-linear-gradient';

// // import BTN from '../components/BTN.js';
// // import { BG1, BG2, colorKappa,  colorDelta } from '../Colors';
// // import { Icon } from 'react-native-eva-icons';

// // import axios from 'axios';
// // import { base_url, serverCrm } from '../Env.js';
// // import Toast from 'react-native-simple-toast';
// // import { zfill} from '../components/Time/logic.js'




// import {
//   color_primary,
//   color_secondary,
//   color_tertiary,
//   color_white,
//   color_white_a,
//   color_black,
//   color_black_a,
//   color_grey_light,
//   color_grey_half,
//   color_grey_dark,
//   color_transparent,
//   color_screen,
//   color_star,
//   color_fifth,
// } from '../../styles/Colors.js'



// function HistoryClinicForm(props) {
//   const { t, i18n } = useTranslation();
//   const [vertical, setvertical] = useState(false);


//   const { navigation } = props
//   const [fuma, setfuma] = useState(false);
//   const [hijos, sethijos] = useState(0);
//   const [gethijos, setgethijos] = useState(false);
//   const [alcohol, setalcohol] = useState(false);
//   const [TerminosCondiciones, setTerminosCondiciones] = useState(false);
//   function countHijos(v) {
//     let valor = hijos + v
//     if (valor <= 0) {
//       sethijos(1);
//       Toast.show("Valor mínimo debe ser 1.")
//     }
//     else {
//       sethijos(valor)
//     }
//   }
//   function onChangeText(text, key) {
//     console.log(text, " ", key)
//     setformInfo({
//       ...formInfo,
//       [key]: text
//     })
//   }
//   {/* ----------------------------------------------------------- */ }
//   const [operacionesGet, setoperacionesGet] = useState(false);
//   const [operacionesLista, setoperacionesLista] = useState([]);
//   const [operacion, setoperacion] = useState({ name: "" });
//   function onChangeTextoperaciones(text, key) {
//     setoperacion({
//       ...operacion,
//       [key]: text
//     })
//   }
//   function operacionAdd() {
//     if (operacion.name === "") {
//       Toast.show("Debe ingresar la descripción.")
//     }
//     else {
//       let count = operacionesLista.length + 1
//       let array = { id: count, descripcion: operacion.name }
//       setoperacionesLista([...operacionesLista, array])
//       onChangeTextoperaciones("", 'name')
//       console.log("array ", array)
//     }
//   }
//   function operacionDel(e) {
//     console.log(e)
//     let update = []
//     for (var i in operacionesLista) {
//       if (operacionesLista[i].id !== e) {
//         update = [...update, operacionesLista[i]]
//       }
//     }
//     setoperacionesLista(update)
//   }
//   {/* ----------------------------------------------------------- */ }
//   const [medicamentosGet, setmedicamentosGet] = useState(false);
//   const [medicamentosLista, setmedicamentosLista] = useState([]);
//   const [medicamento, setmedicamento] = useState({ name: "" });
//   function onChangeTextmedicamentos(text, key) {
//     setmedicamento({
//       ...medicamento,
//       [key]: text
//     })
//   }
//   function medicamentoAdd() {
//     if (medicamento.name === "") {
//       Toast.show("Debe ingresar la descripción.")
//     }
//     else {
//       let count = medicamentosLista.length + 1
//       let array = { id: count, descripcion: medicamento.name }
//       setmedicamentosLista([...medicamentosLista, array])
//       onChangeTextmedicamentos("", 'name')
//       console.log("array ", array)
//     }
//   }
//   function medicamentoDel(e) {
//     console.log(e)
//     let update = []
//     for (var i in medicamentosLista) {
//       if (medicamentosLista[i].id !== e) {
//         update = [...update, medicamentosLista[i]]
//       }
//     }
//     setmedicamentosLista(update)
//   }
//   {/* ----------------------------------------------------------- */ }
//   const [enfermedadesGet, setenfermedadesGet] = useState(false);
//   const [enfermedadesLista, setenfermedadesLista] = useState([]);
//   const [enfermedad, setenfermedad] = useState({ name: "" });
//   function onChangeTextenfermedades(text, key) {
//     setenfermedad({
//       ...enfermedad,
//       [key]: text
//     })
//   }
//   function enfermedadAdd() {
//     if (enfermedad.name === "") {
//       Toast.show("Debe ingresar la descripción.")
//     }
//     else {
//       let count = enfermedadesLista.length + 1
//       let array = { id: count, descripcion: enfermedad.name }
//       setenfermedadesLista([...enfermedadesLista, array])
//       onChangeTextenfermedades("", 'name')
//       console.log("array ", array)
//     }
//   }
//   function enfermedadDel(e) {
//     console.log(e)
//     let update = []
//     for (var i in enfermedadesLista) {
//       if (enfermedadesLista[i].id !== e) {
//         update = [...update, enfermedadesLista[i]]
//       }
//     }
//     setenfermedadesLista(update)
//   }
//   {/* ----------------------------------------------------------- */ }
//   const [alergiasGet, setalergiasGet] = useState(false);
//   const [alergiasLista, setalergiasLista] = useState([]);
//   const [alergia, setalergia] = useState({ name: "" });
//   function onChangeTextalergias(text, key) {
//     setalergia({
//       ...alergia,
//       [key]: text
//     })
//   }
//   function alergiaAdd() {
//     if (alergia.name === "") {
//       Toast.show("Debe ingresar la descripción.")
//     }
//     else {
//       let count = alergiasLista.length + 1
//       let array = { id: count, descripcion: alergia.name }
//       setalergiasLista([...alergiasLista, array])
//       onChangeTextalergias("", 'name')
//       console.log("array ", array)
//     }
//   }
//   function alergiaDel(e) {
//     console.log(e)
//     let update = []
//     for (var i in alergiasLista) {
//       if (alergiasLista[i].id !== e) {
//         update = [...update, alergiasLista[i]]
//       }
//     }
//     setalergiasLista(update)
//   }
//   {/* ----------------------------------------------------------- */ }
//   async function save() {
//     if (TerminosCondiciones === false) {
//       Toast.show("Debes aceptar los terminos y condiciones");
//     }
//     else {
//     setmodal(true)
//     setLoad(true)
//     console.log("saving ...");
//     let data = {
//       id_cita: props.route.params.data.id,
//       id_medic: props.route.params.data.id_medic,
//       id_client: props.route.params.data.id_client,
//       hijos: hijos,
//       fuma: fuma === true ? 'si' : 'no',
//       alcohol: alcohol === true ? 'si' : 'no',
//       peso: float.peso,
//       altura: float.altura,
//       operaciones: operacionesGet === true ? 'si' : 'no',
//       operacionesLista: operacionesGet === true ? operacionesLista : 'N/A',
//       medicamentos: medicamentosGet === true ? 'si' : 'no',
//       medicamentosLista: medicamentosGet === true ? medicamentosLista : 'N/A',
//       enfermedades: enfermedadesGet === true ? 'si' : 'no',
//       enfermedadesLista: enfermedadesGet === true ? enfermedadesLista : 'N/A',
//       alergias: alergiasGet === true ? 'si' : 'no',
//       alergiasLista: alergiasGet === true ? alergiasLista : 'N/A'
//     }
//     await axios.post(base_url(serverCrm, `save/historia/clinica`), data).then(function (response) {
//       setdataActual(response.data[1])
//     })
//       .catch(function (error) {
//         console.log("? error", error);
//       })
//     }
//   }

//   const [float, setfloat] = useState({
//     altura: 150,
//     peso: 50
//   });


//   function onChangedFloat(text, key) {
//     setfloat({
//       ...float,
//       [key]: text
//     })
//   }


//   const [modal, setmodal] = useState(false);
//   const [Load, setLoad] = useState(false);
//   const [dataActual, setdataActual] = useState(null);
//   const [successful, setsuccessful] = useState(false);

//   useEffect(() => {
//     if (dataActual !== null) {
//       setLoad(false)
//       console.log(dataActual)
//       if (dataActual.state === 3) {
//         setsuccessful("done");
//         setTimeout(() => {
//           goToScreen("Sala")
//         }, 5000);
//       }
//       if (dataActual.state === 4) {
//         setsuccessful("cancel");
//         setTimeout(() => {
//           goToScreen("Dashboard")
//         }, 5000);
//       }
//       if (dataActual.photos === "si" && dataActual.state === 0) {
//         setsuccessful("hc");
//         setTimeout(() => {
//           goToScreen("HistoryClinic")
//         }, 5000);
//       }
//       if (dataActual.photos === "si" && dataActual.state === 1) {
//         setsuccessful("ph");
//         setTimeout(() => {
//           goToScreen("UploadPhotos")
//         }, 5000);
//       }
//       if (dataActual.photos === "si" && dataActual.state === 2) {
//         setsuccessful("ready");
//         setTimeout(() => {
//           goToScreen("Sala")
//         }, 5000);
//       }
//       if (dataActual.photos === "no" && dataActual.state === 0) {
//         setsuccessful("hc");
//         setTimeout(() => {
//           goToScreen("HistoryClinic")
//         }, 5000);
//       }
//       if (dataActual.photos === "no" && dataActual.state === 1) {
//         setsuccessful("ready");
//         setTimeout(() => {
//           goToScreen("Sala")
//         }, 5000);
//       }
//     }
//     else { console.log("dataActual null"); }
//   }, [dataActual]);

  // function goToScreen(screen, data) {
  //   //let data = dataActual
  //   navigation.navigate(screen, { randomCode: Math.random(), data })
  // }


// const url = "https://www.youtube.com/watch?v=VEDVL-Z_JhM&t=868s";
// const url1 = "https://pdtclientsolutions.com/phpmyadmin/sql.php?db=telesaludapp&token=47737e342000550ddf1993a8c8990c26&goto=db_structure.php&table=app_telesalud_citas&pos=0";


// const OpenURLButton = ({ url, children }) => {
//       const handlePress = useCallback(async () => {
//         // Checking if the link is supported for links with custom URL scheme.
//         const link = await Linking.canOpenURL(url);
//         if (link) {
//           // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//           // by some browser in the mobile
//           await Linking.openURL(url);
//         } else {
//           Alert.alert(`Don't know how to open this URL: ${url}`);
//         }
//       }, [url]);
//       return <Text style={styles.bold}  onPress={handlePress}> {children} </Text>;
//     };

//   return (


//  <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>

//       <Head props={props} return=""
//         show={vertical}
//         action={setvertical}
//       /> 



      {/*
      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: colorKappa, width: "100%", height: "100%", position: "absolute", zIndex: 999, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
          <View style={{ backgroundColor: color_white, borderRadius: 20, width: "80%", padding: 20, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
            {Load && <ActivityIndicator color={colorDelta} size={50} />}
            {Load && <Text style={{ marginTop: 20 }}>Cargando...</Text>}
            {!Load && successful === "done" &&
              <>
                <View style={{ width: 160, height: 160 }}>
                  <Image
                    style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                    source={require("../images/formOne.png")}
                  />
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, width: "90%", marginVertical: 10 }}>Video valoración realizada.</Text>
              </>
            }
            {!Load && successful === "cancel" &&
              <>
                <View style={{ width: 160, height: 160 }}>
                  <Image
                    style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                    source={require("../images/formOne.png")}
                  />
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, width: "90%", marginVertical: 10 }}>Video valoración cancelada</Text>
              </>
            }
            {!Load && successful === "hc" &&
              <>
                <View style={{ width: 160, height: 160 }}>
                  <Image
                    style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                    source={require("../images/formOne.png")}
                  />
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, width: "90%", marginVertical: 10 }}>Aun no has completado los requisitos para entrar a la video valoración. {"\n"} Sólo falta un paso.</Text>
              </>
            }
            {!Load && successful === "ph" &&
              <>
                <View style={{ width: 160, height: 160 }}>
                  <Image
                    style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                    source={require("../images/formOne.png")}
                  />
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, width: "90%", marginVertical: 10 }}>Aun no has completado los requisitos para entrar a la video valoración. {"\n"} Sólo falta un paso.</Text>
              </>
            }
            {!Load && successful === "ready" &&
              <>
                <View style={{ width: 160, height: 160 }}>
                  <Image
                    style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                    source={require("../images/formThree.png")}
                  />
                </View>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, width: "90%", marginVertical: 10 }}>Has completado los requisitos para entrar a la video valoración.</Text>
              </>
            }
          </View>
        </View>
      </Modal>
      <StatusBar barStyle="light-content" backgroundColor={color_secondary} />
      <LinearGradient colors={[color_secondary, color_primary, color_fifth, color_fifthLight, color_primary]} style={styles.imageBackground}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.wrap}>
              <View style={{ marginTop: 20, paddingBottom: 10, borderBottomColor: "silver", borderBottomWidth: 1, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, width: "90%", }}>Historia Clínica.</Text>
                <View style={{ width: 180, height: 140 }}>
                  <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={require("../images/formOne.png")} />
                </View>
                <Text style={{ textAlign: "center", fontSize: 12, width: "90%", color: "#777", marginVertical: 10 }}>Complete el siguiente formulario correctamente.</Text>
              </View>
              {/* ----------------------------------------------------------- *}
              <View style={[styles.bigGroup, { borderBottomColor: "silver", paddingVertical: 10, borderBottomWidth: 1 }]}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text style={{ marginLeft: 10, width: "30%", fontSize: 14, fontWeight: "bold", lineHeight: 35 }}>Altura (cm):</Text>
                  <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <TextInput
                      style={{width:"70%",textAlign:"center", borderColor: "silver", lineHeight: 15, height: 40, fontSize: 14, borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, }}
                      keyboardType="numeric"
                      onChangeText={text => onChangedFloat(text, 'altura')}
                      value={float.altura}
                      maxLength={10}
                    />
                  </View>
                </View>
              </View>
              {/* ----------------------------------------------------------- *}
              <View style={[styles.bigGroup, { borderBottomColor: "silver", paddingVertical: 10, borderBottomWidth: 1 }]}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text style={{ marginLeft: 10, width: "30%", fontSize: 14, fontWeight: "bold", lineHeight: 35 }}>Peso (Kg):</Text>
                  <View style={{ width: "70%", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <TextInput
                      style={{width:"70%",textAlign:"center", borderColor: "silver", lineHeight: 15, height: 40, fontSize: 14, borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, }}
                      keyboardType="numeric"
                      onChangeText={text => onChangedFloat(text, 'peso')}
                      value={float.peso}
                      maxLength={10}
                    />
                  </View>
                </View>
              </View>
              {/* ----------------------------------------------------------- *}
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
              {/* ----------------------------------------------------------- *}
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
              {/* ----------------------------------------------------------- *}
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
              {/* ----------------------------------------------------------- *}
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
              {/* ----------------------------------------------------------- *}
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
              {/* ----------------------------------------------------------- *}
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
              {/* ----------------------------------------------------------- *}
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
                    {
                      alergiasLista.length >= 1 && alergiasLista.map((i, key) => {
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
                        placeholderTextColor="#777" placeholder="Describa la alergia." value={alergia.name} onChangeText={text => onChangeTextalergias(text, 'name')} />
                      <TouchableOpacity style={styles.bigGroupAdd} onPress={() => alergiaAdd()}>
                        <Icon name='save-outline' height={30} width={30} fill={color_fifth} />
                      </TouchableOpacity>
                    </View>
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
                <Text style={{ left: 10, textAlign: "center", fontSize: 12, width: "85%",}}>
                    Acepto las
                    <OpenURLButton url={url}><Text style={{fontWeight : "bold"}}> Política de tratamientos de la información </Text></OpenURLButton>
                    de tratamiento de datos personales y Políticas de uso y seguridad.
                  </Text>
              </View>
              <View style={{ alignContent: "center", alignItems: "center", marginTop: 15 }}>
                <BTN icon="save-outline" text="Guardar" function={save} w={"60%"} data={'adcd'} />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      */}



// <Menu props={props} option={0} />
//     {vertical === true &&
//       <MenuVertical
//         width={280}
//         show={vertical}
//         action={setvertical}
//         goToScreen={goToScreen}
//       />
//     }

//     </SafeAreaView>
//   )
// }
// export default HistoryClinicForm;


// const styles = StyleSheet.create({
//   imageBackground: {
//     flex: 1,
//     justifyContent: "center",
//     resizeMode: "cover",
//     width: "100%",
//     height: "100%"
//   },
//   wrapper: {
//     paddingTop: 50,
//     paddingBottom: 60,
//     width: "100%",
//     flexDirection: "column",
//     alignContent: "center",
//     alignItems: "center"
//   },
//   wrap: {
//     flexDirection: "column",
//     backgroundColor: color_white,
//     marginBottom: 20,
//     width: "90%",
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//     borderRadius: 20
//   },
//   bigGroup: {
//     flexDirection: "column"
//   },
//   bigGroupHead: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     borderBottomColor: "silver",
//     borderBottomWidth: 1,
//     paddingVertical: 10,
//   },
//   bigGroupLabel: {
//     fontWeight: "bold",
//     fontSize: 14,
//     lineHeight: 30,
//     paddingLeft: 10,
//     textAlign: "left",
//     width: "60%",
//   },
//   bigGroupBTN: {
//     flexDirection: "row",
//     width: "16%",
//     marginHorizontal: "2%"
//   },
//   bigGroupBTNText: {
//     lineHeight: 30
//   },
//   bigGroupCard: {
//     backgroundColor: "rgba(0,0,0,0.05)",
//     borderBottomColor: "silver",
//     borderBottomWidth: 1,
//     width: "100%",
//     flexDirection: "row"
//   },
//   bigGroupCardText: {
//     padding: 15,
//     textAlign: "justify",
//     color: "#555",
//     width: "90%",
//     fontSize: 14,
//     lineHeight: 20
//   },
//   bigGroupCardBTN: {
//     right: 10,
//     width: "10%",
//     justifyContent: "center",
//     alignItems: "center",
//     alignContent: "center"
//   },
//   bigGroupFoot: {
//     flexDirection: "row",
//     marginVertical: 10,
//     width: "100%",
//     marginBottom: 40
//   },
//   bigGroupFootInput: {
//     backgroundColor: color_white,
//     height: 50,
//     borderTopLeftRadius: 12,
//     borderBottomLeftRadius: 12,
//     borderTopRightRadius: 25,
//     borderBottomRightRadius: 25,
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center",
//     borderColor: "silver",
//     borderWidth: 1,
//     width: "100%",
//     paddingHorizontal: 10
//   },
//   bigGroupAdd: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     backgroundColor: color_white,
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center",
//     borderColor: "silver",
//     borderWidth: 1
//   },
//   column: {
//     flexDirection: "column",
//     marginBottom: 10
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: color_fifth,
//     margin: 10,
//     textTransform: "capitalize"
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-around"
//   },
//   TextInput: {
//     color: color_fifth,
//     width: "70%",
//     textAlign: "center",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     borderWidth: 1,
//     borderColor: color_fifth
//   },
//   text: {
//     color: color_fifth,
//     lineHeight: 35,
//     width: "70%",
//     textAlign: "center",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//     borderWidth: 1,
//     borderColor: color_fifth
//   },
//   BTN_TEN: {
//     width: "10%",
//     height: 40,
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center"
//   },
//   BTN_TEXT: {
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: color_fifth,
//     width: "10%",
//     height: 40,
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center"
//   }
// });