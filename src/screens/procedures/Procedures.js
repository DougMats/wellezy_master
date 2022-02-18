import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, Header, TextInput, Image, ImageBackground, TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import UserContext from '../../../contexts/UserContext';
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
  color_screen
} from '../../styles/Colors.js'
import Head from '../../components/generic/Head';
import MenuVertical from '../../components/generic/MenuVertical.js';
import Menu from '../../components/generic/Menu';
import { file_server1 } from '../../../Env'
import { procedimientos } from '../../services/connection.js';



function Procedures(props) {
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  const userDetails = useContext(UserContext).userDetails
  const [vertical, setvertical] = useState(false);
  const [search, setsearch] = useState(null)
  const [data, setdata] = useState([]);
  const [dataSearch, setdataSearch] = useState([]);
  const [Load, setLoad] = useState(true);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    Get();
  }, [randomCode])

  useEffect(() => {
    if (search !== null && search !== undefined) {
      SearchSource()
    }
  }, [search]);

  function onChangeText(text) {
    console.log("2 text:", text)
    if (text === "") { setsearch(null) }
    else { setsearch(text) }
  }

  async function Get() {
    setLoad(true)
    const list = await procedimientos.ListGroup(i18n.language)
    setdata(list)
    setLoad(false)
  }

  async function SearchSource() {
    //setLoad(true)
    const list = await procedimientos.List(i18n.language, search)
    setdataSearch(list)
    setLoad(false)
  }
  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  function addFavorite() { }
  function deleteFavorite() { }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <Head props={props} return=""
        show={vertical}
        action={setvertical}
      />
      <View style={{
        width: "100%",
        padding: 5,
      }}>
        <TextInput
          style={{ backgroundColor: color_white, width: "90%", alignSelf: "center", borderRadius: 12 }}
          value={setsearch}
          placeholder={"Search..."}
          placeholderTextColor={color_grey_half}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <ScrollView>
        <View style={{ paddingBottom: 80 }}>
          {Load === true &&
            <ActivityIndicator color={color_primary} size={40} />
          }
          {!Load && (search === null || search === undefined) && data.map((i, key) => {
            return (
              <Group key={key} data={i} goToScreen={goToScreen} />
            )
          })}
          <View
            style={{ width: "100%", paddingHorizontal: "5%", justifyContent: "center", alignItems: "center" }}>
            {!Load && (search !== null || search !== undefined) && dataSearch.map((i, key) => {
              return (
                <Card key={key} data={i} goToScreen={goToScreen} deleteFavorite={deleteFavorite} addFavorite={addFavorite} />
              )
            })}
          </View>
        </View>
      </ScrollView>
      <Menu props={props} option={0} />
      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView>
  );
}
export default Procedures;

const Group = (props) => {
  const { t, i18n } = useTranslation();
  const [Open, setOpen] = useState(false);
  return (
    <View style={{
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: color_white,
      overflow: "hidden",
      width: "90%",
      alignSelf: "center"
    }}>
      <View style={{ backgroundColor: color_white, flexDirection: "row", justifyContent: "space-around", borderRadius: 10 }}>
        <TouchableOpacity style={{ flexDirection: "row", width: "70%", padding: 10 }} onPress={() => setOpen(!Open)}>
          <View style={{ overflow: "hidden", width: 50, height: 50, borderRadius: 25, }}>
            {props.data.img !== "" && props.data.img !== undefined &&
              <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={{ uri: props.data.img }} />
            }
          </View>
          <View style={{ flexDirection: "column", left: 15, top: 6 }}>
            <Text style={{ fontSize: 14, color: color_grey_half, textAlign: "left", textTransform: "capitalize" }}>{props.data.name}</Text>
            <Text style={{ fontSize: 10, color: color_grey_half, textAlign: "left", textTransform: "capitalize" }}>{props.data.child.length} {t("treatments")}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "15%", padding: 10, top: 14, right: -10 }} onPress={() => setOpen(!Open)}>
          <Icon name={Open ? "arrow-down" : "arrow-right"} width={20} height={20} fill={color_grey_half} />
        </TouchableOpacity>
      </View>
      {Open && props.data.child.length > 0 &&
        <ScrollView>
          {props.data.child.map((i, key) => { return (<Card deleteFavorite={props.deleteFavorite} addFavorite={props.addFavorite} data={i} key={key} goToScreen={props.goToScreen} />) })}
        </ScrollView>
      }

      {Open && props.data.child.length === 0 &&
        <View style={{ width: "80%", alignSelf: "center", marginVertical: 20, borderColor: color_grey_half, borderWidth: 1, padding: 5, borderRadius: 20, borderStyle: 'dashed', }}>
          <Text style={{ textAlign: "center", width: "100%", color: color_grey_half, textTransform: "uppercase", fontSize: 12, }}>{t("sorryEmpty")}</Text>
        </View>
      }
    </View>
  );
}


const Card = (props) => {
  const { t, i18n } = useTranslation()
  return (
    <View style={{ paddingVertical: 10, borderTopColor: color_grey_light, borderTopWidth: 0.5, backgroundColor: color_white, flexDirection: "row", justifyContent: "space-around" }}>
      {props.data.favorite === true ?
        <TouchableOpacity onPress={() => props.deleteFavorite(props.data)} style={{ alignContent: "center", alignItems: "center", width: "15%", }}>
          <Icon name='star' width={20} height={20} fill={color_primary} />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => props.addFavorite(props.data)} style={{ alignContent: "center", alignItems: "center", width: "15%", }}>
          <Icon name='star-outline' width={20} height={20} fill={color_primary} />
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => props.goToScreen("Process", props.data)} style={{ width: "70%" }}>
        <Text style={{ fontSize: 14, color: color_grey_half, textAlign: "left", textTransform: "capitalize" }}>{props.data.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.goToScreen("Process", props.data)} style={{ alignContent: "center", alignItems: "center", width: "15%", }}>
        <Icon name="arrow-ios-forward-outline" width={20} height={20} fill={color_grey_half} />
      </TouchableOpacity>
    </View>
  );
}