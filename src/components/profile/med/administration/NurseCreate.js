
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, View, Text, Image, Dimensions } from 'react-native'
import Toast from 'react-native-simple-toast';
import PhotoUpload from 'react-native-photo-upload'
import { nurses } from '../../../../services/connection.js'
import UserContext from '../../../../../contexts/UserContext'
import FilterByLocation from '../../../filters/FilterByLocation'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';

// import Pagination from '../../../filters/Pagination.js';
// import FilterSilver from '../../../filters/Silver';
// import FilterGolden from '../../../filters/Golden';
//import CardNurse from '../../../cards/CardNurse.js';

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
} from '../../../../styles/Colors.js';


const windowWidth = Dimensions.get('window').width;

function NurseCreate(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [Load, setLoad] = useState(false);
  const [successfully, setsuccessfully] = useState(false);
  const [Location, setLocation] = useState(false);
  const [data, setdata] = useState({
    id_doctor: userDetails.id,
    title: "",
    name: "",
    surname: "",
    description: "",
    img: "",
    adress: "",
    country_id: "",
    city_id: "",
    country: "",
    distrito: "",
    city: "",
    type: "",
    gender: 1,
    age: 18,
    status: 1,
    rating: 0,
    basedOn: 0,
    stars: 0,
    recommended: 0,
  });

  function onChangeText(text, key) {
    if (key === "age") {
      let value = data.age + text
      if (value < 18) { setdata({ ...data, [key]: 18 }) }
      else { setdata({ ...data, [key]: value }) }
    }
    else {
      setdata({
        ...data,
        [key]: text
      })
    }
  }

  async function getLocation(i) {
    const res1 = i[1].name;
    const res2 = i[1].id;
    const res3 = i[2].CiudadDistrito;
    const res4 = i[2].name;
    const res5 = i[2].id;
    setdata({
      ...data,
      "country_id": res2,
      "city_id": res5,
      "country": res1,
      "distrito": res3,
      "city": res4,
    })
  }

  async function save() {
    if (
      data.title === "" &&
      data.name === "" &&
      data.surname === "" &&
      data.description === "" &&
      data.img === "" &&
      data.adress === "" &&
      data.country_id === "" &&
      data.city_id === "" &&
      data.country === "" &&
      data.distrito === "" &&
      data.city === "" &&
      data.type === "" &&
      data.gender === 1 &&
      data.age === 18 &&
      data.status === 1 &&
      data.rating === 0 &&
      data.basedOn === 0 &&
      data.stars === 0 &&
      data.recommended === 0
    ) { Toast.show("error 1") }
    else {
      setLoad(true)
      const res = await nurses.create(data)
      if (res === true) {
        setsuccessfully(true)
      }
    }
  }
  useEffect(() => {
    if (successfully === true) {
      setTimeout(() => {
        setLoad(false)
        setsuccessfully(false)
        props.setmode(1)
      }, 3000);
    }
  }, [successfully]);
  return (
    <View style={{
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 20
    }}>
      {successfully === true ?
        <View style={{
          flexDirection: "column", backgroundColor: color_white, width: "60%", alignItems: "center", paddingVertical: 15, borderRadius: 12, shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
          <Icon name='checkmark-circle-outline' width={60} height={60} fill={color_fifth} />
          <Text style={{ textAlign: "center", color: color_fifth }}>Guardado!</Text>
        </View>
        :
        <>
          {data.img !== "" &&
            <TouchableOpacity onPress={() => onChangeText("", 'img')} style={{ zIndex: 999, backgroundColor: color_white, width: 40, height: 40, borderRadius: 30, position: "absolute", right: 15, top: 25, justifyContent: "center", alignItems: "center" }}>
              <Icon name={'close'} height={30} width={30} fill={"rgba(0,0,0,0.25)"} />
            </TouchableOpacity>
          }
          <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                onChangeText(avatar, 'img')
              }
            }}
          >
            {data.img === "" ?
              <View style={{
                borderColor: color_grey_light,
                borderWidth: 0.5,
                flexDirection: "column",
                backgroundColor: "rgba(255,255,255,0.1)",
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 50,
                paddingVertical: 20,
                borderRadius: 12
              }}>
                <Icon name={'image-outline'} height={30} width={30} fill={color_grey_light} />
                <Text style={{ color: color_grey_light, fontSize: 18 }}>Seleccionar una imagen</Text>
              </View>
              :
              <Image
                style={{ resizeMode: 'center', marginBottom: 20, width: windowWidth, height: windowWidth }}
                source={require('../../../../images/flight.jpg')}
              />
            }



            
          </PhotoUpload>
          <View style={styles.group}>
            <Text style={styles.label}>Tìtulo</Text>
            <TextInput
              style={styles.input}
              value={data.title}
              onChangeText={text => onChangeText(text, 'title')}
              placeholder="titulo"
              placeholderTextColor={color_grey_half}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.input}
              value={data.name}
              onChangeText={text => onChangeText(text, 'name')}
              placeholder="Nombre"
              placeholderTextColor={color_grey_half}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              value={data.surname}
              onChangeText={text => onChangeText(text, 'surname')}
              placeholder="Apellido"
              placeholderTextColor={color_grey_half}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              value={data.description}
              onChangeText={text => onChangeText(text, 'description')}
              placeholder="Description"
              placeholderTextColor={color_grey_half}
            />
          </View>
          <TouchableOpacity style={styles.group}
            onPress={() => setLocation(!Location)}>
            <Text style={styles.label}>Direccion</Text>
            {data.city_id !== "" &&
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.country}</Text>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.distrito}</Text>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.city}</Text>
              </View>
            }
            {data.city_id === "" ? <View style={[styles.input, { height: 50 }]}></View> :
              <TextInput
                style={styles.input}
                value={data.adress}
                placeholder="Dirección"
                placeholderTextColor={color_grey_half}

                onChangeText={text => onChangeText(text, 'adress')}
              />
            }
          </TouchableOpacity>

          {/* 
          label: {
    marginBottom: 5,
    color: color_grey_half,
    marginLeft: 15,
    textTransform: "capitalize"
  },
  input: {
    color: color_grey_dark,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12
  }, */}



          <View style={styles.group}>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <Text style={[styles.label, { lineHeight: 40 }]}>Edad:</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal: 10, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                onPress={() => onChangeText(-1, 'age')}>
                <Icon name={'minus-circle-outline'} height={30} width={30} fill={color_fifth} />
              </TouchableOpacity>
              <Text style={{
                color: color_grey_dark, fontSize: 18,
                flexDirection: "row", paddingVertical: 8, paddingHorizontal: 50, backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 12, justifyContent: "center", alignItems: "center"
              }}>{data.age}</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal: 10, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                onPress={() => onChangeText(+1, 'age')}>
                <Icon name={'plus-circle-outline'} height={30} width={30} fill={color_fifth} />
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.group}>
            <View style={{ flexDirection: "column", }}>
              <Text style={styles.label}>Type:</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal: 20, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  onPress={() => onChangeText("premium", 'type')}>
                  <Text style={[styles.label, { marginRight: 15 }]}>
                    premium
                  </Text>
                  <Icon name={data.type === 'premium' ? 'checkmark-square-2-outline' : 'square-outline'} height={30} width={30} fill={color_fifth} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal: 20, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  onPress={() => onChangeText("standard", 'type')}>
                  <Text style={[styles.label, { marginRight: 15 }]}>
                    standard
                  </Text>
                  <Icon name={data.type === 'standard' ? 'checkmark-square-2-outline' : 'square-outline'} height={30} width={30} fill={color_fifth} />
                </TouchableOpacity>
              </View>
            </View>
          </View>



          <View style={styles.group}>
            <View style={{ flexDirection: "column", }}>
              <Text style={styles.label}>Género:</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal: 20, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  onPress={() => onChangeText(1, 'gender')}>
                  <Text style={[styles.label, { marginRight: 15 }]}>
                    másculino
                  </Text>
                  <Icon name={data.gender === 1 ? 'checkmark-square-2-outline' : 'square-outline'} height={30} width={30} fill={color_fifth} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingVertical: 8, paddingHorizontal: 20, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  onPress={() => onChangeText(2, 'gender')}>
                  <Text style={[styles.label, { marginRight: 15 }]}>
                    Femenino
                  </Text>
                  <Icon name={data.gender === 2 ? 'checkmark-square-2-outline' : 'square-outline'} height={30} width={30} fill={color_fifth} />
                </TouchableOpacity>
              </View>
            </View>
          </View>



          {!Load &&
            <TouchableOpacity style={[styles.btn]} onPress={() => save()}>
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>
          }


          {Load &&
            <View style={{
              alignSelf: "center",
              marginTop: 20,
              backgroundColor: color_fifth,
              width: "60%",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <ActivityIndicator color={color_white} size={40} />
              <Text style={{ color: color_white, fontSize: 14, marginTop: 5 }}>Guardando...</Text>
            </View>
          }
        </>
      }
      <FilterByLocation title={""} color={color_fifth} show={Location} setShow={setLocation} getInfo={getLocation} />
    </View>
  )
}
export default NurseCreate;




const styles = StyleSheet.create({
  group: {
    borderColor: color_grey_light,
    borderWidth: 0.5,
    flexDirection: "column",
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    marginBottom: 10,
    padding: 10
  },
  label: {
    marginBottom: 5,
    color: color_grey_half,
    marginLeft: 15,
    textTransform: "capitalize"
  },
  input: {
    color: color_grey_dark,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12
  },
  btn: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: color_fifth,
    width: "60%",
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
  btnText: {
    color: color_white,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    padding: 10
  }
})