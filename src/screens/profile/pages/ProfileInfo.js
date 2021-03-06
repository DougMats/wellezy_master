import React, { useState } from 'react'
import { Linking, StyleSheet, Image, View, Text, TextInput, ListViewBase } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import IconSvg from '../../../svg/icon_svg.js';
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import { file_server1 } from '../.././../../Env.js'
import Calendary from '../../../components/time/Calendary.js'
import FilterByLocation from '../../../components/filters/FilterByLocation.js';


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
} from '../../../styles/Colors.js';


function ProfileInfo(props) {
  const { t, i18n } = useTranslation();
  const [data, setdata] = useState(props.data);
  const [openSingle, setopenSingle] = useState(false);
  const [openLocation, setopenLocation] = useState(false);



  const link = async (url) => {
    console.log("sitio web")
    //await Linking.openURL(url)
  }

  function onChangeText(text, key) {
    setdata({
      ...data,
      [key]: text
    })
  }

  if (props.data !== data) {
    props.setsaveEditing(true)
    props.getData(data)
  } else {
    props.setsaveEditing(false)
  }

  function getChangeRange(data) {
    console.log("data calendary: ", data)
  }

  async function getLocation(i) {
    const res1 = i[1].name;
    const res2 = i[1].id;
    const res3 = i[2].CiudadDistrito;
    const res4 = i[2].name;
    const res5 = i[2].id;
    setdata({
      ...data,
      "id_country": res2,
      "id_city": res5,
      "country": res1,
      "distric": res3,
      "city": res4
    })
  }

  const config = {
    theme: "",
    color: color_fifth,
    minDateNow: false,
    hour: false,
    rangeDate: false,
  }



  const [openList, setopenList] = useState(false);
  const [lisTypeDocument, setlisTypeDocument] = useState([
    "cedula ciudadania", "cedula extrangeria", "pasaporte"
  ]);



  return (
    <View style={styles.wrap}>


      <View style={styles.wrapper}>

        {props.editing ?
          <PhotoUpload
            onPhotoSelect={avatar => { if (avatar) { onChangeText(avatar, 'img') } }}>
            <Image style={{ alignSelf: "center", width: props.fixed * 4, height: props.fixed * 4, borderRadius: props.fixed * 4, marginBottom: 20 }}
              resizeMode='cover'
              source={{ uri: `${file_server1}/img/wellezy/users/${data.img}` }}
            />
            <View style={{ position: "absolute", bottom: 15, right: 0, backgroundColor: "white", width: 35, height: 35, borderRadius: 35, alignItems: "center", justifyContent: "center" }}>
              <Icon name={"camera-outline"} width={25} height={25} fill={"silver"} />
            </View>
          </PhotoUpload>
          :
          <View style={{ height: 20 }}></View>
        }




        {props.rol === "medic" &&
          <View style={styles.group}>
            <Text style={styles.label}>{t("title")}</Text>
            {props.editing ?
              <TextInput
                style={styles.inputText}
                placeholderTextColor={"silver"}
                value={data.title}
                placeholder={t("title")}
                onChangeText={text => onChangeText(text, 'title')}
              />
              :
              <Text style={styles.text}>{data.title}</Text>
            }
          </View>
        }










        <View style={styles.group}>
          <Text style={styles.label}>{t("name")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.name}
              placeholder={t("name")}
              onChangeText={text => onChangeText(text, 'name')}
            />
            :
            <Text style={styles.text}>{data.name}</Text>
          }
        </View>









        <View style={styles.group}>
          <Text style={styles.label}>{t("surname")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.surname}
              placeholder={t("surname")}
              onChangeText={text => onChangeText(text, 'surname')}
            />
            :
            <Text style={styles.text}>{data.surname}</Text>
          }
        </View>





        <View style={styles.group}>
          <Text style={styles.label}>{openList ? "select a type document" : t("identificationType")}</Text>
          {props.editing ?
            <>
              {openList ?
                lisTypeDocument.map((i, key) => {
                  return (
                    <TouchableOpacity key={key} onPress={() => [onChangeText(i, 'typedocumentIdentification'), setopenList(false)]}
                      style={{
                        backgroundColor: "#EAECEE",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center"
                      }}>
                      <Icon name={"arrow-right"} width={20} height={20} fill={"silver"} />
                      <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: "600", color: color_grey_dark, }}>{i}</Text>
                    </TouchableOpacity>
                  )
                })
                :
                <TouchableOpacity
                  onPress={() => setopenList(!openList)}>
                  <Text style={{ ...styles.inputText, paddingVertical: 15 }}> {data.typedocumentIdentification === null || data.typedocumentIdentification === "" ? "seleccione tipo de documento" : data.typedocumentIdentification}</Text>
                </TouchableOpacity>
              }
            </>
            :
            <Text style={styles.text}>
              {data.typedocumentIdentification === null || data.typedocumentIdentification === "" ? "seleccione tipo de documento" : data.typedocumentIdentification}
            </Text>
          }
        </View>



        <View style={styles.group}>
          <Text style={styles.label}>{t("identification")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.identification}
              placeholder={t("identification")}
              onChangeText={text => onChangeText(text, 'identification')}
            />
            :
            <Text style={styles.text}>{data.identification}</Text>
          }
        </View>




        <View style={styles.group}>
          <Text style={styles.label}>{t("email")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.email}
              placeholder={t("email")}
              onChangeText={text => onChangeText(text, 'email')}
            />
            :
            <Text style={styles.text}>{data.email}</Text>
          }
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>{t("phone")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.phone}
              placeholder={t("phone")}
              onChangeText={text => onChangeText(text, 'phone')}
            />
            :
            <Text style={styles.text}>{data.phone}</Text>
          }
        </View>


        <View style={styles.group}>
          <Text style={styles.label}>{t("dateOfBirth")}</Text>
          {props.editing ?
            <TouchableOpacity onPress={() => setopenSingle(true)}>
              <Text style={{ ...styles.inputText, paddingVertical: 15 }}>
                {data.dateOfBirth === null || data.dateOfBirth === "" ? "Agregar fecha" : data.dateOfBirth}
              </Text>
            </TouchableOpacity>
            :
            <Text style={styles.text}>
              {data.dateOfBirth === null || data.dateOfBirth === "" ? "Agregar fecha" : data.dateOfBirth}
            </Text>
          }
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>{t("adress")}</Text>
          {props.editing ?
            <View>
              <TouchableOpacity onPress={() => setopenLocation(!openLocation)} >
                <View style={{ marginBottom: 10, justifyContent: "space-between", width: "90%", flexDirection: "row", alignSelf: "center" }}>
                  <Text style={{ backgroundColor: "#EAECEE", maxWidth: "33%", minWidth: "28%", height: 45, borderRadius: 15, lineHeight: 40, textAlign: "center" }}>{data.country}</Text>
                  <Text style={{ backgroundColor: "#EAECEE", maxWidth: "33%", minWidth: "28%", height: 45, borderRadius: 15, lineHeight: 40, textAlign: "center" }}>{data.distric}</Text>
                  <Text style={{ backgroundColor: "#EAECEE", maxWidth: "33%", minWidth: "28%", height: 45, borderRadius: 15, lineHeight: 40, textAlign: "center" }}>{data.city}</Text>
                </View>
              </TouchableOpacity>
              <TextInput
                style={styles.inputText}
                placeholderTextColor={"silver"}
                value={data.adress}
                placeholder={t("adress")}
                onChangeText={text => onChangeText(text, 'adress')}
              />
            </View>
            :
            <Text style={styles.text}>444{data.adress}. {data.city}. {data.distric} - {data.country}
            </Text>
          }
        </View>

        {props.rol === "medic" &&
          <View style={styles.group}>
            <Text style={styles.label}>{t("description")}</Text>
            {props.editing ?
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputText}
                placeholderTextColor={"silver"}
                value={data.description}
                placeholder={t("description")}
                onChangeText={text => onChangeText(text, 'description')}
              />
              :
              <Text style={styles.text}>{data.description}</Text>
            }
          </View>
        }



        <View style={styles.group}>
          <Text style={styles.label}>{t("facebbok")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.facebbok}
              placeholder={t("facebbok")}
              onChangeText={text => onChangeText(text, 'facebbok')}
            />
            :
            <Text style={styles.text}>{data.facebbok}</Text>
          }
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>{t("twitter")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.twitter}
              placeholder={t("twitter")}
              onChangeText={text => onChangeText(text, 'twitter')}
            />
            :
            <Text style={styles.text}>{data.twitter}</Text>
          }
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>{t("instagram")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.instagram}
              placeholder={t("instagram")}
              onChangeText={text => onChangeText(text, 'instagram')}
            />
            :
            <Text style={styles.text}>{data.instagram}</Text>
          }
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>{t("youtube")}</Text>
          {props.editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              value={data.youtube}
              placeholder={t("youtube")}
              onChangeText={text => onChangeText(text, 'youtube')}
            />
            :
            <Text style={styles.text}>{data.youtube}</Text>
          }
        </View>
      </View>

      <Calendary
        data={data.dateOfBirth}
        config={config}
        open={openSingle}
        close={setopenSingle}
        getChange={getChangeRange}
      />

      <FilterByLocation
        title={""}
        color={color_fifth}
        show={openLocation}
        setShow={setopenLocation}
        getInfo={getLocation}
      />

    </View>
  )
}

export default React.memo(ProfileInfo);


const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 80,
    backgroundColor: color_screen,
  },
  wrapper: {
    paddingTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  group: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "column",
    marginBottom: 5,
  },
  label: {
    textTransform: "capitalize",
    color: color_grey_half,
    fontWeight: "600",
    marginLeft: 5
  },
  text: {
    color: color_grey_dark,
    fontSize: 14,
    fontWeight: "600"
  },
  inputText: {
    paddingHorizontal: 10,
    color: color_grey_dark,
    backgroundColor: "#EAECEE",
    borderRadius: 8
  },
})