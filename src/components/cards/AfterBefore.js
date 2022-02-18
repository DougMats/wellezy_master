import React, { useState } from 'react';
import { Modal, Text, StyleSheet, View, Dimensions, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import Compare, { Before, After, DefaultDragger, Dragger } from 'react-native-before-after-slider-v2';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../stars/ScoreStars.js';


function AfterBefore(props) {
  console.log("After & before");
  const [Fullscreen, setFullscreen] = useState(false);
  const [imagenScreen, setimagenScreen] = useState("");
  const [Compares, setCompares] = useState(false);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const [state, setState] = useState({ scrollEnabled: true })

  function fullscreenImg(data) {
    setimagenScreen(data)
    setFullscreen(true)
  }

  const onMoveStart = () => {
    setState({ scrollEnabled: false });
  }
  const onMoveEnd = () => {
    setState({ scrollEnabled: true });
  }




  function fecha() {
    const date = props.data.created_at.split(" ");
    const fecha = date[0];
    const order = fecha.split("-");
    const fechaOrder = order[2] + "/" + order[1] + "/" + order[0];
    //const hora = date[1];
    return fechaOrder;
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", flexDirection: "row" }}>
            <TouchableOpacity onPress={() => fullscreenImg(props.data.before)}
              style={{ overflow: "hidden", backgroundColor: "#E9E9E9", width: 70, height: 70, borderRadius: 8 }}>
              <Image source={{ uri: props.data.before }} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', }} s />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => fullscreenImg(props.data.after)} style={{ marginLeft: 2, overflow: "hidden", backgroundColor: "#E9E9E9", width: 70, height: 70, borderRadius: 8 }}>
              <Image source={{ uri: props.data.after }} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', }} s />
            </TouchableOpacity>
          </View>
          <View style={{ width: "50%", flexDirection: "column", }}>
            <Text style={{ textTransform: "uppercase", fontSize: 14 }}>{props.data.nameprocedure}</Text>
            <View>
              <Text style={{ fontSize: 12, color: "#777" }}>{props.data.medico}</Text>
           {/* <ScoreStars scale={props.scale} value={props.data.value} size={15} color='orange'/> */}
              <Text style={{textTransform:"capitalize", fontSize: 12, color: "#777" }}>{props.data.apellidos} {props.data.nombres}</Text>
              <Text style={{textTransform:"capitalize", fontSize: 12, color: "#777" }}>{fecha()}
              {/* {props.data.created_at} */}
              </Text>
            </View>
          </View>
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={() => setCompares(!Compares)} style={{ alignSelf: "flex-end",right:5, top: 5,  backgroundColor: "orange", paddingVertical: 2, paddingHorizontal:8, borderRadius: 8 }}>
              {Compares===true ?
              <Icon name='close-circle-outline' width={25} height={25} fill="#000" style={{}} />
              :
               <Text style={{textTransform:"uppercase", fontSize: 12, textAlign: "center",color:"#000" }}>comparar</Text>
               }
          </TouchableOpacity>
        </View>
        {Compares &&
          <View style={{ marginTop: 10, overflow: "hidden", alignContent: "center", alignItems: "center" }}>
            <Compare initial={deviceWidth / 2} draggerWidth={50} width={deviceWidth - 20} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
              <Before>
                <Image source={{ uri: props.data.before }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
              </Before>
              <After>
                <Image source={{ uri: props.data.after }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
              </After>
              <DefaultDragger />
            </Compare>
          </View>
        }
      </View>
      <Modal animationType="slide" transparent={true} visible={Fullscreen} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.9)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View>
            <TouchableOpacity
              onPress={() => setFullscreen(false)}
              style={{
                position: "absolute", right: 0, top: 10
              }}>
              <Icon name="close-circle-outline" fill="#FFF" width={25} height={25} />
            </TouchableOpacity>
            <View style={{ top: 40, alignContent: "center", alignItems: "center", minWidth: "90%" }}>
              <Image
                style={{ top: 0, height: "100%", width: "100%", resizeMode: "contain", flex: 1 }}
                source={{ uri: imagenScreen }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  wrap: { alignContent: "center", alignItems: "center", width: "100%", marginBottom: 10 },
  container: { backgroundColor: "white", width: "90%", borderRadius: 8, padding: 10, flexDirection: "column" }
})
export default AfterBefore





















