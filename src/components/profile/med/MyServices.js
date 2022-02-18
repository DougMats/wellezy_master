import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions, Image, Touchable } from 'react-native'
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
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

} from '../../../styles/Colors.js';
import { file_server1 } from '../../../../Env';

import HomeRecoveryList from './administration/HomeRecoveryList.js';
import HomeRecoveryCreate from './administration/HomeRecoveryCreate.js';
import HomeRecoveryEdit from './administration/HomeRecoveryEdit.js';

import NurseList from './administration/NurseList.js';
import NurseCreate from './administration/NurseCreate.js';
import NurseEdit from './administration/NurseEdit.js';

import SpecialList from './administration/SpecialList.js';
import SpecialCreate from './administration/SpecialCreate.js';
import SpecialEdit from './administration/SpecialEdit.js';


// import NursesCreate from '../nurses/nursesCreate.js';
// import NursesList from '../nurses/nursesList.js';
// import SpecialsList from '../../components/specials/SpecialsList.js'
// import SpecialsCreate from '../specials/SpecialsCreate'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





function MyServices(props) {
  const { t, i18n } = useTranslation();
  const MyServicesList = [
    { value: 1, color: "#8E44AD", img: "homeRecovery.png", name: "home recovery", subTitle: "administra tus casas de recuperación" },
    { value: 2, color: "#1ABC9C", img: "nurses.png", name: "nurses", subTitle: "administra tus enfermeras" },
    { value: 3, color: "#E74C3C", img: "homeRecovery.png", name: "specials", subTitle: "administra tus ofertas especiales" },
    { value: 4, color: "#F39C12", img: "clinics.png", name: "clinics", subTitle: "administra tus clínicas" },
  ];

  const [serviceSelecte, setserviceSelecte] = useState(null);
  const [mode, setmode] = useState(1);
  const [editing, setediting] = useState(null);


  function goToEdit(data) {
    setediting(data)
    setmode(3)
  }


  if (serviceSelecte === null) {
    return (
      <View style={styles.wrap}>
        {MyServicesList.map((i, key) => {
          return (
            <ServiceItem2
              key={key}
              data={i}
              goToScreen={props.goToScreen}
              set={setserviceSelecte}
            />
          )
        })
        }
      </View>
    )
  }

  else {
    return (
      <View>





        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: serviceSelecte.color,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}>
          <View style={{
            flexDirection: "row",
          }}>
            <TouchableOpacity onPress={() => [setserviceSelecte(null), setmode(1)]} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}>
              <Icon name='arrow-ios-back-outline' width={25} height={25} fill={color_white} />
            </TouchableOpacity>
            <Text style={{ color: "#FFF", marginLeft: 10, lineHeight: 40, fontSize: 16, fontWeight: "bold", textTransform: "capitalize" }}>{serviceSelecte.name}</Text>
          </View>
          <View style={{
            flexDirection: "row",
          }}>
            <TouchableOpacity onPress={() => setmode(1)} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", borderBottomWidth: mode === 1 ? 1 : 0, borderBottomColor: color_white, }}>
              <Icon name='list-outline' width={25} height={25} fill={mode === 1 ? color_white : color_white_a} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setmode(2)} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", borderBottomWidth: mode === 2 ? 1 : 0, borderBottomColor: color_white, }}>
              <Icon name='file-add-outline' width={25} height={25} fill={mode === 2 ? color_white : color_white_a} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => setmode(3)} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center", borderBottomWidth: mode === 3 ? 1 : 0, borderBottomColor: color_white, }}>
              <Icon name='settings-outline' width={25} height={25} fill={mode === 3 ? color_white : color_white_a} />
            </TouchableOpacity> */}
          </View>
        </View>
        {serviceSelecte.value === 1 && mode === 1 && <HomeRecoveryList goToScreen={props.goToScreen}/>}
        {serviceSelecte.value === 1 && mode === 2 && <HomeRecoveryCreate />}
        {serviceSelecte.value === 1 && mode === 3 && <HomeRecoveryEdit />}
        {serviceSelecte.value === 2 && mode === 1 && <NurseList goToScreen={props.goToScreen} goToEdit={goToEdit} />}
        {serviceSelecte.value === 2 && mode === 2 && <NurseCreate setmode={setmode} />}
        {serviceSelecte.value === 2 && mode === 3 && <NurseEdit data={editing} setmode={setmode} />}
        {serviceSelecte.value === 3 && mode === 1 && <SpecialList goToScreen={props.goToScreen} goToEdit={goToEdit} />}
        {serviceSelecte.value === 3 && mode === 2 && <SpecialCreate setmode={setmode} />}
        {serviceSelecte.value === 3 && mode === 3 && <SpecialEdit data={editing} setmode={setmode} />}
      </View>
    )
  }



}
export default MyServices;

const ServiceItem2 = (props) => {
  const [open, setopen] = useState(false);
  const [task, settask] = useState("list");

  return (
    <TouchableOpacity
      onPress={() => props.set(props.data)}
      style={{ ...styles.tag, backgroundColor: props.data.color }}>
      <View style={{ width: windowWidth / 4, height: windowWidth / 4 }}>
        <Image source={{ uri: `${file_server1}/img/wellezy/frontend/${props.data.img}` }} style={{ flex: 1, resizeMode: "cover", width: null, height: null }} />
      </View>
      <Text style={styles.text}>{props.data.name}</Text>
      <View style={styles.shadow}></View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  wrap: {

    flexDirection: 'row',
    width: "100%",
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    marginTop: 15,
    overflow: "hidden",
    margin: 5,
    width: windowWidth / 2.5,
    height: windowWidth / 3,
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    textTransform: "capitalize",
    color: color_white,
    fontWeight: "bold",
    fontSize: 16
  },
  shadow: {
    position: "absolute",
    zIndex: -1,
    backgroundColor: "rgba(0,0,0,0.08)",
    width: "150%",
    height: 200,
    marginTop: 90,
    transform: [{ rotateZ: "10deg" }]
  }
})
