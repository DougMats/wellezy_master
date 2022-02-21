import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl, Dimensions, ActivityIndicator, Image, StatusBar, ScrollView, Modal, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, TextInput } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { currencyFormat, zfill } from '../../components/Logic.js';
import _ from 'lodash';

import Pagination from '../../components/filters/Pagination.js'
import { file_server1 } from '../../../Env.js';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Head from '../../components/generic/Head.js';
import Menu from '../../components/generic/Menu.js';
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

import { valorations } from '../../services/connection'



/*
import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, ActivityIndicator, StatusBar, ScrollView, Modal, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import Head from '../components/Head';
import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import UserContext from '../contexts/UserContext'
import { serverCrm, base_url } from '../Env'
import axios from 'axios'
import { GB1, BG2, colorAlfa, colorBettaLight, colorIota, colorBetta, colorZeta } from '../Colors';
import BTN from '../components/BTN.js';
import _, { identity } from 'lodash';
import QuotationCard from './QuotationCard.js';
import { currencyFormat } from '../components/Time/logic';
*/





const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const WIDTH = windowWidth / 12



function ManageOrders(props) {

  const { t, i18n } = useTranslation();
  const { userDetails } = useContext(UserContext)
  const [vertical, setvertical] = useState(false);
  const [page, setpage] = useState(1);

  // const [search, setsearch] = useState(null);
  // const [filterBy, setfilterBy] = useState("Realizada");
  // const [orderBy, setorderBy] = useState(null);

  const [valorationesDoneList, setvalorationesDoneList] = useState([]);
  const [valoration, setvaloration] = useState(null);
  const [codeConference, setcodeConference] = useState(0)
  const [listTitle, setlistTitle] = useState("");
  const [sumaTotal, setsumaTotal] = useState(0);
  const [coin, setcoin] = useState("$")
  const [modal, setmodal] = useState(false);
  const [Load, setLoad] = useState(true);
  const [successfully, setsuccessfully] = useState(false);

  /*
 


  // titulo del modal
  const [getP, setgetP] = useState(false); // capturar pacientes
  const [getV, setgetV] = useState(false); // capturar valoraciones de ese paciente
  const [Valoration, setValoration] = useState(undefined); // nombre de la valoracion obtenida
  const [ListValoration, setListValoration] = useState([]); //lista de valoraciones
  const [ListValorationByClientCount, setListValorationByClientCount] = useState(0); // contador de valoraciones en estado listo para cotizar
  const [ListValorationByClient, setListValorationByClient] = useState([]); // lista de valoraciones en estado (3)

  const [QuotationExist, setQuotationExist] = useState(false); // valor boleano, existe cotizacion de la valoracion ?? si o no?
  const [IdQuotation, setIdQuotation] = useState(0);
  const [QuotationListItems, setQuotationListItems] = useState([]);


  const [add, setadd] = useState(false);//boton plus bottom-right
  const [Form, setForm] = useState({ name: "werewr", description: "wtrtrtertertertret", price: "550", qty: 5 }); //formulario
  const [id_cita, setid_cita] = useState(0); // id de la cida seleccionada
   // datos guardados con exito -true/false
  */


  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    get()
    // setPatient(undefined);
    // console.log("props-", props.route.params.key_conference);
    // check(props.route.params.key_conference)
  }, [randomCode]);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }


  useEffect(() => {
    if (valoration !== null) {
      setlistTitle("Manage Orders")
      //setcodeConference(valoration.id)
    }
  }, [valoration]);


  async function get() {
    setLoad(true)
    let res = await valorations.valorationsList(i18n.language, userDetails.id, null, "Realizada", null, page)
    setlistTitle("selecciona la valoracion a cotizar")
    setvalorationesDoneList(res.data)
    setLoad(false)
  }


  /*
    async function check(code) {
    if (code === 0) {
      //setcodeConference(0);
      reset();
      console.log("buscar pacientes, citas, quotation");
      GetClients(userDetails.id, "_");
    }
    else {
      setcodeConference(code);
      console.log("code obtenido buscar quotations");
      Get(code);
    }
  }

  //lista de los pacientes
  async function GetClients(id, lk) {
    let list
    await axios.get(base_url(serverCrm, `get/myClients/${id}/${lk}`)).then(function (response) {
      list = response.data
    })
      .catch(function (error) {
        console.log("?----", error)
      })
    setListPatient(list);
  }

  useEffect(() => {
    console.log("ListPatient: ", ListPatient.length)
    setLoad(false);
  }, [ListPatient]);

  //mostrat lista de pacientes
  async function SelectPatient() {
    setLoad(true);
    setValoration(undefined);
    setcodeConference(0);
    setSumaTotal(0);
    await GetClients(userDetails.id, "_");
    setdisplay(true);
    setlistTitle("Seleccione el paciente");
    setgetP(true);
    setgetV(false);
  }

  //capturar paciente
  function getPatient(e) {
    console.log(e)
    setPatient(e.names)
    GetList(e.id)
    setdisplay(false)
    setgetV(false);
    setgetP(false);
  }

  //lista de valoraciones del cliente seleccionado
  async function GetList(id) {
    console.log("buscar lista de citas del paciente: ", id);
    await axios.get(base_url(serverCrm, `get/list/valorations/client/${id}`)).then(function (response) {
      setListValoration(response.data)
    })
      .catch(function (error) { console.log("?", error) })
  }
  useEffect(() => {
    let response = _.filter(ListValoration, ['state', 3]);
    setListValorationByClient(response)
    setListValorationByClientCount(response.length)
  }, [ListValoration]);

  //mostrar lista de valoraciones de un cliente
  function SelectValoration() {
    setdisplay(true);
    setlistTitle("Seleccione la valoracion");
    setgetV(true);
    setgetP(false);
  }

  //get datos de la valoracion
  function getValoration(e) {
    console.log("e", e)
    setdisplay(false);
    setgetV(false);
    setgetP(false);
    setValoration(e.name);
    setcodeConference(e.code);
    GetQuotation(e.id)
//    setid_cita(e.id)
  }
  //capturar datos de la cita o video valoracion
  async function Get(id) {
    console.log("aqui consultando la cita sellecionada")
    await axios.get(base_url(serverCrm, `get/scheduled/valoration/${id}`)).then(function (response) {
      setPatient(response.data.names);
      setValoration(response.data.name);
      GetQuotation(response.data.id_cita);

    })
      .catch(function (error) { console.log("?", error) })
  }

  //buscar que esa cita tenga una cotizacion(Quotation) de ser asi, capturar el id, la lista de items, suma acumulada
  async function GetQuotation(id) {
    console.log("buscando la quotation by id_cita", id)
    await axios.get(base_url(serverCrm, `get/quotation/valoration/${id}`)).then(function (response) {

      console.log(":::::", response.data)

      if (response.data.length === 0) {
        setQuotationExist(false);
        setIdQuotation(response.data.id);
        setQuotationListItems([]);
        setSumaTotal(0);
        setid_cita(response.data.id_cita);
      }
      else {
        setQuotationExist(true);
        setIdQuotation(response.data.id);
        setQuotationListItems(response.data.list);
        setSumaTotal(response.data.price);
        setid_cita(response.data.id_cita);
      }
    })
      .catch(function (error) { console.log("?", error) })
  }

  function onChangeText(text, key) {
    setForm({
      ...Form,
      [key]: text
    })
  }

  function setQTY(v) {
    let actual = Form.qty;
    let nuevo = actual + v;
    onChangeText(nuevo, 'qty')
  }

  //agregar un item a la lista
  function addItem() {
    let data = Form
    if (data.name === "" || data.description === "", data.price === "") {
      Toast.show('Debe completar el formulario.');
    }
    else {
      console.log("here")
      let idCount = QuotationListItems.length
      let newID = idCount + 1;
      data.id = newID
      setQuotationListItems([...QuotationListItems, data])
      setForm({ name: "", description: "", price: "", qty: 1 });
      setadd(false);
    }
  }

  //eliminar iten de la lista
  function delItem(e) {
    let update = []
    for (var i in QuotationListItems) {
      if (QuotationListItems[i].id !== e) {
        update = [...update, QuotationListItems[i]]
      }
    }
    setQuotationListItems(update)
  }

  //actualizar un item existente en la lista
  function updateItem(data) {
    let update = []
    for (var i in QuotationListItems) {
      if (QuotationListItems[i].id !== data.id) {
        update = [...update, QuotationListItems[i]]
      }
    }
    update = [...update, data]
    setQuotationListItems(update)
  }

  //actualizar precio si muta la lista de items
  useEffect(() => {
    let sumatotal = 0
    for (let i in QuotationListItems) {
      let total = QuotationListItems[i].price * QuotationListItems[i].qty;
      sumatotal = sumatotal + total
    }
    setSumaTotal(sumatotal)
  }, [QuotationListItems]);

  async function saveList() {
    console.log("save ....")
    let data = {
      "id_cita": id_cita,
      "price": SumaTotal,
      "list": QuotationListItems
    }
    await axios.post(base_url(serverCrm, `save/quotation/valoration`), data).then(function (response) {
      if (response.data[0] === true && response.data[1] === true) {
        Toast.show('Datos guardados con éxito');
        setSuccessfully(true)
      }
    })
      .catch(function (error) { console.log("?", error) })
  }

  useEffect(() => {
    if (Successfully === true) {
      setTimeout(() => {
        reset();
      }, 5000);
    }
  }, [Successfully]);

  function reset() {
    setcodeConference(0);
    setPatient(undefined)
    setValoration(undefined);
    setQuotationExist(false);
    setIdQuotation(0);
    setQuotationListItems([]);
    setSumaTotal(0);
    setid_cita(0)
    setSuccessfully(false)
  }

  */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar /*translucent*/ backgroundColor={color_white} barStyle="dark-content" />





      <View style={{
        backgroundColor: color_white,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: "row"
      }}>
        <View style={{
          width: "15%"
        }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name='arrow-back-outline' width={30} height={30} fill={color_grey_half} />
          </TouchableOpacity>
        </View>
        <View style={{
          width: "70%",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text>{listTitle}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <TouchableOpacity onPress={() => setvertical(!vertical)}>
            <Icon name='more-vertical' width={30} height={30} fill={color_grey_half} />
          </TouchableOpacity>
        </View>
      </View>



      <ScrollView scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={Load}
            onRefresh={get}
          />
        }
      >



        {valoration !== null &&
          <View style={{
            borderTopColor: color_grey_light,
            borderTopWidth: 0.5,
            backgroundColor: color_white,
            alignSelf: "center",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 20
          }}>
            <View style={{
              width: WIDTH * 1.5,
              height: WIDTH * 1.5,
              borderRadius: WIDTH * 1.5,
              overflow: "hidden",
            }}>
              <Image
                style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                source={{ uri: valoration.categori_img }}
              />
            </View>
            <View style={{
              flexDirection: "column",
              paddingLeft: 20
            }}>
              <Text style={{}}>{valoration.sub_category_name}</Text>
              <Text style={{}}>{valoration.names} {valoration.surnames}</Text>
            </View>
            <TouchableOpacity onPress={() => setvaloration(null)}>
              <Icon name='trash-2-outline' width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>
          </View>
        }




{
//Load && <ActivityIndicator color={color_fifth} size={30} />
}




        {valoration === null &&
          <View>
            {
              valorationesDoneList.map((i, key) => {
                return (
                  <TouchableOpacity
                    onPress={() => setvaloration(i)}
                    key={key}
                    style={{
                      backgroundColor: color_white,
                      marginVertical: 5,
                      alignSelf: "center",
                      width: WIDTH * 10,
                      borderRadius: 8,
                      flexDirection: "row",
                      paddingVertical: 10,
                    }}>
                    <View style={{
                      width: WIDTH * 3,
                      justifyContent: "center",
                      alignItems: "center"
                    }}>

                      <View style={{
                        width: WIDTH * 2,
                        height: WIDTH * 2,
                        borderRadius: WIDTH * 2,
                        overflow: "hidden",
                      }}>
                        <Image
                          style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                          source={{ uri: i.categori_img }}
                        />
                      </View>
                    </View>


                    <View style={{
                      width: WIDTH * 7,
                      flexDirection: "column"
                    }}>
                      <Text style={{}}>{i.sub_category_name}</Text>
                      <Text style={{}}>{i.names} {i.surnames}</Text>
                      {/* <Text style={{}}>{i.id}</Text>

                  <Text style={{}}>{i.category_name}</Text>
                  <Text style={{}}>{i.category_photo}</Text>
                  <Text style={{}}>{i.categori_img}</Text>
                  <Text style={{}}>{i.sub_category_id}</Text>
                  <Text style={{}}>{i.sub_category_photo}</Text>
               */}
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        }




        {valoration !== null &&
          <View>


            <View style={{}}>
              <Text style={{}}>titulo</Text>
              <TextInput value="rretert" style={{}} />
            </View>


            <View style={{}}>
              <Text style={{}}>descripción</Text>
              <TextInput value="rretert" style={{}} />
            </View>




            <View>

              <Item />
              <Item />
              <Item />


            </View>





            {/* id
type
id_cartShop
code
relation
name
description
price
qty
img
coin
created_at 
update_at
*/}


            <TouchableOpacity
              onPress={() => setmodal(true)}
              style={{
                borderWidth: 2,
                borderColor: color_grey_half,
                borderRadius: 20,
                borderStyle: "dashed",
                width: "60%",
                paddingVertical: 5,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center"
              }}>
              <Text style={{ textTransform: "uppercase", color: color_grey_half, fontSize: 16, lineHeight: 30, marginHorizontal: 20 }}>add</Text>
              <Icon name='plus-circle-outline' width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>


          </View>
        }

















        {valorationesDoneList.last_page > 0 && valorationesDoneList.data.length !== 0 &&
          <Pagination page={page} lastPage={valorationesDoneList.last_page} getPage={getPage} />
        }


      </ScrollView>

      {valoration !== null &&
        <View style={{ height: 80, paddingVertical: 10, width: "100%", position: "absolute", bottom: 0, backgroundColor: color_white, flexDirection: "column", paddingHorizontal: 20, }}>
          <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{}}>Total</Text>
            <Text style={{}}>{currencyFormat(coin, sumaTotal)}</Text>
          </View>
        </View>
      }
      {/* <Menu props={props} option={1} /> */}
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
export default ManageOrders;




const Item = (props) => {
  return (
    <View
    style={{
      marginBottom:5,
      borderRadius:12,
      backgroundColor:color_white,
      alignSelf:"center",
      width:"90%",
      //padding:15,
    }}>



      <View
      style={{
        borderTopRightRadius:12,
        borderBottomRightRadius:12,
        height:"100%",
        backgroundColor: color_fifth,
        flexDirection:"column",
        justifyContent:"flex-start",
        position:"absolute",
        top:0,
        right:0,
        paddingHorizontal:2,
        paddingVertical:10,
      }}>
      <TouchableOpacity style={{
        width:40,
        height:40,
        borderRadius:40,
        marginVertical:5,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Icon name='edit-outline' width={30} height={30} fill={color_white} />
      </TouchableOpacity>
       <TouchableOpacity style={{
        width:40,
        height:40,
        borderRadius:40,
        marginVertical:5,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Icon name='trash-2-outline' width={30} height={30} fill={color_white} />
      </TouchableOpacity>
      </View>

<View style={{
  padding:15
}}>

<Text>img</Text>
      <Text>name</Text>
      <Text>description</Text>
      <Text>coin</Text>
      <Text>QTY</Text>
      <Text>sut-Total</Text>
      <Text>TOTAL</Text>

</View>

     
    </View>
  )
}

/*
          <View style={{ paddingBottom: 60, marginTop: 60, width: "100%", alignItems: "center", alignContent: "center" }}>
   

            {!Load &&
              <View style={{
                shadowColor: colorIota,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 8.84,
                elevation: 5,
                backgroundColor: "white", width: "90%", borderRadius: 20, marginBottom: 20, alignItems: "center", alignContent: "center", padding: 10
              }}>
                <TouchableOpacity
                  onPress={() => SelectPatient()}
                  style={{ width: "90%", paddingVertical: 10, borderColor: colorAlfa, flexDirection: "row", marginBottom: 20, borderBottomWidth: 1, }}>
                  <Text style={{ width: "30%", textAlign: "center", fontSize: 14, color: colorAlfa, fontWeight: "bold" }}>Paciente:</Text>
                  {Patient !== undefined &&
                    <Text style={{ width: "70%", textAlign: "center", fontSize: 14, color: "#000", fontWeight: "bold" }}>{Patient}</Text>
                  }
                  {Patient === undefined &&
                    <Text style={{ width: "70%", textAlign: "center", fontSize: 14, color: "#000", fontWeight: "bold" }}>Seleccione el Paciente</Text>
                  }
                </TouchableOpacity>
                {Patient !== undefined &&
                  <TouchableOpacity onPress={() => SelectValoration()} style={{ width: "90%", paddingVertical: 10, borderColor: colorAlfa, flexDirection: "row", marginBottom: 20, borderBottomWidth: 1, }}>
                    <Text style={{ width: "30%", textAlign: "center", fontSize: 14, color: colorAlfa, fontWeight: "bold" }}>Valoración:</Text>
                    {Valoration !== undefined && <Text style={{ width: "70%", textAlign: "center", fontSize: 14, color: "#000", fontWeight: "bold" }}>{Valoration}</Text>}
                    {
                      Valoration === undefined &&
                      <Text style={{ width: "70%", textAlign: "center", fontSize: 14, color: "#000", fontWeight: "bold" }}>Seleccione una Valoración</Text>
                    }
                  </TouchableOpacity>
                }
              </View>
            }

            {!Load && QuotationListItems.length > 0 &&
              QuotationListItems.map((i, key) => {
                return (<QuotationCard key={key} data={i} delItem={delItem} updateItem={updateItem} />);
              })
            }

            {add === true &&
              <View style={{ backgroundColor: "white", width: "90%", borderRadius: 20, marginBottom: 20, alignItems: "center", alignContent: "center", padding: 10 }}>
                <TextInput value={Form.name} onChangeText={text => onChangeText(text, 'name')} style={{ marginBottom: 10, backgroundColor: "#eee", width: "100%", borderRadius: 12, height: 40 }} placeholder="Nombre" />
                <TextInput
                  value={Form.description}
                  onChangeText={text => onChangeText(text, 'description')}
                  multiline={true}
                  numberOfLines={4}
                  style={{ marginBottom: 10, backgroundColor: "#eee", width: "100%", borderRadius: 12, minHeight: 80 }} placeholder="Descripción" />
                <TextInput value={Form.price}
                  onChangeText={text => onChangeText(text, 'price')} style={{ marginBottom: 10, backgroundColor: "#eee", width: "100%", borderRadius: 12, height: 40 }} placeholder="Precio" />
                <View style={{ flexDirection: "row", marginBottom: 15 }}>
                  <TouchableOpacity onPress={() => setQTY(-1)} style={{ marginTop: 5 }}>
                    <Icon name='minus-circle-outline' height={30} width={30} fill={colorBetta} />
                  </TouchableOpacity>
                  <Text style={{ marginBottom: 10, marginHorizontal: 10, backgroundColor: "#eee", width: "30%", textAlign: "center", lineHeight: 35, borderRadius: 12, height: 40 }}>
                    {Form.qty}
                  </Text>
                  <TouchableOpacity onPress={() => setQTY(+1)} style={{ marginTop: 5 }}>
                    <Icon name='plus-circle-outline' height={30} width={30} fill={colorBetta} />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                  <BTN icon="close-circle-outline" text="Cerrar" function={setadd} w={"40%"} data={false} />
                  <BTN icon="save-outline" text="Guardar" function={addItem} w={"40%"} data={'adcd'} />
                </View>
              </View>
            }


            {!Load && SumaTotal !== 0 &&
              <TouchableOpacity onPress={() => saveList()}
                style={{
                  flexDirection: "row", overflow: "hidden", marginBottom: 20, backgroundColor: colorZeta, width: "90%", borderRadius: 20,
                  shadowColor: colorIota,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 8.84,
                  elevation: 5,
                }}>
                <View style={{ width: "70%", flexDirection: "column", paddingVertical: 10, paddingHorizontal: 25 }}>
                  <Text style={{ fontSize: 14, color: "red", fontWeight: "bold" }}>Total</Text>
                  <Text style={{ fontSize: 20, color: "red", fontWeight: "bold" }}>{currencyFormat(SumaTotal, 2)} </Text>
                </View>
                <LinearGradient colors={[colorBettaLight, colorBettaLight, colorBetta]} style={{ backgroundColor: colorBetta, width: "30%", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                  <Icon name='save-outline' height={40} width={40} fill={colorZeta} />
                </LinearGradient >
              </TouchableOpacity>
            }


          </View>
        </ScrollView>

        {/* 
      {
//QuotationExist === false && codeConference !==0 &&
QuotationListItems.length === 0 &&
<View style={{
position:"absolute",
zIndex:9999999,
bottom: 95,
left: -90,
shadowColor: colorIota,
shadowOffset: {
  width: 0,
  height: 2,
},
paddingRight:15,
alignContent:"flex-end", 
alignItems:"flex-end",
justifyContent:"center",
shadowOpacity: 0.25,
shadowRadius: 8.84,
elevation: 5,
backgroundColor: "white",
width:"100%",
height: 50,
borderRadius: 30,
}}>
<Text style={{
  color:colorBetta,
  fontWeight:"bold",
  fontSize:13.5,
}}
>La valoración seleccionada no tiene cotización</Text>
</View>
}  *}



        <TouchableOpacity onPress={() => setadd(true)} style={{
          shadowColor: colorIota,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8.84,
          elevation: 5,
          backgroundColor: "white", width: 60, height: 60, justifyContent: "center", alignContent: "center", alignItems: "center", borderRadius: 30, position: "absolute", bottom: 90, right: 20
        }}>
          <Icon name='plus-circle-outline' height={40} width={40} fill={colorBetta} />
        </TouchableOpacity>






      </LinearGradient>





      <Modal animationType="slide" transparent={true} visible={display}>
        <View style={styles.modalBack}>
          <TouchableOpacity onPress={() => setdisplay(!display)} style={{ position: "absolute", top: 20, right: 20 }} >
            <Icon name="close-circle-outline" fill={colorZeta} width={30} height={30} />
          </TouchableOpacity>
          <View style={styles.modalWrap}>
            <Text style={[styles.modalText, { color: colorAlfa, fontSize: 20 }]}>{listTitle}</Text>
            <ScrollView>
              {
                Load === false && getP === true &&
                ListPatient.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => getPatient(i)}
                      style={{ padding: 15, borderBottomColor: "silver", borderBottomWidth: 1 }}>
                      <Text style={{ color: "#000", textAlign: "center", width: "100%", fontSize: 14, fontWeight: "bold" }}>{i.names}</Text>
                    </TouchableOpacity>
                  )
                })
              }
              {getV === true && ListValorationByClientCount === 0 &&
                <Text style={{ color: "#000", marginVertical: 20, textAlign: "center" }}>{Patient} no tiene valoraciones realizadas.</Text>
              }
              {getV === true && ListValorationByClientCount > 0 &&
                ListValorationByClient.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => getValoration(i)}
                      style={{ padding: 15, borderBottomColor: "silver", borderBottomWidth: 1 }}>
                      <Text style={{ color: "#000", textAlign: "center", width: "100%", fontSize: 14, fontWeight: "bold" }}>
                        {i.name}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </Modal>






      <Modal animationType="slide" transparent={true} visible={Successfully}>
        <View style={styles.modalBack}>
          <View style={styles.modalWrap}>
            <View style={styles.modalJustify}>
              <Icon name="checkmark-circle-outline" fill={colorBetta} width={60} height={60} style={{ marginBottom: 10 }} />
              <Text style={[styles.modalText, { color: "#000", fontSize: 14 }]}>Cotización guardada con éxito</Text>
            </View>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  )
}




*/
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  modalBack: {
    position: "absolute",
    zIndex: 999,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  modalWrap: {
    backgroundColor: color_white,
    padding: 15,
    borderRadius: 12,
    width: "90%",
    overflow: "hidden",
    maxHeight: "85%"
  },
  modalJustify: {
    marginVertical: 20,
    width: "100%",
    alignContent: "center",
    alignItems: "center"
  },
  modalText: {
    textAlign: "center",
    width: "100%",
    color: color_primary,
    fontSize: 20,
    fontWeight: "bold"
  }

})



