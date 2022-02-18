import React, { useState, useRef, useEffect } from "react";
import { AppRegistry, TouchableOpacity, Animated, Text, Image, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-eva-icons';
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
} from '../../styles/Colors';


import RNFetchBlob from "rn-fetch-blob";
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import Toast from 'react-native-simple-toast';
import { serverCrmTestDrawer, base_url, file_server1 } from '../../../Env'
import _ from 'lodash';
import ViewHistoryClinic from './ViewHistoryClinic.js';
import socketIOClient from 'socket.io-client/dist/socket.io.js';

var RNFS = require('react-native-fs')
const screen = Dimensions.get("window");

const SideBarMedic = (props) => {
  const [Show, setShow] = useState(false);



  // "id": 1,
	// 	"id_client": 1,
	// 	"id_valoration": 119,
	// 	"id_valoration_scheduled": 2,
	// 	"eps": "seguro acacias meta",
	// 	"height": "163",
	// 	"weight": "45",
	// 	"children": "1",
	// 	"alcohol": "no",
	// 	"smoke": "no",
	// 	"surgery": "no",
	// 	"disease": "no",
	// 	"medication": "si",
	// 	"allergic": "si",
	// 	"drugs": "no",
	// 	"created_at": "2021-12-29 11:12:11",
	// 	"updated_at": "2021-12-29 11:12:11",
	// 	"enfermedades": [],
	// 	"alergias": [
	// 		{
	// 			"description": "a los enlatados"
	// 		}
	// 	],
	// 	"medicamentos": [
	// 		{
	// 			"description": "gotas para los ojos"
	// 		}
	// 	],
	// 	"operaciones": []
	// }





  // const [paciente, setpaciente] = useState(
  //   {
  //     email: props.data.client_email,
  //     id: props.data.client_id,
  //     name: props.data.client_name,
  //     phome: props.data.client_phone,
  //     surname: props.data.client_surname
  //   }
  // );

  const [listphotos, setlistphotos] = useState(props.data.images);
//  const [HistoriaClinica, setHistoriaClinica] = useState(props.data.historyClinic);
  const [photoSelected, setphotoSelected] = useState(null);
  const [viewListImg, setviewListImg] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [menu, setmenu] = useState('hc'); // hc - img
  const [socket, setsocket] = useState(false);
  const [needPhotos, setneedPhotos] = useState(true);

  React.useEffect(() => {
    //console.log(['. . . . . . . . . .  SOCKET SERVER CONNECTING . . . . . . . . . . . . . . ']);
    setsocket(socketIOClient("http://31.220.60.218:3000"))
  }, [])


  React.useEffect(() => {
    if (socket) {
      //console.log(['. . . . . . . . . .  POSTS SERVER PROVISIONING . . . . . . . . . . . . . . '])
      socket.on('askForUserId', () => {
        //console.log(['. . . . . . . . . .  POSTS SERVER CONNECTED123 . . . . . . . . . . . . . . '])
        socket.emit('userIdReceived', props.userDetails.id);  //id del doctor ---> "doctor"
      })
      socket.on('disconnect', () => {
        //console.log(['. . . . . . . . . . . . . . . . . . . POSTS SERVER DISCONNECTED  . . . . . . . . . . . . . . . . . . .'])
      })
    }
  }, [socket])


  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
    setShow(true);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: screen.width,
      duration: 100,
      useNativeDriver: true
    }).start();
    setShow(false);
  };

  // useEffect(() => {
  //   setviewListImg(false)
  // }, [photoSelected]);

  useEffect(() => {
    if (listphotos.length > 0) {Download();}
  }, [listphotos]);


  function Download() {
    let RN_large = {}
    listphotos.map((item, key) => {
      //console.log('Creando instancia', key)
      RN_large[key] = RNFetchBlob
    })
    listphotos.map((item, key) => {
      //console.log('Ejecutando instancia', key)
      //console.log("->", base_url(file_server1, `img/wellezy/valorations/${item.img}`))
      RN_large[key].config({
        path: `/storage/emulated/0/DCIM/Camera/${props.data.id}/${key}_name.png`,
        fileCache: true
      })
        .fetch("GET", base_url(file_server1, `img/wellezy/valorations/${item.img}`), {})
        .progress((received, total) => { })
        .then(res => {
          console.log('download complete')
        });
    })
  }



  return (
    <SafeAreaView style={[styles.container, { width: screen.width, height: Show === false ? 45 : screen.height + 30 }]}>
      <View style={{ position: "absolute", top: 0, backgroundColor: "rgba(0,0,0,1)", height: 45, width: "100%" }}></View>
      {Show === false &&
        <TouchableOpacity onPress={fadeIn}
          style={[{ position: "absolute", right: 10, top: 5, zIndex: 999 },//styles.btnDrawer
          ]}>
          <Icon name="more-vertical-outline" width={30} height={30} fill="#fff" />
        </TouchableOpacity>
      }

      {Show === true &&
        <TouchableOpacity onPress={fadeOut}
          style={[{ position: "absolute", left: 10, top: 5, zIndex: 999 }, //styles.btnDrawer
          ]}>
          <Icon name="arrow-ios-back-outline" width={30} height={30} fill="#fff" />
        </TouchableOpacity>
      }

      <Animated.View style={[styles.sidebar, { height: Show === true ? "102%" : "0%", transform: [{ translateX: fadeAnim }] }]}>



 
 {//props.data.photos === 'si' &&
 Show && menu === 'img' &&
  <View style={{ position: "absolute", zIndex: 999, top: 15, left: 0, flexDirection: "row", width: "40%", padding: 5, paddingTop: 0, justifyContent: "flex-start", paddingRight: 50, height: 50 }} >
    <TouchableOpacity style={[styles.btnDrawer, { position: "absolute", left: 80, top: -15, zIndex: 999 }]} onPress={() => setviewListImg(!viewListImg)}>
      <Icon name={viewListImg ? "close-circle-outline" : "image-outline"} width={30} height={30} fill={color_white} />
    </TouchableOpacity>
  </View>
  }




{
    Show && !viewListImg &&
    <View style={{ flexDirection: "row", width: "80%", position: "absolute", top: menu === 'img' ? 0 : 0, zIndex: 99999999, justifyContent: "space-around" }}>
      <TouchableOpacity onPress={() => setmenu('img')} style={{ backgroundColor: color_fifth, justifyContent: "center", height: 40, paddingTop: 5, flexDirection: "row", width: "45%", marginHorizontal: 2, borderRadius: 5 }}>
        <Text style={{ textAlign: "center", lineHeight: 25, fontSize: 14, color: color_white, textTransform: "capitalize", marginRight: 10, fontWeight: "bold" }}>Imágenes</Text>
        <Icon name={menu === 'img' ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={color_white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setmenu('hc')} style={{ backgroundColor: color_fifth, justifyContent: "center", height: 40, paddingTop: 5, flexDirection: "row", width: "45%", marginHorizontal: 2, borderRadius: 5 }}>
        <Text style={{ textAlign: "center", lineHeight: 25, fontSize: 14, color: color_white, textTransform: "capitalize", marginRight: 10, fontWeight: "bold" }}>História Clínica</Text>
        <Icon name={menu === 'hc' ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={color_white} />
      </TouchableOpacity>
    </View>
  }








{Show && menu === 'img' &&
  <View style={{
   //backgroundColor:"pink",
    position: "absolute",
    zIndex: 999999,
    top: 35,
    right: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    }}>
    <View style={{
      //backgroundColor:"red",
      flexDirection: "column",
      width: "100%",
      height: "100%" }}>
      {
        //viewListImg === true &&
        <View style={{ paddingHorizontal: 10, flexDirection: "row", width: "100%", justifyContent: "space-around", }} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {listphotos.length !==0 && listphotos.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => setphotoSelected(key)} style={{ overflow: "hidden", width: 80, height: 80, borderRadius: 12, marginHorizontal: 5, marginVertical: 10, backgroundColor:"blue" }}>
                  <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: `${file_server1}/img/wellezy/valorations/${i.img}` }} />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      }
    </View>
  </View>
}





  {Show && menu === 'hc' &&
    <View style={{
      width: "100%",
      //backgroundColor:"red",
      paddingHorizontal: "5%",
      paddingBottom: 100, 
      marginTop:65//needPhotos === "si"?65:25
      }}>
      <Text style={{
        //backgroundColor:"green",
        width: "100%",
        marginBottom:10,
        textAlign: "center",
        color: color_white,
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
        paddingVertical: 5
        }}>história Clínica</Text>
      <ViewHistoryClinic data={props.data}/>
    </View>
  }




  {
    Show && photoSelected !== null && menu === 'img' &&
    <TouchableOpacity onPress={() => setphotoSelected(null)} style={{ backgroundColor: "white", borderRadius: 4, zIndex: 999999, position: "absolute", right: 10, bottom: 115 }}>
      <Icon name="trash-2-outline" width={30} height={30} fill="#000" />
    </TouchableOpacity>
  }





  {
    Show && photoSelected === null && menu === 'img' &&
    <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.5)", padding: 20, borderRadius: 20 }}>
      <Icon name="image-outline" width={200} height={200} fill="#333" />
      <Text style={{ width: "100%", color: "#333", textAlign: "center", fontSize: 20 }}>No has seleccionado una imagen</Text>
    </View>
  }







        {
          Show && photoSelected !== null && menu === 'img' &&
          <Drawer
            _key={photoSelected}
            data={props.data}
            socket={socket}
          />
        }


      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    zIndex: 9999,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center"
  },
  sidebar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 9,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  btnDrawer: {
    marginTop: 5,
    marginHorizontal: 5,
    height: 35,
    width: 60,
    backgroundColor: color_fifth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnDrawer2: {
    marginTop: 5,
    marginHorizontal: 2.5,
    marginBottom: 60,
    width: 35,
    height: 35,
    borderRadius: 15,
  },
});



function Drawer(props) {
  const [load, setload] = useState(false);
  return (
    <View style={{ marginTop: 130, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: "100%", height: "100%", position: "absolute", zIndex: 99, justifyContent: "space-around" }}>
        <RNSketchCanvas
          localSourceImage={{ filename: `/storage/emulated/0/DCIM/Camera/${props.data.id}/${props._key}_name.png`, directory: null, mode: 'AspectFit' }}
          containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
          canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          //grosor del pincel
          strokeWidthComponent={(w) => {
            //console.log("strokeWidthComponent: ", w)
            return (
              <View style={{ marginHorizontal: 2.5, marginVertical: 8, width: 35, height: 35, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: color_fifth, marginTop: 5, }}>
                <Text style={{ color: "white", position: "absolute", top: 6, fontSize: 16, zIndex: 9, fontWeight: "bold" }}>{w}</Text>
              </View>
            )
          }}
          //atras
          undoComponent={<View style={styles.btnDrawer}><Icon name="rewind-left-outline" width={30} height={30} fill="#fff" /></View>}
          //refresh
          clearComponent={<View style={styles.btnDrawer}><Icon name="refresh-outline" width={30} height={30} fill="#fff" /></View>}
          //send
          saveComponent={<View style={styles.btnDrawer}>{load === true ? <ActivityIndicator size={25} color={"#fff"} /> : <Icon name="upload-outline" width={30} height={30} fill="#fff" />}</View>}
          // barra de colores inferior
          strokeComponent={color => (<View style={{ marginHorizontal: 2 }}><View style={[{ backgroundColor: color }, styles.btnDrawer2]} /></View>)}
          //color seleccionado
          strokeSelectedComponent={(color, index, changed) => { return (<View style={[{ backgroundColor: "#ff0000", borderWidth: 2 }, styles.strokeColorButton]} />) }}
         
          savePreference={() => {
            console.log("savePreference")
            return {
              folder: `wellezy/${props.item_code}/upload/`,
              filename: 'large',
              transparent: false,
              includeImage: true,
              cropToImageSize: false,
              imageType: 'png'
            }
          }}
          onSketchSaved={async (success, path) => {
            setload(true);
            const base64data = await RNFS.readFile(path, 'base64').then()
            console.log("nueva ruta send")
            console.log(base_url(serverCrmTestDrawer, `api/save/img`))
            fetch(base_url(serverCrmTestDrawer, `api/save/img`), {
              method: 'post',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                code: props.data.id,
                image: base64data
              })
            }).then(res => res.json())
              .then((res) => {
                console.log('Envio satisfactorio')
                Toast.show('Envio satisfactorio')
                props.socket.emit('syncScreen', {
                  "client_id": props.data.id_client,
                  "valoration_id": props.data.id
                })
              }).catch((error) => {
                console.log('Error al enviar la foto', error)
                Toast.show('Error al enviar la foto')
              });
            setTimeout(() => {
              setload(false);
            }, 2000);
          }}
        />
      </View>
    </View>
  );
}

AppRegistry.registerComponent('Example', () => Example);
export default SideBarMedic;


// // //  containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
// // //  canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
// // //  defaultStrokeIndex={0}
// // //  defaultStrokeWidth={5}
// // //  closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
// // //  undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
// // //  clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
// // //  eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
// // //  strokeComponent={color => (
// // //    <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
// // //  )}
// // //  strokeSelectedComponent={(color, index, changed) => {
// // //    return (
// // //      <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
// // //    )
// // //  }}
// // //  strokeWidthComponent={(w) => {
// // //    return (<View style={styles.strokeWidthButton}>
// // //      <View  style={{
// // //        backgroundColor: 'white', marginHorizontal: 2.5,
// // //        width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
// // //      }} />
// // //    </View>
// // //  )}}
// // //  saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
// // //  savePreference={() => {
// // //    return {
// // //      folder: 'RNSketchCanvas',
// // //      filename: String(Math.ceil(Math.random() * 100000000)),
// // //      transparent: false,
// // //      imageType: 'png'
// // //    }
// // //  }}