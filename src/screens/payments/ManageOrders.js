import React, { useState, useEffect, useContext } from 'react'
import { RefreshControl, Dimensions, ActivityIndicator, Image, StatusBar, ScrollView, Modal, StyleSheet, SafeAreaView, TouchableOpacity, View, Text, TextInput } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { currencyFormat, zfill } from '../../components/Logic.js';
import _, { forEach } from 'lodash';
import PhotoUpload from 'react-native-photo-upload'
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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const WIDTH = windowWidth / 12

function ManageOrders(props) {
  const { t, i18n } = useTranslation();
  const { userDetails } = useContext(UserContext)
  const [vertical, setvertical] = useState(false);
  const [listTitle, setlistTitle] = useState("");
  const [page, setpage] = useState(1);
  const [valorationesDoneList, setvalorationesDoneList] = useState([]);
  const [valoration, setvaloration] = useState(null);
  const [modal, setmodal] = useState(false);
  const [modalDeleting, setmodalDeleting] = useState(false);
  const [modalCoin, setmodalCoin] = useState(false);
  const [listCoin, setlistCoin] = useState([
    { currency: "Pesos Colombianos", abbreviation: "COP", symbol: "COP$" },
    { currency: "Dólar estadounidense", abbreviation: "USD ", symbol: "US$" },
    { currency: "Euro", abbreviation: "EUR ", symbol: "€" },
    { currency: "Yen japonés", abbreviation: "JPY", symbol: "¥" },
    { currency: "Libra esterlina", abbreviation: "GBP", symbol: "£" }
  ])
  const [coin, setcoin] = useState(null);
  const [order, setorder] = useState({ img: "", name: "", description: "" });
  const [data, setdata] = useState({ img: "", name: "", description: "", qty: 0, price: 0 });
  const [itemList, setitemList] = useState([]);
  const [totalAmount, settotalAmount] = useState(0);
  const [openOrder, setopenOrder] = useState(true);
  const [Load, setLoad] = useState(true);
  const [successfully, setsuccessfully] = useState(false);

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    get()
  }, [randomCode]);

  useEffect(() => {
    if (itemList.length > 0) {
      let accumulator = 0;
      for (var i in itemList) {
        accumulator += itemList[i].qty * itemList[i].price
      }
      settotalAmount(accumulator)
    }
    else {
      settotalAmount(0)
    }
  }, [itemList]);

  useEffect(() => {
    if (valoration !== null) {
      setlistTitle("Manage Orders")
      if (coin === null) {
        setmodalCoin(true)
      }
    }
  }, [valoration]);

  useEffect(() => {
    if (coin !== null) {
      if (itemList.length > 0) {
        console.log("va a tocar cambiarlos")
        for (var i in itemList) {
          itemList[i].coin = coin
        }
        setitemList([...itemList])
      }
    }
  }, [coin]);

  function onChangeTextOrder(text, key) {
    setorder({
      ...order,
      [key]: text
    })
  }

  function onChangeText(text, key) {
    setdata({
      ...data,
      [key]: text
    })
  }

  async function get() {
    setLoad(true)
    let res = await valorations.valorationsList(i18n.language, userDetails.id, null, "Realizada", null, page)
    setlistTitle("selecciona la valoracion a cotizar")
    setvalorationesDoneList(res.data)
    setLoad(false)
  }







  function add() {
    if (!data.id)       { data.id = itemList.length + 1 }
    // if (!data.code)     { data.code = "code" }
    // if (!data.relation) { data.relation = "relation" }
    // if (!data.type)     { data.type = "group" }

    data.coin = coin
    const isset = itemList.find(obj => obj.id === data.id)
    if (isset === undefined) {
      setitemList([...itemList, { ...data }])
    }
    else {
      const others = itemList.filter(obj => obj.id !== data.id)
      setitemList([...others, { ...data }])
    }
    setdata({ img: "", name: "", description: "", qty: 0, price: 0 })
    setmodal(false)
  }

  function selectToUpdateItem(item) {
    setdata(item)
    setmodal(true)
  }

  function selectToDeleteItem(item) {
    setdata(item)
    setmodalDeleting(true)
  }

  function cancel() {
    setmodalCoin(false)
    setmodal(false)
    setmodalDeleting(false)
    setdata({ img: "", name: "", description: "", qty: 0, price: 0 })
  }

  function deleteItem() {
    const res = itemList.filter(obj => obj.id !== data.id)
    setmodalDeleting(false)
    setitemList([...res])
    setdata({ img: "", name: "", description: "", qty: 0, price: 0 })
  }

  function getPage(e) {
    setpage(e)
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }






  async function save() {
    console.log("saving...")

    let item = {
      type: "group",
      code: "code",
      relation: "relation",
      name: order.name,
      description: order.description,
      price: totalAmount,
      qty: 1,
      img: ".......",
      coin: coin,
      childrens: itemList.length
    }

    let newData = {
      id_client: valoration.id_cliente,
      id_medic: userDetails.id,
      items: [
        item
      ]
    }

    console.log("newData: ", newData)

    // type = "group",
    // code = 123,
    // relation = "relation",
    // name= order.name,
    // description = order.description,
    // price = totalAmount,
    // qty = 1,
    // img = order.img,
    // coin = coin
    // }
    // let newData = {
    //   items: itemList
    // }

    const res = await valorations.insertcartshop(newData)
    console.log("insert es: ", res)

    //     `cartShop`
    //     id	id_client	 id_medic created_at	update_at 

    //     cartShopList
    // id	type	id_cartShop	code	relation	name	description	price	qty	img	coin	created_at	update_at

    // cartShopChild
    // id	id_father	code	name	description	price	qty	img	coin	relation	created_at	update_at
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <StatusBar backgroundColor={color_white} barStyle="dark-content" />
      <ScrollView scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={Load}
            onRefresh={get}
          />
        }
      >

        <View style={styles.head}>
          <View style={styles.headSize}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon name='arrow-back-outline' width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>
          </View>
          <View style={styles.headCenter}>
            <Text style={styles.headTitle}>{listTitle}</Text>
          </View>
          <View style={styles.headSize}>
            <TouchableOpacity onPress={() => setvertical(!vertical)}>
              <Icon name='more-vertical' width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>
          </View>
        </View>

        {valoration !== null &&
          <View style={styles.valoration}>
            <View style={styles.valorationImg}>
              <Image style={styles.imgCover} source={{ uri: valoration.categori_img }} />
            </View>
            <View style={styles.valorationInfo}>
              <Text style={styles.valorationInfoSubCategory}>{valoration.sub_category_name}</Text>
              <Text style={styles.valorationInfoClient}>{valoration.names} {valoration.surnames}</Text>
              <TouchableOpacity onPress={() => setmodalCoin(true)}>
                <Text style={{}}>Coin: {coin}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setvaloration(null)} style={styles.valorationInfoCoinBtn}>
              <Icon name='trash-2-outline' width={30} height={30} fill={color_grey_half} />
            </TouchableOpacity>
          </View>
        }

        {valoration !== null && coin !== null &&
          <View style={styles.order}>
            <View style={{
              width: "100%",
              paddingVertical: 5,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Text style={{
                fontWeight: "700",
                lineHeight: 30,
                textTransform: "uppercase",
                color: color_grey_dark
              }}>Crear cotización</Text>
              <TouchableOpacity onPress={() => setopenOrder(!openOrder)}>
                <Icon name={openOrder ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} height={30} width={30} fill={"rgba(0,0,0,0.25)"} />
              </TouchableOpacity>
            </View>
            {openOrder &&
              <View style={{ paddingHorizontal: 20, paddingVertical: 20, }}>
                {order.img !== "" &&
                  <TouchableOpacity onPress={() => onChangeTextOrder("", 'img')} style={{ zIndex: 999, backgroundColor: "white", width: 35, height: 35, borderRadius: 35, position: "absolute", right: 20, top: 25, justifyContent: "center", alignItems: "center" }}>
                    <Icon name={'trash-2-outline'} height={25} width={25} fill={"rgba(0,0,0,0.25)"} />
                  </TouchableOpacity>
                }
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      onChangeTextOrder(avatar, 'img')
                    }
                  }}>
                  {order.img === "" ?
                    <View style={{ flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 10, justifyContent: "center", alignItems: "center", paddingHorizontal: 50, paddingVertical: 20, borderRadius: 12, borderColor: color_grey_light, borderWidth: 1, borderStyle: "dashed" }}>
                      <Icon name={'image-outline'} height={30} width={30} fill={color_grey_light} />
                      <Text style={{ color: color_grey_light, fontSize: 18 }}>seleccionar una imagen</Text>
                    </View>
                    :
                    <Image style={{ borderRadius: 20, resizeMode: 'cover', marginBottom: 20, width: windowWidth - 50, height: windowWidth / 2 }} source={{ uri: `data:image/gif;base64,${order.img}` }} />
                  }
                </PhotoUpload>
                <View style={styles.formgroup}><Text style={styles.formLabel}>name</Text>
                  <TextInput
                    style={styles.fromInputText}
                    value={order.name}
                    placeholder={t("name")}
                    placeholderTextColor={color_grey_half}
                    keyboardType={'default'}
                    onChangeText={text => onChangeTextOrder(text, 'name')}
                  />
                </View>
                <View style={styles.formgroup}><Text style={styles.formLabel}>description</Text>
                  <TextInput
                    style={styles.fromInputText}
                    value={order.description}
                    placeholder={t("description")}
                    placeholderTextColor={color_grey_half}
                    keyboardType={'default'}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => onChangeTextOrder(text, 'description')}
                  />
                </View>
                {order.img !== "" && order.name !== "" && order.description !== "" &&
                  <TouchableOpacity onPress={() => [setopenOrder(!openOrder)]} style={styles.modalBtn}>
                    <Text style={styles.modalBtnText}>CONTINUAR</Text>
                  </TouchableOpacity>
                }
              </View>
            }
          </View>
        }


        {valoration === null && valorationesDoneList.map((i, key) => {
          return (
            <TouchableOpacity onPress={() => setvaloration(i)} key={key} style={styles.valorationOption}>
              <View style={styles.valorationOptionLeft}>
                <View style={styles.valorationOptionLeftAvatar}>
                  <Image style={styles.imgCover} source={{ uri: i.categori_img }} />
                </View>
              </View>
              <View style={styles.valorationOptionRight}>
                <Text style={styles.valorationOptionRightName}>{i.sub_category_name}</Text>
                <Text style={styles.valorationOptionRightClient}>{i.names} {i.surnames}</Text>
                <Text style={styles.valorationOptionRightClient}>{i.created_at}</Text>
              </View>
            </TouchableOpacity>
          )
        })}


        {!openOrder && valoration !== null && order.img !== "" && order.name !== "" && order.description !== "" &&
          <View style={{ paddingTop: 20, paddingBottom: 120, }}>
            <>
              {itemList.length > 0 ?
                itemList.map((i, key) => {
                  return (
                    <Item key={key} data={i} select={selectToUpdateItem} delete={selectToDeleteItem} />
                  )
                }) :
                <TouchableOpacity onPress={() => setmodal(true)} style={{ borderColor: color_grey_half, borderWidth: 1, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20, alignSelf: "center", width: "75%", borderStyle: "dashed" }}>
                  <Text style={{ color: color_grey_half }}>Aun no asugnas items en este paquete</Text>
                </TouchableOpacity>
              }
            </>

            <TouchableOpacity onPress={() => setmodal(true)} style={{ alignSelf: "center", top: 10, zIndex: 9, width: 60, height: 60, borderRadius: 60, backgroundColor: color_fifth, justifyContent: "center", alignItems: "center" }}>
              <Icon name='plus-circle-outline' width={40} height={40} fill={color_white} />
            </TouchableOpacity>
          </View>
        }
        {valorationesDoneList.last_page > 0 && valorationesDoneList.data.length !== 0 &&
          <Pagination page={page} lastPage={valorationesDoneList.last_page} getPage={getPage} />
        }
        <View style={{ height: 100, }}></View>
      </ScrollView>
      {totalAmount > 0 &&
        <View style={styles.footer}>
          <View style={styles.footerUp}>
            <Text style={styles.footerUpLeft}>Total</Text>
            <Text style={styles.footerUpRight}>{currencyFormat(coin, totalAmount)}</Text>
          </View>
          <TouchableOpacity onPress={() => save()} style={styles.modalBtn}>
            <Text style={styles.modalBtnText}>save</Text>
          </TouchableOpacity>
        </View>
      }
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
      <Modal animationType="slide" transparent={true} visible={modalCoin}>
        <View style={styles.modalBack}>
          <TouchableOpacity onPress={() => setmodalCoin(false)} style={{ position: "absolute", top: 20, right: 20 }} >
            <Icon name="close-circle-outline" fill={color_white} width={30} height={30} />
          </TouchableOpacity>
          <View style={{ ...styles.modalWrap, padding: 0 }}>
            <View style={styles.modalCoinHead}>
              <Text style={styles.modalCoinHeadText}>select a coin</Text>
            </View>
            <View style={styles.modalCoinBody}>
              <View style={{ ...styles.modalCoinBodyOpt, borderBottomColor: color_grey_half, borderBottomWidth: 0.5 }}>
                <Text style={styles.modalCoinBodyColumnA}>currency</Text>
                <Text style={styles.modalCoinBodyColumnB}>abbreviation</Text>
                <Text style={styles.modalCoinBodyColumnC}>symbol</Text>
              </View>
              <ScrollView>
                <View style={{ paddingBottom: 20 }}>
                  {listCoin.map((i, key) => {
                    return (
                      <TouchableOpacity key={key} onPress={() => [setcoin(i.symbol), setmodalCoin(false)]} style={styles.modalCoinBodyOpt}>
                        <Text style={styles.modalCoinBodyColumnA}>{i.currency}</Text>
                        <Text style={styles.modalCoinBodyColumnB}>{i.abbreviation}</Text>
                        <Text style={styles.modalCoinBodyColumnC}>{i.symbol}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalDeleting}>
        <View style={styles.modalBack}>
          <TouchableOpacity onPress={() => setdeleting(false)} style={{ position: "absolute", top: 20, right: 20 }} >
            <Icon name="close-circle-outline" fill={color_white} width={30} height={30} />
          </TouchableOpacity>
          <View style={{ ...styles.modalWrap, alignItems: "center" }}>
            <Icon name="alert-triangle-outline" fill={color_star} width={80} height={80} />
            <Text style={{ textAlign: "center", marginVertical: 20, color: color_grey_dark, fontSize: 16 }}>Estas seguro que deseas eliminar el item{"\n"}{data.name}</Text>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => cancel()} style={{ borderColor: color_grey_half, borderWidth: 1, paddingVertical: 8, borderRadius: 12, width: "45%", alignItems: "center" }}><Text style={{ textTransform: "capitalize", color: color_grey_half }}>no, cancelar</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem()} style={{ borderColor: "red", borderWidth: 1, paddingVertical: 8, borderRadius: 12, width: "45%", alignItems: "center" }}><Text style={{ textTransform: "capitalize", color: "red" }}>Si, Eliminar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.modalBack}>
          <TouchableOpacity onPress={() => setmodal(false)} style={{ position: "absolute", top: 20, right: 20 }} >
            <Icon name="close-circle-outline" fill={color_white} width={30} height={30} />
          </TouchableOpacity>
          <View style={styles.modalWrap}>
            <ScrollView>
              {data.img !== "" &&
                <TouchableOpacity onPress={() => onChangeText("", 'img')} style={{ zIndex: 999, backgroundColor: "white", width: 35, height: 35, borderRadius: 35, position: "absolute", right: 20, top: 25, justifyContent: "center", alignItems: "center" }}>
                  <Icon name={'trash-2-outline'} height={25} width={25} fill={"rgba(0,0,0,0.25)"} />
                </TouchableOpacity>
              }
              <PhotoUpload
                onPhotoSelect={avatar => {
                  if (avatar) {
                    onChangeText(avatar, 'img')
                  }
                }}>
                {data.img === "" ?
                  <View style={{ flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 10, justifyContent: "center", alignItems: "center", paddingHorizontal: 50, paddingVertical: 20, borderRadius: 12, borderColor: color_grey_light, borderWidth: 1, borderStyle: "dashed" }}>
                    <Icon name={'image-outline'} height={30} width={30} fill={color_grey_light} />
                    <Text style={{ color: color_grey_light, fontSize: 18 }}>seleccionar una imagen</Text>
                  </View>
                  :
                  <Image style={{ borderRadius: 20, resizeMode: 'cover', marginBottom: 20, width: windowWidth - 50, height: windowWidth / 2 }} source={{ uri: `data:image/gif;base64,${data.img}` }}
                  />
                }
              </PhotoUpload>
              <View style={styles.formgroup}><Text style={styles.formLabel}>dale un nombre</Text>
                <TextInput
                  style={styles.fromInputText}
                  value={data.name}
                  placeholder={t("name")}
                  placeholderTextColor={color_grey_half}
                  keyboardType={'default'}
                  onChangeText={text => onChangeText(text, 'name')}
                />
              </View>
              <View style={styles.formgroup}><Text style={styles.formLabel}>describelo</Text>
                <TextInput
                  style={styles.fromInputText}
                  value={data.description}
                  placeholder={t("description")}
                  placeholderTextColor={color_grey_half}
                  keyboardType={'default'}
                  onChangeText={text => onChangeText(text, 'description')}
                />
              </View>
              <View style={styles.formgroup}><Text style={styles.formLabel}>añade una cantidad</Text>
                <TextInput
                  style={styles.fromInputText}
                  value={data.qty}
                  placeholder={t("1")}
                  placeholderTextColor={color_grey_half}
                  keyboardType={'numeric'}
                  onChangeText={text => onChangeText(text, 'qty')}
                />
              </View>
              <View style={styles.formgroup}><Text style={styles.formLabel}>dale un precio</Text>
                <TextInput
                  style={styles.fromInputText}
                  value={data.price}
                  placeholder={"$ 00,0"}
                  placeholderTextColor={color_grey_half}
                  keyboardType={'decimal-pad'}
                  onChangeText={text => onChangeText(text, 'price')}
                />
              </View>
              {data.img !== "" && data.name !== "" && data.description !== "" && data.qty !== "" && data.price !== "" ?
                <TouchableOpacity style={styles.modalBtn} onPress={() => add()}>
                  <Text style={styles.modalBtnText}>Guardar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.modalBtn} onPress={() => setmodal(false)}>
                  <Text style={styles.modalBtnText}>Cerrar</Text>
                </TouchableOpacity>
              }
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}
export default ManageOrders;

const styles = StyleSheet.create({
  head: {
    backgroundColor: color_white,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row"
  },
  headSize: {
    width: "15%"
  },
  headCenter: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  headTitle: {
    fontWeight: "800",
    fontSize: 14,
    color: color_grey_dark,
    textTransform: "capitalize",
    textAlign: "center"
  },
  valorationOption: {
    backgroundColor: color_white,
    marginVertical: 5,
    alignSelf: "center",
    width: WIDTH * 10,
    borderRadius: 8,
    flexDirection: "row",
    paddingVertical: 10
  },
  valorationOptionLeft: {
    width: WIDTH * 3,
    justifyContent: "center",
    alignItems: "center"
  },
  valorationOptionLeftAvatar: {
    width: WIDTH * 2,
    height: WIDTH * 2,
    borderRadius: WIDTH * 2,
    overflow: "hidden",
  },
  imgCover: {
    width: null,
    height: null,
    resizeMode: "cover",
    flex: 1
  },
  valorationOptionRight: {
    width: WIDTH * 7,
    flexDirection: "column"
  },
  valorationOptionRightName: {

  },
  valorationOptionRightClient: {
  },
  footer: {
    paddingVertical: 10,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: color_white,
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  footerUp: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerUpLeft: {
  },
  footerUpRight: {
  },
  valoration: {
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
    backgroundColor: color_white,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  valorationImg: {
    width: WIDTH * 1.5,
    height: WIDTH * 1.5,
    borderRadius: WIDTH * 1.5,
    overflow: "hidden",
  },
  valorationInfo: {
    flexDirection: "column",
    paddingLeft: 20
  },
  valorationInfoSubCategory: {
  },
  valorationInfoClient: {
  },
  valorationInfoCoinBtn: {
  },
  order: {
    marginBottom: 20,
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
    backgroundColor: color_white,
    flexDirection: "column",
  },
  modalCoinHead: {
    backgroundColor: color_fifth,
    padding: 10,
    width: "100%",
    flexDirection: "column"
  },
  modalCoinHeadText: {
    color: color_white,
    textAlign: "center"
  },
  modalCoinBody: {
    paddingHorizontal: 10,
  },
  modalCoinBodyOpt: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  modalCoinBodyColumnA: {
    width: "50%",
  },
  modalCoinBodyColumnB: {
    width: "25%",
  },
  modalCoinBodyColumnC: {
    width: "25%",
  },
  uploadImage: {},
  /*modal init */
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
  formgroup: {
    marginBottom: 10
  },
  formLabel: {
    marginLeft: 10,
    color: color_grey_dark,
    textTransform: "capitalize",
    marginBottom: 5
  },
  fromInputText: {
    backgroundColor: "#EAECEE",
    borderRadius: 12,
    paddingHorizontal: 15
  },
  modalBtn: {
    marginVertical: 20,
    backgroundColor: color_fifth,
    paddingVertical: 10,
    borderRadius: 8,
    width: "60%",
    alignSelf: "center"
  },
  modalBtnText: {
    color: color_white,
    fontWeight: "bold",
    textAlign: "center"
  },
  cardItem: {
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: color_white,
    width: WIDTH * 11,
    flexDirection: "column",
    overflow: "hidden"
  },
  cardItemWrap: {
    flexDirection: "row",
    padding: 5,
  },
  cardItemWrapAvatar: {
    resizeMode: 'cover',
    width: WIDTH * 3,
    height: WIDTH * 3,
    borderRadius: 12//WIDTH * 3,
  },
  cardItemWrapInfo: {
    paddingLeft: 10,
    width: WIDTH * 7.5,
    paddingLeft: 20
  },
  cardItemWrapInfoName: {
    fontSize: 16,
    fontWeight: "bold",
    color: color_fifth,
  },
  cardItemWrapInfoDescription: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 15,
    color: color_grey_dark
  },
  cardItemWrapInfoDescriptionBtn: {
    alignSelf: "flex-end",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: color_grey_half,
    borderWidth: 0.5,
    borderRadius: 12,
    marginTop: 5
  },
  cardItemWrapInfoDescriptionBtnText: {
    color: color_grey_half,
    fontSize: 12
  },
  cardItemWrapInfoPrice: {
    fontSize: 14,
    color: color_grey_dark
  },
  cardItemWrapInfoPriceTotal: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold"
  },
  cardItemOptions: {
    backgroundColor: color_fifth,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  cardItemOptionsBtn: {
    flexDirection: "row",
    borderColor: color_white,
    borderWidth: 0.5,
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 12
  },
  cardItemOptionsBtnText: {
    color: color_white,
    marginLeft: 10,
    lineHeight: 25
  }
})

const Item = (props) => {
  const maxString = 100
  const [viewDescription, setviewDescription] = useState(false);
  return (
    <View style={styles.cardItem}>
      <View style={styles.cardItemWrap}>
        <Image style={styles.cardItemWrapAvatar} source={{ uri: `data:image/gif;base64,${props.data.img}` }} />
        <View style={styles.cardItemWrapInfo}>
          <Text style={styles.cardItemWrapInfoName}>{props.data.name}</Text>
          <Text style={styles.cardItemWrapInfoDescription}>
            {viewDescription === true ?
              props.data.description : props.data.description.length > maxString ?
                ((props.data.description.substring(0, maxString - 3)) + '...') : props.data.description
            }
          </Text>
          {props.data.description.length > maxString &&
            <TouchableOpacity style={styles.cardItemWrapInfoDescriptionBtn} onPress={() => setviewDescription(!viewDescription)}>
              <Text style={styles.cardItemWrapInfoDescriptionBtnText}>
                {viewDescription ? "ver menos" : "ver mas"}
              </Text>
            </TouchableOpacity>
          }
          <Text>{props.data.coin}</Text>
          <Text style={styles.cardItemWrapInfoPrice}>{props.data.qty} X {props.data.coin, props.data.price}</Text>
          <Text style={styles.cardItemWrapInfoPriceTotal}>{props.data.coin} {props.data.qty * props.data.price}</Text>
        </View>
      </View>
      <View style={styles.cardItemOptions}>
        <TouchableOpacity style={styles.cardItemOptionsBtn} onPress={() => props.select(props.data)}>
          <Icon name='edit-outline' width={25} height={25} fill={color_white} />
          <Text style={styles.cardItemOptionsBtnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardItemOptionsBtn} onPress={() => props.delete(props.data)}>
          <Icon name='trash-2-outline' width={25} height={25} fill={color_white} />
          <Text style={styles.cardItemOptionsBtnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}