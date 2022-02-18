import React, { useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Pagination from '../../components/filters/Pagination.js';
import FilterSilver from '../../components/filters/Silver';
import FilterGolden from '../../components/filters/Golden';
import SelectList from '../../components/filters/SelectList.js';
import CardClinic from '../../components/cards/CardClinic'




// import { colorAlfa, colorBetta, colorGamma, colorDelta, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorOmicron, colorPi, colorRo, colorSigma, colorTau, colorIpsilon, colorFi, colorji, colorPsi, colorOmega, colorPrimary } from '../../styles/Colors.js';

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
  color_fifth,
} from '../../styles/Colors.js'

import {
  drivers,
  services,
  hotels,
  specials,
  nurses,
  homeRecovery,
  locations,
  clinics
} from '../../services/connection.js';

function ClinicList(props) {
  const { t, i18n } = useTranslation();
  const [vertical, setvertical] = useState(false);
  const [premium, setpremium] = useState(null);
  const [stars, setstars] = useState(null);
  const [search, setsearch] = useState(null);
  const [page, setpage] = useState(1);
  const [DATA, setDATA] = useState(null);
  const [Load, setLoad] = useState(true);


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    Get();
  }, [randomCode]);

  async function Get() {
    // const resCountry = await locations.GetPaises(i18n.language)
    // setListCountry(resCountry)
    // const resCitys = await locations.GetCiudades(i18n.language)
    // setlistCity(resCitys)
    // const resClinics = await clinics.GetClinics(i18n.language, premium, stars, search, page)
    // setDATA(resClinics)
    setLoad(false)
  }




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








  function onChangeText(text) {
    if (page !== 1) { setpage(1) }
    if (text !== "") { setsearch(text) }
    else {
      if (text === "") {
        setsearch(null)
      }
    }
  }

  function getPage(p) {
    console.log("page: ", p)
    setpage(p);
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

  function goToScreen(screen, data) {
    let from = "ClinicList";
    props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
  }

  const [openLocation, setopenLocation] = useState(false);




  function getLocation(data) {
    console.log("getLocation: ", data)
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Text>clinic list</Text>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />

      <ScrollView
        scrollEventThrottle={16}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      //style={{ borderTopColor: color_grey_light, borderTopWidth: 0.5, backgroundColor: color_white, paddingVertical: 5}}
      >

        <View style={styles.wrap}>

          <View style={{
            alignSelf:"center",
            justifyContent:"space-between",
            flexDirection: "row", width: "95%" }}>

            <View style={styles.search}>
              <TextInput
                value={search}
                placeholder="Buscar..."
                placeholderTextColor={color_grey_half}
                style={{ color: "#777", width: "85%", left: 15, fontSize: 20 }}
                onChangeText={text => onChangeText(text)}
              />
              <Icon name='search-outline' fill={color_grey_half} width={30} height={30} />
            </View>






            <TouchableOpacity onPress={() => setopenLocation(true)}
              style={{
                marginÇLeft: 10,
                width: 50,
                height: 50,
                backgroundColor: color_white,
                borderRadius: 8,
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              {/* close-circle-outline */}
              <Icon name='globe-outline' fill={color_grey_half} width={30} height={30} />
            </TouchableOpacity>

          </View>






          <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }}>
            <FilterSilver width={"45%"} icon="award" textUp="Clasificación" textDown="Premium" function={filterByPremium} />
            <FilterGolden width={"45%"} icon="star" textLeft="5 Estrellas" textRight="" function={filterByEstrellas} />
          </View>






          <SelectList
            // {...props}
            title={''}
            theme={''} //dark
            color={color_fifth}
            open={openLocation}
            close={setopenLocation}
            getList={getLocation}
          />

          {/* <FilterSilver icon="award" textUp="Clasificación" textDown="Premium" function={filterByPremium} />
          <FilterGolden icon="star" textLeft="5 Estrellas" textRight="" function={filterByEstrellas} /> */}
        </View>



        <View
          style={{
            flexDirection: 'row',
            width: "100%",
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingBottom: 60,
          }}>


          {Load && <ActivityIndicator color={color_primary} size={40} />}

          {!Load && DATA !== null && DATA.data.length !== 0 && DATA.data.map((i, key) => {
            return (
              <CardClinic key={key} data={i} goToScreen={goToScreen} />
            )
          })
          }



          {!Load && DATA !== null && DATA.data.length === 0 &&
            <Text>empty</Text>}



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
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  wrap: {
    flexDirection: "column",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  search: {
    width: "85%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    borderBottomColor: color_grey_half,
    borderBottomWidth: 1
  }
});




//       <StatusBar backgroundColor="white" barStyle='dark-content' />
//       <ScrollView scrollEventThrottle={16}>
//         <Head props={props} />



//         {
//           !Load &&
//           <View style={styles.wrap}>
//             <View style={styles.groupL}>
//               <View style={styles.row}>
//                 <TextInput style={{ width: "85%" }} onChangeText={text => setSearchText(text)} value={searchText} />
//                 <Icon name={'search-outline'} width={30} height={30} fill='#ccc' style={{ position: 'absolute', top: 3, }} />
//               </View>
//             </View>
//             <View style={styles.groupR}>
//               <TouchableOpacity onPress={() => setshowList(true)}>
//                 <Icon name={'globe-2-outline'} width={30} height={30} fill='#ccc' />
//               </TouchableOpacity>
//             </View>
//           </View>
//         }


//         <View style={styles.wrapper}>




// <NotNetwork />
// {/* <EmptyAnswer /> */}





// {/* 
//           {Load && <ActivityIndicator color="#00AFE8" size="large" style={{marginTop:100}}/>}

//           {!Load && ListClinics !== [] &&
//             ListClinics.map((i, key) => (
//               <CardClinic key={key} data={i} goToScreen={goToScreen} />
//             ))
//           }

//           {
//             !Load && ListClinics === [] &&
//             <Text>vacio1</Text>
//           }
//           {
//             !Load && ListClinics === null &&
//             <Text>vacio2</Text>
//           } */}


//         </View>

//       </ScrollView>
//       {/* {!Load && dataList !== null &&
//         <SelectList
//           show={showList}
//           title="geolocation"
//           list={dataList}
//           setShow={setShow}
//           search={search}
//         />
//       } */}
//       <Menu props={props} option={5} />
//     </SafeAreaView>
//   )
// }
// const styles = StyleSheet.create({
//   wrap: {
//     alignItems: "center",
//     alignContent: "center",
//     justifyContent: "space-around",
//     flexDirection: "row",
//     borderTopColor: "#eee",
//     borderTopWidth: 0.5,
//     backgroundColor: "white",
//     width: "100%",
//     paddingVertical: 10
//   },
//   groupL: {
//     width: "80%",
//     paddingLeft: 20
//   },
//   row: {
//     borderColor: "#f1f1f1",
//     borderWidth: 2,
//     flexDirection: "row",
//     height: 40,
//     width: "100%",
//     borderRadius: 12
//   },
//   groupR: {
//     width: "20%",
//     justifyContent: "center",
//     paddingHorizontal: 10
//   },
//   wrapper: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignContent: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });

export default ClinicList;