import React, { useState, useEffect } from 'react';
import {
ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View,Text,Image,ImageBackground,TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import UserContext from '../../../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Compare, { Before, After, DefaultDragger } from 'react-native-before-after-slider-v2';
import axios from 'axios'
import { serverCrm, base_url, file_server1 } from '../../../Env'
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import Horizon from '../../components/filters/Horizon.js';
import Testimonials from '../../components/cards/Testimonials';
import CardExperiences from '../../components/cards/CardExperiences.js'
import CardVideos from '../../components/cards/CardVideos.js'
import CardMedics from '../../components/cards/CardMedics.js'
import AfterBefore from '../../components/cards/AfterBefore.js'
import FilterGolden from '../../components/filters/Golden.js';
import FilterSilver from '../../components/filters/Silver.js';
import FilterMaximus from '../../components/filters/Maximus.js';
import HTML from 'react-native-render-html';
import {ProcessGet , GetThisServicesFavorite, ServicesFavoriteAdd, ServicesFavoriteDel } from '../../services/https'
import ValidateRating from '../../components/stars/Rating.js';
import { Touchable } from 'react-native';
import { colorAlfa, colorBetta, colorGamma, colorDelta, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorOmicron, colorPi, colorRo, colorSigma, colorTau, colorIpsilon, colorFi, colorji, colorPsi, colorOmega, colorPrimary } from '../../styles/Colors.js';

import ScoreStars from '../../components/stars/ScoreStars.js';
import ProcessHead from './ProcessHead.js';
// import Control from '../../components/Cards/DashboradControl.js';
// import Home from '../../components/Cards/Home.js';
// import { serverCrm, base_url, file_server1 } from '../../Env'
// import HTML from 'react-native-render-html';
// import { getCountryCallingCodeAsync } from 'react-native-country-picker-modal/lib/CountryService';


function Process(props) {
  const { t, i18n } = useTranslation();
  const { navigation } = props;
  const userDetails = React.useContext(UserContext).userDetails;
  const [Load, setLoad] = useState(true);
  const [tipList, settipList] = useState([]);
  const [TIP, setTIP] = useState("Home");
  const [ProcedureInfo, setProcedureInfo] = useState(null);
  const [ListMedics, setListMedics] = useState(null);
  const [filterPremium, setfilterPremium] = useState(true);
  const [filterFiveStars, setfilterFiveStars] = useState(true);
  const [ListMedicsPrint, setListMedicsPrint] = useState(null);
  const [state, setState] = useState({ scrollEnabled: true });
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const [Modal, setModal] = useState(false);
  const [thisfavorite, setthisfavorite] = useState(false);
  //  const [dataToSend, setdataToSend] = useState([]);
  const [successful, setsuccessful] = useState(false);
  const [ShowRating, setShowRating] = useState(false);




  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  let id_Medic
  if (props.route.params.id_Medic) { id_Medic = props.route.params.id_Medic }
  else { id_Medic = 0 }

  useEffect(() => {
   Get();
  }, [randomCode]);

  async function Get() {
    const response = await ProcessGet(props.route.params.data.id, "es");
    //console.log("response: ", response)
    setProcedureInfo(response);
    const response1 = await GetThisServicesFavorite(userDetails.id_client, ProcedureInfo.id);
    setthisfavorite(response1);
  }


  useEffect(() => {
    //console.log("now");
    if (ProcedureInfo !== null) {
      Count();
      setListMedics(ProcedureInfo.Medics);
    }
  }, [ProcedureInfo]);


  function filterByPremium(e) {
    setfilterPremium(!filterPremium);
  }

  function filterByEstrellas(e) {
    setfilterFiveStars(!filterFiveStars);
  }

  useEffect(() => {
    setLoad(true);
   // console.log(filterPremium, "/", filterFiveStars);
    filtration()
  }, [filterPremium, filterFiveStars]);




  function filtration() {
    if (filterPremium === true && filterFiveStars === false) {
      console.log("case 1")
      const res = _.filter(ListMedics, ['type', 'premium']);
      setListMedicsPrint(res);
    }
    if (filterPremium === false && filterFiveStars === true) {
      console.log("case 2")
      const res = _.filter(ListMedics, function (o) { return o.stars >= 4.75; });
      setListMedicsPrint(res);
    }
    if (filterPremium === true && filterFiveStars === true) {
      console.log("case 3")
      const res = _.filter(ListMedics, ['type', 'premium']);
      const res1 = _.filter(res, function (o) { return o.stars >= 4.75; });
      setListMedicsPrint(res1);
    }
    if (filterPremium === false && filterFiveStars === false) {
      console.log("case 4")
      setListMedicsPrint(ListMedics);
    }
    setLoad(false);
  }

  useEffect(() => {
    setListMedicsPrint(ListMedics);
  }, [ListMedics]);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 1000);
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
    else { home = 0; }
    if (ProcedureInfo.Experiences) { experiences = ProcedureInfo.Experiences.length; }
    else { experiences = 0; }
    if (ProcedureInfo.Testimonials) { testimonials = ProcedureInfo.Testimonials.length; }
    else { testimonials = 0; }
    if (ProcedureInfo.Medics) { medics = ProcedureInfo.Medics.length; }
    else { medics = 0; }
    if (ProcedureInfo.Videos) { videos = ProcedureInfo.Videos.length; }
    else { videos = 0; }
    if (ProcedureInfo.BeforeAfter) { beforeafter = ProcedureInfo.BeforeAfter.length; }
    else { beforeafter = 0; }

    response = [
      // { "name": t("Home"), "value": home },
      { "name": t("Experiences"), "value": experiences },
      { "name": t("Testimonials"), "value": testimonials },
      //{ "name": t("Medics"), "value": medics },
      { "name": t("Videos"), "value": videos },
      { "name": t("BeforeAfter"), "value": beforeafter },
    ]
    settipList(response);
  }

  function ShowModal(e) {
    //console.log("modal: ", e)
    setModal(e);
  }

  function ViewTips(e) {
    setTIP(e)
  }

  function goToScreen(screen, data) {
    let from = "Process";
    navigation.navigate(screen, {
      randomCode: Math.random(), data, from, id_Medic
    })
  }

  const onMoveStart = () => {
    setState({ scrollEnabled: false });
  }

  const onMoveEnd = () => {
    setState({ scrollEnabled: true });
  }

  function showfromFather() {
    //console.log("showfromFather")
    ShowModal(!Modal)
  }




  // function IDFather(id) {
  //   if (id <= 3) {
  //     return (
  //       <TouchableOpacity style={styles.btn} onPress={() => ShowModal(!Modal)}>
  //         <Icon name="calendar-outline" width={20} height={20} fill="#FFF" />
  //         <Text style={styles.btnText}>{t("ScheduleAppointment")}</Text>
  //       </TouchableOpacity>
  //     )
  //   }
  //   else {
  //     return (
  //       <TouchableOpacity style={styles.btn} onPress={() => Cotizar()}>
  //         <Icon name="calendar-outline" width={20} height={20} fill="#FFF" />
  //         <Text style={styles.btnText}>{t("ScheduleAppointment")}</Text>
  //       </TouchableOpacity>
  //     )
  //   }
  // }





  async function Cotizar() {
    //console.log("cotizando...!", ProcedureInfo)
    let data = {
      "id_cliente": userDetails.id_client,
      "id_subcategory": ProcedureInfo.id,
      "id_medic": id_Medic,
      "photos": []
    }
    //console.log(data);
    let msj
    await axios.post(base_url(serverCrm, `wellezy/cotization/create`), data).then(function (response) {
      console.log("like me!")
      msj = response.data
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    //console.log("-> ", msj)
    if (msj === true) {
      setsuccessful(true);
    }
    return msj;
  }

  useEffect(() => {
    setTimeout(() => {
      setsuccessful(false)
    }, 10000);
  }, [successful]);

  async function FavoriteAdd() {
    //console.log("add");
    //console.log(ProcedureInfo.id, "-/-", userDetails.id_client)
    ServicesFavoriteAdd(ProcedureInfo.id, userDetails.id_client)
    const response1 = await GetThisServicesFavorite(userDetails.id_client, ProcedureInfo.id);
    setthisfavorite(response1);

  }
  async function FavoriteDel() {
    //console.log("del");
    //console.log(ProcedureInfo.id, "-/-", userDetails.id_client)
    ServicesFavoriteDel(ProcedureInfo.id, userDetails.id_client)
    const response1 = await GetThisServicesFavorite(userDetails.id_client, ProcedureInfo.id);
    setthisfavorite(response1);

  }


//  console.log("________________process this favorite?", thisfavorite);


  function GetRating(e) {
   // console.log("rating....", e)
    setTimeout(() => {
      setShowRating(false);
    }, 1000);

    // let Qualified
    // await axios.get(base_url(serverCrm, `getDoctorQualified/${id_medic}/${id_client}`)).then(function (response) {
    //   Qualified = response.data
    // })
    //   .catch(function (error) { console.log("Qualified?", error) })
    //   .then(function () { });
    // return Qualified;

    // setQualified(true);
    // setLoadRating(true);
    // console.log(Data);
    // let newRating = Data.rating + v;
    // let newBasedOn = Data.basedOn + 1;
    // let newStars = newRating / newBasedOn;

    // let updateRegistre = {
    //   "id_client": userDetails.id_client,
    //   "id_doctor": Data.id,
    //   "rating": newRating,
    //   "basedOn": newBasedOn,
    //   "stars": newStars,
    // }
    // console.log("->", updateRegistre);
    // await sendMedicsRating(updateRegistre);
    // await Get();
    // setLoadRating(false);
    // setViewMSGRating(true);
    // setTimeout(() => {
    //   setShowRating(!ShowRating);
    // }, 2000);
  }


  console.log("ProcedureInfo ----> ",ProcedureInfo)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colorZeta} barStyle='dark-content' />
      <ScrollView scrollEventThrottle={16}>
        <Head props={props} return={props.route.params.from} />
        {!Load && ProcedureInfo !== null &&
          <View style={styles.wrap}>
           
           
            <ProcessHead
              Cotizar={Cotizar}
              showfromFather={showfromFather}
              Data={ProcedureInfo}
              id_client={userDetails.id_client}
              thisfavorite={thisfavorite}
              ServicesFavoriteAdd={FavoriteAdd}
              ServicesFavoriteDel={FavoriteDel}
              goToScreen={goToScreen}
            />

            <Horizon TIP={TIP} data={tipList} ViewTips={ViewTips} />

            {TIP === "Home" && ProcedureInfo !== null &&
              <View style={{ width: "100%", alignItems: "center", alignContent: "center" }}>
                <View style={{ backgroundColor: "#FFF", width: "90%", paddingHorizontal: 15, paddingVertical: 25, borderRadius: 15 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#00AFE8", marginBottom: 20 }}></Text>
                  <HTML html={ProcedureInfo.description} imagesMaxWidth={deviceWidth} />
                </View>
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
              </View>
            }
            {
              TIP === t("Testimonials") && ProcedureInfo.Testimonials.length !== 0 &&
              ProcedureInfo.Testimonials.map((i, key) => { return (<Testimonials props={props} key={key} data={i} />); })
            }
            {
              TIP === t("Experiences") && ProcedureInfo.Experiences.length !== 0 &&
              ProcedureInfo.Experiences.map((i, key) => { return (<CardExperiences props={props} key={key} data={i} />); })
            }
            {
              TIP === t("Videos") && ProcedureInfo.Videos.length !== 0 &&
              ProcedureInfo.Videos.map((i, key) => { return (<CardVideos key={key} data={i} />); })
            }
            {
              TIP === t("BeforeAfter") && ProcedureInfo.BeforeAfter.length !== 0 &&
              ProcedureInfo.BeforeAfter.map((i, key) => { return (<AfterBefore key={key} data={i} scale={100} />); })
            }
            {
              TIP === t("Medics") &&
              <View style={styles.wrapMedics}>
                <FilterSilver icon="award" textUp={t("sortBy")} textDown="Premium" function={filterByPremium} />
                <FilterGolden icon="star" textLeft={t("5stars")} textRight="" function={filterByEstrellas} />
                {/* <FilterMaximus /> */}
                {
                  ListMedicsPrint.length !== 0 &&
                  ListMedicsPrint.map((i, key) => { return (<CardMedics key={key} data={i} scale={100} goToScreen={goToScreen} />); })
                }
                {
                  ListMedicsPrint.length === 0 && Empty(t("sorryEmpty"))
                }
              </View>
            }
            {TIP === t("Testimonials") && ProcedureInfo.Testimonials.length === 0 && Empty(t("sorryEmpty"))}
            {TIP === t("Experiences") && ProcedureInfo.Experiences.length === 0 && Empty(t("sorryEmpty"))}
            {TIP === t("Videos") && ProcedureInfo.Videos.length === 0 && Empty(t("sorryEmpty"))}
            {TIP === t("BeforeAfter") && ProcedureInfo.BeforeAfter.length === 0 && Empty(t("sorryEmpty"))}

            <TouchableOpacity style={styles.btn} onPress={() => goToScreen('SimpleForm', ProcedureInfo)}>
              <Icon name="calendar-outline" width={20} height={20} fill="#FFF" />
              <Text style={styles.btnText}>{t("ScheduleAppointment")}</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.btn} onPress={() => goToScreen('HistoriaClinica', ProcedureInfo)}>
              <Icon name="calendar-outline" width={20} height={20} fill="#FFF" />
              <Text style={styles.btnText}>Historia Clinica</Text>
            </TouchableOpacity> */}
            {/* {
              !Load && ProcedureInfo !== null &&
              IDFather(ProcedureInfo.id_father)
            } */}
            <TouchableOpacity
              onPress={() => setShowRating(!ShowRating)}
              style={styles.btn}>
              <Icon name="star" fill={"#FFF"} width={20} height={20} />
              <Text style={styles.btnText}>{t("rateMe")}!</Text>
            </TouchableOpacity>
          </View>
        }
        <View style={{ height: 80, }}></View>
      </ScrollView>
      {/* {!Load && ProcedureInfo !== null &&
        <View>
          {ProcedureInfo.id_father <= 3 &&
            <Control
              Modal={Modal}
              ShowModal={ShowModal}
              Data={ProcedureInfo}
              id_Medic={id_Medic}
              id_client={userDetails.id_client}
            />}
        </View>
      } */}
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
      <Menu props={props} option={4} />
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
          <View style={{ width: "70%", backgroundColor: "white", padding: 25, borderRadius: 20 }}>
            <ValidateRating GetRating={GetRating} />
          </View>
        </View>
      }
      {
        Load &&
        <View style={{
          marginTop: 200,
          position: "absolute",
          // justifyContent: "center",
          // zIndex: 999999,
          width: "100%",
          // minHeight: 300,
          // backgroundColor: "rgba(0,0,0,0.5)"
        }}>
          <ActivityIndicator size="large" color="#00AFE8" style={{ marginVertical: 40 }} />
        </View>
      }
    </SafeAreaView>
  );
}

function Empty(msj) {
  return (
    <View style={styles.emptyWrap}>
      <Icon name='alert-circle-outline' fill="silver" width={40} height={40} />
      <Text style={styles.emptyText}>
        {msj}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    alignContent: "center"
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
  loadWrap: {
    position: "absolute",
    justifyContent: "center",
    zIndex: 999999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,0,0,0.5)"
  },
  emptyWrap: {
    marginVertical: 30,
    alignItems: "center",
    borderWidth: 2, borderColor: "silver",
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