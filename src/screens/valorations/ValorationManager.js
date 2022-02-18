import React, { useState, useEffect } from 'react'
import { Linking, Platform, StyleSheet, Dimensions, Clipboard, ScrollView, SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, ActivityIndicator, Button } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import md5 from 'md5';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';

import { valorations } from '../../services/connection'
import { InitialsName, Offer, Name, GetDiference2, GetDiference, zfill, currencyFormat, globalStatusValoration, letterCounter } from '../../components/Logic.js'

import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import ScoreStars from '../../components/stars/ScoreStars.js';

import Calendary from '../../components/time/Calendary.js';

import GetHour from '../../components/time/getHour.js';


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
} from '../../styles/Colors'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function ValorationManager(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const { navigation } = props;
  const [Load, setLoad] = useState(false);

  const [data, setdata] = useState(props.route.params.data);

  const [patient, setpatient] = useState(null);
  const [scheduled, setscheduled] = useState(null);
  const [schedule, setschedule] = useState(null);
  const [historyclinic, sethistoryclinic] = useState(null);
  const [images, setimages] = useState(null);

  // <SCHEDULE data={request} hour={data.hour} date={data.date} />
  //         <PATIENT data={request} />
  //         <PROCEDURE data={request} />
  //         <HC data={HCValoration} />
  //         <IMAGES data={ImagesValoration} />




  //
  // const [HCValoration, setHCValoration] = useState(false);
  // const [ImagesValoration, setImagesValoration] = useState(false);
  // const [data, setdata] = useState({
  //   date: null,
  //   hour: null
  // });




  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    Get()
  }, [randomCode]);


  /*
    {
      "basedOn": 1,
      "categori_img": "https://pdtclientsolutions.com/crm-public/img/category/picture/Portadas%20cirug%C3%ADas_Otoplastia.png",
      "category_id": 2,
      "category_name": "Facial",
      "category_photo": "w1.jpg",
      "created_at": "2021-10-25 11:18:43",
      "email": "art@gmail.com",
      "id": 128,
      "id_category": 2,
      "id_cliente": 1,
      "id_medic": 1,
      "id_subcategory": 9,
      "img": "default-user.png",
      "names": "douglas jesus",
      "phone": "+573124348384",
      "rating": 5,
      "recommended": 0,
      "stars": 5,
      "status_valoration": "Pendiente",
      "sub_category_description": "<div></div>",
      "sub_category_id": 9,
      "sub_category_information": "",
      "sub_category_name": "BLEFAROPLASTIA",
      "sub_category_photo": "Portadas cirugías_Otoplastia.png",
      "surnames": "matos parra"
    }
    */









  async function Get() {
    const status = props.route.params.data.status_valoration;







    // wellezy_valoration_scheduled
    // wellezy_valoration_img
    // wellezy_valoration_scheduled_history





    //console.log("status: ", status)
    //status ->Procesada


    // if (status === "Procesada") {
    //   const res = await valorations.getValorationWhenProcessed(props.route.params.data.id)
    //   if (res.status !== 0) {
    //     const res_hc = await valorations.getClientHC(props.route.params.data.id_cliente)
    //     setHCValoration(res_hc)
    //   }
    //   // if (Valoration.status === 2) {
    //   //   getImgsValoration(props.route.params.data.id)
    //   //setPhotosValoration
    //   // }
    // }
  }




  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_white} barStyle='dark-content' />

      <View style={styles.head}>
        <View style={styles.headSides}>
          <TouchableOpacity style={styles.headBtn} onPress={() => props.navigation.goBack()}>
            <Icon name={"arrow-back-outline"} width={30} height={30} fill={color_fifth} />
          </TouchableOpacity>
        </View>
        <View style={styles.headTitle}>
          <Text style={styles.headTitleText}>request: {data.status_valoration}</Text>
        </View>
        <View style={styles.headSides}>
          <TouchableOpacity style={styles.headBtn} onPress={() => setvertical(!vertical)}>
            <Icon name={"more-vertical"} width={30} height={30} fill={color_fifth} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView scrollEventThrottle={16}>

        <View style={{ flexDirection: "column", paddingHorizontal: 20 }}>
          <VALORATION />

          {/* <SCHEDULE data={request} hour={data.hour} date={data.date} />
          <PATIENT data={request} />
          <PROCEDURE data={request} />
          <HC data={HCValoration} />
          <IMAGES data={ImagesValoration} /> */}
        </View>
      </ScrollView>


      {/* <Menu
        props={props}
        option={1}
        alert={0}
      /> */}

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


const styles = StyleSheet.create({

  head: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: color_white,
    paddingBottom: 10,
    paddingTop: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  headSides: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  headTitle: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  headBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  headTitleText: {
    fontSize: 16,
    color: color_fifth,
    textTransform: "capitalize",
    fontWeight: "bold",

  },




  label: {
    marginTop: 5,
    width: "100%",
    backgroundColor: color_white
  },
  labelHeat: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  labelHeatText: {
    marginLeft: 10,
    lineHeight: 25,
    color: color_grey_dark,
    fontSize: 14,
    textTransform: "capitalize"
  },






})
export default ValorationManager;




const VALORATION = (props) => {
  return (
    <View style={{}}>


    </View>
  )
}




const SCHEDULE = (props) => {
  const [open, setopen] = useState(true);
  const [date, setdate] = useState(props.date);
  const [hour, sethour] = useState(props.hour);
  const config = {
    theme: "",//light / dark
    color: "#FF008B",
    // minDateNow: false,
    // hour: false,
    // rangeDate: true,
  }
  const [openCalendary, setopenCalendary] = useState(false);
  const [openClock, setopenClock] = useState(false);

  return (
    <View style={styles.label}>
      <TouchableOpacity onPress={() => setopen(!open)} style={styles.labelHeat}>
        <View style={{ flexDirection: "row" }}>
          <Icon name={"calendar-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.labelHeatText}>SCHEDULE</Text>
        </View>
        <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={20} height={20} fill={color_grey_dark} />
      </TouchableOpacity>
      {open &&
        <View style={{
          padding: 10
        }}>
          <TouchableOpacity onPress={() => setopenCalendary(true)}>
            <Text>date: {date}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setopenClock(true)}>
            <Text>hour: {hour}</Text>
          </TouchableOpacity>
          <Calendary
            data={date}
            config={config}
            open={openCalendary}
            close={setopenCalendary}
            getChange={setdate}
          />
          <GetHour
            display={openClock}
            title={''}
            color={color_fifth}
            mode={'light'}// dark- light 
            onChange={sethour}
            cancel={setopenClock}
          />
          <TouchableOpacity>
            <Text>save</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}



const PATIENT = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={styles.label}>
      <TouchableOpacity onPress={() => setopen(!open)} style={styles.labelHeat}>
        <View style={{ flexDirection: "row" }}>
          <Icon name={"person-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.labelHeatText}>PATIENT</Text>
        </View>
        <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={20} height={20} fill={color_grey_dark} />
      </TouchableOpacity>
      {open &&
        <View style={{
          padding: 10
        }}>
          <Text>{props.data.email}</Text>
          <Text>{props.data.id}</Text>
          <Text>{props.data.id_cliente}</Text>
          <Text>{props.data.img}</Text>
          <Text>{props.data.names}</Text>
          <Text>{props.data.phone}</Text>
          <Text>{props.data.surnames}</Text>
        </View>
      }
    </View>
  )
}




const PROCEDURE = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={styles.label}>
      <TouchableOpacity onPress={() => setopen(!open)} style={styles.labelHeat}>
        <View style={{ flexDirection: "row" }}>
          <Icon name={"activity-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.labelHeatText}>PROCEDURE</Text>
        </View>
        <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={20} height={20} fill={color_grey_dark} />
      </TouchableOpacity>
      {open &&
        <View style={{
          padding: 10
        }}>
          <Text>{props.data.basedOn}</Text>
          <Text>{props.data.categori_img}</Text>
          <Text>{props.data.category_id}</Text>
          <Text>{props.data.category_name}</Text>
          <Text>{props.data.category_photo}</Text>
          <Text>{props.data.created_at}</Text>
          <Text>{props.data.email}</Text>
          <Text>{props.data.id}</Text>
          <Text>{props.data.id_category}</Text>
          <Text>{props.data.id_subcategory}</Text>
          <Text>{props.data.rating}</Text>
          <Text>{props.data.recommended}</Text>
          <Text>{props.data.stars}</Text>
          <Text>{props.data.sub_category_description}</Text>
          <Text>{props.data.sub_category_id}</Text>
          <Text>{props.data.sub_category_information}</Text>
          <Text>{props.data.sub_category_name}</Text>
          <Text>{props.data.sub_category_photo}</Text>
        </View>
      }
    </View>
  )
}

const HC = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={styles.label}>
      <TouchableOpacity onPress={() => setopen(!open)} style={styles.labelHeat}>
        <View style={{ flexDirection: "row" }}>
          <Icon name={"list-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.labelHeatText}>historia clinica</Text>
        </View>
        <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={20} height={20} fill={color_grey_dark} />
      </TouchableOpacity>
      {open &&
        <View style={{
          padding: 10
        }}>
          <Text>open</Text>
        </View>
      }
    </View>
  )
}


const IMAGES = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={styles.label}>
      <TouchableOpacity onPress={() => setopen(!open)} style={styles.labelHeat}>
        <View style={{ flexDirection: "row" }}>
          <Icon name={"image-outline"} width={25} height={25} fill={color_grey_half} />
          <Text style={styles.labelHeatText}>IMAGES</Text>
        </View>
        <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={20} height={20} fill={color_grey_dark} />
      </TouchableOpacity>
      {open &&
        <View style={{
          padding: 10
        }}>
          <Text>open</Text>
        </View>
      }
    </View>
  )
}