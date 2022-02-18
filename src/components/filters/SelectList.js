import React, { useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator, Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import { useTranslation } from 'react-i18next';
import { locations } from '../../services/connection.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SelectList = (props) => {
  const { t, i18n } = useTranslation();

  const [Load, setLoad] = useState(true);

  const colorDefault = props.color
  let colorBack
  if (props.theme === 'dark') { colorBack = '#1d1d1d' }
  else { colorBack = "#FFFFFF" }

  const [ListContinentes, setListContinentes] = useState(['Asia', 'Europe', 'Oceania', 'North America', 'Antarctica', 'South America', 'Africa']);
  const [ListCountry, setListCountry] = useState([]);
  const [ListDistrito, setListDistrito] = useState([]);
  const [ListCity, setListCity] = useState([]);

  const [level, setlevel] = useState(0);

  const [selectedContinente, setselectedContinente] = useState(null);
  const [selectedCountry, setselectedCountry] = useState(null);
  const [selectedDistrito, setselectedDistrito] = useState(null);
  const [selectedCity, setselectedCity] = useState(null);


  const [alfa, setalfa] = useState(null);
  const [beta, setbeta] = useState(null);

  useEffect(() => {
    if (props.open === true) {
      Get()
    }
  }, [props.open]);


  async function Get() {
    const resCountry = await locations.GetPaises(i18n.language)
    setalfa(resCountry);
    const resCitys = await locations.GetCiudades(i18n.language)
    setbeta(resCitys);
    setLoad(false)
  }



  useEffect(async () => {
    if (selectedContinente !== null) {
      const res = _.filter(alfa, function (o) { return o.continent === selectedContinente; });
      console.log("selectedContinente res", res.length)
      setListCountry(res)
    }
  }, [selectedContinente]);






  console.log("state ---------> selectedContinente:", selectedContinente)
  console.log("state ---------> selectedCountry: ", selectedCountry)



  //  //buider(resCountry, resCitys)
  //   async function buider(alfa, beta) {
  //     // setalfa(alfa);
  //     // setbeta(beta);
  //     for (var i in alfa) {
  //       await search(alfa[i].continent)
  //     }
  //     //alfa:
  //     // {
  //     //   "id": "AFG",
  //     //   "name": "Afghanistan",
  //     //   "continent": "Asia",
  //     //   "capital": 1
  //     // },
  //     //beta:
  //     // {
  //     //   "id": 20,
  //     //   "name": "'s-Hertogenbosch",
  //     //   "PaisCodigo": "NLD",
  //     //   "CiudadDistrito": "Noord-Brabant",
  //     //   "CiudadPoblacion": 129170
  //     // },
  //     // setListCountry();
  //     // setListDistrito();
  //     // setListCity();
  //     setLoad(false)
  //   }
  //async function search(item) {  }


  // const res = _.filter(ListContinentes, function (o) { return o.continent === item; });
  // console.log("res continente ", res)
  // if (res !== undefined) {     
  //   setListContinentes([...ListContinentes, item])
  // }

  // const res = _.find(ListContinentes, function (o) { return o === item; });

  // if (res === undefined) {
  //   setListContinentes([...ListContinentes, item])
  // }

  //   else {
  //     const res = _.filter(selectedList, function (o) { return o.jid !== item.jid; });
  //     setselectedList(res)
  //   }
  // }







  // getList={getLocation}
  // {...props}
  // open={openLocation}
  // close={setopenLocation}
  // const [data, setdata] = useState(props.list);

  // setListCountry(resCountry)
  // setListCity(resCitys)
  // const [ListContinentes, setListContinentes] = useState([]);
  // const [ListCountry, setListCountry] = useState([]);
  // const [ListDistrito, setListDistrito] = useState([]);
  // const [ListCity, setListCity] = useState([]);




  // const [paisesList, setpaisesList] = useState(null);
  // const [ciudadesList, setciudadesList] = useState(null);
  // const [continente, setcontinente] = useState(null);
  // const [pais, setpais] = useState(null);
  // const [ciudad, setciudad] = useState(null);


  //   useEffect(() => {
  //     setcontinentesList(data.continentes);
  //     setlevel(1);
  //   }, [data]);

  //   function uplevel(e) {
  //     console.log("get->", e.name);
  //     if (level === 1) { setcontinente(e); paisesFilter(e.id) }
  //     if (level === 2) { setpais(e); ciudadesFilter(e) }
  //     if (level === 3) { setciudad(e) }
  //     setlevel(level + 1)
  //   }

  //   function paisesFilter(e) {
  //     console.log("paises Filter by id----->", e)
  //     const res = _.filter(props.list.paises, ['continent', e]);
  //     console.log("resultado de paises: ", res.length)
  //     //console.log("res", res)
  //     setpaisesList(res);
  //   }

  //   function ciudadesFilter(e) {
  //     console.log("paises Filter by", e.name)
  //     const res = _.filter(props.list.ciudades, ['PaisCodigo', e.id]);
  //    // console.log("resultado de paises: ", res)
  //     setciudadesList(res);
  //   }



  //   function search() {
  //     let idC
  //     if (pais === null) {
  //       Toast.show(t("filterGeoEmpty"))
  //       console.log("error vacio blah")
  //     }
  //     else {
  //       if (ciudad === null) { idC = 0 } else { idC = ciudad.id }
  //       let data = [
  //         {
  //           "idPais": pais.id,
  //           "idCiudad": idC
  //         }
  //       ];
  //       props.search(data);
  //       props.setShow(false);
  //     }
  //   }









  function send() {
    props.close(false)
  }

  function close() {
    setlevel(0);
    setListCountry([]);
    setListDistrito([]);
    setListCity([]);
    setselectedContinente(null);
    setselectedCountry(null);
    setselectedDistrito(null);
    setselectedCity(null);
    props.close(false)
  }

  function deleting(e) {
    if (e === 1) { setselectedContinente(null), setlevel(0) }
    if (e === 2) { setselectedCountry(null), setlevel(1) }
    if (e === 3) { setselectedDistrito(null), setlevel(2) }
    if (e === 4) { setselectedCity(null), setlevel(3) }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.open} >
      <View style={styles.wrap}>
        <View style={{ ...styles.wrapper, backgroundColor: colorBack }}>
          <View style={{ ...styles.head, backgroundColor: colorDefault }}>
            <Text style={{ ...styles.title }}>{props.title}</Text>
            <TouchableOpacity onPress={() => close()}>
              <Icon name='close-circle-outline' fill='#FFF' width={30} height={30} />
            </TouchableOpacity>
          </View>


          <View style={{
            backgroundColor: "rgba(0,0,0,0.1)",



            // paddingVertical: 10,
            // borderBottomColor: "silver",
            // borderBottomWidth: 0.5,


          }}>


            {selectedContinente !== null &&
              <TouchableOpacity onPress={() => deleting(1)} style={styles.selected}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{t("continent")}:</Text>
                  <Text style={{ marginLeft: 10 }}> {selectedContinente}</Text>
                </View>
                <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
              </TouchableOpacity>
            }


            {selectedCountry !== null &&
              <TouchableOpacity onPress={() => deleting(2)} style={styles.selected}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{t("continent")}:</Text>
                  <Text style={{ marginLeft: 10 }}>...{/* {selectedCountry} */}</Text>
                </View>
                <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
              </TouchableOpacity>
            }







          </View>

          {/*
        
          
      
    
           

           {pais !== null &&
             <TouchableOpacity onPress={() => deleting(2)} style={{ justifyContent: "space-around", flexDirection: "row", borderColor: "#ccc", borderWidth: 0.5, borderRadius: 8, padding: 10, marginVertical: 2 }}>
               <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{t("country")}:
              <Text style={{ marginLeft: 10 }}> {pais.name}</Text> 
               </Text>
               <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
             </TouchableOpacity>
           }

           {ciudad !== null &&
             <TouchableOpacity onPress={() => deleting(3)} style={{ justifyContent: "space-around", flexDirection: "row", borderColor: "#ccc", borderWidth: 0.5, borderRadius: 8, padding: 10, marginVertical: 2 }}>
               <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{t("town")}:
                 <Text style={{ marginLeft: 10 }}> {ciudad.name}</Text>
               </Text>
               <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
             </TouchableOpacity>
           }

         </View>

         */}


          {Load && <ActivityIndicator color={colorDefault} size={40} style={{ marginTop: (windowHeight / 2) - 80 }} />}

          {!Load &&
            <ScrollView>
              <View style={styles.body}>
                {
                  level === 0 && ListContinentes.map((i, key) => {
                    return (
                      <TouchableOpacity style={styles.opt} key={key} onPress={() => [
                        setlevel(1),
                        setselectedContinente(i)]}>
                        <Text style={styles.optText}>{i}</Text>
                      </TouchableOpacity>
                    )
                  })
                }




                {
                  level === 1 && ListCountry.map((i, key) => {
                    //{"capital": 554, "continent": "South America", "id": "CHL", "name": "Chile"}
                    return (
                      <TouchableOpacity style={styles.opt} key={key} onPress={(i) => [setlevel(2), setselectedCountry()]}>
                        <Text style={styles.optText}>{i.name}</Text>
                      </TouchableOpacity>
                    )
                  })
                }






                {
                  level === 2 && ListDistrito.map((i, key) => {
                    return (
                      <TouchableOpacity style={styles.opt} key={key} onPress={() => [setlevel(3), setselectedDistrito()]}>
                        <Text style={styles.optText}>...</Text>
                      </TouchableOpacity>
                    )
                  })
                }

                {
                  level === 3 && ListCity.map((i, key) => {
                    return (
                      <TouchableOpacity style={styles.opt} key={key} onPress={() => [setlevel(4), setselectedCity()]}>
                        <Text style={styles.optText}>...</Text>
                      </TouchableOpacity>
                    )
                  })
                }






                {/*
           {level === 1 && continentesList !== null &&
             continentesList.map((i, key) => {
               return (
                 <TouchableOpacity key={key} onPress={() => uplevel(i)}
                   style={{ borderColor: "#ccc", borderWidth: 0.5, borderRadius: 8, padding: 10, marginVertical: 2 }}
                 >
                   <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{i.name}</Text>
                 </TouchableOpacity>
               );
             })
           }



           {level === 2 && paisesList !== null &&
             paisesList.map((i, key) => {
               return (
                 <TouchableOpacity key={key} onPress={() => uplevel(i)}
                   style={{ borderColor: "#ccc", borderWidth: 0.5, borderRadius: 8, padding: 10, marginVertical: 2 }}
                 >
                   <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{i.name}</Text>
                 </TouchableOpacity>
               );
             })
           }


           {level === 3 && ciudadesList !== null &&
             ciudadesList.map((i, key) => {
               return (
                 <TouchableOpacity key={key} onPress={() => uplevel(i)}
                   style={{ borderColor: "#ccc", borderWidth: 0.5, borderRadius: 8, padding: 10, marginVertical: 2 }}
                 >
                   <Text style={{ textAlign: "center", textTransform: "capitalize" }}>{i.name}</Text>
                 </TouchableOpacity>
               );
             })
           }*/}






              </View>
            </ScrollView>
          }


          {/*
         <View style={{ marginTop: 5, paddingVertical: 5, }}>
           <TouchableOpacity
             onPress={() => search()}
             style={{ backgroundColor: "#00AFE8", paddingVertical: 10, flexDirection: "row", justifyContent: "center", borderRadius: 10 }}>
             <Icon name='checkmark-circle-outline' fill='#FFF' width={22} height={22} />
             <Text style={{ marginLeft: 10, color: "#FFF", textAlign: "center", textTransform: "capitalize", fontWeight: "bold", fontSize: 16 }}>{t("search")}</Text>
           </TouchableOpacity>
         </View>
         */}






          <View style={styles.foot}>
            <TouchableOpacity
              onPress={() => close()}
              style={{ ...styles.btnCancel, ...styles.btn }}>
              <Text>close</Text>
            </TouchableOpacity>

            {level === 4 &&
              <TouchableOpacity onPress={() => send()} style={{ ...styles.btnSend, ...styles.btn }}>
                <Text>send</Text>
              </TouchableOpacity>
            }
          </View>

        </View>
      </View>
    </Modal>
  );
}


export default SelectList;




// const colorDefault = props.color
// const theme = props.theme

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    alignContent: "center",
    alignItems: "center"
  },
  wrapper: {
    overflow: "hidden",
    width: "95%",
    height: windowHeight - 20,
    borderRadius: 10
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 30,
  },
  body: {
    paddingHorizontal: 10,
    paddingBottom: 39
  },
  selected: {
    backgroundColor: "#FFF",
    width: "95%",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 2
  },







  opt: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "silver",
    borderBottomWidth: 0.5
  },

  optText: {
    fontSize: 14,

  },



  foot: {
    flexDirection: "row",
    bottom: 0,
    position: "absolute",
    borderTopColor: "rgba(0,0,0,0.25)",
    borderTopWidth: 0.5,
    width: "100%",
    padding: 10,
    justifyContent: "space-around"
  },
  btn: {

  },
  btnCancel: {},
  btnSend: {},
})