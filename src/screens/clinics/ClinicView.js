import React, { useState, useEffect } from 'react';
import { RefreshControl, Dimensions, ActivityIndicator, Modal, SafeAreaView, Switch, StatusBar, ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';

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


// import _ from 'lodash';
// import ScoreStars from '../../components/stars/ScoreStars.js';
// // import { colorAlfa, colorBetta, colorDelta, colorZeta } from '../../Color';
// // import { Network, NetworkType, NotNetwork } from '../../components/connection/GlobalConnection';
// // import ImageZoom from 'react-native-image-pan-zoom';
// // import Horizon from '../../components/Filters/Horizon.js';
// // import { GetThisServicesFavorite } from '../../src/api/https';

// // import ValidateRating from '../../components/Rating.js';
// // import ScoreStars from '../../components/ScoreStars.js';
// // import UserContext from '../../contexts/UserContext';
// // //import NetInfo from "@react-native-community/netinfo";

// // import CardMedics from '../../components/Cards/CardMedics.js'
// // import FilterGolden from '../../components/Filters/Golden.js';
// // import FilterSilver from '../../components/Filters/Silver.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ClinicView(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [data, setdata] = useState(null);

  let randomCode
  if (props) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = Math.random()
  }

  useEffect(() => {
    setdata(props.route.params.data)
    Get(props.route.params.data.id_clinic)
  }, [randomCode]);

  useEffect(() => {
    if (data !== null) { setLoad(false) }
  }, [data]);

  async function Get(id){
    console.log("......", id)
  }

  function goToScreen(screen, data) {
    let from = "ClinicList";
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }

 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
    <StatusBar translucent backgroundColor="transparent" barStyle='light-content' />
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
      {Load &&
      <ActivityIndicator color={color_primary} size={50} style={{ marginTop: "50%" }} />
      }
        {!Load &&
        <View>
          <Text>{data.basedOn}</Text>
          <Text>{data.city}</Text>
          <Text>{data.code}</Text>
          <Text>{data.continent}</Text>
          <Text>{data.country}</Text>
          <Text>{data.created_at}</Text>
          <Text>{data.direccion}</Text>
          <Text>{data.id_clinic}</Text>
          <Text>{data.logo}</Text>
          <Text>{data.nombre}</Text>
          <Text>{data.rating}</Text>
          <Text>{data.stars}</Text>
          <Text>{data.updated_at}</Text>
        </View>}
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

export default ClinicView;



//     //   const response1 = [{ "name": t("Medics"), "value": 0 }, { "name": t("Procedures"), "value": 0 }, { "name": t("Videos"), "value": 0 },]
//     //   const response2 = [{ "img": "https://www.elhospital.com/documenta/imagenes/134597/Ranking-Hospitales-2018-G.jpg" }, { "img": "https://actualicese.com/_ig/img/fotos/centro-de-estetica.jpg" }, { "img": "https://instituto-estetico.com/datos-estetico/uploads/2014/02/pe.jpg" }, { "img": "https://i.ytimg.com/vi/NNu7jyCwnD8/mqdefault.jpg" }, { "img": "https://i.ytimg.com/vi/YdllMg3MM-w/maxresdefault.jpg" }, { "img": "https://pielis.com/wp-content/uploads/2021/02/Pielis-categori%CC%81as_EPDM-TENSE-Full-Screen-1.png" }, { "img": "https://lacentral.com.co/wp-content/uploads/2021/05/Banner-para-Central-03.jpg" }]
//     //   const response3 = [{ "address": "poblado, av 10 local 115", "basedOn": 1, "city": "Medellin", "country": "Colombia", "created_at": "2021-05-24 11:22:21", "departament": "Antioquia", "description": "Daniel Andrés Correa Posada es un referente de la cirugía plástica y estética en la ciudad de Medellín, el país y el exterior. Caracterizado por su desempeño en los procedimientos quirúrgicos, la cercanía y el carisma que ofrece a sus pacientes antes, durante y después de una cirugía.", "id": 1, "id_medic": "AFT34", "img": "https://danielandrescorreaposadacirujano.com/wp-content/uploads/2021/01/IMG-20210118-WA0056.jpg", "name": "Dr. Daniel Correa", "phone": 3124348384, "rating": 4, "stars": 4, "type": "premium", "updated_at": "2021-05-24 11:22:21" }, { "address": "Cali, Valle del cauca", "basedOn": 0, "city": "Cali", "country": "Colombia", "created_at": "2021-05-24 11:22:21", "departament": "Valle del cauca", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like.", "id": 2, "id_medic": "AS232", "img": "https://image.freepik.com/foto-gratis/hombre-mira-camara-estudiante-practica-medicina-enfermera-bata-bano-estetoscopio_1157-41709.jpg", "name": "Dr. Fernando Torres Arizona", "phone": 31242238384, "rating": 50, "stars": 0, "type": "standard", "updated_at": "2021-05-24 11:22:21" }, { "address": "Itagüi, Colombia", "basedOn": 2, "city": "Itagüi", "country": "Colombia", "created_at": "2021-05-24 11:22:21", "departament": "Antioquia", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like", "id": 3, "id_medic": "TR2312", "img": "https://static3.depositphotos.com/1001992/255/i/600/depositphotos_2552495-stock-photo-successful-doctor-with-stethoscope.jpg", "name": "Dra. Meredith Grey", "phone": 3124348584, "rating": 9, "stars": 4.5, "type": "standard", "updated_at": "2021-05-24 11:22:21" }, { "address": "Cali, Valle del cauca", "basedOn": 0, "city": "Cali", "country": "Venezuela", "created_at": "2021-05-24 11:22:21", "departament": "Valle del cauca", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like", "id": 4, "id_medic": "DC2342", "img": "https://image.freepik.com/foto-gratis/hombre-mira-camara-estudiante-practica-medicina-enfermera-bata-bano-estetoscopio_1157-41709.jpg", "name": "Dra. Callie Torres", "phone": 31243483324, "rating": 0, "stars": 0, "type": "premium", "updated_at": "2021-05-24 11:22:21" }]
//     //   settipList(response1);
//     //   setimages(response2);
//     //   setmedicList(response3);






//       
//      
//       <ScrollView>



//         <View style={
//         {  shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//           width: windowWidth,
//           height: windowWidth / 2,
//         }
//         }>
//           <Image style={styles.banneImg} source={{ uri: 'http://farm3.staticflickr.com/2845/12333890555_cb004077aa.jpg' }} />
//         </View>







//         <View style={{
//             top: (windowWidth / 2) - windowWidth / 4,
//             width: windowWidth,
//             height: windowWidth / 2,

//           }}>



//           <View
//             style={[styles.logoWrap, {
//               backgroundColor: "rgba(255,0,0,0.5)",
//               position: "absolute",
//               zIndex: 9999999999999,
//               alignItems: "center",

//               width: windowWidth / 2,
//               height: windowWidth / 2,
//               borderRadius: windowWidth / 2,

//             }]}
//           >
//             <Image source={{ uri: data.logo }}
//               style={{ width: null, height: null, flex: 1, resizeMode: "center" }}
//             />
//           </View>
//         </View>

//         <View style={{
//           marginTop: windowWidth / 4,
//           width: "100%",
//           alignItems: "center",
//           flexDirection: "column"
//         }}>


//           {!Load && data !== {} &&
//             <View style={{
//               width: "100%",
//               marginVertical: 10,
//               flexDirection: "column",
//               paddingHorizontal: 20,
//               paddingBottom: 20,
//               borderBottomColor: "silver",
//               borderBottomWidth: 1,
//             }}>
//               <View style={{
//                 width: "100%",
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignContent: "center",
//                 alignItems: "center",
//                 marginBottom: 20,
//               }}>
//                 <Text style={{ fontWeight: "bold", fontSize: 25, width: "70%", }}>{data.nombre}</Text>
//                 <View style={{ width: "30%" }}>
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: colorBetta,
//                       paddingVertical: 10,
//                       borderRadius: 20
//                     }}>
//                     <Text
//                       style={{
//                         textAlign: "center",
//                         fontWeight: "bold",
//                         color: colorZeta,
//                         fontSize: 14
//                       }}
//                     >Cita</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", marginVertical: 5 }}>
//                 <Icon name={'pin-outline'} width={30} height={30} fill='#ccc' />
//                 <Text style={{ marginLeft: 15, fontSize: 14, lineHeight: 20, width: "90%" }}>{data.continent}, {data.country},  {data.city}.{"\n"} {data.direccion}</Text>
//               </View>
//             </View>
//           }


//           

// </View>



//               <View style={{
//               width: "100%",
//               marginTop: 10,
//               flexDirection: "column",
//               //backgroundColor: "rgba(200,255,255,1)",
//               paddingHorizontal: 20,
//               paddingBottom: 20,
//               borderBottomColor: "silver",
//               borderBottomWidth: 1,
//               //borderRadius: 20

//             }}> 


//                      
//                 <Text style={styles.smallTitle}>{t("worthIt")}</Text>
//                 <View style={styles.row}>
//                   <Text style={styles.number}>{data.stars}</Text>
//                   <View style={styles.doubleLine}>
//                     <Text style={styles.smallText}>{t("basedOn")}:</Text>
//                     <Text style={styles.mediumText}> {data.basedOn} {t("experiences")}</Text>
//                   </View>
//                 </View> 
//           <View style={{ flexDirection: "row", marginVertical: 5 }}>
//                 <View style={{ marginLeft: 40 }}>
//                   <ScoreStars stars={data.stars} size={30} color='orange' />
//                 </View>
//               </View> 
//           
//                 <Text style={styles.smallTitle}>{t("recommendedBy")}:</Text>
//                 <View style={styles.row}>
//                   <Icon name="smiling-face-outline" width={40} height={40} fill="red" style={{ top: 3 }} />
//                   <View style={styles.doubleLine}>
//                     <Text style={styles.smallText}>{t("accordingTo")}:</Text> *
//                     <Text style={[styles.mediumText, { marginTop: 5 }]}> {data.recommended} {t("patients")}</Text>
//                   </View>
//                 </View>
//      


//           
// filterByEstrellas
// direccion 



//           
// <View style={styles.foot}>

//           <View style={styles.group}>
//             <Text style={styles.smallTitle}>{t("worthIt")}</Text>
//             <View style={styles.row}>
//               <Text style={styles.number}>{props.Data.stars}</Text>
//               <View style={styles.doubleLine}>
//                 <Text style={styles.smallText}>{t("basedOn")}:</Text>
//                 <Text style={styles.mediumText}> {props.Data.basedOn} {t("experiences")}</Text>
//               </View>
//             </View>
//           </View>


//           <ScoreStars stars={props.Data.stars} size={25} color='white' />
//           <View style={styles.group}>
//             <Text style={styles.smallTitle}>{t("recommendedBy")}:</Text>
//             <View style={styles.row}>
//               <Icon name="smiling-face-outline" width={40} height={40} fill="#FFF" style={{ top: 3 }} />
//               <View style={styles.doubleLine}>
//                 <Text style={styles.smallText}>{t("accordingTo")}:</Text> 
//                 <Text style={[styles.mediumText, { marginTop: 5 }]}> {props.Data.recommended} {t("patients")}</Text>
//               </View>
//             </View>
//           </View>
//         </View>
//  



//           
             

//               <View style={{ flexDirection: "row", marginVertical:5}}>
//                 <Icon name={'pin-outline'} width={30} height={30} fill='#ccc' />
//                 <Text style={{ marginLeft: 15, fontSize: 14, lineHeight: 20, width: "90%" }}>Dasado en: {data.basedOn} experiencia</Text>
//               </View>

//               <View style={{ flexDirection: "row", marginVertical:5}}>
//                 <Icon name={'pin-outline'} width={30} height={30} fill='#ccc' />
//                 <Text style={{ marginLeft: 15, fontSize: 14, lineHeight: 20, width: "90%" }}>Recomendado por: {data.basedOn} pacientes</Text>
//               </View>
//  */










//           
//             <Text>{data.basedOn}</Text>
//             <Text>{data.code}</Text>
//             <Text>{data.created_at}</Text>
//             <Text>{data.id_clinic}</Text>
//             <Text>{data.logo}</Text>
//             <Text>{data.nombre}</Text>
//             <Text>{data.rating}</Text>
//             <Text>{data.stars}</Text>
//             <Text>{data.updated_at}</Text> 






//           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ margin: 2, width: 100, height: 100, overflow: "hidden", borderRadius: 12 }}>
//               <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: "https://www.clinicamedellin.com/m21_gallery/12653.jpg" }} />
//             </TouchableOpacity>
//           </ScrollView>





//           
//             <View
//               style={{
//                 marginVertical: 20,
//                 width: "100%",
//                 backgroundColor: "rgba(255,255,255,1)",
//                 flexDirection: "row",
//                 justifyContent:"space-around"
//               }}>
//               <View style={{backgroundColor:"red", flexDirection:"column", justifyContent:"center", alignItems:"center", alignContent:"center" }}>
//                 <Icon name={'search-outline'} width={30} height={30} fill='#ccc' />
//                 <Text>eet</Text>
//                 <Text>eet</Text>
//               </View>
//               <View style={{backgroundColor:"red", flexDirection:"column", justifyContent:"center", alignItems:"center", alignContent:"center" }}>
//                 <Icon name={'search-outline'} width={30} height={30} fill='#ccc' />
//                 <Text>eet</Text>
//                 <Text>eet</Text>
//               </View>
//               <View style={{backgroundColor:"red", flexDirection:"column", justifyContent:"center", alignItems:"center", alignContent:"center" }}>
//                 <Icon name={'search-outline'} width={30} height={30} fill='#ccc' />
//                 <Text>eet</Text>
//                 <Text>eet</Text>
//               </View>
//             </View> 







//         </View>
//       </ScrollView>
//       <Menu props={props} option={5} />
//       {* </LinearGradient> 








// // 
// // const [zoom, setzoom] = useState(null);
// // const [showZoom, setshowZoom] = useState(false);
// // const [learn, setlearn] = useState(false);
// // const [TIP, setTIP] = useState("Home");
// // const [Load, setLoad] = useState(true);
// // const userDetails = React.useContext(UserContext).userDetails
// // const [RatingShow, setRatingShow] = useState(false);
// // const [RatingLoad, setRatingLoad] = useState(false);
// // const [RatingGet, setRatingGet] = useState(false);
// // const [tipList, settipList] = useState(null);
// // const [medicList, setmedicList] = useState(null);
// // const [images, setimages] = useState(null);
// // const [connect, setconnect] = useState(true);





// // // NetInfo.fetch().then(state => {
// // //   //console.log("- Connection type", state.type);
// // //   //console.log("- Is connected?", state.isConnected);
// // //   setconnect(state.isConnected)
// // // });

// // console.log(connect)


// // 


// // async function Get() {
// //   const response1 = [{ "name": t("Medics"), "value": 0 }, { "name": t("Procedures"), "value": 0 }, { "name": t("Videos"), "value": 0 },]
// //   const response2 = [{ "img": "https://www.elhospital.com/documenta/imagenes/134597/Ranking-Hospitales-2018-G.jpg" }, { "img": "https://actualicese.com/_ig/img/fotos/centro-de-estetica.jpg" }, { "img": "https://instituto-estetico.com/datos-estetico/uploads/2014/02/pe.jpg" }, { "img": "https://i.ytimg.com/vi/NNu7jyCwnD8/mqdefault.jpg" }, { "img": "https://i.ytimg.com/vi/YdllMg3MM-w/maxresdefault.jpg" }, { "img": "https://pielis.com/wp-content/uploads/2021/02/Pielis-categori%CC%81as_EPDM-TENSE-Full-Screen-1.png" }, { "img": "https://lacentral.com.co/wp-content/uploads/2021/05/Banner-para-Central-03.jpg" }]
// //   const response3 = [{ "address": "poblado, av 10 local 115", "basedOn": 1, "city": "Medellin", "country": "Colombia", "created_at": "2021-05-24 11:22:21", "departament": "Antioquia", "description": "Daniel Andrés Correa Posada es un referente de la cirugía plástica y estética en la ciudad de Medellín, el país y el exterior. Caracterizado por su desempeño en los procedimientos quirúrgicos, la cercanía y el carisma que ofrece a sus pacientes antes, durante y después de una cirugía.", "id": 1, "id_medic": "AFT34", "img": "https://danielandrescorreaposadacirujano.com/wp-content/uploads/2021/01/IMG-20210118-WA0056.jpg", "name": "Dr. Daniel Correa", "phone": 3124348384, "rating": 4, "stars": 4, "type": "premium", "updated_at": "2021-05-24 11:22:21" }, { "address": "Cali, Valle del cauca", "basedOn": 0, "city": "Cali", "country": "Colombia", "created_at": "2021-05-24 11:22:21", "departament": "Valle del cauca", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like.", "id": 2, "id_medic": "AS232", "img": "https://image.freepik.com/foto-gratis/hombre-mira-camara-estudiante-practica-medicina-enfermera-bata-bano-estetoscopio_1157-41709.jpg", "name": "Dr. Fernando Torres Arizona", "phone": 31242238384, "rating": 50, "stars": 0, "type": "standard", "updated_at": "2021-05-24 11:22:21" }, { "address": "Itagüi, Colombia", "basedOn": 2, "city": "Itagüi", "country": "Colombia", "created_at": "2021-05-24 11:22:21", "departament": "Antioquia", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like", "id": 3, "id_medic": "TR2312", "img": "https://static3.depositphotos.com/1001992/255/i/600/depositphotos_2552495-stock-photo-successful-doctor-with-stethoscope.jpg", "name": "Dra. Meredith Grey", "phone": 3124348584, "rating": 9, "stars": 4.5, "type": "standard", "updated_at": "2021-05-24 11:22:21" }, { "address": "Cali, Valle del cauca", "basedOn": 0, "city": "Cali", "country": "Venezuela", "created_at": "2021-05-24 11:22:21", "departament": "Valle del cauca", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like", "id": 4, "id_medic": "DC2342", "img": "https://image.freepik.com/foto-gratis/hombre-mira-camara-estudiante-practica-medicina-enfermera-bata-bano-estetoscopio_1157-41709.jpg", "name": "Dra. Callie Torres", "phone": 31243483324, "rating": 0, "stars": 0, "type": "premium", "updated_at": "2021-05-24 11:22:21" }]
// //   settipList(response1);
// //   setimages(response2);
// //   setmedicList(response3);
// //   setLoad(false)
// // }

// // function ZOOM(i, s) {
// //   setzoom(i);
// //   setshowZoom(s)
// // }

// // function ViewTips(e) {
// //   setTIP(e);
// // }

// // async function GetRating(v) {
// //   setRatingLoad(true);
// //   let array = {
// //     "id_client": userDetails.id_client,
// //     "id_clinic": props.route.params.data.id_clinic,
// //     "valor": v
// //   }
// //   console.log("array: ", array);
// //   setRatingLoad(false)
// //   setRatingGet(true)
// // }

// // useEffect(() => {
// //   setTimeout(() => {
// //     setRatingShow(false);
// //   }, 5000);
// // }, [RatingGet]);


// // function goToScreenData(screen, data) {
// //   console.log("goto data: ", data)
// //   let from = "ClinicView";
// //   props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
// // }



// // function filterByPremium() { }
// // function filterByEstrellas() { }

// // console.log("TIP", TIP)

// // return (
// //   <SafeAreaView style={{ flex: 1 }}>

// //     <Text>hola, soy una clinica</Text>
// <StatusBar backgroundColor="white" />
//       <ScrollView scrollEventThrottle={16}>
//         <Head props={props} return={props.route.params.from} />
//         <View style={{ width: "100%", height: 200, overflow: "hidden", borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
//           <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: props.route.params.data.logo }} />
//         </View>
//         <View style={{ paddingBottom: 80, alignItems: "center", alignContent: "center" }}>
//           {!Load &&
//             <Horizon TIP={TIP} data={tipList} ViewTips={ViewTips} />
//           }
//           {connect === false && <NotNetwork />}
//           {!Load && connect === true && TIP === t("Medics") &&
//             <>
//               <FilterSilver icon="award" textUp={t("sortBy")} textDown="Premium" function={filterByPremium} />
//               <FilterGolden icon="star" textLeft={t("5stars")} textRight="" function={filterByEstrellas} />
//               {medicList.map((i, key) => {
//                 return (
//                   <CardMedics goToScreen={goToScreenData} key={key} data={i} scale={100} />
//                 )
//               })
//               }
//             </>
//           }
//           {!Load && connect === true && TIP === "Home" &&
//             <>
//               <View style={{ backgroundColor: "white", width: "90%", overflow: "hidden", borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: 15 }}>
//                 <View style={{ backgroundColor: colorBetta, width: "100%", padding: 10, flexDirection: "row" }}>
//                   <Text style={{ textAlign: "center", width: "100%", color: colorZeta, fontWeight: "bold", fontSize: 30, textTransform: "capitalize" }}>{props.route.params.data.nombre}</Text>
//                 </View>
//                 <ScrollView scrollEventThrottle={16} horizontal>
//                   {!Load && images.map((i, key) => {
//                     return (
//                       <TouchableOpacity onPress={() => ZOOM(i.img, true)} key={key} style={{ margin: 5, width: 100, height: 100, borderRadius: 12, overflow: "hidden" }}>
//                         <Image source={{ uri: i.img }} style={{ height: null, width: null, flex: 1, resizeMode: "cover" }} />
//                       </TouchableOpacity>
//                     )
//                   })}
//                 </ScrollView>
//               </View>
//               {showZoom &&
//                 <View>
//                   <TouchableOpacity onPress={() => setlearn(true)} style={{ opacity: 0.5, position: "absolute", zIndex: 99999, right: 40, top: 10 }}>
//                     <Icon name='question-mark-circle-outline' fill="#000" width={25} height={25} />
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => ZOOM(null, false)} style={{ opacity: 0.5, position: "absolute", zIndex: 99999, right: 10, top: 10 }}>
//                     <Icon name='close-circle-outline' fill="#000" width={25} height={25} />
//                   </TouchableOpacity>
//                   <ImageZoom
//                     cropWidth={Dimensions.get('window').width}
//                     cropHeight={Dimensions.get('window').height - 200}
//                     imageWidth={600}
//                     imageHeight={420}>
//                     <Image
//                       style={{ width: null, height: null, flex: 1, resizeMode: "contain" }}
//                       source={{ uri: zoom }}
//                     />
//                   </ImageZoom>
//                 </View>
//               }
//               <View style={{ backgroundColor: "white", width: "90%", overflow: "hidden", borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
//                 <View style={{ flexDirection: "column", backgroundColor: "red" }}>
//                 </View>
//                 <Text>Vale la pena</Text>
//                 <View style={{ flexDirection: "row"}}>
//                 <Icon name='smiling-face-outline' fill={colorDelta} width={40} height={40} />
//                 <View style={{ flexDirection: "row", marginLeft:10 }}>
//                 <Text style={{fontSize:30}}>4</Text>
//                 <View style={{ flexDirection: "column", marginLeft:10}}>
//                 <Text>{t("basedOn")}</Text>
//                 <Text>{props.route.params.data.basedOn} persona</Text>
//                 </View>
//                 </View>
//                 </View>
//                 <View >
                
//                 <View style={{ width: "100%", padding: 10, flexDirection: "row" }}>
//                   <Icon name='alert-circle-outline' fill={colorAlfa} width={25} height={25} />
//                   <View style={{ marginLeft: 10, flexDirection: "column" }}>
//                     <Text style={{ fontSize: 16, color: "#000" }}>{props.route.params.data.nombre}</Text>
//                   </View>
//                 </View>
//                 <View style={{ width: "100%", padding: 10, flexDirection: "row" }}>
//                   <View style={{ marginTop: 5 }}>
//                     <Icon name='pin-outline' fill={colorAlfa} width={25} height={25} />
//                   </View>
//                   <View style={{ marginLeft: 10, flexDirection: "column" }}>
//                     <Text style={{ fontSize: 12, color: "#000" }}>{props.route.params.data.country} / {props.route.params.data.city}</Text>
//                     <Text style={{ fontSize: 16, color: "#000" }}>{props.route.params.data.direccion}</Text>
//                   </View>
//                 </View>
//                 <View style={{ width: "100%", padding: 10, marginBottom: 20, alignContent: "center", alignItems: "center" }}>
//                   <TouchableOpacity onPress={() => setRatingShow(!RatingShow)} style={{ backgroundColor: colorAlfa, paddingVertical: 10, paddingHorizontal: 20, width: "40%", borderRadius: 12, flexDirection: "row" }}>
//                     <Text style={{ width: "100%", color: "white", textAlign: "center", fontWeight: "bold", textTransform: "capitalize" }}>{t("rateMe")}</Text>
//                   </TouchableOpacity>
//                 </View>
//                  <View style={styles.group}>
//                   <Text>{props.route.params.data.code}</Text>
//                   <Text>{props.route.params.data.nombre}</Text>
//                   <Text>{props.route.params.data.continent}</Text>
//                   <Text>{props.route.params.data.country}</Text>
//                   <Text>{props.route.params.data.city}</Text>
//                   <Text>{props.route.params.data.direccion}</Text>
//                   <Text>{props.route.params.data.basedOn}</Text>
//                   <Text>{props.route.params.data.rating}</Text>
//                   <Text>{props.route.params.data.stars}</Text>
//                   <Text>{props.route.params.data.created_at}</Text>
//                   <Text>{props.route.params.data.updated_at}</Text>
//                   </View> 
//               </View>
//             </>
//           }
//         </View>
//       </ScrollView>
//       <Menu props={props} option={20} />
//       <Modal animationType="slide" transparent={true} visible={learn} >
//         <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 999 }}>
//           <View style={{ backgroundColor: "white", width: 200, padding: 10, borderRadius: 12, position: "absolute", alignContent: "center", alignItems: "center" }}>
//             <View style={{ width: 150, height: 150 }}>
//               <Image source={require("../../src/images/icon_drag.png")} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} />
//             </View>
//             <Text style={{ color: colorBetta, width: "100%", textAlign: "center" }}>
//               Arrastra la imagen para ver mas detalles.
//             </Text>
//             <TouchableOpacity onPress={() => setlearn(false)} style={{ marginTop: 10, backgroundColor: colorBetta, alignSelf: "center", width: "50%", borderRadius: 8, padding: 5 }}>
//               <Text style={{ color: colorZeta, width: "100%", textAlign: "center", fontWeight: "bold", textTransform: "uppercase" }}>ocultar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <Modal animationType="slide" transparent={true} visible={RatingShow} >
//         <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: "100%", height: "100%", position: "absolute", zIndex: 999, justifyContent: "center", alignContent: "center", alignItems: "center", }}>
//           <TouchableOpacity
//             onPress={() => setRatingShow(!RatingShow)}
//             style={{
//               position: "absolute", right: 10, top: 10
//             }}>
//             <Icon name="close-circle-outline" fill={"#FFF"} width={30} height={30} />
//           </TouchableOpacity>
//           <View style={{ backgroundColor: "#FFF", marginTop: "15%", padding: "10%", borderRadius: 5, width: "90%" }}>
//             {!RatingGet && !RatingLoad &&
//               <ValidateRating GetRating={GetRating} />
//             }
//             {RatingLoad &&
//               <ActivityIndicator size="large" color="orange" style={{ marginTop: 20 }} animating={true} />
//             }
//             {RatingGet && !RatingLoad &&
//               <View style={{ alignItems: "center" }}>
//                 <Icon name='smiling-face-outline' fill='orange' width={50} height={50} />
//                 <Text style={{ color: "orange", textTransform: "capitalize", fontSize: 22, fontWeight: "bold" }}>gracias!</Text>
//               </View>
//             }
//           </View>
//         </View>
//       </Modal> 
// //     </SafeAreaView>
// //   )
// // }



// const styles = StyleSheet.create({
//   banner: {
  
//   },
//   banneImg: {
//     width: null,
//     height: null,
//     flex: 1,
//     resizeMode: "cover"
//   },





//   logoWrapper: {
   
//   },
//   logoWrap: {
//     backgroundColor: "white",
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   logoImg: {},








//   // group: {
//   //   width: "100%",
//   //   padding: 10
//   // },
//   // textBig: {
//   //   fontSize: 14,
//   //   fontWeight: "bold",
//   //   color: "#111"
//   // },
//   // textSmall: {
//   //   fontSize: 12,
//   //   fontWeight: "400",
//   //   color: "#111"
//   // },












//   // smallTitle: {
//   //   color: "#FFF",
//   //   fontSize: 14,
//   //   textTransform: "capitalize",
//   //   lineHeight: 15,
//   //   marginBottom: -10
//   // },
//   // row: {
//   //   flexDirection: "row",
//   //   marginTop: 5,
//   // },

//   // number: {
//   //   top: -2,
//   //   color: "red",
//   //   fontSize: 40,
//   //   lineHeight: 50,
//   //   left: 5
//   // },
//   // doubleLine: {
//   //   marginTop: 5,
//   //   flexDirection: "column",
//   //   left: 10
//   // },
//   // smallText: {
//   //   color: "red",
//   //   fontSize: 14
//   // },
//   // mediumText: {
//   //   color: "red",
//   //   fontSize: 16,
//   //   marginTop: -3,
//   // },






// })

