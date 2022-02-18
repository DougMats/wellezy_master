import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, SafeAreaView, View, Text, ScrollView, Dimensions, Image, Modal } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import MenuVertical from '../../components/generic/MenuVertical.js';
import { offer, currencyFormat } from '../../services/Functions.js';
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

const windowWidth = Dimensions.get('window').width;
const W = windowWidth / 10

function PackageDescription(props) {
  const { t, i18n } = useTranslation();
  const [data, setdata] = useState(props.route.params.data);
  const [viewDescription, setviewDescription] = useState(false);
  const maxString = 100
  const [vertical, setvertical] = useState(false);

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_white }}>
      <ScrollView scrollEventThrottle={16} >
        <LinearGradient
          colors={["#0689f7", "#01b8f6"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.head}
        >
          <View style={styles.barUp}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.barUpBtn}><Icon name={"arrow-ios-back-outline"} width={30} height={30} fill={color_white} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setvertical(true)} style={styles.barUpBtn}><Icon name={"more-vertical"} width={30} height={30} fill={color_white} /></TouchableOpacity>
          </View>
          <View style={styles.headWrap}>
            <Text style={styles.headTitle}>{data.title}</Text>
            <View>
              <Text style={styles.price}>{currencyFormat(data.coin, data.price)}</Text>
              <Text style={styles.priceOffer}>{currencyFormat(data.coin, data.priceOffert)}</Text>

              <Text style={styles.dateCreate}>{data.created_at.split(" ")[0]}</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.containe}>
          <View style={styles.card}>
            <View style={styles.cardHead}>
              <Text style={styles.cardHeadTitle}>Description</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.description}>
                {viewDescription === true ? data.description : data.description.length > maxString ? ((data.description.substring(0, maxString - 3)) + '...') : data.description}
              </Text>
              {data.description.length > maxString &&
                <TouchableOpacity onPress={() => setviewDescription(!viewDescription)} style={styles.descriptionViewBtn}>
                  <Text style={styles.descriptionViewBtnText}>
                    {viewDescription ? t("seeLess") : t("seeMore")}
                  </Text>
                </TouchableOpacity>
              }
            </View>
            {/* <View style={styles.cardFoot}></View> */}
          </View>

          {data.items.map((i, key) => {
            if (i.type === "procedure") { return (<Procedure key={key} data={i} />) }
            // if (i.type === "airplaneTicket") { return (<AirplaneTicket key={key} data={i} />) }
            // if (i.type === "transport") { return (<Transport key={key} data={i} />) }
            // if (i.type === "homeRecovery") { return (<HomeRecovery key={key} data={i} />) }
          })}
        </View>
      </ScrollView>


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
export default PackageDescription;










const styles = StyleSheet.create({
  head: {
    width: windowWidth,
    height: windowWidth / 1.5,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  barUp: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  barUpBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  headWrap: {
    height: windowWidth / 3,
    paddingTop: 5,
    flexDirection: "column",
    justifyContent: "space-between"
  },

  headTitle: {
    marginTop: 10,
    fontSize: 30,
    lineHeight: 30,
    color: color_white,
    fontWeight: "bold",
    textTransform: "capitalize"
  },

  price: {
    color: color_white,
    fontSize: 15,
    lineHeight: 25,
    fontWeight: "bold",
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  priceOffer: {
    color: color_white,
    fontSize: 25,
    lineHeight: 25,
    fontWeight: "bold"
  },
  dateCreate: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: color_white,
    lineHeight: 30
  },

  containe: {
    position: "relative",
    marginTop: -60
  },

  card: {
    overflow: "hidden",
    marginBottom: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
    backgroundColor: color_white,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHead: {
    borderBottomColor: color_primary,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardHeadTitle: {
    textTransform: "capitalize",
    color: color_primary,
    fontSize: 18,
    fontWeight: "700"
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    flexDirection: "column"
  },
  description: {
    textAlign: "justify",
    color: color_grey_dark,
    fontSize: 14,
  },
  descriptionViewBtn: {
    marginTop: 15,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    borderColor: color_grey_half,
    borderWidth: 0.5,
    borderRadius: 12
  },
  descriptionViewBtnText: {
    color: color_grey_half
  },

  cardFoot: {
    flexDirection: "row",
    padding: 20
  },






  // cardHead: {
  //   justifyContent: "space-between",
  //   flexDirection: "row",
  //   // paddingHorizontal: 10,
  //   // paddingVertical: 5,
  // },

  // cardHeadWrap: {
  //   backgroundColor:"blue",
  //   flexDirection: "row"
  // },

  // titleCard: {
  //   backgroundColor:"red",
  //   textTransform: "capitalize",
  //   color: color_primary,
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   lineHeight: 25
  // },

  // row: {
  //   backgroundColor: "rgba(0,0,0,0.1)",
  //   flexDirection: "row",
  //   //paddingHorizontal: 10,
  //   //paddingVertical: 5,
  //   borderBottomColor: color_white,
  //   borderBottomWidth: 0.5
  // },

  // label: {
  //   color: color_white,
  //   textTransform: "capitalize",
  //   width: "30%",
  //   textAlign: "right",
  //   //paddingRight: 10,
  //   fontSize: 14,
  //   fontWeight: "600"
  // },

  // text: {
  //   color: color_white,
  //   textTransform: "capitalize",
  //   width: "70%",
  //   fontSize: 14,
  //   fontWeight: "bold"
  // },

  // img: {
  //   backgroundColor: "red",
  //   width: null,
  //   height: null,
  //   resizeMode: "cover",
  //   flex: 1
  // },






  // // rowMiddle: {
  // //   backgroundColor: "rgba(0,0,0,0.1)",
  // //   flexDirection: "row",
  // //   paddingHorizontal: 20,
  // //   paddingVertical: 10,
  // //   borderBottomColor: color_white,
  // //   borderBottomWidth: 0.5
  // // },

  // // rowMiddleL: {
  // //   overflow: "hidden",
  // //   width: W * 2.5,
  // //   height: W * 2.5,
  // //   borderRadius: W * 2.5,
  // // },


  // // rowMiddleR: {
  // //   width: W * 6.5,
  // //   paddingLeft: 20,
  // //   flexDirection: "column"
  // // },

  // // labelMiddle: {
  // //   color: color_white,
  // //   textTransform: "capitalize",
  // //   fontSize: 14,
  // //   fontWeight: "600"
  // // },
  // // textMiddle: {
  // //   color: color_white,
  // //   textTransform: "capitalize",
  // //   fontSize: 14,
  // //   fontWeight: "bold",
  // //   marginBottom: 10
  // // }




})













const Procedure = (props) => {
  // {
  //   type: "procedure",
  //   : "fgertretertretetr",
  //   description: "ererewrr rtretret",
  //   supplies: [
  //     { name: "qwerty", description: "abcdef ghijkl mnop qrs tuvwxyz", qty: 1 },
  //     { name: "343434", description: "23232322", qty: 2 },
  //     { name: "343434", description: "23232322", qty: 5 }
  //   ]
  // },

  const [viewDescription, setviewDescription] = useState(false);
  const maxString = 150
  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <Text style={styles.cardHeadTitle}>{props.data.name}</Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.description}>
          {viewDescription === true ? props.data.description : props.data.description.length > maxString ? ((props.data.description.substring(0, maxString - 3)) + '...') : props.data.description}
        </Text>
        {props.data.description.length > maxString &&
          <TouchableOpacity onPress={() => setviewDescription(!viewDescription)} style={styles.descriptionViewBtn}>
            <Text style={styles.descriptionViewBtnText}>
              {viewDescription ? t("seeLess") : t("seeMore")}
            </Text>
          </TouchableOpacity>
        }
        {
          props.data.supplies.map((i, key) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <Icon name={'checkmark-outline'} width={25} height={25} fill={color_star} />
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>QTY: {i.qty}</Text>
                    <Text>name: {i.name}</Text>
                  </View>
                  <Text>description: {i.description}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
      <View style={styles.cardFoot}></View>
    </View>
  )
}





const HomeRecovery = (props) => {
  const [open, setopen] = useState(true);
  return (
    <View style={styles.card}>
      <Text>HomeRecovery</Text>
    </View>
  )
}






const Transport = (props) => {
  const [open, setopen] = useState(true);
  const [zoom, setzoom] = useState(null);
  const [modal, setmodal] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <View style={styles.cardHeadWrap}>
          {/* <Icon name={'star'} width={20} height={20} fill={color_white} style={{ top: 3, marginRight: 10 }} /> */}
          <Text style={styles.titleCard}>Transport: </Text>
        </View>
        <TouchableOpacity onPress={() => setopen(!open)}>
          <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={30} height={30} fill={color_white} />
        </TouchableOpacity>
      </View>
      {open &&
        <>


          {/* <View style={{}}>
            <View style={{}}>
              <Image source={{}} style={{}} />
            </View>
            <View style={{}}>
              <View style={{}}>
                <Text style={{}}>1</Text>
                <Text style={{}}>2</Text>
              </View>
              <View style={{}}>
                <Text style={{}}>11</Text>
                <Text style={{}}>22</Text>
              </View>
            </View>
          </View> */}


          <View style={{}}>
            <View style={{}}>
              <View style={{}}>
                <Text style={{}}>nameDriver</Text>
                <Text style={{}}>{props.data.nameDriver}</Text>
              </View>
              <View style={{}}>
                <Text style={{}}>carCode</Text>
                <Text style={{}}>{props.data.carCode}</Text>
              </View>
            </View>
            <View style={{}}>
              <View style={{}}>
                <Text style={{}}>carColor</Text>
                <Text style={{}}>{props.data.carColor}</Text>
              </View>
              <View style={{}}>
                <Text style={{}}>carModel</Text>
                <Text style={{}}>{props.data.carModel}</Text>
              </View>
            </View>
          </View>








          <View style={{ paddingBottom: 15 }}>
            <ScrollView horizontal>
              <TouchableOpacity onPress={() => [setzoom(props.data.image), setmodal(true)]} style={{ width: 100, height: 100, overflow: "hidden", borderRadius: 8, marginHorizontal: 2.5 }}><Image style={styles.img} source={{ uri: props.data.image }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => [setzoom(props.data.image), setmodal(true)]} style={{ width: 100, height: 100, overflow: "hidden", borderRadius: 8, marginHorizontal: 2.5 }}><Image style={styles.img} source={{ uri: props.data.image }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => [setzoom(props.data.image), setmodal(true)]} style={{ width: 100, height: 100, overflow: "hidden", borderRadius: 8, marginHorizontal: 2.5 }}><Image style={styles.img} source={{ uri: props.data.image }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => [setzoom(props.data.image), setmodal(true)]} style={{ width: 100, height: 100, overflow: "hidden", borderRadius: 8, marginHorizontal: 2.5 }}><Image style={styles.img} source={{ uri: props.data.image }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => [setzoom(props.data.image), setmodal(true)]} style={{ width: 100, height: 100, overflow: "hidden", borderRadius: 8, marginHorizontal: 2.5 }}><Image style={styles.img} source={{ uri: props.data.image }} /></TouchableOpacity>
            </ScrollView>
          </View>




          {/* <View style={styles.rowMiddle}>
            <View style={styles.rowMiddleL}>
              <Image style={styles.img} source={{ uri: props.data.image }} />
            </View>
            <View style={styles.rowMiddleR}>
              <Text style={styles.labelMiddle}>nameDriver</Text>
              <Text style={styles.textMiddle} >{props.data.nameDriver}</Text>
              <Text style={styles.labelMiddle}>nameDriver</Text>
              <Text style={styles.textMiddle} >{props.data.nameDriver}</Text>
            </View>
          </View>
          <View style={styles.rowMiddle}>
            <View style={styles.rowMiddleL}>
              <Image style={styles.img} source={{ uri: props.data.image }} />
            </View>
            <View style={styles.rowMiddleR}>
              <Text style={styles.labelMiddle}>nameDriver</Text>
              <Text style={styles.textMiddle} >{props.data.nameDriver}</Text>
              <Text style={styles.labelMiddle}>---nameDriver</Text>
              <Text style={styles.textMiddle} >{props.data.nameDriver}</Text>
            </View>
          </View>
          <View style={styles.rowMiddle}>
            <Text style={styles.label}>carCode</Text>
            <Text style={styles.text} >{props.data.carCode}</Text>
          </View>
          <View style={styles.rowMiddle}>
            <Text style={styles.label}>carColor</Text>
            <Text style={styles.text} >{props.data.carColor}</Text>
          </View>
          <View style={styles.rowMiddle}>
            <Text style={styles.label}>carModel</Text>
            <Text style={styles.text} >{props.data.carModel}</Text>
          </View>
          <View style={styles.rowMiddle}>
            <Text style={styles.label}>image</Text>
            <Text style={styles.text} >{props.data.image}</Text>
          </View> */}
        </>
      }

      <Modal animationType="fade" transparent={true} visible={modal} >
        <View style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 999,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}>
          <TouchableOpacity onPress={() => [setmodal(false), setzoom(null)]} style={{ padding: 5, position: "absolute", right: 10, top: 10 }}>
            <Icon name={'close'} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
          {/* <View style={{
            flexDirection: "column",
            backgroundColor: "#FFF",
            paddingTop: 40,
            paddingBottom: 20,
            borderRadius: 12,
            width: "90%"
          }}>
          </View> */}
        </View>
      </Modal>
    </View>
  )
}











const AirplaneTicket = (props) => {
  const [open, setopen] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <View style={styles.cardHeadWrap}>
          {/* <Icon name={'star'} width={20} height={20} fill={color_white} style={{ top: 3, marginRight: 10 }} /> */}
          <Text style={styles.titleCard}>Ticket fly: </Text>
        </View>
        <TouchableOpacity onPress={() => setopen(!open)}>
          <Icon name={open ? 'arrow-ios-downward-outline' : 'arrow-ios-forward-outline'} width={30} height={30} fill={color_white} />
        </TouchableOpacity>
      </View>
      {open &&
        <>
          <View style={styles.row}>
            <Text style={styles.label}>type: </Text>
            <Text style={styles.text}>{props.data.type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>airline: </Text>
            <Text style={styles.text}>{props.data.airline}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}> Passengers: </Text>
            <Text style={styles.text}>{props.data.numberPassengers}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>from: </Text>
            <Text style={styles.text}>{props.data.from}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>to: </Text>
            <Text style={styles.text}>{props.data.to}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>gate: </Text>
            <Text style={styles.text}>{props.data.gate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>flight: </Text>
            <Text style={styles.text}>{props.data.flight}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>seat: </Text>
            <Text style={styles.text}>{props.data.seat}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>class: </Text>
            <Text style={styles.text}>{props.data.class}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>boardingDate: </Text>
            <Text style={styles.text}>{props.data.boardingDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>boardingTime: </Text>
            <Text style={styles.text}>{props.data.boardingTime}</Text>
          </View>
        </>
      }
    </View>
  )
}


