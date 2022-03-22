import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Modal, StatusBar, ScrollView, TouchableOpacity, View, Image, ImageBackground, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ImageZoom from 'react-native-image-pan-zoom';
import LinearGradient from 'react-native-linear-gradient';
import { file_server1 } from '../../../Env'
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import ScoreStars from '../../components/stars/ScoreStars.js';
import { drivers } from '../../services/connection'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

function DriversView(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props
  const [Load, setLoad] = useState(false);
  const [data, setdata] = useState(null);
  const [vertical, setvertical] = useState(false);
  const [vehicle, setvehicle] = useState(null);
  const [sticky, setsticky] = useState(false);

  let randomCode
  if (props.route.params) {randomCode = props.route.params.randomCode}
  else {randomCode = 1}

  useEffect(() => {
    Get();
  }, [randomCode]);

  async function Get() {
    setLoad(true);
    const res = await drivers.getDriverVehicles(props.route.params.data.id, i18n.language)
    setdata(res);
    setLoad(false);
  }

  function goToScreen(screen, id) {
    let data = { id: id }
    let id_Medic = props.route.params.data.id_doctor
    console.log("new data", data)
    props.navigation.navigate(screen, { randomCode: Math.random(), data, id_Medic })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor="white" />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        //stickyHeaderIndices={[4]}
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          console.log("y: ", y)
          if (y >= 300) { setsticky(true) }
          else { setsticky(false) }
        }}>
        <TouchableOpacity
          onPress={() => setvertical(true)}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 999,
            backgroundColor: "rgba(255,255,255,0.25)",
            width: 35,
            height: 35,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Icon name="more-vertical-outline" width={30} height={30} fill={color_white} />
        </TouchableOpacity>
        <View style={{
          width: "100%",
          height: 300,
          overflow: "hidden",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
          {/* <Image
            source={{ uri: `${file_server1}/img/wellezy/viaticos/users/${props.route.params.data.img}` }}
            style={styles.img} /> */}
        </View>
        <View style={{
          marginTop: -20,
          zIndex: -1,
          backgroundColor: color_white,
          paddingTop: 30,
          paddingHorizontal: 20,
          paddingBottom: 20,
          width: "100%",
          marginBottom: 0,
        }}>
          <View style={styles.row}>
            <Text style={styles.title}>Nombres: </Text>
            <Text>{props.route.params.data.surname} {props.route.params.data.name}</Text>
          </View>
          <View style={styles.row}>
            <Text>{props.route.params.data.rating}</Text>
            <Text>{props.route.params.data.basedOn}</Text>
            <Text>{props.route.params.data.stars}</Text>
          </View>
          <View style={{ width: "100%", alignContent: "center", alignItems: "center" }}>
            <ScoreStars stars={props.route.params.data.stars} size={35} color={color_star} />
          </View>
        </View>
        <View style={{
          paddingTop: 10,
          marginBottom: 10,
          paddingBottom: 40,
          backgroundColor: color_grey_light,
          flexDirection: "row",
          width: "100%",
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}>
          {
            !Load && data !== null && data.vehicles.length !== 0 &&
            data.vehicles.map((i, key) => {
              return (
                <TouchableOpacity key={key} onPress={() => setvehicle(i)}
                  style={{
                    borderColor:"red",
                    //borderWidth:  vehicle!== null? (i.id=== vehicle.id ?4:0):0,
                    transform: [{ scale: vehicle!== null? (i.id=== vehicle.id ?1.1:1):1}],
                    width: windowWidth / 2 - 50,
                    marginTop: 20,
                    alignItems: "center",
                    alignContent: "center",
                    shadowColor: "#000",
                    overflow: "hidden",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 15,
                    backgroundColor: color_white,
                    borderRadius: 12,
                  }}>
                  <View style={{
                    backgroundColor: color_grey_light,
                    width: "100%",
                    overflow: "hidden",
                    height: windowWidth / 4
                  }}>
                    {/* <Image style={styles.img}
                    //source={{ uri: i.img[0].img }}
                    source={{uri: `${file_server1}/img/wellezy/viaticos/cars/${i.img[0].img}`}}
                    /> */}
                  </View>
                  <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>{i.modelo}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        {!
          Load && vehicle !== null &&
          <ViewVehicle data={vehicle} />
        }
        <View style={{
          marginBottom: 100,
          width: "100%",
          alignItems: "center",
          alignContent: "center"
        }}>
          <TouchableOpacity style={{ justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "row", marginTop: 10, backgroundColor: color_fifth, width: "60%", padding: 10, borderRadius: 12 }}>
            <Text style={{ textTransform: "capitalize", marginLeft: 10, textAlign: "center", color: color_white, fontWeight: "bold" }}>Solicitar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {sticky === true &&
        <View style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 15,
          position: "absolute",
          zIndex: 99999999999,
          width: "100%",
          backgroundColor: color_fifth,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 6,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text>{props.route.params.data.surname} {props.route.params.data.name}</Text>
        </View>
      }
      <Menu props={props} option={0} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView >
  )
}
export default DriversView;



const styles = StyleSheet.create({
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },

  // body: {
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   alignContent: 'center',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  // },
  // card: {
  //   backgroundColor: color_white,
  //   width: "90%",
  //   marginBottom: 20,
  //   padding: 20,
  //   borderRadius: 12,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 15,
  // },
  // btn_car: {
  //   marginTop: 20,
  //   alignItems: "center",
  //   alignContent: "center",
  //   shadowColor: "#000",
  //   overflow: "hidden",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 15,
  //   backgroundColor: color_white,
  //   borderRadius: 12,
  // },
  // btn_car_wrap_img: {
  //   backgroundColor: "silver",
  //   width: "100%",
  //   overflow: "hidden"
  // },
  // btn_car_img: {
  //   width: null,
  //   height: null,
  //   flex: 1,
  //   resizeMode: "cover"
  // },
  // btn_car_wrap_text: {
  //   paddingVertical: 10
  // },
  // btn_car_text: {
  //   fontWeight: "bold",
  //   textTransform: "capitalize"
  // },
  // row: {
  //   width: "100%",
  //   flexDirection: "column",
  //   marginBottom: 10
  // },
  // title: {
  //   color: color_primary
  // },
  // text: {
  //   color: color_grey_dark
  // }
});

const ViewVehicle = (props) => {
  const [zoom, setzoom] = useState(null);
  const [modalVisible, setmodalVisible] = useState(false);
  const [learn, setlearn] = useState(false);

  function Zoom(e) {
    setzoom(e)
    setmodalVisible(true)
  }

  return (
    <>
      <View style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: "center",
        marginTop: -30,
        borderRadius: 12,
        width: "90%",
        backgroundColor: color_white,
        flexDirection: "column",
        overflow: "hidden"
      }}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: color_fifth
          }}>
          <Text
            style={{
              color: color_white,
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold"
            }}
          >{props.data.modelo}</Text>
        </View>
        <View style={{
          width: "100%",
          paddingBottom: 10
        }}>
          <View style={{ flexDirection: "row", width: "100%", borderTopColor: "silver", borderTopWidth: 0.5, paddingVertical: 5 }}>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.title}>Categoria</Text>
              <Text style={styles.text}>{props.data.category}</Text>
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.title}>Modelo</Text>
              <Text style={styles.text}>{props.data.modelo}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", width: "100%", borderTopColor: "silver", borderTopWidth: 0.5, paddingVertical: 5 }}>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.title}>Marca</Text>
              <Text style={styles.text}>{props.data.brand}</Text>
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.title}>Placa</Text>
              <Text style={styles.text}>{props.data.placa}</Text>
            </View>
          </View>
        </View>
      </View>
      <LinearGradient
        colors={['transparent', color_grey_light]}
        style={{
          marginTop: -120,
          paddingTop: 140,
          paddingBottom: 15,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {
          props.data.img.map((i, key) => {
            return (
              <TouchableOpacity key={key} onPress={() => Zoom(i.img)}
                style={{ marginVertical: 10, borderRadius: 12, marginHorizontal: 5, height: 80, width: 80, overflow: "hidden" }}>
                <View style={{ opacity: 0.8, position: "absolute", zIndex: 999999, top: 25, left: 25 }}>
                  <Icon name='search-outline' fill="white" width={30} height={30} />
                </View>
                <Image
                 source={{uri: `${file_server1}/img/wellezy/viaticos/cars/${i.img}`}}
              
                
                style={{ height: null, width: null, resizeMode: "cover", flex: 1 }} />
              </TouchableOpacity>
            );
          })
        }
      </LinearGradient>
      <Modal animationType="slide" transparent={true} visible={modalVisible} >
        <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999 }}>
          <TouchableOpacity onPress={() => setlearn(true)} style={{ position: "absolute", zIndex: 999, top: 10, right: 50 }}>
            <Icon name='question-mark-circle-outline' fill='white' width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setmodalVisible(false)} style={{ position: "absolute", zIndex: 999, top: 10, right: 10 }}>
            <Icon name='close-circle-outline' fill='white' width={30} height={30} />
          </TouchableOpacity>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height - 100}
            imageWidth={600}
            imageHeight={400}>
            <Image
              style={{ width: null, height: null, flex: 1, resizeMode: "cover" }}
              source={{uri: `${file_server1}/img/wellezy/viaticos/cars/${zoom}`}}
            />
          </ImageZoom>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={learn} >
        <TouchableOpacity onPress={() => setlearn(false)} style={{ alignContent: "center", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999 }}>
          <View style={{ backgroundColor: "white", width: 200, padding: 10, borderRadius: 12, position: "absolute", alignContent: "center", alignItems: "center" }}>
            <View style={{ width: 150, height: 150 }}>
              {/* <Image source={require("../../../images/icon_drag.png")} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} /> */}
            </View>
            <Text style={{ color: color_fifth, width: "100%", textAlign: "center" }}>
              arastra la imagen para ver mas detalles.
            </Text>
            <TouchableOpacity onPress={() => setlearn(false)} style={{ marginTop: 10, backgroundColor: color_fifth, alignSelf: "center", width: "50%", borderRadius: 8, padding: 5 }}>
              <Text style={{ color: color_white, width: "100%", textAlign: "center", fontWeight: "bold", textTransform: "uppercase" }}>ocultar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}