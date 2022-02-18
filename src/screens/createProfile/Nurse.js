import React, { useState, useEffect } from 'react';
import { RefreshControl, Dimensions, ActivityIndicator, SafeAreaView, StatusBar, ScrollView, View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import LinearGradient from 'react-native-linear-gradient';
import Head from '../../components/generic/Head';
import Menu from '../../components/generic/Menu';
import MenuVertical from '../../components/generic/MenuVertical.js';
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
import PhotoUpload from 'react-native-photo-upload'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function CreateProfileNurse(props) {
  const { t, i18n } = useTranslation();

  const [images, setimages] = useState([]);

  const [premium, setpremium] = useState(false);



  const [data, setdata] = useState({
    title: "",
    img: "",
    type: "",
    description: "",
    // rating: "",
    // basedOn: "",
    // stars: "",
    // recommended: "",
    gender: "",
    age: "",
    status: "",

  });



  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    console.log("first time at screen nurse")
    //get()
  }, [randomCode]);

  function onChangeText(text, key) {
    setdata({
      ...data,
      [key]: text
    })
  }

  async function save() {

    // id_profile: 0,
    // id_doctor: 0,
    // name: "",
    // surname: "",
    // country_id: "",
    // country: "",
    // city_id: "",
    // city: "",
    // distrito: "",
    // adress: "",
    // title: "",
    // img: "",
    // type: "",
    // description: "",
    // // rating: "",
    // // basedOn: "",
    // // stars: "",
    // // recommended: "",
    // gender: "",
    // age: "",
    // status: ""



  }



  // async function upLoadFileGallery() {
  //   try {
  //     const res = await DocumentPicker.pickMultiple({ type: [DocumentPicker.types.images] })
  //     setimages(res)
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       props.clearFilesAdjunts()
  //     } else {
  //       throw err
  //     }
  //   }
  // }





  return (
    <SafeAreaView style={{ backgroundColor: color_fifth, flex: 1 }}>
      <StatusBar backgroundColor={color_fifth} barStyle='light-content' translucent={false} />{/*translucent 'default' 'light-content' 'dark-content'*/}
      <SafeAreaView style={{
        alignItems: "center", justifyContent: "center", flex: 1
      }}>


        <View style={{ backgroundColor: "rgba(255,255,255,0.2)", width: "90%", alignSelf: "center", padding: 10 }}>


          {/* 
        camera-outline
        image-outline
        folder-outline */}


          {
            images.length === 0 ?
              <PhotoUpload
                style={{
                  borderColor: color_white,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  width: "60%",
                  marginBottom: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  borderRadius: 12,
                  flexDirection: "column"
                }}>
                <Icon name="image-outline" width={50} height={50} fill={color_white} />
                <Text style={{ color: color_white }}>Load pictures</Text>
              </PhotoUpload>
              :
              <View style={{
                flexDirection: 'row',
                width: "100%",
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexWrap: 'wrap'
              }}>
                {images.map((i, key) => {
                  return (
                    <TouchableOpacity style={{
                      width: windowWidth / 5, height: windowWidth / 5, borderRadius: 8, backgroundColor: "white", marginVertical: 4
                    }}>
                      <Text>{key}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
          }





          <View style={styles.rowInput}>
            <Text style={styles.inputText}>CreateProfileNurse</Text>
            <TextInput
              style={styles.input}
              value={data.description}
              placeholder={t("description")}
              placeholderTextColor={color_grey_dark}
              // keyboardType={'email-address'}
              //editable={editable}
              onChangeText={text => onChangeText(text, 'description')} />
          </View>
        </View>









        {/* 
        <View style={{ flexDirection: "row" }}>
          <Text>Premium</Text>
          <TouchableOpacity onPress={() => setpremium(!premium)}>
            <Icon name={premium ? "radio-button-on" : "radio-button-off"} width={30} height={30} fill={premium ? color_grey_half : color_fifth} />
          </TouchableOpacity>
        </View>
 */}

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>{t("save")}</Text>
        </TouchableOpacity>


      </SafeAreaView>
      <View style={{ ...styles.diagonal, backgroundColor: "rgba(0,0,0,0.1)" }}></View>
    </SafeAreaView>
  )
}
export default CreateProfileNurse;

const styles = StyleSheet.create({


  rowInput: {
    width: "90%",
    alignSelf: "center",

    flexDirection: "column"
  },
  inputText: {
    color: color_white,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "100%",
    borderRadius: 20
  },



  //   const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

  btn: {
    marginTop: 20,
    alignSelf: "center",
    borderColor: color_white,
    borderWidth: 1,
    paddingHorizontal: 60,
    paddingVertical: 5,
    borderRadius: 12,
  },
  btnText: {
    color: color_white,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize"
  },


  diagonal: {
    position: "absolute",
    zIndex: -1,
    width: "200%",
    height: windowHeight / 1.5,
    bottom: "-10%",
    left: -50,
    transform: [{ rotateZ: "350deg" }]
  },
})