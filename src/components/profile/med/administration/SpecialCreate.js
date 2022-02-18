import React, { useState, useEffect, useContext } from 'react'
import { Keyboard, StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';

import UserContext from '../../../../../contexts/UserContext'
import { specials } from '../../../../services/connection.js';
import FilterByLocation from '../../../filters/FilterByLocation'
import { file_server1 } from '../../../../../Env';
import CardNurse from './SpecialCard.js';
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
} from '../../../../styles/Colors';
const windowWidth = Dimensions.get('window').width;
function SpecialCreate(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [successfully, setsuccessfully] = useState(false);
  const [Load, setLoad] = useState(false);
  const [Location, setLocation] = useState(false);

  return (
    <View style={{
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20
    }}>

      <Text>create</Text>
    </View>
  )
}
export default React.memo(SpecialCreate);
const styles = StyleSheet.create({});


// ....
// import React, { useState, useEffect, } from 'react'
// import { StyleSheet, View, TouchableOpacity, TextInput, Text, Image,  ScrollView, Modal, Touchable } from 'react-native'
// import { useTranslation } from 'react-i18next';
// import { Icon } from 'react-native-eva-icons';
// import { colorBetta, colorKappa, colorZeta } from '../../styles/Colors';
// import { specials, procedures } from '../../services/connection.js'
// import Toast from 'react-native-simple-toast';
// import { currencyFormat } from '../../functions/Functions.js'


// function SpecialsCreate(props) {
//   const { t, i18n } = useTranslation();
//   const [modal, setmodal] = useState(false);
//   const [proceduresGroups, setproceduresGroups] = useState([]);
//   const [procedureSelected, setprocedureSelected] = useState(null);
//   const [coin, setcoin] = useState("$.");
//   const [descount, setdescount] = useState(0);
//   const [picture, setpicture] = useState("");

// const example = "../../images/solo-fondo.jpg"



//   useEffect(() => {
//     Get()
//   }, [props]);

//   async function Get() {
//     const services = await procedures.proceduresList(i18n.language);
//     setproceduresGroups(services);
//   }

//   function GetProcedure(a) {
//     // {"basedon": 0,
//     // "description": "",
//     // "foto": "",
//     // "foto_after": "",
//     // "foto_before": "",
//     // "id": 18,
//     // "id_category": 3,
//     // "information": "",
//     // "name": "BREAST LIFT",
//     // "rating": 0,
//     // "state": 0}
//     setprocedureSelected(a)
//     setmodal(false)
//   }


//   useEffect(() => {
//     if (procedureSelected !== null) {
//       onChangeText(procedureSelected.id, "id_procedure")
//     }
//   }, [procedureSelected]);

//   const [data, setdata] = useState(
//     {
//       id_procedure: "",
//       status: "",
//       title: "",
//       description: "",
//       banner: "",
//       date_limit: "",
//       price: 0,
//       price_offer: 0,
//     }
//   );

//   const [items, setitems] = useState([
//     {
//       id_specials: "",
//       name: "",
//       description: "",
//     },
//   ]);


//   function onChangeText(text, key) {
//     setdata({
//       ...data,
//       [key]: text
//     })
//   }


//   function apply() {
//     if (data.price === 0) {
//       Toast.show("Debe ingresar un valor!")
//     }
//     else {
//       if (descount === 0) {
//         Toast.show("Debe ingresar un valor!")
//       }
//       else {
//         const descount = descount
//         const price = data.price
//         let result = (descount / price) * 100
//         onChangeText(result, " price_offer")
//       }
//     }
//   }


//   function uploadFile() {
//     console.log("....")
//   }

//   return (
//     <View style={styles.form}>










//       <TouchableOpacity onPress={() => uploadFile()}>



//         {/* <View style={{ backgroundColor: "silver", width: 100, height: 100, overflow: "hidden" }}></View> */}







//         <View style={{
//           borderBottomColor: "rgba(255,255,255,0.5)",
//           borderBottomWidth: 1,
//           justifyContent: "center",
//           height: 120,
//           alignItems: "center",
//           backgroundColor: "rgba(255,255,255,0.1)"
//         }}>


// <Image source={require(example)} style={{resizeMode:"cover", width:80, height: 80, flex:1}} />




//           {/* <Icon name="image-outline" width={50} height={50} fill={"rgba(255,255,255,0.5)"} />
//           <Text style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>upload image</Text>
//         */}
       
       
       
//         </View>


//       </TouchableOpacity>







//       <TouchableOpacity style={styles.row}
//         onPress={() => setmodal(!modal)}>
//         <View style={styles.icon}>
//           <Icon name="activity-outline" height={30} width={30} fill={'#fff'} />
//         </View>
//         <View style={styles.col}>
//           <Text style={styles.title}>Procedimiento</Text>
//           <Text style={[styles.input, { color: procedureSelected === null ? "#555" : "#000" }]}>
//             {procedureSelected === null ?
//               "selecciona un procedimiento"
//               :
//               procedureSelected.name
//             }
//           </Text>
//           {procedureSelected !== null &&
//             <TouchableOpacity
//               onPress={() => setprocedureSelected(null)}
//               style={{
//                 position: "absolute",
//                 right: 15,
//                 top: 32
//               }}>
//               <Icon name="trash-outline" height={25} width={25} fill={'#FFF'} />
//             </TouchableOpacity>
//           }
//         </View>
//       </TouchableOpacity>






//       <View style={styles.row}>
//         <View style={styles.icon}>
//           <Icon name="edit-outline" height={30} width={30} fill={'#fff'} />
//         </View>
//         <View style={styles.col}>
//           <Text style={styles.title}>Título</Text>
//           <TextInput
//             style={styles.input}
//             value={data.title}
//             placeholder={"Título"}
//             placeholderTextColor="#555"
//             // keyboardType={'email-address'}
//             // editable={editable}
//             onChangeText={text => onChangeText(text, 'title')} />
//         </View>
//       </View>

//       <View style={styles.row}>
//         <View style={styles.icon}>
//           <Icon name="edit-outline" height={30} width={30} fill={'#fff'} />
//         </View>
//         <View style={styles.col}>
//           <Text style={styles.title}>description</Text>
//           <TextInput
//             multiline={true}
//             numberOfLines={4}
//             style={styles.input}
//             value={data.description}
//             placeholder={"description"}
//             placeholderTextColor="#555"
//             // keyboardType={'email-address'}
//             // editable={editable}
//             onChangeText={text => onChangeText(text, 'description')} />
//         </View>
//       </View>











//       <View style={styles.row}>
//         <View style={styles.icon}>
//           <Icon name="edit-outline" height={30} width={30} fill={'#fff'} />
//         </View>
//         <View style={styles.col}>
//           <Text style={styles.title}>Precio</Text>
//           <TextInput
//             // multiline={true}
//             // numberOfLines={4}
//             keyboardType='numeric'
//             style={styles.input}
//             value={data.price}
//             placeholder={"price"}
//             placeholderTextColor="#555"
//             onChangeText={text => onChangeText(text, 'price')} />
//         </View>
//       </View>



//       <View style={styles.row}>
//         <View style={styles.icon}>
//           <Icon name="edit-outline" height={30} width={30} fill={'#fff'} />
//         </View>
//         <View style={styles.col}>
//           <Text style={styles.title}>Descuento</Text>
//           <View style={{ flexDirection: "row" }}>
//             <TextInput
//               style={[styles.input, { width: "75%" }]}
//               value={descount}
//               keyboardType='numeric'
//               placeholder={"price"}
//               placeholderTextColor="#555"
//               onChangeText={text => setdescount(text)}
//             />
//             <TouchableOpacity
//               onPress={() => apply()}
//               style={{
//                 marginTop: -8,
//                 borderRadius: 12,
//                 borderColor: colorZeta,
//                 borderWidth: 1,
//                 alignSelf: "center",
//                 backgroundColor: colorBetta,
//                 paddingVertical: 8,
//                 paddingHorizontal: 20
//               }}>
//               <Text style={{ color: colorZeta }}>Aplicar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>









//       <Modal animationType="slide" transparent={true} visible={modal}>
//         <View style={styles.modalWrapper}>
//           <View style={styles.modalWrap}>
//             <View style={styles.modalWrapHead}>
//               <Text style={styles.modalWrapHeadTitle}>ertert</Text>
//               <TouchableOpacity
//                 style={styles.modalWrapHeadBtn}
//                 onPress={() => setmodal(!modal)}>
//                 <Icon name="close" height={30} width={30} fill={'#fff'} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.modalWrapBody}>
//               <ScrollView>
//                 {proceduresGroups.map((i, key) => {
//                   return (
//                     <CATEGOTY key={key} data={i} GetProcedure={GetProcedure} />
//                   )
//                 })}
//               </ScrollView>
//             </View>
//           </View>
//         </View>
//       </Modal>

//     </View>
//   )
// }

// const CATEGOTY = (props) => {
//   const [open, setopen] = useState(false);
//   return (
//     <>
//       <TouchableOpacity onPress={() => setopen(!open)} style={styles.modalWrapBodyCategoryBtn}>
//         <Text style={styles.modalWrapBodyCategoryName}>{props.data.name}</Text>
//         <Icon name={open === true ? "arrow-ios-downward-outline" : "arrow-ios-forward-outline"} height={25} width={25} fill={'#999'} />

//       </TouchableOpacity>
//       {open === true &&
//         <View style={styles.modalWrapBodyCategoryGroupList}>
//           {props.data.child.map((i, key) => {
//             return (
//               <TouchableOpacity key={key} onPress={() => props.GetProcedure(i)}
//                 style={styles.modalWrapBodyCategoryGroupBtn}>
//                 <Text style={styles.modalWrapBodyCategoryGroupName}>{i.name}</Text>
//               </TouchableOpacity>
//             )
//           })}
//         </View>
//       }
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   form: {
//     marginVertical: 10,
//     borderRadius: 12,
//     flexDirection: "column",
//     backgroundColor: "rgba(255,255,255,0.2)"
//   },
//   row: {
//     //backgroundColor: "rgba(255,0,0,0.4)",
//     //overflow: "hidden",
//     //borderRadius: 12,
//     flexDirection: "row",
//     //marginBottom: 5,
//   },
//   icon: {
//     display: "none",
//     paddingTop: 10,
//     width: "15%",
//     //backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   col: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     width: "100%", //"85%"
//     flexDirection: "column"
//   },
//   title: {
//     marginLeft: 5,
//     marginBottom: 5,
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "white"
//   },
//   input: {
//     marginBottom: 10,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     backgroundColor: "rgba(255,255,255,0.2)",
//   },




//   modalWrapper: {
//     position: "absolute",
//     zIndex: 999,
//     width: "100%",
//     height: "100%",
//     backgroundColor: colorKappa,
//     justifyContent: "center",
//   },
//   modalWrap: {
//     borderRadius: 12,
//     width: "80%",
//     alignSelf: "center",

//     overflow: "hidden",
//     maxHeight: "90%"
//   },
//   modalWrapHead: {
//     padding: 5,
//     flexDirection: "row",
//     backgroundColor: colorBetta,
//     width: "100%",
//   },
//   modalWrapHeadTitle: {
//     textTransform: "uppercase",
//     lineHeight: 30,
//     width: "90%",
//     color: colorZeta,
//     fontSize: 16, fontWeight: "bold",
//     paddingLeft: 20
//   },
//   modalWrapHeadBtn: {
//     width: "10%",
//   },
//   modalWrapBody: {
//     backgroundColor: "rgba(255,255,255,0.4)"
//   },
//   modalWrapBodyCategoryBtn: {
//     borderBottomColor: "#ccc",
//     borderBottomWidth: 1,
//     flexDirection: "row",
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     justifyContent: "space-between",
//     backgroundColor: "rgb(255,255,255)",
//   },
//   modalWrapBodyCategoryName: {
//     marginLeft: 15
//   },
//   modalWrapBodyCategoryGroupList: {
//     paddingHorizontal: 10,
//     backgroundColor: "rgba(0,0,0,0.1)",
//   },
//   modalWrapBodyCategoryGroupBtn: {
//     borderBottomColor: "#ccc",
//     borderBottomWidth: 1,
//     paddingVertical: 5,
//     paddingHorizontal: 10,

//     backgroundColor: "white",
//   },
//   modalWrapBodyCategoryGroupName: {
//     color: colorBetta
//   },
// })
// export default SpecialsCreate;