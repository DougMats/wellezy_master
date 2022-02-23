import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, SafeAreaView, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, View, Image, Text, Modal } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { currencyFormat } from '../../components/Logic.js';
import _ from 'lodash';
import UserContext from '../../../contexts/UserContext'
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


import { cartShop } from '../../services/connection.js';


function PaymentCart(props) {
  const { t, i18n } = useTranslation();
  const [total, settotal] = useState(0)
  const coin = "$"
  const [footTitle, setfootTitle] = useState("Total Payment")
  const [itemsSelect, setitemsSelect] = useState([])
  const [products, setproducts] = useState([])
  const [Load, setLoad] = useState(false);
  const userDetails = useContext(UserContext).userDetails;
  const [vertical, setvertical] = useState(false);

  let randomCode;
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = Math.random() }

  useEffect(() => {
    get()
  }, [randomCode]);

  async function get() {
    setLoad(true);
    const res = await cartShop.getCartShop(userDetails.id)
    setproducts(res)
    setLoad(false);
  }

  useEffect(() => {
    let value, count = 0
    if (products.length > 0) {
      for (var i in products) {
        if (products[i].type === "item") {
          value = products[i].price * products[i].qty
        }
        else {
          value = products[i].price
        }
        count = count + value
      }
      settotal(count)
    }
  }, [products]);





  useEffect(() => {
    if (itemsSelect.length > 0) {
      setfootTitle(`Select Items (${itemsSelect.length})`)
    }
    else {
      setfootTitle("Total Payment")
    }
  }, [itemsSelect]);

  function itemSelect(data) {
    setitemsSelect([...itemsSelect, data])
  }

  function itemUnselect(data) {
    let res = _.filter(itemsSelect, function (o) { return o !== data; });
    setitemsSelect(res)
  }




  async function itemDelect(item) {
    console.log("deleting uno ")
    const DATA = {
      id_client: userDetails.id,
      items: [{ ...item }]
    }

    const res = await cartShop.deletedSelectes(DATA)
    if (res) {
      itemUnselect(item)
      get()
    }
  }



  async function removeAllSelects() {
    console.log("deleting lotes ")
    const DATA = {
      id_client: userDetails.id,
      items: [...itemsSelect]
    }

    const res = await cartShop.deletedSelectes(DATA)
    if (res) {
      setitemsSelect([])
      get()
    }
  }

  function goToCheck() {
    let data = {
      products,
      coin,
      total
    }
    props.navigation.navigate("CheckOut", { randomCode: Math.random(), data })
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.goBack()}>
          <Icon name={'arrow-ios-back-outline'} width={25} height={25} fill={"black"} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Cart
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => setvertical(true)}>
          <Icon name={'more-vertical'} width={25} height={25} fill={"black"} />
        </TouchableOpacity>
      </View>
      <ScrollView scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={Load}
            onRefresh={get}
          />
        }
      >
        <View style={styles.body}>
          {Load && <ActivityIndicator size={40} color={color_primary} style={{ marginTop: 20 }} />}
          {!Load && products.length === 0 &&
            <View style={{
              alignSelf: "center",
              marginTop: 100,
              width: "80%",
              backgroundColor: color_white,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 20,
              borderRadius: 12
            }}>
              <Icon name={'alert-triangle-outline'} width={60} height={60} fill={color_grey_half} />
              <Text style={{
                marginTop: 10,
                color: color_grey_half,
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 16
              }}>empty</Text>
            </View>
          }


          {!Load && products.length > 0 && products.map((i, key) => {
            return (
              <Item
                key={key}
                data={i}
                selectList={itemsSelect}
                itemDelect={itemDelect}

                itemSelect={itemSelect}
                itemUnselect={itemUnselect}
              />
            )
            // if (i.type === "item") { return (<Item key={key} data={i} selectList={itemsSelect} itemSelect={itemSelect} itemDelect={itemDelect} itemUnselect={itemUnselect} />) }
            // if (i.type === "group") { return (<Group key={key} data={i} selectList={itemsSelect} itemSelect={itemSelect} itemDelect={itemDelect} itemUnselect={itemUnselect} />) }
          })}
        </View>
      </ScrollView>
      <View style={styles.foot}>
        <View style={styles.footUp}>
          <Text style={[styles.footUpText, styles.footUpLeft]}>{footTitle}</Text>
          <Text style={[styles.footUpText, styles.footUpRight]}>{currencyFormat(coin, total)}</Text>
        </View>

        {itemsSelect.length > 0 ?
          <TouchableOpacity onPress={() => removeAllSelects()} style={{ ...styles.btnPay, backgroundColor: "#E74C3C" }}>
            <Text style={styles.btnPayText}>remove all selected</Text>
          </TouchableOpacity>
          :
          !Load && products.length > 0 ?
            <TouchableOpacity style={styles.btnPay} onPress={() => goToCheck()}>
              <Text style={styles.btnPayText}>Checkout</Text>
            </TouchableOpacity>
            :
            <></>
        }
      </View>
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


const Item = (props) => {
  const check = checked()
  const [open, setopen] = useState(false)
  const [modal, setmodal] = useState(false);

  function checked() {
    let res = false
    let state = _.find(props.selectList, function (o) { return o === props.data; });
    if (state !== undefined) { res = true }
    return res
  }


  function long() {
    console.log("press....")
    if (!check) {
      props.itemSelect(props.data)
    }
    else {
      props.itemUnselect(props.data)
    }
  }

  function simple() {
    if (check) {
      console.log("simple....")
      props.itemUnselect(props.data)
    }
  }



  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.wrapperUp}
        onLongPress={() => long()}
        onPress={() => simple()}
      >
        <View style={styles.wrap}>
          {props.selectList.length > 0 &&
            <TouchableOpacity onPress={() => check ? props.itemUnselect(props.data) : props.itemSelect(props.data)} style={styles.btn}>
              <Icon name={check ? 'checkmark-square-2-outline' : 'square-outline'} width={25} height={25} fill={check ? color_primary : color_grey_light} />
            </TouchableOpacity>
          }

          <View style={styles.image}>
            <Image style={styles.img} source={{ uri: props.data.img }} />
          </View>
          <View style={{ ...styles.info, width: props.selectList.length > 0 ? "80%" : null }}>
            <Text style={styles.name}>{props.data.name}</Text>
            <Text style={styles.desc}>{props.data.description}</Text>
            <Text style={styles.price}>({props.data.qty} X {currencyFormat(props.data.coin, props.data.price)})
              <Text style={styles.priceTotal}> {currencyFormat(props.data.coin, (props.data.qty * props.data.price))}</Text></Text>
          </View>
        </View>
        <View style={styles.itemBtn}>
          <TouchableOpacity
            onPress={() => setmodal(true)}
            style={styles.btn}
          >
            <Icon name={'trash-outline'} width={25} height={25} fill={color_grey_light} />
          </TouchableOpacity>
          {props.data.type === "group" &&
            <TouchableOpacity onPress={() => setopen(!open)} style={styles.btn}>
              <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={25} height={25} fill={color_grey_light} />
            </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>

      {open &&
        <View style={styles.childWrap}>
          {props.data.child.map((i, key) => {
            return (
              <View key={key} style={styles.child}>
                <View style={styles.image}>
                  <Image style={styles.img} source={{ uri: i.img }} />
                </View>
                <View style={styles.info}>
                  <View style={styles.info}>
                    <Text style={styles.name}>{i.name}</Text>
                    <Text style={styles.desc}>{i.description}</Text>
                    <Text style={styles.price}>({i.qty} X {currencyFormat(i.coin, i.price)})
                      <Text style={styles.priceTotal}> {currencyFormat(i.coin, (i.qty * i.price))}</Text></Text>
                  </View>
                </View>
              </View>
            )
          }
          )}
        </View>
      }

      <Modal animationType="fade" transparent={true} visible={modal} >
        <View style={styles.modal}>
          <View style={styles.modalWrap}>
            <Icon name={'alert-circle-outline'} width={80} height={80} fill={color_star} />
            <Text style={styles.modalText}>
              realmente desea eliminar este produto de la lista?
            </Text>
            <View style={styles.modalFoot}>
              <TouchableOpacity style={styles.modalFootBtn} onPress={() => setmodal(false)}>
                <Icon name={'close-outline'} width={25} height={25} fill={color_grey_half} />
                <Text style={styles.modalFootBtnText}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalFootBtn} onPress={() => [props.itemDelect(props.data), setmodal(false)]}>
                <Icon name={'checkmark-outline'} width={25} height={25} fill={color_grey_half} />
                <Text style={styles.modalFootBtnText}>delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}



// [
//   {
//     "id": 1,
//     "type": "item",
//     "id_cartShop": 3,
//     "code": "227",
//     "relation": "video valoration",
//     "name": "Video Valoración-(ABDOMINOPLASTY)",
//     "description": "solicitud de video valoracion",
//     "price": 50,
//     "qty": 1,
//     "img": "https:\/\/pdtclientsolutions.com\/wellezy\/img\/category\/picture\/Diseños app Wellezy_Abdominoplastia.png",
//     "coin": "$",
//     "created_at": "2022-02-15 10:49:56",
//     "update_at": "2022-02-15 10:49:56"
//   },
//   {
//     "id": 2,
//     "type": "group",
//     "id_cartShop": 3,
//     "code": "123",
//     "relation": "video valoration",
//     "name": "Video Valoración-(ABDOMINOPLASTY)",
//     "description": "solicitud de video valoracion",
//     "price": 50,
//     "qty": 1,
//     "img": "https:\/\/pdtclientsolutions.com\/wellezy\/img\/category\/picture\/Diseños app Wellezy_Abdominoplastia.png",
//     "coin": "$",
//     "created_at": "2022-02-17 09:08:36",
//     "update_at": "2022-02-17 09:08:36",
//     "child": [
//       {
//         "id": 1,
//         "id_father": 2,
//         "code": "1",
//         "name": "name_!",
//         "description": "description siple",
//         "price": 34000,
//         "qty": 2,
//         "img": "https:\/\/hips.hearstapps.com\/hmg-prod.s3.amazonaws.com\/images\/run-asics-running-shoes-1636736175.jpg",
//         "coin": "$",
//         "relation": "qwerty",
//         "created_at": "2022-02-17 13:16:50",
//         "update_at": "2022-02-17 13:16:50"
//       }
//     ]
//   }
// ]


export default PaymentCart;

const styles = StyleSheet.create({
  head: {
    backgroundColor: color_white,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    lineHeight: 40
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    paddingBottom: 60,
    paddingHorizontal: 20
  },
  foot: {
    backgroundColor: color_white,
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    flexDirection: "column",
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "center",
  },
  footUp: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between"
  },
  footUpText: {
    fontSize: 16,
    fontWeight: "700"
  },
  footUpLeft: {},
  footUpRight: {},
  btnPay: {
    backgroundColor: "#30313c",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: "100%"
  },
  btnPayText: {
    textAlign: "center",
    color: color_white,
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "800"
  },
  item: {
    backgroundColor: color_white,
    borderRadius: 12,
    marginVertical: 5,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  wrapperUp: {
    padding: 5,
    flexDirection: "row",
  },
  wrap: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    backgroundColor:"rgba(0,0,0,0.05)",
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 12
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  info: {
    overflow: "hidden",
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold"
  },
  desc: {
    fontSize: 14
  },
  price: {
    fontSize: 14,
    color: color_grey_dark,
  },
  priceTotal: {
    fontSize: 14,
    color: color_fifth,
    fontWeight: "700"
  },
  itemBtn: {
    flexDirection: "column",
    minWidth: "10%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  childWrap: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: "100%",
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  child: {
    borderRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 5,
    padding: 5,
  },

  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalWrap: {
    backgroundColor: color_white,
    width: "80%",
    flexDirection: "column",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  modalText: {
    textAlign: "center",
    marginVertical: 10,
    color: color_grey_dark,
    fontSize: 16,
    fontWeight: "600"
  },
  modalFoot: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  modalFootBtn: {
    borderWidth: 1,
    borderColor: color_grey_half,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "40%",
    justifyContent: "center",
    flexDirection: "row"
  },
  modalFootBtnText: {
    color: color_grey_half,
    marginLeft: 5,
    lineHeight: 25,
    fontSize: 14
  }
});