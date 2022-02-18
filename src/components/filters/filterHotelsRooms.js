import React, { useCallback, useState, useEffect, memo } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import { colorAlfa, colorBetta, colorDelta, colorDseta, colorEpsilon, colorKappa, colorZeta } from '../../styles/Colors';
import Toast from 'react-native-simple-toast';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Slider from 'rn-range-slider';
//import RangeSlider from 'rn-range-slider';

function FilterHotelsRooms(props) {
  const { t, i18n } = useTranslation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [mega, setmega] = useState(false);
  const [pop, setpop] = useState(false);
  const [persons, setpersons] = useState(false);
  const [kids, setkids] = useState(0);
  const [adults, setadults] = useState(1);
  const [bedrooms, setbedrooms] = useState(1);
  function getkids(v) {
    let value = v + kids
    if (value < 0) {
      setkids(0)
    }
    else {
      setkids(value)
    }
  }
  function getadults(v) {
    let value = v + adults
    if (value <= 0) {
      setadults(1)
    }
    else {
      setadults(value)
    }
  }
  function getbedrooms(v) {
    let value = v + bedrooms
    if (value <= 0) {
      setbedrooms(1)
    }
    else {
      setbedrooms(value)
    }
  }
  function getpersons() {
    send()
    setpop(false)
    setpersons(false)
  }
  function resetpersons() {
    setkids(0);
    setadults(1);
    setbedrooms(1);
  }

  /* _____________________________________________________________ */
  const [category, setcategory] = useState(false);
  const [categoryValue, setcategoryValue] = useState(0);
  function getCategory() {
    send()
    setpop(false)
    setcategory(false)
  }
  /* _____________________________________________________________ */
  const [preferences, setpreferences] = useState(false);
  const [preferencesList, setpreferencesList] = useState([
    { id: 12, icon: "star", name: "spa", checked: false },
    { id: 9, icon: "wifi-outline", name: "wi-fi", checked: false },
    { id: 2, icon: "star", name: "piscina", checked: false },
    { id: 5, icon: "people-outline", name: "familias", checked: false },
    { id: 7, icon: "star", name: "gimnasio", checked: false },
    { id: 3, icon: "star", name: "parqueadero", checked: true },
    { id: 4, icon: "star", name: "restaurante", checked: true },
    { id: 8, icon: "star", name: "deesayuno gratis", checked: false },
    { id: 14, icon: "pricetags-outline", name: "oferta ingreíble", checked: false },
    { id: 9, icon: "star", name: "aire-acondicionado", checked: false },
    { id: 10, icon: "star", name: "mascotas permitidas", checked: false },
    { id: 1, icon: "gift-outline", name: "cancelación gratuita", checked: false },
    { id: 6, icon: "star", name: "bañera de hidromasaja", checked: false },
    { id: 11, icon: "credit-card-outline", name: "pago en el alojamiento", checked: false },
    { id: 13, icon: "star", name: "acceso silla de ruedas", checked: false },
  ]);

  function checkPreference(text) {
    let state, value
    for (var i in preferencesList) {
      if (preferencesList[i].name === text) {
        state = preferencesList[i].checked
      }
    }
    value = !state
    // preferencesList[i].checked:value
    // setpreferencesList({
    //   ...preferencesList,
    //   [text.checked]: value
    // })
  }
  function getPreferences() {
    send()
    setpop(false)
    setpreferences(false);

  }







  /* _____________________________________________________________ */


  // const [priceMin, setpriceMin] = useState(false);
  // const [priceMax, setpriceMin] = useState(false);

  // const renderThumb = useCallback(() => <Thumb />, []);
  // const renderRail = useCallback(() => <Rail />, []);
  // const renderRailSelected = useCallback(() => <RailSelected />, []);
  // const renderLabel = useCallback(value => <Label text={value} />, []);
  // const renderNotch = useCallback(() => <Notch />, []);



  const renderThumb = useCallback(() => Thumb(), []);
  const renderRail = useCallback(() => Rail(), []);
  const renderRailSelected = useCallback(() => RailSelected(), []);
  const renderLabel = useCallback(value => Label(value), []);
  const renderNotch = useCallback(() => Notch(), []);



  const handleValueChange = useCallback((low, high) => {
    console.log("min", low)
    console.log("max", high)
  }, []);

  // const [rangeDisabled, setRangeDisabled] = useState(false);
  // const [low, setLow] = useState(0);
  // const [high, setHigh] = useState(100);
  // const [min, setMin] = useState(0);
  // const [max, setMax] = useState(100);
  // const [floatingLabel, setFloatingLabel] = useState(false);
  // const renderThumb = useCallback(() => <Thumb />, []);
  // const renderRail = useCallback(() => <Rail />, []);
  // const renderRailSelected = useCallback(() => <RailSelected />, []);
  // const renderLabel = useCallback(value => <Label text={value} />, []);
  // const renderNotch = useCallback(() => <Notch />, []);
  // const handleValueChange = useCallback((low, high) => {
  //   setLow(low);
  //   setHigh(high);
  // }, []);
  // const toggleRangeEnabled = useCallback(() => setRangeDisabled(!rangeDisabled), [rangeDisabled]);
  // const setMinTo50 = useCallback(() => setMin(50), []);
  // const setMinTo0 = useCallback(() => setMin(0), []);
  // const setMaxTo100 = useCallback(() => setMax(100), []);
  // const setMaxTo500 = useCallback(() => setMax(500), []);
  // const toggleFloatingLabel = useCallback(() => setFloatingLabel(!floatingLabel), [floatingLabel]);
  /* _____________________________________________________________ */
  // const [dataInit, setdataInit] = useState("");
  // const [dateEnd, setdateEnd] = useState("");
  /* _____________________________________________________________ */
  // const [search, setsearch] = useState("");
  /* _____________________________________________________________ */

  function send() {
    console.log("send ....")
  }
  const iconColor = "silver"
  return (
    <View style={styles.filterWrap}>

      {mega === false &&
        <TouchableOpacity onPress={() => setmega(!mega)}
          style={{ position: "absolute", top: 0, right: 0, backgroundColor: colorZeta, padding: 10, zIndex: 9999, borderBottomLeftRadius: 20 }}>
          <Icon name={'settings-outline'} fill={iconColor} width={25} height={25} />
        </TouchableOpacity>
      }
      {mega === true &&
        <>
          <View style={styles.filterWrapRow}>
            <TouchableOpacity style={styles.filterBtn} onPress={() => [setpersons(true), setpop(true)]}>
              <Icon name={'people-outline'} fill={iconColor} width={25} height={25} />
              <Text style={styles.filterBtnText}>persons: {kids + adults}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn} onPress={() => [setcategory(true), setpop(true)]}>
              <Icon name={'star'} fill={iconColor} width={25} height={25} />
              <Text style={styles.filterBtnText}>category: {categoryValue}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn} onPress={() => [setpreferences(true), setpop(true)]}>
              <Icon name={'settings-outline'} fill={iconColor} width={25} height={25} />
              <Text style={styles.filterBtnText}>preferencias</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterWrapRow}>
            <Icon name={'calendar'} fill={iconColor} width={30} height={30} />
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={[styles.filterBtnText, { fontWeight: "bold" }]}>llegada: </Text><Text style={styles.filterBtnText}>vi, 00/00/00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={[styles.filterBtnText, { fontWeight: "bold" }]}>salida: </Text><Text style={styles.filterBtnText}>do, 00/00/00</Text>
            </TouchableOpacity>
          </View>




          <View style={styles.filterWrapRow}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon name={'credit-card-outline'} fill={iconColor} width={30} height={30} />
                <TouchableOpacity style={[styles.filterBtn, { minWidth: "43%" }]}>
                  <Text style={[styles.filterBtnText]}>234.000,88</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterBtn, { minWidth: "43%" }]}>
                  <Text style={[styles.filterBtnText]}>634.000,88</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>


               <Slider
                  style={{}}
                  min={0}
                  max={100}
                  step={1}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={handleValueChange}
                />



              </View>
            </View></View>
          <View style={styles.filterWrapRow}>
            <TextInput value={"rtyrtry"} />
          </View>
        </>
      }



      <Modal animationType="slide" transparent={true} visible={pop}>
        <View style={{ backgroundColor: colorKappa, flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          {persons === true &&
            <View style={styles.windowPop}>
              <View style={styles.groupRowFootBtnHead}>
                <Text style={styles.groupRowFootBtnHeadTitle}>Persons & Rooms</Text>
              </View>
              <View style={styles.groupRow}>
                <Text style={styles.groupRowName}>niños</Text>
                <TouchableOpacity onPress={() => getkids(-1)} style={styles.groupRowBtn}>
                  <Icon name='minus-circle-outline' fill={colorEpsilon} width={30} height={30} />
                </TouchableOpacity>
                <Text style={styles.groupRowValue}>{kids}</Text>
                <TouchableOpacity onPress={() => getkids(+1)} style={styles.groupRowBtn}>
                  <Icon name='plus-circle-outline' fill={colorEpsilon} width={30} height={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.groupRow}>
                <Text style={styles.groupRowName}>adultos</Text>
                <TouchableOpacity onPress={() => getadults(-1)} style={styles.groupRowBtn}>
                  <Icon name='minus-circle-outline' fill={colorEpsilon} width={30} height={30} />
                </TouchableOpacity>
                <Text style={styles.groupRowValue}>{adults}</Text>
                <TouchableOpacity onPress={() => getadults(+1)} style={styles.groupRowBtn}>
                  <Icon name='plus-circle-outline' fill={colorEpsilon} width={30} height={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.groupRow}>
                <Text style={styles.groupRowName}>rooms</Text>
                <TouchableOpacity onPress={() => getbedrooms(-1)} style={styles.groupRowBtn}>
                  <Icon name='minus-circle-outline' fill={colorEpsilon} width={30} height={30} />
                </TouchableOpacity>
                <Text style={styles.groupRowValue}>{bedrooms}</Text>
                <TouchableOpacity onPress={() => getbedrooms(+1)} style={styles.groupRowBtn}>
                  <Icon name='plus-circle-outline' fill={colorEpsilon} width={30} height={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.groupRowFoot}>
                <TouchableOpacity onPress={() => resetpersons()} style={[styles.groupRowFootBtn, styles.btnOFF]}>
                  <Text style={[styles.groupRowFootBtnText, { color: "#777" }]}>reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getpersons()} style={[styles.groupRowFootBtn, styles.btnON]}>
                  <Text style={[styles.groupRowFootBtnText, { color: colorAlfa }]}>aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>}
          {category === true &&
            <View style={styles.windowPop}>
              <View style={styles.groupRowFootBtnHead}>
                <Text style={styles.groupRowFootBtnHeadTitle}>Category</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={() => setcategoryValue(0)} style={{ flexDirection: "row", paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name={categoryValue === 0 ? 'checkmark-square-2-outline' : 'square-outline'} fill={categoryValue === 0 ? colorBetta : colorEpsilon} width={30} height={30} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setcategoryValue(1)} style={{ flexDirection: "row", paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name={categoryValue === 1 ? 'checkmark-square-2-outline' : 'square-outline'} fill={categoryValue === 1 ? colorBetta : colorEpsilon} width={30} height={30} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setcategoryValue(2)} style={{ flexDirection: "row", paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name={categoryValue === 2 ? 'checkmark-square-2-outline' : 'square-outline'} fill={categoryValue === 2 ? colorBetta : colorEpsilon} width={30} height={30} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setcategoryValue(3)} style={{ flexDirection: "row", paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name={categoryValue === 3 ? 'checkmark-square-2-outline' : 'square-outline'} fill={categoryValue === 3 ? colorBetta : colorEpsilon} width={30} height={30} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setcategoryValue(4)} style={{ flexDirection: "row", paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star-outline' fill={colorDelta} width={30} height={30} />
                  <Icon name={categoryValue === 4 ? 'checkmark-square-2-outline' : 'square-outline'} fill={categoryValue === 4 ? colorBetta : colorEpsilon} width={30} height={30} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setcategoryValue(5)} style={{ flexDirection: "row", paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name='star' fill={colorDelta} width={30} height={30} />
                  <Icon name={categoryValue === 5 ? 'checkmark-square-2-outline' : 'square-outline'} fill={categoryValue === 5 ? colorBetta : colorEpsilon} width={30} height={30} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={styles.groupRowFoot}>
                <TouchableOpacity onPress={() => getCategory()} style={[styles.groupRowFootBtn, styles.btnON]}>
                  <Text style={[styles.groupRowFootBtnText, { color: colorAlfa }]}>aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>}
          {preferences === true &&
            <View style={styles.windowPop}>
              <View style={styles.groupRowFootBtnHead}>
                <Text style={styles.groupRowFootBtnHeadTitle}>Preferences</Text>
              </View>
              <View style={{ height: windowHeight - 300 }}>
                <ScrollView>
                  <View style={{
                    width: "100%",
                    paddingHorizontal: 10,
                    width: "100%",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}>
                    {
                      preferencesList.map((i, key) => {
                        return (
                          <TouchableOpacity key={key}
                            style={{
                              margin: 2,
                              paddingVertical: 5,
                              paddingHorizontal: 15,
                              width: "80%",
                              backgroundColor: colorZeta,
                              justifyContent: "space-between",
                              borderRadius: 12,
                              flexDirection: "row",
                              borderWidth: 0.5,
                              borderColor: colorEpsilon
                            }}
                            onPress={() => checkPreference(i.name)}
                          >
                            <Icon name={i.icon} fill={colorEpsilon} width={30} height={30} />
                            <Text style={{ marginLeft: 5 }}>{i.name}</Text>
                            <Icon name={i.checked === true ? 'checkmark-square-2-outline' : 'square-outline'} fill={i.checked === true ? colorBetta : colorEpsilon} width={30} height={30} />
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </ScrollView>
              </View>
              <View style={styles.groupRowFoot}>
                <TouchableOpacity onPress={() => getPreferences()} style={[styles.groupRowFootBtn, styles.btnON]}>
                  <Text style={[styles.groupRowFootBtnText, { color: colorAlfa }]}>aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>
      </Modal>
    </View>
  )
}

function Thumb() {
  const THUMB_RADIUS = 12;
  return (<View style={{
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  }} />)
}

function Label({ text, ...restProps }) {
  return (
    <View style={{
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#4499ff',
      borderRadius: 4,
    }} {...restProps}>
      <Text style={{
        fontSize: 16,
        color: '#fff',
      }}>{text}</Text>
    </View>
  )
}

function Rail() {
  return (<View style={{
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  }} />)
}

function RailSelected() {
  return (<View style={{
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  }} />)
}

function Notch(props) {
  return (
    <View style={{
      width: 8,
      height: 8,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: '#4499ff',
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderTopWidth: 8,
    }} {...props} />
  )
}

const styles = StyleSheet.create({
  filterWrap: {
    marginBottom: 30,
    flexDirection: "column"
  },
  filterWrapRow: {
    borderBottomColor: "silver",
    borderBottomWidth: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  filterBtn: {
    // borderWidth: 1,
    // borderColor: colorAlfa,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginHorizontal: 2,
    backgroundColor: colorZeta,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  filterBtnText: {
    lineHeight: 30,
    marginLeft: 5,
    color: "#000",
    fontSize: 14
  },
  filterBtnDate: {},
  filterBtnPrice: {},
  filterBtnInput: {},




  windowPop: {
    width: "90%",
    backgroundColor: colorZeta,
    overflow: "hidden",
    borderRadius: 12,
    paddingBottom: 20,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupRowFootBtnHead: {
    backgroundColor: colorBetta,
    padding: 10,
    marginBottom: 10,
  },
  groupRowFootBtnHeadTitle: {
    textAlign: "center",
    color: colorZeta,
    fontSize: 18,
    fontWeight: "bold"
  },
  groupRow: {
    borderBottomColor: "#ededed",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  groupRowName: {
    width: "50%",
    lineHeight: 40,
    fontSize: 18,
    fontWeight: "bold"
  },
  groupRowValue: {
    height: 40,
    backgroundColor: "#ededed",
    width: 60,
    lineHeight: 40,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    borderRadius: 8
  },
  groupRowBtn: {
    marginHorizontal: 5,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  groupRowFoot: {
    paddingTop: 20,
    borderTopColor: "silver",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around"

  },
  groupRowFootBtn: {
    maxWidth: "45%",
    width: "40%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  groupRowFootBtnText: {
    textAlign: "center",
    textTransform: "uppercase"
  },
  btnON: {
    borderColor: colorAlfa,
    borderWidth: 1,
  },
  btnOFF: {
    borderColor: "#777",
    borderWidth: 1,
  }
})

export default FilterHotelsRooms;