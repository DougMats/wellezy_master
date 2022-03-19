import React, { useState, useContext, useRef, useEffect } from 'react';
import { RefreshControl, ActivityIndicator, Modal, SafeAreaView, Dimensions, Switch, StatusBar, ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';

//components
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

//color default
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

//routes server
import { doctors } from '../../services/connection.js';
import { file_server1 } from '../../../Env'



// // import { RefreshControl, ActivityIndicator, Modal, SafeAreaView, Switch, StatusBar, ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
// // import Toast from 'react-native-simple-toast';
// // import { Icon } from 'react-native-eva-icons';
// // import { useTranslation } from 'react-i18next';
// // import Head from '../../components/generic/Head';
// // import Menu from '../../components/generic/Menu';
// // //import { MedicGetTotalInfo, sendMedicsRating, MedicGetQualified } from '../../services/https'
// // import { doctors } from '../../services/connection'




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Width = windowWidth / 12


function MedicsView(props) {
  const [vertical, setvertical] = useState(false);
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(true);
  const { navigation } = props
  const { userDetails } = useContext(UserContext);
  const [TIP, setTIP] = useState("Home");

  const [openup, setopenup] = useState(false);


  const [Data, setData] = useState(null);
  const [Qualified, setQualified] = useState(true);
  const [ShowRating, setShowRating] = useState(false);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    get(props.route.params.data.id);
  }, [randomCode]);

  useEffect(() => {
    if (Data !== null) {
      Count();
    }
  }, [Data]);


  const [LoadRating, setLoadRating] = useState(false);
  const [ViewMSGRating, setViewMSGRating] = useState(false);




  //   const [Favorite, setFavorite] = useState(false);
  //   const [Data, setData] = useState(null);

  //   // $data                 = $this->getBasicFromMedic($id,$len);
  //   // $data['Procedures']   = $this->getBasicFromProcedures($id,$len);
  //   // $data['Experiences']  = $this->getBasicFromExperiences($id,$len);
  //   // $data['Videos']       = $this->getBasicFromVideos($id,$len);
  //   // $data['BeforeAfter']  = $this->getBasicFromBeforeAfter($id,$len);
  //   // $data['Testimonials'] = $this->getBasicFromTestimonials($id,$len);
  //   // $data['Specials']     = $this->getBasicFromSpecials($id, $len);
  //   // $data['Studies']         = $this -> getBasicFromAcademic($id, $len);

  const [tipList, settipList] = useState([
    { id: "Home", "name": t("Home"), "value": 0 },
    { id: "Studies", "name": t("Studies"), "value": 0 },
    { id: "Experiences", "name": t("Experiences"), "value": 0 },
    { id: "Testimonials", "name": t("Testimonials"), "value": 0 },
    { id: "Videos", "name": t("Videos"), "value": 0 },
    { id: "BeforeAfter", "name": t("BeforeAfter"), "value": 0 },
    { id: "Procedures", "name": t("Procedures"), "value": 0 },
    { id: "Specials", "name": t("Specials"), "value": 0 },
  ]);

  // function ViewTips(e) { setTIP(e); }

  async function get(id) {
    setLoad(true)
    const res = await doctors.thisDoctor(id, i18n.language)
    setData(res)
    const qualified = await doctors.MedicGetQualified(props.route.params.data.id, userDetails.id)
    console.log("qualified... ", qualified)
    //setQualified(qualified)
    setLoad(false)
  }

  function Count() {
    let experiences, testimonials, videos, beforeafter, procedures, specials;
    if (Data.Experiences) { experiences = Data.Experiences.length; }
    if (Data.Testimonials) { testimonials = Data.Testimonials.length; }
    if (Data.Videos) { videos = Data.Videos.length; }
    if (Data.BeforeAfter) { beforeafter = Data.BeforeAfter.length; }
    if (Data.Procedures) { procedures = Data.Procedures.length; }
    if (Data.Specials) { specials = Data.Specials.length; }
    const response = [
      { id: "Home", "name": t("Home"), "value": 0 },
      { id: "Studies", "name": t("Studies"), "value": 0 },
      { id: "Experiences", "name": t("Experiences"), "value": experiences },
      { id: "Testimonials", "name": t("Testimonials"), "value": testimonials },
      { id: "Videos", "name": t("Videos"), "value": videos },
      { id: "BeforeAfter", "name": t("BeforeAfter"), "value": beforeafter },
      { id: "Procedures", "name": t("Procedures"), "value": procedures },
      { id: "Specials", "name": t("Specials"), "value": specials },
    ];
    settipList(response);
  }

  //async function MyFavorite(value) {}

  async function GetRating(v) { }
  //     setQualified(true);
  //     setLoadRating(true);
  //     let newRating = Data.rating + v;
  //     let newBasedOn = Data.basedOn + 1;
  //     let newStars = newRating / newBasedOn;
  //     let updateRegistre = {
  //       "id_client": userDetails.id,
  //       "id_doctor": Data.id,
  //       "rating": newRating,
  //       "basedOn": newBasedOn,
  //       "stars": newStars,
  //     }
  //     await doctors.sendMedicsRating(updateRegistre);
  //     setLoadRating(false);
  //     setViewMSGRating(true);
  //     setTimeout(() => {
  //       setShowRating(!ShowRating);
  //     }, 2000);
  //     await Get(Data.id);
  //   }

  // {
  //   "id": 2,
  //   "title": "Médico cirujano",
  //   "name": "David",
  //   "surname": "Majana Navarro",
  //   "img": "1157-41709.jpg",
  //   "phone": "31242238384",
  //   "country": "Colombia",
  //   "city": "Cali",
  //   "departament": "Antioquia",
  //   "country_id": "COL",
  //   "city_id": "2259",
  //   "type": "standard",
  //   "adress": "Cali, Valle del cauca",
  //   "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like.",
  //   "identification": "",
  //   "id_medic": "AS232",
  //   "rating": 50,
  //   "basedOn": 0,
  //   "stars": 0,
  //   "facebbok": "",
  //   "instagram": "",
  //   "twitter": "",
  //   "youtube": "",


  //   function empty() {
  //     if (TIP === t("Testimonials") && Data.Testimonials.length === 0) { return <CardEmpty /> }
  //     if (TIP === t("Videos") && Data.Videos.length === 0) { return <CardEmpty /> }
  //     if (TIP === t("specials") && Data.Specials.length === 0) { return <CardEmpty /> }
  //     if (TIP === t("BeforeAfter") && Data.BeforeAfter.length === 0) { return <CardEmpty /> }
  //     if (TIP === t("Experiences") && Data.Experiences.length === 0) { return <CardEmpty /> }
  //     if (TIP === t("Procedures") && Data.Procedures.length === 0) { return <CardEmpty /> }
  //   }





  function goToScreen(screen, data) {
    let from = "MedicsView";
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={"transparent"} barStyle={!Qualified ? 'light-content' : 'dark-content'} translucent />
      <ScrollView scrollEventThrottle={16} horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          {
          //!Load && Data !== null && <Header open={Qualified} close={setQualified} data={Data} GetRating={GetRating} />
          }
          <View style={{
            backgroundColor: color_screen,
            marginTop: !Qualified ? -30 : 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 40,
          }}>
            {!Load &&
              <View style={{ position: "absolute", top: !Qualified ? 20 : 40, paddingHorizontal: 20, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}><Icon name="arrow-ios-back-outline" width={30} height={30} fill={color_fifth} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setvertical(true)}><Icon name="more-vertical-outline" width={30} height={30} fill={color_fifth} /></TouchableOpacity>
              </View>
            }
            {/* 
            {!Load &&
              <View style={{ position: "absolute", top: !Qualified ? 60 : 80, paddingHorizontal: 20, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => setQualified(!Qualified)}><Icon name={Qualified ? "star" : "star-outline"} width={30} height={30} fill={color_fifth} /></TouchableOpacity>
                <TouchableOpacity onPress={() => setvertical(true)}><Icon name="more-vertical-outline" width={30} height={30} fill={color_fifth} /></TouchableOpacity>
              </View>
            }
            */}
            {!Load &&
              <>
                <View style={{ alignSelf: "center", position: "relative", zIndex: 9, width: Width * 4, height: Width * 4, borderRadius: 12, overflow: "hidden" }}>
                  <Image source={{ uri: `${file_server1}/img/wellezy/users/${Data.img}` }} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
                </View>
                <View style={{ alignSelf: "center", alignItems: "center", marginBottom: 10, paddingTop: 30, marginTop: -20, paddingVertical: 10, backgroundColor: color_white, width: "90%", borderRadius: 12 }}>
                  <Text style={{}}>{Data.title}. {Data.name} {Data.surname}</Text>
                  <ScoreStars stars={Data.stars} size={25} color={color_star} />
                </View>
                <View style={{ marginVertical: 10 }}>
                  <ScrollView horizontal scrollEventThrottle={16} showsHorizontalScrollIndicator={true}>
                    {tipList.map((i, key) => {
                      return (
                        <TouchableOpacity key={key} onPress={() => setTIP(i.name)} style={{ height: Width * 1, minWidth: Width * 3, justifyContent: "center", alignItems: "center", backgroundColor: color_white, borderRadius: 8, marginHorizontal: 5, paddingHorizontal: 5, }}>
                          <Text style={{ width: "100%", textAlign: "center", fontSize: 14, fontWeight: "600", color: TIP === i.name ? color_fifth : color_grey_half }}>
                            {i.name} {i.name !== t("Home") && i.name !== t("Studies") && <Text style={{}}> ({i.value})</Text>}
                          </Text>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                </View>
              </>
            }
          </View>
          <View style={{ paddingBottom: 80, alignItems: "center", backgroundColor: color_screen }}>
            {Load && <ActivityIndicator size="large" color={color_primary} animating={true} style={{ marginTop: 100 }} />}
            {TIP === t("Studies") && !Load && Data !== null &&
              <View style={{}}>
                <Text style={{ color: color_fifth, fontWeight: "bold", marginTop: 20, fontSize: 14, textTransform: "uppercase" }}>academic training</Text>
                {Data.Studies.academic_training.map((i, key) => {
                  return (
                    <Academy key={key} data={i} />
                  )
                })}
                <Text style={{ color: color_fifth, fontWeight: "bold", marginTop: 20, fontSize: 14, textTransform: "uppercase" }}>courses y seminars</Text>
                {Data.Studies.courses_seminars.map((i, key) => {
                  return (
                    <Academy key={key} data={i} />
                  )
                })}
              </View>
            }
            {TIP === t("Testimonials") && !Load && Data.Testimonials !== undefined &&
              Data.Testimonials.map((i, key) => {
                return (
                  <CardTestimonials data={i} key={key} props={props} />
                )
              })
            }
            {TIP === t("Specials") && !Load && Data.Specials !== undefined &&
              Data.Specials.map((i, key) => {
                return (
                  <CardSpecials key={key} data={i} goToScreen={goToScreen} />
                )
              })
            }
            {TIP === t("BeforeAfter") && !Load && Data.BeforeAfter !== undefined &&
              Data.BeforeAfter.map((i, key) => {
                return (
                  <AfterBefore data={i} key={key} props={props} />
                )
              })
            }
            {TIP === t("Videos") && !Load && Data.Videos !== undefined &&
              Data.Videos.map((i, key) => {
                return (
                  <CardVideos data={i} key={key} props={props} />
                )
              })
            }
            {TIP === t("Experiences") && !Load && Data.Experiences !== null &&
              Data.Experiences.map((i, key) => {
                return (
                  <CardExperiences data={i} key={key} props={props} />
                )
              })
            }
            {TIP === t("Procedures") && !Load &&
              Data.Procedures !== null &&
              Data.Procedures.map((i, key) => {
                return (
                  <CardProcedure id_Medic={Data.id} data={i} key={key} props={props} />
                )
              })
            }
            {TIP === t("Home") && Load === false && Data !== null &&
              <View style={{}}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>About me</Text>
                  <Text style={styles.cardText}>{'\t'}{'\t'}{Data.description}</Text>
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
          </View>
        </View>

        {/* 
      {
        TIP === "Home" && Load === false && Data !== null &&
        <View style={{}}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Rating</Text>
            <View style={{ flexDirection: "column", marginTop: 10, marginBottom: -10 }}>
            <View style={{ flexDirection: "row" }}>
          <View style={{ top: 3, marginRight: 10 }}>
            <Icon name='star' height={30} width={20} fill='orange' />
          </View>

          <Text style={styles.cardText}>5 estrellas</Text>
          </View>
        
        <View style={{ flexDirection: "row" }}>
          <View style={{ top: 3, marginRight: 10 }}>
            <Icon name='star' height={30} width={20} fill='orange' />
          </View>
          <Text style={styles.cardText}>basados en: 45 personas</Text>
           </View> 
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
          <View style={styles.group}>
          <Text style={styles.smallTitle}>{t("averagePrice")}:</Text>
          <View style={styles.row}>
            <Text style={styles.number}>$ 730.000</Text>
            <View style={styles.doubleLine}>
              <Text style={styles.smallText}>{t("accordingTo")}:</Text>
              <Text style={styles.mediumText}> 20 {t("patients")}</Text>
            </View>
          </View>
          </View> 
            </View>
          </View>
        </View>
      }




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
    
    
    {!Load && !Qualified &&
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
*/}







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
    </SafeAreaView>
  )
}

const Academy = (props) => {
  return (
    <View style={{ width: "90%", minWidth: "90%", paddingVertical: 15, paddingHorizontal: 15, borderRadius: 10, backgroundColor: color_white, marginTop: 5, flexDirection: "column" }}>
      <Text style={{ color: color_fifth, fontSize: 14, fontWeight: "bold" }}>{props.data.college}</Text>
      <Text style={{ fontSize: 14, fontWeight: "400", color: color_grey_half, }}>{props.data.studies}</Text>
      <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
        <Text style={{ color: color_grey_half, fontSize: 12, }}>{props.data.location}. {props.data.date}</Text>
      </View>
    </View>
  )
}




const Header = (props) => {


  return (
    <View style={{
      backgroundColor: color_fifth,
      height: Width * 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>

<Text style={{fontSize:14, fontWeight:"bold", textTransform:"uppercase", color: color_white, marginBottom:20}}>¿que te parece {props.data.name}?</Text>

<ValidateRating GetRating={props.GetRating} />



    </View>
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
    color: color_fifth,
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
    color: color_grey_half,
    fontSize: 14,
    textTransform: "uppercase",
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