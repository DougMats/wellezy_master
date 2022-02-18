import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorMi, colorZeta } from '../../styles/Colors.js';
import { useTranslation } from 'react-i18next';

function Todos(props) {
  const { t, i18n } = useTranslation()
  return (
    <ScrollView >
      <View style={{ alignItems: "center", alignContent: "center" }}>
        {
          props.AllProcess.length === 0 &&
          <View style={{ width: "100%", height: "100%", alignContent: "center", alignItems: "center" }}>
            <View style={{ marginTop: "10%", width: "50%", flexDirection: "column", alignContent: "center", alignItems: "center", borderStyle: 'dashed', borderColor: "#00AFE8", borderWidth: 1, paddingVertical: 15, borderRadius: 30, paddingHorizontal: 30 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#00AFE8" }}>{t("sorryEmpty")}</Text>
            </View>
          </View>
        }
        {
          props.AllProcess.length > 0 &&
          props.AllProcess.map((i, key) => {
            return (
              <Card data={i} key={key} goToScreen={props.goToScreen} addFavorite={props.addFavorite} deleteFavorite={props.deleteFavorite} />
            )
          })
        }
        <View style={{ height: 100 }}></View>
      </View>
    </ScrollView>
  );
}

function Card(props) {
  const { t, i18n } = useTranslation();
  const [Open, setOpen] = useState(false);
  return (
    <View style={{ marginTop: 10, borderRadius: 10, backgroundColor: colorZeta, overflow: "hidden", width: "90%" }}>
      <View style={{ backgroundColor: colorZeta, flexDirection: "row", justifyContent: "space-around", borderRadius: 10 }}>
        <TouchableOpacity style={{ flexDirection: "row", width: "70%", padding: 10 }} onPress={() => setOpen(!Open)}>
          <View style={{ overflow: "hidden", width: 50, height: 50, borderRadius: 25, }}>
            {props.data.img !== "" && props.data.img !== undefined &&
              <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }}
                source={{ uri: props.data.img }}
              />
            }
          </View>
          <View style={{ flexDirection: "column", left: 15, top: 6 }}>
            <Text style={{ fontSize: 14, color: "#777", textAlign: "left", textTransform: "capitalize" }}>{props.data.name}</Text>
            <Text style={{ fontSize: 10, color: "#777", textAlign: "left", textTransform: "capitalize" }}>{props.data.child.length} {t("treatments")}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "15%", padding: 10, top: 14, right: -10 }} onPress={() => setOpen(!Open)}>
          <Icon name={Open ? "arrow-up-outline" : "arrow-down-outline"} width={20} height={20} fill={colorMi} />
        </TouchableOpacity>
      </View>
      {Open && props.data.child.length > 0 &&
        <ScrollView>
          {props.data.child.map((i, key) => { return (<CardTwo deleteFavorite={props.deleteFavorite} addFavorite={props.addFavorite} data={i} key={key} goToScreen={props.goToScreen} />) })}
        </ScrollView>
      }
      {Open && props.data.child.length === 0 &&
        <View style={{ width: "80%", alignSelf: "center", marginVertical: 20, borderColor: "#aaa", borderWidth: 1, padding: 5, borderRadius: 20, borderStyle: 'dashed', }}>
          <Text style={{ textAlign: "center", width: "100%", color: "#aaa", textTransform: "uppercase", fontSize: 12, }}>{t("sorryEmpty")}</Text>
        </View>
      }
    </View>
  );
}


function CardTwo(props) {
  const { t, i18n } = useTranslation()
  const [Open, setOpen] = useState(false)
  return (
    <View style={{ paddingVertical: 10, borderTopColor: "#EFEFEF", borderTopWidth: 0.5, backgroundColor: colorZeta, flexDirection: "row", justifyContent: "space-around" }}>
      {props.data.favorite === true ?
        <TouchableOpacity onPress={() => props.deleteFavorite(props.data)} style={{ alignContent: "center", alignItems: "center", width: "15%", }}>
          <Icon name='star' width={20} height={20} fill={colorAlfa} />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => props.addFavorite(props.data)} style={{ alignContent: "center", alignItems: "center", width: "15%", }}>
          <Icon name='star-outline' width={20} height={20} fill={colorAlfa} />
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => props.goToScreen("Process", props.data)} style={{ width: "70%" }}>
        <Text style={{ fontSize: 14, color: "#777", textAlign: "left", textTransform: "capitalize" }}>{props.data.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.goToScreen("Process", props.data)} style={{ alignContent: "center", alignItems: "center", width: "15%", }}>
        <Icon name="arrow-ios-forward-outline" width={20} height={20} fill={colorMi} />
      </TouchableOpacity>
    </View>
  );
}

export default Todos;