import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Modal, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';


import { locations } from '../../services/connection.js'
import { color_white } from '../../styles/Colors';


const windowHeight = Dimensions.get('window').height;
const FilterByLocation = (props) => {
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(true);
  const [continentesList, setcontinentesList] = useState([
    { "name": t("Africa"), "id": "Africa" },
    { "name": t("Antartica"), "id": "Antartica" },
    { "name": t("Asia"), "id": "Asia" },
    { "name": t("Europe"), "id": "Europe" },
    { "name": t("NorthAmerica"), "id": "North America" },
    { "name": t("Oceania"), "id": "Oceania" },
    { "name": t("SouthAmerica"), "id": "South America" },
  ]);
  const [paisesList, setpaisesList] = useState([]);
  const [ciudadesList, setciudadesList] = useState([]);
  const [paisesListPrint, setpaisesListPrint] = useState([]);
  const [ciudadesListPrint, setciudadesListPrint] = useState([]);
  const [level, setlevel] = useState(0);
  const [continente, setcontinente] = useState(null);
  const [pais, setpais] = useState(null);
  const [ciudad, setciudad] = useState(null);

  useEffect(() => {
    if (props.show === true) {
      setlevel(0);
      setcontinente(null)
      setpais(null)
      setciudad(null)
      Get()
    }
  }, [props.show]);

  async function Get() {
    let res1 = await locations.GetPaises(i18n.language);
    let res2 = await locations.GetCiudades(i18n.language);
    setpaisesList(res1)
    setciudadesList(res2)
    setLoad(false)
  }

  function deleting(e) {
    if (e === 1) { setcontinente(null), setlevel(0) }
    if (e === 2) { setpais(null), setlevel(1) }
    if (e === 3) { setciudad(null), setlevel(2) }
  }

  useEffect(() => {
    if (continente !== null) {
      setLoad(true)
      const res = _.filter(paisesList, function (o) { return o.continent === continente.id; });
      setpaisesListPrint(res)
      setlevel(1)
      setLoad(false)
    }
  }, [continente]);

  useEffect(() => {
    if (pais !== null) {
      setLoad(true)
      const res = _.filter(ciudadesList, function (o) { return o.PaisCodigo === pais.id; });
      setciudadesListPrint(res)
      setlevel(2)
      setLoad(false)
    }
  }, [pais]);

  useEffect(() => {
    if (ciudad !== null) {
      setlevel(3)
    }
  }, [ciudad]);

  function save() {
    let data = [
      continente, pais, ciudad
    ]
    props.getInfo(data)
    props.setShow(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={props.show} >
      <View style={styles.wrap}>
        <View style={styles.contained}>
          {props.title !== "" &&
            <View style={styles.head}>
              <Text style={[styles.headTitle, { color: props.color }]}>{props.title}</Text>
            </View>
          }
          <View style={styles.selection}>
            {continente !== null &&
              <TouchableOpacity onPress={() => deleting(1)} style={[styles.selectedBtn, { borderColor: props.color }]}>
                <Text style={styles.selectedText}>{t("continent")}: </Text>
                <Text style={[styles.selectedText, { marginLeft: 10 }]}> {continente.name}</Text>
                <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
              </TouchableOpacity>
            }
            {pais !== null &&
              <TouchableOpacity onPress={() => deleting(2)} style={[styles.selectedBtn, { borderColor: props.color }]}>
                <Text style={styles.selectedText}>{t("country")}: </Text>
                <Text style={[styles.selectedText, { marginLeft: 10 }]}> {pais.name}</Text>
                <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
              </TouchableOpacity>
            }
            {ciudad !== null &&
              <TouchableOpacity onPress={() => deleting(3)} style={[styles.selectedBtn, { borderColor: props.color }]}>
                <Text style={styles.selectedText}>{t("town")}: </Text>
                <Text style={[styles.selectedText, { marginLeft: 10 }]}> {ciudad.name}</Text>
                <Icon name='trash-2-outline' fill='#555' width={22} height={22} />
              </TouchableOpacity>
            }
          </View>
          <ScrollView>
            <View style={styles.body}>
              {Load && <ActivityIndicator color={props.color} size={30} />}
              {!Load && level === 0 && continentesList.map((i, key) => {
                return (
                  <TouchableOpacity key={key} onPress={() => setcontinente(i)} style={styles.optionListBtn}>
                    <Text style={styles.optionListBtnText}>{i.name}</Text>
                  </TouchableOpacity>
                )
              })}
              {!Load && level === 1 && paisesListPrint.map((i, key) => {
                return (
                  <TouchableOpacity key={key} onPress={() => setpais(i)} style={styles.optionListBtn}>
                    <Text style={styles.optionListBtnText}>{i.name}</Text>
                  </TouchableOpacity>
                )
              })}
              {!Load && level === 2 && ciudadesListPrint.map((i, key) => {
                return (
                  <TouchableOpacity key={key} onPress={() => setciudad(i)} style={styles.optionListBtn}>
                    <Text style={styles.optionListBtnText}>{i.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
          <View style={styles.foot}>
            <TouchableOpacity onPress={() => props.setShow(false)} style={[styles.footBtn, { backgroundColor: props.color }]}>
              <Icon name='close-circle-outline' fill='#FFF' width={22} height={22} />
              <Text style={styles.footBtnText}>Cancelar</Text>
            </TouchableOpacity>
            {level === 3 &&
              <TouchableOpacity onPress={() => save()} style={[styles.footBtn, { backgroundColor: props.color }]}>
                <Icon name='checkmark-circle-outline' fill='#FFF' width={22} height={22} />
                <Text style={styles.footBtnText}>Aceptar</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    alignContent: "center",
    alignItems: "center",
  },
  contained: {
    overflow: "hidden",
    backgroundColor: "#f1f1f1",
    width: "90%",
    maxHeight: windowHeight - 50,
    borderRadius: 10
  },
  head: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomColor: "silver",
    borderBottomWidth: 0.5,
  },
  headTitle: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 16
  },
  body: {
    paddingBottom: 10
  },
  selection: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  selectedBtn: {
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "space-around",
    marginHorizontal: 20,
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    marginVertical: 2
  },
  selectedText: {
    textAlign: "center",
    textTransform: "capitalize"
  },
  optionListBtn: {
    backgroundColor: "white",
    marginBottom: 2,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionListBtnText: {

  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white", padding: 10,
    borderTopColor: "silver", borderTopWidth: 0.5,
    marginTop: 5, paddingVertical: 5,
  },
  footBtn: {
    width: "45%",
    alignSelf: "center",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10
  },
  footBtnText: {
    marginLeft: 10,
    color: "#FFF",
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 16
  },
})
export default FilterByLocation;