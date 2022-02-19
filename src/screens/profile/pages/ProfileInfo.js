import React, { useState } from 'react'
import { Linking, StyleSheet, Image, View, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import PhotoUpload from 'react-native-photo-upload'
import { file_server1 } from '../.././../../Env.js'

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
  const [editing, setediting] = useState(true);


  //data: {"adress": null, "city": "", "city_id": null, "country": "", "country_id": null, "created_at": "2021-12-21 14:25:43", "dateOfBirth": null, "distric": "", "email": "flakah@gmail.com", "email_verified_at": "2022-01-06 17:12:54", "facebook": null, "id": 1, "id_perfil": 1, "identificacion": "1123009452", "img": "default-user.png", "instagram": null, "language": "en", "name": "angie katherine", "password": "71f861180d80dca0b49787a44fdf126e", "phone": "3127023197", "rol": "client", "status": 1, "surname": "acosta henao", "twitter": null, "update_at": "2022-01-06 17:12:54", "updated_at": "2021-12-21 14:25:43", "youtube": null}



  console.log("data:", data)

  const link = async (url) => {
    console.log("sitio web")
    await Linking.openURL(url)
  }


  function onChangeText(text, key) {
    setdata({
      ...data,
      [key]: text
    })
  }


  console.log(`${file_server1}/img/wellezy/users/${data.photo_profile}`)
  //photo_profile
  return (
    <View style={styles.wrap}>

      <View style={styles.header}>
        <Text style={styles.title}>Mi perfil</Text>
        <TouchableOpacity style={styles.btn}
          onPress={() => setediting(!editing)}>
          <Icon name={editing ? "close-circle-outline" : "edit-outline"} width={25} height={25} fill={"silver"} />
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>



        {editing ?
          <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                console.log('Image base64 string: ', avatar)
              }
            }}
          >
            <Image style={{ alignSelf: "center", width: 100, height: 100, borderRadius: 100, marginBottom: 20 }}
              resizeMode='cover'
              source={{ uri: `${file_server1}/img/wellezy/users/${data.img}` }}
            />
            <View style={{ position: "absolute", bottom: 15, right: 0, backgroundColor: "white", width: 35, height: 35, borderRadius: 35, alignItems: "center", justifyContent: "center" }}>
              <Icon name={"camera-outline"} width={25} height={25} fill={"silver"} />
            </View>
          </PhotoUpload>
          :
          <View style={{ alignSelf: "center", width: 100, height: 100, borderRadius: 100, marginBottom: 20 }}>
            <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: `${file_server1}/img/wellezy/users/${data.img}` }} />
          </View>
        }







        <View style={styles.group}>
          <Text style={styles.label}>name</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.name}
              placeholder={t("name")}
              onChangeText={text => onChangeText(text, 'name')}
            />
            :
            <Text style={styles.text}>{data.name}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>surname</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.surname}
              placeholder={t("surname")}
              onChangeText={text => onChangeText(text, 'surname')}
            />
            :
            <Text style={styles.text}>{data.surname}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>identificacion</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.identificacion}
              placeholder={t("identificacion")}
              onChangeText={text => onChangeText(text, 'identificacion')}
            />
            :
            <Text style={styles.text}>{data.identificacion}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>phone</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.phone}
              placeholder={t("phone")}
              onChangeText={text => onChangeText(text, 'phone')}
            />
            :
            <Text style={styles.text}>{data.phone}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>email</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.email}
              placeholder={t("email")}
              onChangeText={text => onChangeText(text, 'email')}
            />
            :
            <Text style={styles.text}>{data.email}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>dateOfBirth</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.dateOfBirth}
              placeholder={t("dateOfBirth")}
              onChangeText={text => onChangeText(text, 'dateOfBirth')}
            />
            :
            <Text style={styles.text}>{data.dateOfBirth}</Text>
          }
        </View>








        <View style={styles.group}>
          <Text style={styles.label}>country</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.country}
              placeholder={t("country")}
              onChangeText={text => onChangeText(text, 'country')}
            />
            :
            <Text style={styles.text}>{data.country}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>distric</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.distric}
              placeholder={t("distric")}
              onChangeText={text => onChangeText(text, 'distric')}
            />
            :
            <Text style={styles.text}>{data.distric}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>city</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.city}
              placeholder={t("city")}
              onChangeText={text => onChangeText(text, 'city')}
            />
            :
            <Text style={styles.text}>{data.city}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>adress</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.adress}
              placeholder={t("adress")}
              onChangeText={text => onChangeText(text, 'adress')}
            />
            :
            <Text style={styles.text}>{data.adress}</Text>
          }
        </View>












        <View style={styles.group}>
          <Text style={styles.label}>facebook</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.facebook}
              placeholder={t("facebook")}
              onChangeText={text => onChangeText(text, 'facebook')}
            />
            :
            <Text style={styles.text}>{data.facebook}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>instagram</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.instagram}
              placeholder={t("instagram")}
              onChangeText={text => onChangeText(text, 'instagram')}
            />
            :
            <Text style={styles.text}>{data.instagram}</Text>
          }
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>twitter</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.twitter}
              placeholder={t("twitter")}
              onChangeText={text => onChangeText(text, 'twitter')}
            />
            :
            <Text style={styles.text}>{data.twitter}</Text>
          }

        </View>
        <View style={styles.group}>
          <Text style={styles.label}>youtube</Text>
          {editing ?
            <TextInput
              style={styles.inputText}
              placeholderTextColor={"silver"}
              //secureTextEntry
              value={data.youtube}
              placeholder={t("youtube")}
              onChangeText={text => onChangeText(text, 'youtube')}
            />
            :
            <Text style={styles.text}>{data.youtube}</Text>
          }
        </View>




        {editing &&
          <TouchableOpacity style={styles.btnSave}>
            <Text style={styles.btnText}>save</Text>
          </TouchableOpacity>
        }

      </View>
    </View>
  )
}

export default React.memo(ProfileInfo);

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 60,
    // width: "100%",
    // paddingHorizontal:20,
    backgroundColor: color_screen,
    // alignSelf: "center",
  },
  header: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
    // position:"relative",
    // zIndex:999,
    // margintop:20,
    // marginRight:20
  },
  wrapper: {
    // paddingBottom: 80,
    width: "90%",
    // paddingHorizontal: 20,
    // backgroundColor: "red",
    alignSelf: "center",
  },

  group: {
    // borderColor: "#ccc",
    // borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "column",
    marginBottom: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  label: {
    textTransform: "capitalize",
    color: color_grey_half,
    fontWeight: "600",
    marginLeft: 5
  },
  text: {
    color: color_grey_dark,
    fontSize:14,
    fontWeight:"600"
  },
  inputText: {
    paddingHorizontal: 10,
    color: color_grey_dark,
    backgroundColor: "#EAECEE",
    borderRadius: 8
  },

  btnSave: {
    marginTop: 20,
    minWidth: "80%",
    alignSelf: "center",
    backgroundColor: color_fifth,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12
  },
  btnText: {
    fontWeight: "bold",
    color: color_white
  }
})