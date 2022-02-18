import React, { useState, useEffect, useContext } from 'react'
import { Keyboard, StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';

import UserContext from '../../../../../contexts/UserContext'
import { homeRecovery } from '../../../../services/connection.js';
import FilterByLocation from '../../../filters/FilterByLocation'


// import HomeRecoveryEdit from './HomeRecoveryEdit';

import { file_server1 } from '../../../../../Env';

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

const windowWidth = Dimensions.get('window').width - 10;
function HomeRecoveryCreate(props) {

  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [data, setdata] = useState({ id: userDetails.id, name: "", descripcion: "", banner: "", adress: "", distrito: "", country: "", id_country: "", city: "", id_city: "" });
  const [successfully, setsuccessfully] = useState(false);
  const [Load, setLoad] = useState(false);
  const [Location, setLocation] = useState(false);

  const [error, seterror] = useState(0);
  function onChangeText(text, key) {
    setdata({
      ...data,
      [key]: text
    })
  }

  async function getLocation(i) {
    const res1 = i[1].name;
    const res2 = i[1].id;
    const res3 = i[2].CiudadDistrito;
    const res4 = i[2].name;
    const res5 = i[2].id;
    setdata({
      ...data,
      "country": res1,
      "id_country": res2,
      "distrito": res3,
      "city": res4,
      "id_city": res5,
    })
  }

  useEffect(() => {
    if (successfully === true) {
      setTimeout(() => {
        setLoad(false)
        setsuccessfully(false)
      }, 3000);
    }
  }, [successfully]);


  async function save() {
    console.log("savig.....")
    if (data.name === "") { Toast.show("error 1"); seterror(1) }
    else {
      if (data.descripcion === "") { Toast.show("error 2"); seterror(2) }
      else {
        if (data.banner === "") { Toast.show("error 3"); seterror(3) }
        else {
          if (
            data.adress === "" &&
            data.distrito === "" &&
            data.country === "" &&
            data.id_country === "" &&
            data.city === "" &&
            data.id_city === ""
          ) { Toast.show("error 4") }
          else {
            setLoad(true)
            const res = await homeRecovery.create(data)
            if (res === true) {
              setsuccessfully(true)
            }
          }
        }
      }
    }
  }

  return (
    <View style={{
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20
    }}>
      {successfully === true ?
        <View style={{
          flexDirection: "column", backgroundColor: color_white, width: "60%", alignItems: "center", paddingVertical: 15, borderRadius: 12, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Icon name='checkmark-circle-outline' width={60} height={60} fill={color_fifth} />
          <Text style={{ textAlign: "center", color: color_fifth }}>Guardado!</Text>
        </View>
        :
        <>
          {data.banner !== "" &&
            <TouchableOpacity onPress={() => onChangeText("", 'banner')} style={{ zIndex: 999, backgroundColor: "white", width: 30, height: 30, borderRadius: 30, position: "absolute", right: 10, top: 25, justifyContent: "center", alignItems: "center" }}>
              <Icon name={'close'} height={30} width={30} fill={"rgba(0,0,0,0.25)"} />
            </TouchableOpacity>
          }
          <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                onChangeText(avatar, 'banner')
              }
            }}
          >
            {data.banner === "" ?
              <View style={{ flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 10, justifyContent: "center", alignItems: "center", paddingHorizontal: 50, paddingVertical: 20, borderRadius: 12 }}>
                <Icon name={'image-outline'} height={30} width={30} fill={color_grey_light} />
                <Text style={{ color: color_grey_light, fontSize: 18 }}>seleccionar una imagen</Text>
              </View>
              :
              <Image
                style={{ borderRadius: 20, resizeMode: 'cover', marginBottom: 20, width: windowWidth, height: windowWidth / 2 }}
                source={require('../../../../images/flight.jpg')}
              />
            }
          </PhotoUpload>
          
          <View style={styles.group}>
            <Text style={styles.label}>nombre</Text>
            <TextInput
              style={styles.input}
              value={data.name}
              placeholder="Nombre o Razón Social"
              placeholderTextColor={color_grey_half}
              onChangeText={text => onChangeText(text, 'name')}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>descripcion</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              value={data.descripcion}
              placeholder="Descripción"
              placeholderTextColor={color_grey_half}
              onChangeText={text => onChangeText(text, 'descripcion')}
            />
          </View>
          <TouchableOpacity style={styles.group}
            onPress={() => setLocation(!Location)}>
            <Text style={styles.label}>Direccion</Text>
            {data.city !== "" &&
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.country}</Text>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.distrito}</Text>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.city}</Text>
              </View>
            }
            {data.city === "" ? <View style={[styles.input, { height: 50 }]}></View> :
              <TextInput
                style={styles.input}
                value={data.adress}
                placeholder="Dirección"
                placeholderTextColor={color_grey_half}
                onChangeText={text => onChangeText(text, 'adress')}
              />
            }
          </TouchableOpacity>
          {!Load &&
            <TouchableOpacity style={[styles.btn]} onPress={() => save()}>
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>
          }
          {Load &&
            <View style={{
              alignSelf: "center",
              marginTop: 20,
              backgroundColor: color_fifth,
              width: "60%",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <ActivityIndicator color={color_white} size={30} />
              <Text style={{ color: "white", fontSize: 14, marginTop: 5 }}>guardando...</Text>
            </View>
          }
        </>
      }






     <FilterByLocation title={""} color={color_fifth} show={Location} setShow={setLocation} getInfo={getLocation} />

    </View>
  )
}
export default React.memo(HomeRecoveryCreate);



const styles = StyleSheet.create({
  group: {
    borderColor: color_grey_light,
    borderWidth: 0.5,
    flexDirection: "column",
    width: "95%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,

  },


  label: {
    marginBottom: 5,
    color: color_grey_half,
    marginLeft: 15,
    textTransform: "capitalize"
  },

  input: {
    color: color_grey_dark,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12
  },

  btn: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: color_fifth,
    width: "60%",
    borderRadius: 12,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  btnText: {
    color: color_white,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    padding: 10,
  }
});



//    <Loading show={Load} status={successfully} />

// const Loading = (props) => {
//   const { t, i18n } = useTranslation();
//   if (props.show === true) {
//     return (
//       <View style={{
//         position: "absolute",
//         zIndex: 999,
//         width: "95%",
//         alignSelf: "center",
//         height: "100%",
//         flex: 1,
//         marginTop: 10,
//         borderRadius: 20,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         alignItems: "center",
//         justifyContent: "center",
//         paddingVertical: 100
//       }}>
//         {
//           props.status === true ?
//             <Icon name={'checkmark-circle-outline'} height={80} width={80} fill={color_white} />
//             :
//             <>
//               <ActivityIndicator color={color_white} size={30} />
//               <Text style={{ color: "white", marginTop: 10 }}>guardando...</Text>
//             </>
//         }
//       </View>
//     )
//   }
//   else {
//     return (<></>)
//   }
// }









// const FormBeta = (props) => {
//   const { t, i18n } = useTranslation();
//   const [successfully, setsuccessfully] = useState(false);
//   const [Load, setLoad] = useState(true);
//   const [homes, sethomes] = useState([]);
//   const [showListHomes, setshowListHomes] = useState(true);
//   const [Home, setHome] = useState(null);//selected
//   const [rooms, setrooms] = useState([]);
//   const [showRooms, setshowRooms] = useState(false);
//   const [thisRoom, setthisRoom] = useState(null); //selected
//   const [includedServices, setincludedServices] = useState([]);
//   const [services, setservices] = useState("");
//   const [keyboardStatus, setKeyboardStatus] = useState(false);
//   useEffect(() => {
//     Get()
//   }, [props]);
//   async function Get() {
//     const hauses = await homeRecovery.AllMyHome(props.userDetails.id, i18n.language)
//     sethomes(hauses)
//   }
//   useEffect(() => {
//     if (homes.length !== 0) {
//       setLoad(false)
//     }
//   }, [homes]);
//   useEffect(() => {
//     if (Home !== null) {
//       getrooms()
//     }
//   }, [Home]);
//   async function getrooms() {
//     const res = await homeRecovery.room(Home.id, i18n.language)
//     setrooms(res);
//     // setshowRooms(true);
//   }
//   const [descriptionHomeRecoveryShow, setdescriptionHomeRecoveryShow] = useState(false);
//   return (
//     <View style={{ alignItems: "center", paddingTop: 20 }}>
//       {Home !== null &&
//         <View style={{
//           padding: 10,
//           flexDirection: "row",
//           backgroundColor: "rgba(255,255,255,0.2)",
//           width: "90%",
//           alignSelf: "center",
//           borderRadius: 8
//         }}>
//           <TouchableOpacity
//             onPress={() => [setHome(null), setshowListHomes(true), setthisRoom(null), setshowRooms(true)]}
//             style={{ backgroundColor: colorBetta, position: "absolute", top: 0, right: 0, zIndex: 9999, padding: 5, borderBottomLeftRadius: 20 }}
//           >
//             <Icon name={'close-outline'} height={25} width={25} fill={color_white} />
//           </TouchableOpacity>
//           <View style={{ width: 80, height: 80, borderRadius: 80, overflow: "hidden" }}>
//             <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
//               source={{ uri: `${file_server1}/img/wellezy/home_recovery/${Home.banner}` }}
//             />
//           </View>
//           <View style={{ paddingLeft: 15, width: "70%", flexDirection: "column" }}>
//             <Text style={{ fontWeight: "bold", fontSize: 18 }}>{Home.name}</Text>
//             <Text>{Home.adress}, {Home.city}</Text>
//             <Text>{Home.distrito} - {Home.country}</Text>
//             <TouchableOpacity
//               onPress={() => setdescriptionHomeRecoveryShow(!descriptionHomeRecoveryShow)}
//               style={{ marginTop: 5, backgroundColor: colorBetta, padding: 5, borderRadius: 20 }}>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   color: "white"
//                 }}>
//                 {descriptionHomeRecoveryShow === true ? 'ocultar descripción' : 'ver descripción'}
//               </Text>
//             </TouchableOpacity>
//             {descriptionHomeRecoveryShow &&
//               <Text style={{ textAlign: "justify" }}>{Home.description}</Text>
//             }
//           </View>
//         </View>
//       }
//       {
//         thisRoom !== null &&
//         <View style={{ padding: 10, backgroundColor: "rgba(255,255,255,0.2)", marginTop: 10, width: "90%", alignSelf: "center", borderRadius: 8 }}>
//           <TouchableOpacity
//             onPress={() => [setthisRoom(null), setshowRooms(true)]}
//             style={{ backgroundColor: colorBetta, position: "absolute", top: 0, right: 0, zIndex: 9999, padding: 5, borderBottomLeftRadius: 20 }}
//           >
//             <Icon name={'close-outline'} height={25} width={25} fill={color_white} />
//           </TouchableOpacity>
//           <Text>{thisRoom.name}</Text>
//           <Text>{thisRoom.description}</Text>
//           <Text>status: {thisRoom.status}</Text>
//           <View style={{ paddingVertical: 5, borderTopColor: color_white, borderTopWidth: 1 }}>
//             <Text style={{ marginTop: 15, fontSize: 16, color: color_white, fontWeight: "bold", textAlign: "center", backgroundColor: colorBetta, padding: 10 }}>imagenes</Text>
//             <View style={{ flexDirection: "column" }}>
//               <View style={{
//                 backgroundColor: "rgba(255,255,255,0.5)",
//                 flexDirection: "row",
//                 flexWrap: "wrap",
//                 justifyContent: "center"
//               }}>
//                 {thisRoom.imagenes.map((i, key) => {
//                   return (
//                     <TouchableOpacity key={key} style={{}}>
//                       <Image
//                         style={{ margin: 5, borderRadius: 5, width: 100, height: 100, resizeMode: "cover" }}
//                         source={{ uri: `${file_server1}/img/wellezy/home_recovery/${i.image}` }}
//                       />
//                     </TouchableOpacity>
//                   )
//                 })}
//               </View>
//               <TouchableOpacity
//                 //onPress={() => getServices()}
//                 style={{
//                   alignSelf: "center",
//                   borderColor: "white",
//                   borderWidth: 2,
//                   padding: 5,
//                   borderRadius: 100,
//                   borderStyle: "dashed",
//                   marginVertical: 5
//                 }}>
//                 <Icon name={'image-outline'} height={45} width={45} fill={"#fff"} />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={{ paddingVertical: 5, borderTopColor: color_white, borderTopWidth: 1 }}>
//             <Text style={{ marginTop: 15, fontSize: 16, color: color_white, fontWeight: "bold", textAlign: "center", backgroundColor: colorBetta, padding: 10 }}>services</Text>
//             <View style={{}}>
//               {thisRoom.services.map((i, key) => {
//                 return (
//                   <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: color_white, }}>
//                     <View style={{ flexDirection: "row", width: "70%" }}>
//                       <Icon name={'checkmark-outline'} height={30} width={30} fill={color_white} style={{ top: 5 }} />
//                       <View style={{ flexDirection: "column", paddingLeft: 5, width: "90%" }}>
//                         <Text style={{}}>{i.name}</Text>
//                         <Text style={{ textAlign: "justify", }}>{i.description}</Text>
//                       </View>
//                     </View>
//                     <View style={{ flexDirection: "row", width: "30%", justifyContent: "space-around" }}>
//                       <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
//                         <Icon name={'edit-outline'} height={30} width={30} fill={color_white} />
//                       </TouchableOpacity>
//                       <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", padding: 8 }}>
//                         <Icon name={'close-outline'} height={30} width={30} fill={color_white} />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 )
//               })}
//               <View style={{ marginVertical: 10 }}>
//                 <TextInput
//                   placeholder={"Servicios Incluidos"}
//                   style={{
//                     borderColor: "white",
//                     borderWidth: 0.5,
//                     width: "100%",
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                     borderRadius: 12,
//                     fontSize: 18
//                   }}
//                   value={services}
//                   placeholderTextColor="rgba(255,255,255,0.5)"
//                   onChangeText={text => setservices(text)}
//                 />
//                 <TouchableOpacity onPress={() => getServices()} style={{ position: "absolute", right: 5, top: 2 }}>
//                   <Icon name={services === "" ? 'plus-circle-outline' : 'checkmark-circle-2-outline'} height={45} width={45} fill={"#fff"} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       }
//       {
//         showListHomes === true && homes.map((i, key) => {
//           return (
//             <TouchableOpacity key={key} onPress={() => [setHome(i), setshowListHomes(false)]}>
//               <Text>{i.name}</Text>
//             </TouchableOpacity>
//           )
//         })
//       }
//       {
//         showRooms === true && rooms.length !== 0 && rooms.map((i, key) => {
//           return (
//             <TouchableOpacity
//               key={key}
//               onPress={() => [setthisRoom(i), setshowRooms(false)]}
//               style={{backgroundColor:"red", width:"90%"}}
//             >
//               <Text>{key+1}.  {i.name}</Text>
//             </TouchableOpacity>
//           )
//         })
//       }
// {/* 
//       {
//         showRooms === true && rooms.length === 0 &&
//         <View style={{ width:"90%", borderRadius:12, padding:12}}>
//           <Text style={{width:"60%",alignSelf:"center", color:"white", padding:15, fontWeight:"700", fontSize:16, textAlign:"center", borderRadius:12, borderColor:"white", borderWidth:1, borderStyle:"dashed"}}>EMPTY</Text>
//           <Text>registrar nueva habitacion</Text>
//         </View>
//       } */}
//       <TouchableOpacity style={[styles.btn]}
//       //onPress={() => save()}
//       >
//         <Text style={styles.btnText}>Guardar</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }
// //   /* _______________________________________________________________________________ */
// //   // useEffect(() => {
// //   //   if (Home !== null) {
// //   //     get()
// //   //   }
// //   // }, [Home]);
// //   // useEffect(() => {
// //   //   if (keyboardStatus === false && services !== "") {
// //   //     getServices()
// //   //   }
// //   // }, [keyboardStatus]);
// //   // useEffect(() => {
// //   //   const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
// //   //     setKeyboardStatus(true);
// //   //   });
// //   //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
// //   //     setKeyboardStatus(false);
// //   //   });
// //   //   return () => {
// //   //     showSubscription.remove();
// //   //     hideSubscription.remove();
// //   //   };
// //   // }, []);
// //   /* _______________________________________________________________________________ */
// //   // async function get() {
// //   //   console.log("?")
// //   //   const hauses = await homeRecovery.room(Home.id, i18n.language)
// //   //   setrooms(hauses)
// //   // }
// //   // function getServices() {
// //   //   let obj = {
// //   //     id: includedServices.length + 1,
// //   //     name: services
// //   //   }
// //   //   setincludedServices([...includedServices, obj])
// //   //   setservices("")
// //   // }
// //   // function deleteServices(i) {
// //   //   const res = _.filter(includedServices, function (o) { return o.id !== i.id; });
// //   //   //console.log("res: ", res)
// //   //   setincludedServices([...res])
// //   // }
// //   // function setNumber(v, current, key) {
// //   //   let value = current + v;
// //   //   if (value < 1) {
// //   //     onChangeText(1, key)
// //   //     Toast.show("valor mínimo: 1")
// //   //   }
// //   //   else { onChangeText(value, key) }
// //   // }
// //           </View>
// //           {/*            
// //             {
// //               includedServices.map((i, key) => {
// //                 return (
// //                   <View key={key}
// //                     style={{ width: "100%", padding: 10, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, fontSize: 18, marginBottom: 10 }}>
// //                     <Text style={{ width: "92%" }}>{i.name}</Text>
// //                     <TouchableOpacity onPress={() => deleteServices(i)} style={{ position: "absolute", right: 5, top: 5 }}>
// //                       <Icon name={'trash-outline'} height={25} width={25} fill={"rgba(0,0,0,0.25)"} />
// //                     </TouchableOpacity>
// //                   </View>
// //                 )
// //               })
// //             } 
// //             *}
// //           {/* </View> *}
// //         </View>
// //       {/* 
// //       <View style={styles.group}>
// //         <Text style={styles.label}>rooms</Text>
// //         <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
// //           <TouchableOpacity onPress={() => setNumber(-1, data.rooms, "rooms")} style={{ width: 40, height: 40, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.2)" }}>
// //             <Icon name={'minus-outline'} height={30} width={30} fill={"#fff"} />
// //           </TouchableOpacity>
// //           <Text style={[styles.input, { width: "60%", textAlign: "center", lineHeight: 40, fontSize: 20 }]}>{data.rooms}</Text>
// //           <TouchableOpacity onPress={() => setNumber(+1, data.rooms, "rooms")} style={{ width: 40, height: 40, borderRadius: 40, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.2)" }}>
// //             <Icon name={'plus-outline'} height={30} width={30} fill={"#fff"} />
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //       <View style={styles.group}>
// //         <Text style={styles.label}>cosa 1</Text>
// //         <TextInput
// //           style={styles.input}
// //           value={data.descripcion}
// //           onChangeText={text => onChangeText(text, 'descripcion')}
// //         />
// //  */}
// // <TouchableOpacity style={[styles.btn]} onPress={() => save()}>
// //             <Text style={styles.btnText}>siguiente</Text>
// //           </TouchableOpacity> 
// //  </View> 
