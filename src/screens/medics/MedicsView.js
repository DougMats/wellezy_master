import React, { useState, useContext, useRef, useEffect } from 'react';
import { RefreshControl, ActivityIndicator, Modal, SafeAreaView, Switch, StatusBar, ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import UserContext from '../../../contexts/UserContext'
import Pagination from '../../components/filters/Pagination.js';
import FilterSilver from '../../components/filters/Silver';
import FilterGolden from '../../components/filters/Golden';
import CardEmpty from '../../components/cards/CardEmpty.js';
import ScoreStars from '../../components/stars/ScoreStars.js';
import Horizon from '../../components/filters/Horizon.js';
import ValidateRating from '../../components/stars/Rating.js';


//cards
import CardTestimonials from '../../components/cards/CardTestimonials.js'
import CardSpecials from '../../components/cards/CardSpecials.js'
import AfterBefore from '../../components/cards/AfterBefore.js'
import CardExperiences from '../../components/cards/CardExperiences';
import CardVideos from '../../components/cards/CardVideos.js';
import CardProcedure from '../../components/cards/CardProcedure';

import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_white,
  color_white_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark,
  color_transparent,
  color_screen,
  color_star,
  color_fifth,
} from '../../styles/Colors.js'

import { doctors } from '../../services/connection.js';
import { file_server1 } from '../../../Env'





// import { RefreshControl, ActivityIndicator, Modal, SafeAreaView, Switch, StatusBar, ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
// import Toast from 'react-native-simple-toast';
// import { Icon } from 'react-native-eva-icons';
// import { useTranslation } from 'react-i18next';

// import Head from '../../components/generic/Head';
// import Menu from '../../components/generic/Menu';

// //import { MedicGetTotalInfo, sendMedicsRating, MedicGetQualified } from '../../services/https'



// 



// import { doctors } from '../../services/connection'



function MedicsView(props) {
  const [vertical, setvertical] = useState(false);
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(true);
  const [Data, setData] = useState(null);
  //const { navigation } = props
  const { userDetails } = React.useContext(UserContext);
  const [LoadRating, setLoadRating] = useState(false);
  const [ViewMSGRating, setViewMSGRating] = useState(false);
  const [ShowRating, setShowRating] = useState(false);
  const [Qualified, setQualified] = useState(false);
  const [Favorite, setFavorite] = useState(false);

  //   const [Data, setData] = useState(null);


  const [TIP, setTIP] = useState("Home");
  const [tipList, settipList] = useState([
    { "name": t("Experiences"), "value": 0 },
    { "name": t("Testimonials"), "value": 0 },
    { "name": t("Videos"), "value": 0 },
    { "name": t("BeforeAfter"), "value": 0 },
    { "name": t("Procedures"), "value": 0 },
  ]);

  //console.log("UserDetails: ", userDetails)
  //{"city": "Medellín", "country": "COLombia", "email": "maxuel@gmail.com", "id": "1", "id_user": 43, "language": "ru", "mensagge": "Ha iniciado sesion exitosamente", "name": "Daniel Andres", "photo_profile": "https://danielandrescorreaposadacirujano.com/wp-content/uploads/2021/01/IMG-20210118-WA0056.jpg", "rol": "client", "surname": "correa posada", "telefono": "3124348384"}

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }




  useEffect(() => {
    Get(props.route.params.data.id);
  }, [randomCode]);

  useEffect(() => {
    if (Data !== null) {
      Count();
    }
  }, [Data]);

  async function Get(id) {
    setLoad(true)
    const res = await doctors.thisDoctor(id, i18n.language)
    const qualified = await doctors.MedicGetQualified(props.route.params.data.id, userDetails.id)
    //console.log("::::::::::::..................::::::::::::::::::", qualified)
    setData(res)
    setQualified(qualified)
    setLoad(false)
  }

  function goToScreen(screen, data) {
     props.navigation.navigate(screen, { randomCode: Math.random(), data })
    //props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  // function goToScreen(screen, data) {
  // let from = "MedicsView";
  // props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  // }


  function ViewTips(e) { setTIP(e); }

  function Count() {
    let experiences, testimonials, videos, beforeafter, procedures, specials;

    if (Data.Experiences) { experiences = Data.Experiences.length; }
    else { experiences = 0; }

    if (Data.Testimonials) { testimonials = Data.Testimonials.length; }
    else { testimonials = 0; }

    if (Data.Videos) { videos = Data.Videos.length; }
    else { videos = 0; }

    if (Data.BeforeAfter) { beforeafter = Data.BeforeAfter.length; }
    else { beforeafter = 0; }

    if (Data.Procedures) { procedures = Data.Procedures.length; }
    else { procedures = 0; }

    if (Data.Specials) { specials = Data.Specials.length; }
    else { specials = 0; }

    const response = [
      { "name": t("Experiences"), "value": experiences },
      { "name": t("Procedures"), "value": procedures },
      { "name": t("Testimonials"), "value": testimonials },
      { "name": t("Videos"), "value": videos },
      { "name": t("BeforeAfter"), "value": beforeafter },
      { "name": t("specials"), "value": specials },
    ]
    settipList(response);
  }

  async function MyFavorite(value) {

  }


  async function GetRating(v) {
    setQualified(true);
    setLoadRating(true);
    let newRating = Data.rating + v;
    let newBasedOn = Data.basedOn + 1;
    let newStars = newRating / newBasedOn;
    let updateRegistre = {
      "id_client": userDetails.id,
      "id_doctor": Data.id,
      "rating": newRating,
      "basedOn": newBasedOn,
      "stars": newStars,
    }
    await doctors.sendMedicsRating(updateRegistre);
    setLoadRating(false);
    setViewMSGRating(true);
    setTimeout(() => {
      setShowRating(!ShowRating);
    }, 2000);
    await Get(Data.id);
  }

  function empty() {
    if (TIP === t("Testimonials") && Data.Testimonials.length === 0) { return <CardEmpty /> }
    if (TIP === t("Videos") && Data.Videos.length === 0) { return <CardEmpty /> }
    if (TIP === t("specials") && Data.Specials.length === 0) { return <CardEmpty /> }
    if (TIP === t("BeforeAfter") && Data.BeforeAfter.length === 0) { return <CardEmpty /> }
    if (TIP === t("Experiences") && Data.Experiences.length === 0) { return <CardEmpty /> }
    if (TIP === t("Procedures") && Data.Procedures.length === 0) { return <CardEmpty /> }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_white} />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => setvertical(true)}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 999,
            backgroundColor: "rgba(255,255,255,0.2)",
            width: 35,
            height: 35,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Icon name="more-vertical-outline" width={30} height={30} fill={color_grey_dark} />
        </TouchableOpacity>


        {!Load &&
          <TouchableOpacity
            onPress={() => MyFavorite(Favorite)}
            style={{
              position: "absolute",
              top: 15,
              left: 15,
              zIndex: 999,
              width: 35,
              height: 35,
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Icon name={Favorite === true ? "heart" : "heart-outline"} width={30} height={30} fill={color_fifth} />
          </TouchableOpacity>
        }
{/* 

        {!Load && //Qualified === false &&
          <TouchableOpacity
            onPress={() => { Qualified === false && setShowRating(!ShowRating) }}

            style={{
              position: "absolute",
              top: 60,
              left: 15,
              zIndex: 999,
              width: 35,
              height: 35,
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Icon name={Qualified === true ? "star" : "star-outline"} width={30} height={30} fill={color_star} />
          </TouchableOpacity>
        } */}







        {Load === false && Data !== null &&
          <View style={styles.wrap}>

            <ImageBackground
              source={{ uri: `${file_server1}/img/wellezy/medics/${Data.img}` }}
              //source={{ uri: Data.img }}
              style={styles.header}>
              <View style={styles.wrapName}>
                <Text style={styles.name}>{Data.name}</Text>
                <ScoreStars stars={Data.stars} size={25} color='white' />
              </View>
            </ImageBackground>

            <Horizon TIP={TIP} data={tipList} ViewTips={ViewTips} />
          </View>
        }

        {
          Load === true &&
          <ActivityIndicator size="large" color={color_primary} animating={true} />
        }

        {/* {!Load && empty()} */}

        <View style={{ paddingBottom: 80, alignItems: "center" }}>
          {
            TIP === t("Testimonials") && !Load && Data.Testimonials !== undefined &&
            Data.Testimonials.map((i, key) => {
              return (
                <CardTestimonials data={i} key={key} props={props} />
              )
            })
          }
          {
            TIP === t("specials") && !Load && Data.Specials !== undefined &&
            Data.Specials.map((i, key) => {
              return (
                <CardSpecials key={key} data={i} goToScreen={goToScreen} />
              )
            })
          }
          {
            TIP === t("BeforeAfter") && !Load && Data.BeforeAfter !== undefined &&
            Data.BeforeAfter.map((i, key) => {
              return (
                <AfterBefore data={i} key={key} props={props} />
              )
            })
          }
          {
            TIP === t("Videos") && !Load && Data.Videos !== undefined &&
            Data.Videos.map((i, key) => {
              return (
                <CardVideos data={i} key={key} props={props} />
              )
            })
          }
          {
            TIP === t("Experiences") && !Load && Data.Experiences !== null &&
            Data.Experiences.map((i, key) => {
              return (
                <CardExperiences data={i} key={key} props={props} />
              )
            })
          }
          {
            TIP === t("Procedures") && !Load &&
            Data.Procedures !== null &&
            Data.Procedures.map((i, key) => {
              return (
                <CardProcedure id_Medic={Data.id} data={i} key={key} props={props} />
              )
            })
          }




          {
            TIP === "Home" && Load === false && Data !== null &&
            <View style={{}}>


              <View style={styles.card}>
                <Text style={styles.cardTitle}>About me</Text>
                <Text style={styles.cardText}>{'\t'}{'\t'}{Data.description}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Rating</Text>
                <View style={{ flexDirection: "column", marginTop: 10, marginBottom: -10 }}>
                  {/* <View style={{ flexDirection: "row" }}>
              <View style={{ top: 3, marginRight: 10 }}>
                <Icon name='star' height={30} width={20} fill='orange' />
              </View>
              <Text style={styles.cardText}>5 estrellas</Text>
              </View> */}
                  {/*
            <View style={{ flexDirection: "row" }}>
              <View style={{ top: 3, marginRight: 10 }}>
                <Icon name='star' height={30} width={20} fill='orange' />
              </View>
              <Text style={styles.cardText}>basados en: 45 personas</Text>
               </View> */}
                  <View style={styles.group}>
                    <Text style={styles.smallTitle}>{t("worthIt")}</Text>
                    <View style={styles.row}>
                      <View style={{ top: 5, marginRight: 10 }}>
                        <Icon name='smiling-face' height={30} width={30} fill='orange' />
                      </View>
                      <Text style={styles.number}>{Data.stars}</Text>
                      <View style={styles.doubleLine}>
                        <Text style={styles.smallText}>{t("basedOn")}:</Text>
                        <Text style={styles.mediumText}> {Data.basedOn} {t("person")}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginVertical: 20, alignItems: "center" }}>
                    <ScoreStars stars={Data.stars} size={30} color='orange' />
                  </View>
                  {/* <View style={styles.group}>
              <Text style={styles.smallTitle}>{t("averagePrice")}:</Text>
              <View style={styles.row}>
                <Text style={styles.number}>$ 730.000</Text>
                <View style={styles.doubleLine}>
                  <Text style={styles.smallText}>{t("accordingTo")}:</Text>
                  <Text style={styles.mediumText}> 20 {t("patients")}</Text>
                </View>
              </View>
              </View> */}
                </View>
              </View>
              <View style={styles.card}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.title}>{t("direction")}</Text>
                  <Text style={styles.cardText}>{Data.adress}, {Data.departament}. {Data.city}</Text>
                  <Text style={styles.cardText}>{Data.country}.</Text>
                </View>
              </View>
            </View>
          }



          {!Load && userDetails.rol !== "medic" &&
            <TouchableOpacity
            //  onPress={() => goToScreen("SolicitudNew", props.route.params.data)}
            onPress={() => goToScreen("SimpleForm", props.route.params.data)}
              style={{
                paddingVertical: 10,
                flexDirection: "row",
                paddingHorizontal: 30,
                backgroundColor: "#00A7B4",
                borderRadius: 8,
                //margin: 10,
                alignSelf: "center",
                width: "70%",
              }}>
              <Icon name="calendar-outline" fill={"#FFF"} width={20} height={20} />
              <Text style={{ marginLeft: 10, textAlign: "center", color: "#FFF", textTransform: "uppercase", fontWeight: "bold" }}>{t("ScheduleAppointment")}</Text>
            </TouchableOpacity>
          }



          {
            !Load && Qualified === false &&
            <TouchableOpacity
              onPress={() => setShowRating(!ShowRating)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                flexDirection: "row",
                backgroundColor: "orange",
                borderRadius: 8,
                marginTop: 10,
                minWidth: "70%",
                alignSelf: "center",
                justifyContent: "center"
              }}>
              <Icon name="star" fill={"#FFF"} width={20} height={20} />
              <Text style={{ marginLeft: 10, textAlign: "center", color: "#FFF", textTransform: "uppercase", fontWeight: "bold" }}>{t("rateMe")}!</Text>
            </TouchableOpacity>
          }

        </View>

      </ScrollView>
      <Menu props={props} option={4} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }

      <Modal animationType="slide" transparent={true} visible={ShowRating} >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View style={{ top: "20%" }}>
            <TouchableOpacity
              onPress={() => setShowRating(!ShowRating)}
              style={{
                position: "absolute", right: -10, top: 10
              }}>
              <Icon name="close-circle-outline" fill={"#FFF"} width={40} height={40} />
            </TouchableOpacity>
            <View style={{ backgroundColor: "#FFF", marginTop: "15%", padding: "10%", borderRadius: 5, width: "90%" }}>
              {
                ViewMSGRating === false &&
                <ValidateRating GetRating={GetRating} />
              }
              {
                LoadRating &&
                <ActivityIndicator size="large" color="orange" style={{ marginTop: 20 }} animating={true} />
              }
              {
                ViewMSGRating &&
                <View style={{ alignItems: "center" }}>
                  <Icon name='smiling-face-outline' fill='orange' width={50} height={50} />
                  <Text style={{ color: "orange", textTransform: "capitalize", fontSize: 22, fontWeight: "bold" }}>gracias</Text>
                </View>
              }
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}





export default MedicsView;

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    alignContent: "center"
  },
  header: {
    width: "100%",
    height: 350,
    backgroundColor: "#00A7B4",
    flexDirection: "row",
  },
  wrapName: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center"
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowRadius: 20
  },
  card: {
    marginBottom: 20,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 12,
    minWidth: "90%",
    width: "90%",
    padding: 20
  },
  cardTitle: {
    color: "#00AFE8",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold"
  },
  cardText: {
    textAlign: "justify",
    fontSize: 14,
    color: "#555",
    marginTop: 10
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold"
  },
  text: {
    marginLeft: 10
  },
  foot: {
    flexDirection: "column",
    marginTop: -20
  },

  group: {
    marginTop: 10,
  },
  smallTitle: {
    color: "#000",
    fontSize: 12,
    textTransform: "capitalize",
    lineHeight: 15,
    marginBottom: -10
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
  },
  img: {
    width: 35,
    height: 35,
    backgroundColor: "#000",
    borderRadius: 18
  },
  number: {
    top: -2,
    color: "#000",
    fontSize: 30,
    lineHeight: 40,
    left: 5
  },
  doubleLine: {
    marginTop: 5,
    flexDirection: "column",
    left: 10
  },
  smallText: {
    color: "#000",
    fontSize: 10
  },
  mediumText: {
    color: "#000",
    fontSize: 14,
    marginTop: -3,
  },
});