import React, { useState, useEffect } from 'react';
import { RefreshControl, Dimensions, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import CardEmpty from '../../components/cards/CardEmpty.js'
import Pagination from '../../components/filters/Pagination.js';
import SelectList from '../../components/filters/SelectList.js';
import CardClinic from '../../components/cards/CardClinic'
import FilterSilver from '../../components/filters/Silver';
import FilterGolden from '../../components/filters/Golden';
import { clinics } from '../../services/connection.js';

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
} from '../../styles/Colors.js'

function ClinicList(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [premium, setpremium] = useState(null);
  const [stars, setstars] = useState(null);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);
  const [DATA, setDATA] = useState(null);
  const [openLocation, setopenLocation] = useState(false);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    Get();
  }, [randomCode]);

  async function Get() {
    setLoad(true)
    const resClinics = await clinics.GetClinics(i18n.language, premium, stars, search, page)
    setDATA(resClinics)
    setLoad(false)
  }

  useEffect(() => {
    Get();
  }, [premium,stars,search,page]);

  function onChangeText(text) {
    if (page !== 1) { setpage(1) }
    if (text !== "") { setsearch(text) }
    else {
      if (text === "") {
        setsearch(null)
      }
    }
  }

  function filterByPremium(e) {
    if (e === true) { setpremium(1) }
    else {
      if (e === false) { setpremium(0) }
    }
  }

  function filterByEstrellas(e) {
    if (e === true) { setstars(1) }
    else {
      if (e === false) { setstars(0) }
    }
  }

  function getLocation(data) {
    console.log("getLocation: ", data)
  }

  function getPage(p) {
    console.log("page: ", p)
    setpage(p);
  }

  function goToScreen(screen, data) {
    let from = "ClinicList";
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingTop:5, flexDirection: "row", justifyContent:"center", alignItems:"center" }}>
            <View style={{ width: "80%", borderRadius:12, backgroundColor: "#fff", justifyContent: "space-around", alignItems: "center", flexDirection: "row", marginBottom: 5}}>
              <TextInput value={search} placeholder="Buscar..." placeholderTextColor={color_grey_half}
                style={{ color: "#777", width: "85%", left: 15, fontSize: 20}}
                onChangeText={text => onChangeText(text)} />
              <Icon name='search-outline' fill={color_grey_half} width={30} height={30} />
            </View>
            <TouchableOpacity onPress={() => setopenLocation(!openLocation)}
              style={{ borderRadius: 45, width: 45,height: 45,backgroundColor: color_white,justifyContent: "space-around", alignItems: "center", marginBottom: 5, marginLeft:5,}}>
              <Icon name={openLocation === true ? 'close-circle-outline' : 'globe-outline'} fill={color_grey_half} width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", width: "100%", paddingTop: 8, justifyContent: "space-around"}}>
            <FilterSilver width={"45%"} icon="award" textUp="Clasificación" textDown="Premium" function={filterByPremium} />
            <FilterGolden width={"45%"} icon="star" textLeft="5 Estrellas" textRight="" function={filterByEstrellas} />
          </View>
        <View style={{ paddingBottom: 60 }}>
          {Load &&
            <View style={{ marginTop: "50%" }}>
              <ActivityIndicator color={color_primary} size={40} />
            </View>
          }
          {!Load && DATA !== null && DATA.data.length === 0 &&
            <CardEmpty />
          }
          {!Load && DATA !== null && DATA.data.length !== 0 &&
            <View
              style={{
                flexDirection: 'row',
                width: "100%",
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              {
                DATA.data.map((i, key) => {
                  return (
                    <CardClinic key={key} data={i} goToScreen={goToScreen} />
                  )
                })
              }
            </View>
          }
          {!Load && DATA !== null && DATA.last_page > 1 &&
            <Pagination page={page} lastPage={DATA.last_page} getPage={getPage} />
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
      <SelectList
        // {...props}
        title={''}
        theme={''} //dark
        color={color_fifth}
        open={openLocation}
        close={setopenLocation}
        getList={getLocation}
      /> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
});
export default ClinicList;


  // console.log("ListCountry: ", ListCountry)
  // console.log("listCity: ", listCity)

  //   const [showList, setshowList] = useState(false);
  //   const [dataList, setdataList] = useState(null);
  //   const [Paises, setPaises] = useState(null);
  //   const [Ciudades, setCiudades] = useState(null);

  //   async function Get() {
  //     setLoad(true)
  //     console.log('Get(clinicList)')
  //     const response = await GetClinics(searchText, i18n.language);
  //     console.log("get clinics response:::", response)
  //     const response1 = await GetPaises();
  //     const response2 = await GetCiudades();
  //     setListClinics(response);
  //     setPaises(response1);
  //     setCiudades(response2);
  //     setLoad(false)
  //   }

  //   function setShow() {
  //     setshowList(!showList)
  //   }

  //   useEffect(() => {
  //   //  console.log("EFFECT tree")
  //     Tree();
  //   }, [Paises, Ciudades]);

  //   function Tree() {
  //     let arbol = [];
  //     if (Paises !== null && Ciudades !== null) {
  //       arbol.continentes = [
  //         { "name": t("Africa"), "id": "Africa"},
  //         { "name": t("Antartica"), "id": "Antartica"},
  //         { "name": t("Asia"), "id": "Asia"},
  //         { "name": t("Europe"), "id": "Europe"},
  //         { "name": t("NorthAmerica"), "id": "North America"},
  //         { "name": t("Oceania"), "id": "Oceania"},
  //         { "name": t("SouthAmerica"), "id": "South America"},
  //       ];
  //       arbol.paises = Paises;
  //       arbol.ciudades = Ciudades;
  //     }
  //     setdataList(arbol)
  //   }

  //   async function search(data) {
  //     console.log("searching...");
  //     console.log("data pais: ",   data[0].idPais);
  //     console.log("data ciudad: ", data[0].idCiudad);
  //     setLoad(true);
  //     if (data[0].idCiudad === 0) {
  //       console.log("filtrar por pais");
  //     //   dataList(res);
  //     //   const response = await GetClinicsByCountry(data[0].idPais, i18n.language);
  //     //   console.log("response country", response);
  //     //   setListClinics(response);
  //     }
  //      else {
  //       console.log("filtrar por ciudad");
  //     //   dataList(res);
  //     //   const response = await GetClinicsByCity(data[0].idCiudad, i18n.language);
  //     //   console.log("response city", response);
  //     //   setListClinics(response);
  //     }
  //     setLoad(false)
  //   }
