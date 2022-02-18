import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Dimensions, Image, Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import { serverCrm, base_url } from '../../../../Env';
import UserContext from '../../../../contexts/UserContext'
import { services } from '../../../services/connection.js'
import {
  color_primary,
  color_secondary,
  color_tertiary,
  color_quarter,
  color_fifth,
  color_white,
  color_star_a,
  color_black,
  color_black_a,
  color_grey_light,
  color_grey_half,
  color_grey_dark,
  color_transparent,
  color_screen,
  color_star
} from '../../../styles/Colors.js'
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SelectType(props) {
  const { t, i18n } = useTranslation();
  const [selected, setselected] = useState(null);
  const [modal, setmodal] = useState(false);
  const [Load, setLoad] = useState(true);
  const [types, settypes] = useState([]);
  const [colors, setcolors] = useState(["#3498DB", "#2ECC71", "#F39C12", "#E74C3C"]);
  const size = 20
  const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 80 };
  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    console.log("open select type (service)")
    Get()
  }, [props]);

  async function Get() {
    setLoad(true)
    const res = await services.getRoles(i18n.language)
    settypes(res);
    setLoad(false)
  }

  function pagination(data, value) {
    const position = types.indexOf(data)
    const newPosition = position + value
    if (newPosition < 0) {
      setselected(null)
    }
    else {
      const isset = types[newPosition]
      if (isset !== undefined) {
        setselected(types[newPosition])
      }
    }
  }

  async function send() {
    const data = {
      user: props.userDetails.id,
      type: selected.id
    }
    const newData = {
      id: userDetails.id,
      name: userDetails.name,
      surname: userDetails.surname,
      email: userDetails.email,
      phone: userDetails.phone,
      photo_profile: userDetails.photo_profile,
      rol: userDetails.rol,
      language: userDetails.language,
      password: userDetails.password,
      service: selected.id
    }
    const res = await services.updateNewRol(data);
    if (res === true) {
      setUserDetails({ ...newData })
    }
    else {
      console.log("error")
    }
    setselected(null)
    setmodal(false)
    setLoad(false)
    props.clear()
  }

  if (props.open === true) {
    return (
      <View style={styles.wrapper}>
        <Modal animationType="slide" transparent={true} visible={modal} >
          {selected !== null &&
            <Confirmation data={selected} send={send} setmodal={setmodal}
              color={colors[types.indexOf(selected)]}
            //color={color_star}
            />
          }
        </Modal>
        {Load && <ActivityIndicator color={color_white} size={30} />}

        {!Load &&
          <View style={styles.wrap}>
            <GestureRecognizer
              onSwipeLeft={(state) => pagination(+1)}
              onSwipeRight={(state) => pagination(-1)}
              config={config}
              style={{ ...styles.container }}
            >
              {selected === null &&
                <View style={{ ...styles.page }}>
                  <ScrollView>
                    <View style={styles.body}>
                      <Text style={{ ...styles.title, color: color_fifth }}>{t("wellezyServicesRolesTitle")}</Text>
                      <Text style={styles.description}>{t("wellezyServicesRolesDescription")}</Text>
                      <View style={{ marginTop:20, alignSelf: "center", width: windowWidth / 2, height: windowWidth / 2 }}>
                        <Image source={require("../../../images/listComplete.png")} style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} />
                      </View>
                    </View>
                  </ScrollView>
                  <View style={styles.pageFoot}>
                    <TouchableOpacity style={{ ...styles.btnArrow, alignSelf: "center", }} onPress={() => setselected(types[0])}>
                      <Icon name={"arrow-forward-outline"} width={25} height={25} fill={color_white} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.diagonal, backgroundColor: color_fifth }}></View>
                </View>
              }
              {selected !== null &&
                types.map((i, key) => {
                  if (i === selected) {
                    return (
                      <Page
                        key={key}
                        data={i}
                        color={colors[types.indexOf(i)]}
                        setmodal={setmodal}
                        pagination={pagination}
                        types={types}
                      />
                    )
                  }
                })
              }
            </GestureRecognizer>
            <View style={{ ...styles.footer }}>
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                onPress={() => setselected(null)}
              >
                <Icon
                  name={selected === null ? "radio-button-on" : "radio-button-off"}
                  width={size}
                  height={size}
                  fill={color_white}
                />
              </TouchableOpacity>
              {types.map((i, key) => {
                return (<TouchableOpacity key={key} onPress={() => setselected(i)} style={{ marginHorizontal: 5 }}>
                  <Icon name={i === selected ? "radio-button-on" : "radio-button-off"}
                    width={size} height={size} fill={color_white} />
                </TouchableOpacity>
                )
              }
              )
              }
            </View>
          </View>
        }
      </View>
    )
  }
  else {
    return (<></>)
  }
}
export default SelectType;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center"
  },
  wrap: {
    overflow: "hidden",
    borderRadius: 8,
    flexDirection: "column",
    width: (windowWidth / 10) * 9,
    height: (windowHeight / 10) * 9
  },
  container: {
    height: "100%",
    overflow: "hidden",
  },
  footer: {
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row"
  },
  page: {
    backgroundColor: color_white,
    flexDirection: "column",
    height: (windowHeight / 10) * 9,
    paddingBottom: 40
  },
  body: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center"
  },
  description: {
    textAlign: "justify",
    fontSize: 14,
    color: color_grey_dark
  },
  diagonal: {
    position: "absolute",
    zIndex: -1,
    width: "200%",
    height: 200,
    bottom: -50,
    left: -50,
    transform: [{ rotateZ: "350deg" }]
  },
  btn: {
    paddingVertical: 5,
    width: "50%",
    borderRadius: 8,
    borderColor: color_white,
    borderWidth: 2,
    marginHorizontal: 20
  },
  btnText: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center"
  },
  btnArrow: {
    borderColor: color_white,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 30
  },
  pageFoot: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
    paddingTop: 5
  }
});



const Page = (props) => {
  const { t, i18n } = useTranslation();
  const myPosition = props.types.indexOf(props.data)
  const prox = props.types[myPosition + 1]
  return (
    <View style={{ ...styles.page }}>
      <ScrollView>
        <View style={styles.body}>
          <Text style={{ ...styles.title, color: props.color }}>{props.data.name}</Text>
          <Text style={styles.description}>{props.data.description}</Text>
          <View style={{ marginTop:20, alignSelf: "center", width: windowWidth / 2, height: windowWidth / 2 }}>
            <Image source={require("../../../images/listComplete.png")} style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.pageFoot}>
        <TouchableOpacity style={styles.btnArrow} onPress={() => props.pagination(props.data, -1)}>
          <Icon name={"arrow-back-outline"} width={25} height={25} fill={color_white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.setmodal(true)}
          style={{ ...styles.btn, backgroundColor: props.color }}>
          <Text style={{ ...styles.btnText }}>accept</Text>
        </TouchableOpacity>
        {prox !== undefined &&
          <TouchableOpacity style={styles.btnArrow} onPress={() => props.pagination(props.data, +1)}>
            <Icon name={"arrow-forward-outline"} width={25} height={25} fill={color_white} />
          </TouchableOpacity>
        }
      </View>
      <View style={{ ...styles.diagonal, backgroundColor: props.color }}></View>
    </View>
  )
}



const Confirmation = (props) => {
  const { t, i18n } = useTranslation();
  const [count, setcount] = useState(30);
  useEffect(() => {
    setTimeout(() => {
      if (count === 0) {
        props.setmodal(false)
      } else {
        secund()
      }
    }, 1000);
  }, [count]);
  function secund() {
    setcount(count - 1)
  }
  return (
    <View style={styles.wrapper}>
      <View style={{ borderRadius: 8, backgroundColor: color_white, width: "80%", flexDirection: "column" }}>
        <View style={{
          paddingBottom: 10,
          paddingHorizontal: 20,
          paddingTop: 30,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "900",
            lineHeight: 25,
            textAlign: "center",
            color: color_grey_dark
          }}>Has seleccionado la modalidad de
            <Text style={{ color: props.color, fontWeight: "bold", textTransform: "uppercase" }}> {props.data.name}</Text>
            , por favor haga clic en aceptar para continuar.
          </Text>
          <View style={{ flexDirection: "row", marginVertical: 20, }}>
            <Text style={{ color: color_grey_half, lineHeight: 20, marginLeft: 5 }}>auto cancel:  {count}s </Text>
            <Icon name={"clock-outline"} width={20} height={20} fill={color_grey_half} />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, borderTopColor: color_grey_light, borderTopWidth: 0.5 }}>
          <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 20, borderRadius: 8, backgroundColor: color_white, borderWidth: 1, borderColor: props.color }} onPress={() => props.setmodal(false)}><Text style={{
            fontWeight: "bold", textTransform: "capitalize", color: props.color
          }}>cancelar</Text></TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 20, borderRadius: 8, backgroundColor: props.color }} onPress={() => props.send()}><Text style={{
            fontWeight: "bold", textTransform: "capitalize", color: color_white
          }}>aceptar</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}