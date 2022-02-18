import React, { useState, useContext, createRef, useEffect } from 'react';
import {
  Text, View, Dimensions, TouchableOpacity, StatusBar, Image, Modal,
  StyleSheet, TouchableHighlight, InteractionManager, findNodeHandle,
  ActivityIndicator, ImageBackground
}
  from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeadService from '../../components/HeadService'
import Menu from '../../components/Menu'
import UserContext from '../../contexts/UserContext'
import { colorPrimary, colorSecundary } from '../../src/images/css/Global'
import Compare, { Before, After, DefaultDragger, Dragger } from 'react-native-before-after-slider-v2';
import { BlurView } from '@react-native-community/blur'
import axios from 'axios'
import { serverCrm, base_url, file_server1 } from '../../Env'
import { Icon } from 'react-native-eva-icons';
import HTML from 'react-native-render-html';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-simple-toast';
import imagesWizardData from '../../data/imagesWizardData'
import PhotoUpload from 'react-native-photo-upload'
import { useTranslation } from 'react-i18next';



function Control(props) {
  let PhotosUplaods = []

  const { t, i18n } = useTranslation();
  const { navigation } = props;
  const { UserDetails, setUserDetails } = useContext(UserContext)

  const tintColor = ['#ffffff', '#000000'];
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const userDetails = React.useContext(UserContext);
  const backgroundImageRef = createRef();
  const category_key = props.Data.father;
  
  const [modalVisible, setModalVisible] = useState(false);
  const [Blur, setBlur] = React.useState(0)
  const [BtnDisable, setBtnDisable] = React.useState(false)
  const [Load, setLoad] = React.useState(false)
  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('dark')
  const [fileToUpload, setFileToUpload] = React.useState(false)
  const [state, setState] = useState({ scrollEnabled: true })
  const [selecting, setSelecting] = useState(false)
  const [dataSlots, setdataSlots] = useState(imagesWizardData)
  const [activeItem, setActiveItem] = useState({category_key,item_key: false});
  const [successful, setsuccessful] = useState(false);
  const [mensaje, setmensaje] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [DateSelected, setDateSelected] = useState("Add a date");
  const [BackgroundBtn, setBackgroundBtn] = useState(colorPrimary);

  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }

  React.useEffect(() => {
    console.log(props.Data.father, "params")
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setViewRef(
          findNodeHandle(backgroundImageRef.current)
        );
      }, 500);
    });
  }, [])

  useEffect(() => {
    let images = []
    images = dataSlots[category_key].images
    let data = [];
    for (let i = 0; i <= images.length - 1; i++) {
      images[i].replace = null
    }
    setdataSlots({
      ...dataSlots,
      [category_key]: { images: [...images] }
    })
  }, [])

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDateSelected(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    setBackgroundBtn("green")
  };

  function sendForm() {
    console.log("sending...", PhotosUplaods.length)
    if (PhotosUplaods.length > 0) {
      let msj
      let data = {
        "id_cliente": props.id_client,
        "id_subcategory": props.Data.id,
        "photos": PhotosUplaods,
        "id_medic": props.id_Medic
      }
      setBtnDisable(true)
      setLoad(true)
      axios.post(base_url(serverCrm, `wellezy/cotization/create`), data).then(function (response) {
        msj = response.data
        setBtnDisable(false)
        setLoad(false)
        setModalVisible(false)
        //Toast.show("The request was sent correctly, you will be contacted by an advisor")
      })
        .catch(function (error) {
          msj = error.data;
          // Toast.show(error.response.data)
          setBtnDisable(false)
          setLoad(false)
        })
        .then(function () { });
      console.log(msj)
      console.log("... ... ...")
      if (msj === true) {
        console.log("open show")
        setsuccessful(true);
      }
    }
    else {
      Toast.show("It is necessary to upload the photos")
      return false;
    }
  }

  function selectItem(item_key) {
    console.log(item_key)
    setActiveItem({
      category_key,
      item_key
    })
    setSelecting(true)
  }

  function Appointment() {
    if (userDetails.userDetails.id_client != null) {
      setModalVisible(true)
    } else {
      goToScreen("Login")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setsuccessful(false)
    }, 10000);
  }, [successful]);


  const RequerimentItem = (props) => {
    return (
      <View style={styles.gridElement}>
        <PhotoUpload onPhotoSelect={avatar => {
          if (avatar) {
            let number = Math.random()
            PhotosUplaods = [
              ...PhotosUplaods,
              avatar
            ]
          }
        }
        }>
          <Image style={{
            paddingVertical: 30,
            width: 200,
            height: 150,
          }}
            source={{ uri: (!props.replace) ? props.resource : props.replace }} />
          <Text style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 5,
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 'bold',
            flex: 2,
            left: "30%",
            top: 15,
            position: 'absolute'
          }}
          >{props.label} </Text>
        </PhotoUpload>
      </View>)
  }



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.Modal}
    >
      <View style={{ ...styles.modalView }}>
        <BlurView
          viewRef={viewRef}
          style={styles.blurViewStyle}
          blurRadius={1}
          blurType={blurType}
          overlayColor={'rgba(0, 0, 1, .6)'}
        />
        <View style={{ position: "absolute", right: 20, top: 40, zIndex: 999 }}>
          <TouchableOpacity onPress={() => props.ShowModal(!props.Modal)}>
            <Icon name="close-outline" width={30} height={30} fill="#FFF" />
          </TouchableOpacity>
        </View>
        <ScrollView>

          <View style={{ alignContent: "center", alignItems: "center", width: "100%" }}>
            <View style={{
              marginTop: 40,
              marginBottom: 10,
              alignSelf: "flex-start",
              flexDirection: "row"
            }}>
              <Text style={{
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
                fontSize: 18,
                color: "white"
              }}>{t("ScheduleAppointment")}</Text>
            </View>
            <View style={{ width: "90%", marginTop: 20, borderRadius: 10, backgroundColor: "#fff" }}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={new Date()}
              />
              <View style={styles.content}>
                {
                  dataSlots[category_key].images.map((item, key) => {
                    return <RequerimentItem
                      key={key}
                      category_key={category_key}
                      item_key={key}
                      label={item.label}
                      resource={item.resource}
                      replace={item.replace}
                    />
                  })
                }
              </View>
            </View>
            <TouchableOpacity style={styles.modalBtn} onPress={() => { sendForm(); }} disabled={BtnDisable}>
              {Load && <ActivityIndicator size="small" color="#fff" />}
              {!Load && <Icon name="calendar-outline" width={20} height={20} fill="#FFF" />}
              {!Load && <Text style={styles.modalBtnText}>{t("ScheduleAppointment")}</Text>}
            </TouchableOpacity>
            <View style={{ height: 60 }}></View>
          </View>
          {/* 
          {
            successful &&
            <View style={{
              justifyContent: "center", alignContent: "center", alignItems: "center",
              width: "100%", height: "100%", position: "absolute", zIndex: 999, backgroundColor: "rgba(0,0,0,0.8)"
            }}>
              <View style={{ alignContent: "center", alignItems: "center", backgroundColor: "#fff", width: "70%", height: 200, borderRadius: 20, justifyContent: "center", padding: 15 }}>
                <Icon name="checkmark-circle-outline" width={60} height={60} fill="orange" />
                <Text style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}>
                  La solicitud se envió correctamente, un asesor se comunicará con usted
            </Text>
              </View>
            </View>
          } */}
        </ScrollView>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({

  modalView:{},

  blurViewStyle:{
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,},


  content:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 5
  },


  modalBtn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#00AFE8",
    width: "70%",
    padding: 10,
    borderRadius: 20
  },
  modalBtnText: {
    marginLeft: 15,
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700"
  },

  gridElement: {
    width: '46%',
    height: null, //null
    marginHorizontal: '2%',
    marginVertical: '3%',
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 0.5,
    overflow: 'hidden'
  },
});

// const stylesService = StyleSheet.create({
//   blurViewStyle: {
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     padding: 5
//   },
//   card_image: {
//     justifyContent: "flex-end",
//     marginRight: 7,
//     marginLeft: 3,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,
//     elevation: 7
//   },
//   lurViewStyle: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     right: 0,
//   },
//   openButton: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     width: 160
//   },
//   gridElement: {
//     width: '48%',
//     height: 200,
//     backgroundColor: 'white',
//     borderRadius: 15,
//     marginBottom: 15,
//     borderRadius: 15,
//     overflow: 'hidden'
//   },
// });

// const stylesHead = StyleSheet.create({
//   content_head: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "white",
//     padding: 20,
//     borderBottomEndRadius: 20,
//     borderBottomStartRadius: 20,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.29,
//     shadowRadius: 4.65,
//     elevation: 7
//   },
//   content_avatar: {
//     flexDirection: "row",
//     justifyContent: "space-between"
//   },
//   imgAvatar: {
//     width: 50,
//     height: 50,
//     resizeMode: "contain",
//     marginRight: 10
//   },
//   btn: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     padding: 10,
//     width: "50%",
//     alignItems: "center",
//     borderRadius: 6,
//     borderColor: "white",
//     borderWidth: 1
//   },
//   overlay: {
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     width: "100%",
//     height: "100%",
//     justifyContent: "flex-end",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20
//   },
// });



export default Control;