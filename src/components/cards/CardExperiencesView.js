import React, { useState } from 'react';
import { Modal, Linking, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreStars from '../stars/ScoreStars.js';
function CardExperiences(props) {
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(false);
  const [Fullscreen, setFullscreen] = useState(false);
  const [imagenScreen, setimagenScreen] = useState("");

  const { navigation } = props
  function goToScreen(screen, e) {
    props.props.navigation.navigate(screen, { randomCode: Math.random() })
  }

  const followCall = async () => {
    console.log("calling")
    await Linking.openURL(`tel:${props.data.phone}`)
  }


  async function requestBudget(e) {
    setLoad(true)
  }

  function fullscreenImg(data) {
    setimagenScreen(data)
    setFullscreen(true)
  }



  console.log("i", imagenScreen)


  const [ViewMore, setViewMore] = useState(false);
  return (
    <View style={styles.card}>
      <View style={{ padding: 1, flexDirection: "row", height: 80, marginBottom: 10 }}>
        <View style={{ borderColor: "#eee", borderWidth: 2, overflow: "hidden", backgroundColor: "#E9E9E9", width: 80, height: 80, borderRadius: 40 }}>
          <Image style={{
            flex: 1, width: null, height: null, resizeMode: 'cover',
          }} source={{ uri: props.data.userPhoto }} />
        </View>
        <View style={{ flexDirection: "column", width: "65%", padding: 10 }}>
          <Text style={{ fontSize: 18 }}>{props.data.title}</Text>
          <Text style={{ fontSize: 12, color: "#777" }}>{props.data.userName}</Text>
        </View>
      </View>

      <View style={{
        height: ViewMore ? null : 45,
        overflow: "hidden",marginBottom:5,
      }}>
        <Text style={styles.textCard}>
          {props.data.testimony}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setViewMore(!ViewMore)}
        style={{ alignSelf: "flex-end",marginBottom:10 }}
      >
        <Text style={{ fontSize: 10, color: "#009B9A" }}>
          {ViewMore ? t("seeLess") : t("seeMore")}
        </Text>
      </TouchableOpacity> 

      <ScrollView horizontal={true}>
        {
          props.data.galery.map((i, key) => {
            return (
              <TouchableOpacity onPress={() => fullscreenImg(i.img)}
                style={{ overflow: "hidden", backgroundColor: "#E9E9E9", width: 90, height: 70, marginHorizontal: 4 }}>
                <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover', }} source={{ uri: i.img }} />
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>






{/* 
      <View style={{ flexDirection: "row", marginTop:20,justifyContent:"space-around" }}>
        
       <View style={{alignContent:"center", alignItems:"center", justifyContent:"center", width: "50%"}}>
         <TouchableOpacity onPress={()=>goToScreen("DashboardInfo",props.data)} style={{flexDirection: "row" }}>
          <Icon name="message-square-outline" fill="#009B9A" width={12} height={12} top={3} />
          <Text style={{textAlign:"center", fontSize: 12, marginLeft: 5, textAlign: "center", color: "#009B9A" }}>
            {props.data.comments.length} {t("comments")}
            </Text>
        </TouchableOpacity>
        </View>


         <View style={{alignContent:"center", alignItems:"center", justifyContent:"center", width: "50%", flexDirection: "row" }}>
        <TouchableOpacity onPress={()=>goToScreen("DashboardInfo",props.data)} style={{flexDirection: "row",}}>
        <Text style={{textAlign:"center" , fontSize: 12, marginRight:10, textAlign: "center", color: "#009B9A" }}>{t("seeMore")}</Text>
        <Icon name="arrowhead-right-outline" fill="#009B9A" width={12} height={12} top={3} />
        </TouchableOpacity>
        </View> 

      </View> */}



      {/* <Modal animationType="slide" transparent={true} visible={Fullscreen} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.9)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View>
            <TouchableOpacity
              onPress={() => setFullscreen(false)}
              style={{
                position: "absolute", right: -10, top: 10
              }}>
              <Icon name="close-circle-outline" fill="#FFF" width={25} height={25} />
            </TouchableOpacity>
            <View style={{ top: 40, alignContent: "center", alignItems: "center", minWidth: "90%" }}>
              <Image
                style={{ top: -40, height: "100%", width: "100%", resizeMode: "contain", flex: 1 }}
                source={{ uri: imagenScreen }}
              />
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF", width: "90%", marginTop: 10, borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.30,
shadowRadius: 4.65,

elevation: 8,
  },
  textCard: {
    color: "#777",
    textAlign: "justify",
    fontSize: 12
  }
});
export default CardExperiences;