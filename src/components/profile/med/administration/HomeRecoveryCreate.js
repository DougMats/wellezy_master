import React, { useState, useEffect, useContext } from 'react'
import { Keyboard, StyleSheet, ScrollView, View, TextInput, Modal, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import Toast from 'react-native-simple-toast';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import UserContext from '../../../../../contexts/UserContext'
import { homeRecovery } from '../../../../services/connection.js';
import FilterByLocation from '../../../filters/FilterByLocation'
// import HomeRecoveryEdit from './HomeRecoveryEdit';
import { file_server1 } from '../../../../../Env';
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
} from '../../../../styles/Colors';

const windowWidth = Dimensions.get('window').width - 10;
function HomeRecoveryCreate(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [data, setdata] = useState({ id: userDetails.id, name: "", descripcion: "", banner: "", adress: "", distrito: "", country: "", id_country: "", city: "", id_city: "" });
  const [successfully, setsuccessfully] = useState(false);
  const [Load, setLoad] = useState(false);
  const [Location, setLocation] = useState(false);

  const [error, seterror] = useState(0);
  function onChangeText(text, key) {
    setdata({
      ...data,
      [key]: text
    })
  }

  async function getLocation(i) {
    const res1 = i[1].name;
    const res2 = i[1].id;
    const res3 = i[2].CiudadDistrito;
    const res4 = i[2].name;
    const res5 = i[2].id;
    setdata({
      ...data,
      "country": res1,
      "id_country": res2,
      "distrito": res3,
      "city": res4,
      "id_city": res5,
    })
  }

  useEffect(() => {
    if (successfully === true) {
      setTimeout(() => {
        setLoad(false)
        setsuccessfully(false)
      }, 3000);
    }
  }, [successfully]);

  async function save() {
    console.log("savig.....")
    if (data.name === "") { Toast.show("error 1"); seterror(1) }
    else {
      if (data.descripcion === "") { Toast.show("error 2"); seterror(2) }
      else {
        if (data.banner === "") { Toast.show("error 3"); seterror(3) }
        else {
          if (
            data.adress === "" &&
            data.distrito === "" &&
            data.country === "" &&
            data.id_country === "" &&
            data.city === "" &&
            data.id_city === ""
          ) { Toast.show("error 4") }
          else {
            setLoad(true)
            const res = await homeRecovery.create(data)
            if (res === true) {
              setsuccessfully(true)
            }
          }
        }
      }
    }
  }

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
          {data.banner !== "" &&
            <TouchableOpacity onPress={() => onChangeText("", 'banner')} style={{ zIndex: 999, backgroundColor: "white", width: 30, height: 30, borderRadius: 30, position: "absolute", right: 10, top: 25, justifyContent: "center", alignItems: "center" }}>
              <Icon name={'close'} height={30} width={30} fill={"rgba(0,0,0,0.25)"} />
            </TouchableOpacity>
          }
          <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                onChangeText(avatar, 'banner')
              }
            }}
          >
            {data.banner === "" ?
              <View style={{ flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: 10, justifyContent: "center", alignItems: "center", paddingHorizontal: 50, paddingVertical: 20, borderRadius: 12 }}>
                <Icon name={'image-outline'} height={30} width={30} fill={color_grey_light} />
                <Text style={{ color: color_grey_light, fontSize: 18 }}>seleccionar una imagen</Text>
              </View>
              :
              <Image
                style={{ borderRadius: 20, resizeMode: 'cover', marginBottom: 20, width: windowWidth, height: windowWidth / 2 }}
                source={require('../../../../images/flight.jpg')}
              />
            }
          </PhotoUpload>
          <View style={styles.group}>
            <Text style={styles.label}>nombre</Text>
            <TextInput
              style={styles.input}
              value={data.name}
              placeholder="Nombre o Razón Social"
              placeholderTextColor={color_grey_half}
              onChangeText={text => onChangeText(text, 'name')}
            />
          </View>
          <View style={styles.group}>
            <Text style={styles.label}>descripcion</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              value={data.descripcion}
              placeholder="Descripción"
              placeholderTextColor={color_grey_half}
              onChangeText={text => onChangeText(text, 'descripcion')}
            />
          </View>
          <TouchableOpacity style={styles.group}
            onPress={() => setLocation(!Location)}>
            <Text style={styles.label}>Direccion</Text>
            {data.city !== "" &&
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.country}</Text>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.distrito}</Text>
                <Text style={[styles.input, { fontWeight: "bold", textAlign: "center", paddingVertical: 10, marginHorizontal: 2, marginBottom: 5, width: "33%" }]}>{data.city}</Text>
              </View>
            }
            {data.city === "" ? <View style={[styles.input, { height: 50 }]}></View> :
              <TextInput
                style={styles.input}
                value={data.adress}
                placeholder="Dirección"
                placeholderTextColor={color_grey_half}
                onChangeText={text => onChangeText(text, 'adress')}
              />
            }
          </TouchableOpacity>
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
              <ActivityIndicator color={color_white} size={30} />
              <Text style={{ color: "white", fontSize: 14, marginTop: 5 }}>guardando...</Text>
            </View>
          }
        </>
      }
     <FilterByLocation title={""} color={color_fifth} show={Location} setShow={setLocation} getInfo={getLocation} />
    </View>
  )
}
export default React.memo(HomeRecoveryCreate);

const styles = StyleSheet.create({
  group: {
    borderColor: color_grey_light,
    borderWidth: 0.5,
    flexDirection: "column",
    width: "95%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,

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
    padding: 10,
  }
});