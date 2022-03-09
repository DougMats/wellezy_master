import React, { useState, useEffect,useCallback, useContext } from 'react'
import { SafeAreaView,RefreshControl, StatusBar, View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next';
import MenuVertical from '../../components/generic/MenuVertical';
import ProcessHead from './ProcessHead.js';
import { procedimientos } from '../../services/connection'
import Horizon from '../../components/filters/Horizon.js';
import UserContext from '../../../contexts/UserContext'

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
} from '../../styles/Colors.js';

import { Icon } from 'react-native-eva-icons';
import Compare, { Before, After, DefaultDragger } from 'react-native-before-after-slider-v2';
import HTML from 'react-native-render-html';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import CardExperiences from '../../components/cards/CardExperiences'
import CardTestimonials from '../../components/cards/CardTestimonials';
import CardMedics from '../../components/cards/CardMedics';
import CardVideos from '../../components/cards/CardVideos';
import AfterBefore from '../../components/cards/AfterBefore';
import FilterSilver from '../../components/filters/Silver.js';
import FilterGolden from '../../components/filters/Golden.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

//import TopMenu from '../../components/generic/topMenu'
// import axios from 'axios'
//import _ from 'lodash';
// import ValidateRating from '../../components/stars/Rating.js';
// import { serverCrm, base_url, file_server1 } from '../../../Env'
// import { ProcessGet, GetThisServicesFavorite, ServicesFavoriteAdd, ServicesFavoriteDel } from '../../services/https'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function Process(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props;
  const userDetails = useContext(UserContext).userDetails;
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [ProcedureInfo, setProcedureInfo] = useState(null);
  const [thisfavorite, setthisfavorite] = useState(false);
  const [TIP, setTIP] = useState("Home");
  const [tipList, settipList] = useState([]);
  const [state, setState] = useState({ scrollEnabled: true });

  //   const [filterPremium, setfilterPremium] = useState(true);
  //   const [filterFiveStars, setfilterFiveStars] = useState(true);
  //   const [ListMedics, setListMedics] = useState(null);
  //   const [ListMedicsPrint, setListMedicsPrint] = useState(null);
  //   const [successful, setsuccessful] = useState(false);
  //   const [ShowRating, setShowRating] = useState(false);
  //   const [Modal, setModal] = useState(false);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }


  let id_Medic
  if (props.route.params.id_Medic) {
    console.log("como es posible que ------> ", props.route.params.id_Medic)
    id_Medic = props.route.params.id_Medic }
  else { id_Medic = 0 }


  console.log("entonces.... id_Medic in process: ----->", id_Medic)

  useEffect(() => {
    Get();
  }, [randomCode]);


  async function Get() {
    setLoad(true)
    const response1 = await procedimientos.processFavorite(userDetails.id, props.route.params.data.id);
    setthisfavorite(response1);
    const process = await procedimientos.ProcessGet(props.route.params.data.id, i18n.language)
    setProcedureInfo(process);
  }

  function ViewTips(e) {
    setTIP(e)
  }


  useEffect(() => {
    if (ProcedureInfo !== null) {
      setLoad(false)
      Count();
    }
  }, [ProcedureInfo]);




  function Count() {
    let response = [];
    let home;
    let experiences;
    let testimonials;
    let medics;
    let videos;
    let beforeafter;
    if (ProcedureInfo.Home) { home = ProcedureInfo.Home.length; }
    else { home = 30; }
    if (ProcedureInfo.Experiences) { experiences = ProcedureInfo.Experiences.length; }
    else { experiences = 40; }
    if (ProcedureInfo.Testimonials) { testimonials = ProcedureInfo.Testimonials.length; }
    else { testimonials = 10; }
    if (ProcedureInfo.Medics) { medics = ProcedureInfo.Medics.length; }
    else { medics = 22; }
    if (ProcedureInfo.Videos) { videos = ProcedureInfo.Videos.length; }
    else { videos = 8; }
    if (ProcedureInfo.BeforeAfter) { beforeafter = ProcedureInfo.BeforeAfter.length; }
    else { beforeafter = 67; }
    response = [
      // { "name": t("Home"), "value": home },
      { "name": t("Experiences"), "value": experiences },
      { "name": t("Testimonials"), "value": testimonials },
      { "name": t("Medics"), "value": medics },
      { "name": t("Videos"), "value": videos },
      { "name": t("BeforeAfter"), "value": beforeafter },
    ]
    settipList(response);
  }

  const onMoveStart = () => {
    setState({ scrollEnabled: false });
  }

  const onMoveEnd = () => {
    setState({ scrollEnabled: true });
  }

  async function FavoriteAdd() {
    console.log("FavoriteAdd")
    const resDel = await procedimientos.ServicesFavoriteAdd(userDetails.id, props.route.params.data.id)
    //console.log(resDel)
    const res = await procedimientos.processFavorite(userDetails.id, props.route.params.data.id);
    setthisfavorite(res);
  }


  async function FavoriteDel() {
    console.log("FavoriteDel")
    const resDel = await procedimientos.ServicesFavoriteDel(userDetails.id, props.route.params.data.id)
    //console.log(resDel)
    const res = await procedimientos.processFavorite(userDetails.id, props.route.params.data.id);
    setthisfavorite(res);
  }

  function goToScreen(screen, data) {
    let from = "Process"
    let id_MedicSource = id_Medic
    props.navigation.navigate(screen, { randomCode: Math.random(), from, data, id_MedicSource })
  }




  //   useEffect(() => {
  //     setLoad(true);
  //     filtration()
  //   }, [filterPremium, filterFiveStars]);

  //   function filtration() {
  //     if (filterPremium === true && filterFiveStars === false) {
  //       console.log("case 1")
  //       const res = _.filter(ListMedics, ['type', 'premium']);
  //       setListMedicsPrint(res);
  //     }
  //     if (filterPremium === false && filterFiveStars === true) {
  //       console.log("case 2")
  //       const res = _.filter(ListMedics, function (o) { return o.stars >= 4.75; });
  //       setListMedicsPrint(res);
  //     }
  //     if (filterPremium === true && filterFiveStars === true) {
  //       console.log("case 3")
  //       const res = _.filter(ListMedics, ['type', 'premium']);
  //       const res1 = _.filter(res, function (o) { return o.stars >= 4.75; });
  //       setListMedicsPrint(res1);
  //     }
  //     if (filterPremium === false && filterFiveStars === false) {
  //       console.log("case 4")
  //       setListMedicsPrint(ListMedics);
  //     }
  //     setLoad(false);
  //   }

  // function showfromFather() {
  //   //     ShowModal(!Modal)
  // }

  //console.log("userDetails: ", userDetails)
  //async function Cotizar() {
  //     let data = {
  //       "ide": userDetails.id,
  //       "id_subcategory": ProcedureInfo.id,
  //       "id_medic": id_Medic,
  //       "photos": []
  //     }
  //     let msj
  //     await axios.post(base_url(serverCrm, `wellezy/cotization/create`), data).then(function (response) {
  //       console.log("like me!")
  //       msj = response.data
  //     })
  //       .catch(function (error) { msj = error.data })
  //       .then(function () { });
  //     if (msj === true) {
  //       setsuccessful(true);
  //     }
  //     return msj;
  // }

  //     ServicesFavoriteDel(ProcedureInfo.id, userDetails.id)
  //     const response1 = await GetThisServicesFavorite(userDetails.id, ProcedureInfo.id);
  //     setthisfavorite(response1);
  // await procedimientos.ServicesFavoriteAdd()
  //     ServicesFavoriteAdd(ProcedureInfo.id, userDetails.id)
  //     const response1 = await GetThisServicesFavorite(userDetails.id, ProcedureInfo.id);
  //     setthisfavorite(response1);
  //   function GetRating(e) {
  //     setTimeout(() => {
  //       setShowRating(false);
  //     }, 1000);
  //   }

  //let from = "Process";
  //navigation.navigate(screen, {
  //randomCode: Math.random(), data, from, id_Medic
  //})
  //<Head props={props} return="" show={vertical} action={setvertical}/>

  const onRefresh = useCallback(() => {
    Get()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }

      <StatusBar
        backgroundColor={"transparent"}
        //barStyle='light-content'
        translucent
      />

      {Load ? <View style={{ width: deviceWidth, height: deviceHeight, position: "absolute", zIndex: 9, justifyContent: "center" }}>
        <ActivityIndicator color={color_primary} size={40} />
      </View>
        :
        <ScrollView
        scrollEventThrottle={16}
        //contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={Load}
            onRefresh={onRefresh}
          />
        }>

          <ProcessHead
            show={vertical}
            action={setvertical}
            Data={ProcedureInfo}
            id={userDetails.id} //"id": "1", "id_user": 43,
            thisfavorite={thisfavorite}
            ServicesFavoriteAdd={FavoriteAdd}
            ServicesFavoriteDel={FavoriteDel}
            goToScreen={goToScreen}
            rol={userDetails.rol}
            // Cotizar={Cotizar}
            // showfromFather={showfromFather}
          />

          <Horizon
            TIP={TIP}
            data={tipList}
            ViewTips={ViewTips}
          />

          <View style={styles.wrap}>
            {TIP === "Home" && ProcedureInfo !== null &&
              <View style={{ width: "100%", alignItems: "center", alignContent: "center" }}>
                <View style={{ backgroundColor: "#FFF", width: "90%", paddingHorizontal: 15, paddingVertical: 25, borderRadius: 15 }}>
                  {/* <Text style={{ fontSize: 18, fontWeight: "bold", color: "#00AFE8", marginBottom: 20 }}>ttt</Text> */}
                  <HTML html={ProcedureInfo.description} imagesMaxWidth={deviceWidth} />
                </View>

                {ProcedureInfo.foto_before !== "" && ProcedureInfo.foto_after !== "" &&
                  <View style={{ marginTop: 30, borderRadius: 15, overflow: "hidden" }}>
                    <Compare initial={deviceWidth / 2} draggerWidth={50} width={deviceWidth - 20} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd} >
                      <Before>
                        <Image source={{ uri: ProcedureInfo.foto_before }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
                      </Before>
                      <After>
                        <Image source={{ uri: ProcedureInfo.foto_after }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
                      </After>
                      <DefaultDragger />
                    </Compare>
                  </View>
                }
              </View>
            }

            {TIP === t("Experiences") && ProcedureInfo.Experiences.length !== 0 &&
              ProcedureInfo.Experiences.map((i, key) => { return (<CardExperiences props={props} key={key} data={i} goToScreen={goToScreen} />); })}
            {TIP === t("Experiences") && ProcedureInfo.Experiences.length === 0 && Empty(t("sorryEmpty"))}

            {TIP === t("Testimonials") && ProcedureInfo.Testimonials.length !== 0 &&
              ProcedureInfo.Testimonials.map((i, key) => { return (<CardTestimonials props={props} key={key} data={i} goToScreen={goToScreen} />); })}
            {TIP === t("Testimonials") && ProcedureInfo.Testimonials.length === 0 && Empty(t("sorryEmpty"))}

            {TIP === t("Videos") && ProcedureInfo.Videos.length !== 0 &&
              ProcedureInfo.Videos.map((i, key) => { return (<CardVideos key={key} data={i} goToScreen={goToScreen} />); })}
            {TIP === t("Videos") && ProcedureInfo.Videos.length === 0 && Empty(t("sorryEmpty"))}

            {TIP === t("BeforeAfter") && ProcedureInfo.BeforeAfter.length !== 0 &&
              ProcedureInfo.BeforeAfter.map((i, key) => { return (<AfterBefore key={key} data={i} goToScreen={goToScreen} scale={100} />); })}
            {TIP === t("BeforeAfter") && ProcedureInfo.BeforeAfter.length === 0 && Empty(t("sorryEmpty"))}

            {TIP === t("Medics") && ProcedureInfo.Medics.length !== 0 &&
              ProcedureInfo.Medics.map((i, key) => { return (<CardMedics key={key} data={i} goToScreen={goToScreen} scale={100} />); })}
            {TIP === t("Medics") && ProcedureInfo.Medics.length === 0 && Empty(t("sorryEmpty"))}
          </View>
        </ScrollView>
      }

      {/*
    {
      TIP === t("Medics") &&
      <View style={styles.wrapMedics}>
        {/* <FilterSilver icon="award" textUp={t("sortBy")} textDown="Premium" function={filterByPremium} />
        <FilterGolden icon="star" textLeft={t("5stars")} textRight="" function={filterByEstrellas} /> *}
        {/* <FilterMaximus /> *}
         {
          ListMedicsPrint.length !== 0 &&
          ListMedicsPrint.map((i, key) => { return (<CardMedics key={key} data={i} scale={100} goToScreen={goToScreen} />); })
        } 
        {
          ListMedicsPrint.length === 0 && Empty(t("sorryEmpty"))
        }
      </View>
    }

<TouchableOpacity style={styles.btn} onPress={() => goToScreen('SimpleForm', ProcedureInfo)}>
<Icon name="calendar-outline" width={20} height={20} fill="#FFF" />
<Text style={styles.btnText}>{t("ScheduleAppointment")}</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={() => setShowRating(!ShowRating)}
style={styles.btn}>
<Icon name="star" fill={"#FFF"} width={20} height={20} />
<Text style={styles.btnText}>{t("rateMe")}!</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.btn} onPress={() => goToScreen('HistoryClinicForm', ProcedureInfo)}>
<Icon name="calendar-outline" width={20} height={20} fill="#FFF" />
<Text style={styles.btnText}>{t("ScheduleAppointment")}</Text>
</TouchableOpacity>


{
successful &&
<View style={{
justifyContent: "center", alignContent: "center", alignItems: "center",
width: "100%", height: "100%", position: "absolute", zIndex: 999, backgroundColor: "rgba(0,0,0,0.8)"
}}>
<View style={{ alignContent: "center", alignItems: "center", backgroundColor: "#fff", width: "70%", height: 200, borderRadius: 20, justifyContent: "center", padding: 15 }}>
<Icon name="checkmark-circle-outline" width={60} height={60} fill="orange" />
<Text style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}>
{t("submittedSuccessfully")}
</Text>
</View>
</View>
}

{
ShowRating &&
<View style={{
justifyContent: "center",
alignContent: "center",
alignItems: "center",
width: "100%",
height: "100%",
position: "absolute",
zIndex: 999999,
backgroundColor: "rgba(0,0,0,0.8)"
}}>
<TouchableOpacity
onPress={()=>setShowRating(false)}
style={{
position:"absolute",
top:30,
right:30
}}>
<Icon name='close-outline' fill="white" width={40} height={40} />
</TouchableOpacity>
<View style={{ width: "70%", backgroundColor: "white", padding: 25, borderRadius: 20 }}>
<ValidateRating GetRating={GetRating} />
</View>
</View>
}

{
Load &&
<View style={{
width: "100%",
height: "100%",
flex: 1,
position: "absolute",
zIndex: 9999,
justifyContent: "center",
backgroundColor: "rgba(0,0,0,0.5)"
}}>
<ActivityIndicator size={60} color={colorZeta} />
</View>
}

*/}
      <Menu props={props} option={4} />
    </SafeAreaView>
  )
}




function Empty(msj) {
  return (
    <View style={styles.emptyWrap}>
      <Icon name='alert-circle-outline' fill="silver" width={60} height={60} />
      <Text style={styles.emptyText}>{msj}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    alignContent: "center",
    paddingBottom: 80
  },

    wrapMedics: {
      alignContent: "center",
      alignItems: "center",
      width: "100%",
      overflow: "hidden"
    },

  btn: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#00AFE8",
    width: "70%",
    padding: 10,
    borderRadius: 20
  },
  btnText: {
    textTransform: "uppercase",
    marginLeft: 15,
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700"
  },
  //   loadWrap: {
  //     position: "absolute",
  //     justifyContent: "center",
  //     zIndex: 999999,
  //     width: "100%",
  //     height: "100%",
  //     backgroundColor: "rgba(255,0,0,0.5)"
  //   },

    emptyWrap: {
      marginVertical: 30,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "silver",
      padding: 20,
      width: "80%",
      borderRadius: 20,
      borderStyle: "dashed"
    },
    emptyText: {
      textAlign: "center",
      color: "silver",
      fontSize: 14,
      textTransform: "uppercase",
      fontWeight: "bold"
    }
});
export default Process;