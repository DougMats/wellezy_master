import React, { useState, useContext, useEffect } from 'react'
import { Modal, Dimensions, Image, TextInput, SafeAreaView, ScrollView, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import { profile } from '../../../services/connection.js';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import RatingSimple from '../../../components/stars/RatingSimple.js'
import CardShare from '../../../components/cards/CardShare.js';
import Compare, { Before, After, DefaultDragger, Dragger } from 'react-native-before-after-slider-v2';

import { file_server1 } from '../../../../Env'
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
  color_screen,
  color_fifth,
} from '../../../styles/Colors'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ProfileShares(props) {
  const { t, i18n } = useTranslation();
  const [Load, setLoad] = useState(true);
  const [newExperience, setnewExperience] = useState(true);
  const [experiencesList, setexperiencesList] = useState([]);
  const [proceduresPerformed, setproceduresPerformed] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    console.log("notifications")
    get()
  }, [props.data]);


  async function get() {
    const shares = await profile.mySharedExperiences(props.data.id, i18n.language)
    setexperiencesList(shares)
    //const performed = await profile.MyProceduresPerformed(props.data.id, i18n.language)
    const performed = await profile.MyProceduresPerformed(props.data.id, "client")
    setproceduresPerformed(performed)

    setLoad(false)
  }

  function experiencesAdd() { }
  function experiencesDel() { }
  function experiencesUpdate() { }

  /*
  if (ProcedureSelected === 0) {
  setmessage("selecciona una experiencia");
  setsaving(false);
  }
  if (ExperienceTitle === null) {
  setmessage("agrega un título a tu experiencia");
  setsaving(false);
  }
  if (ExperienceInfo === null) {
  setmessage("redacta tu historia");
  setsaving(false);
  }
  if (Previewtype1 == false || Previewtype2 == false || Previewtype3 == false || Previewtype4 == false) {
  setmessage("selleciona una vista");
  setsaving(false);
  }
  else {
  let array = {
  'id_user': userDetails.id_client,
  'code_procedure': ProcedureSelected,
  'recommended_doctor': MedicRecommended ? 1 : 0,
  'rating_medic': MedicRatingScore,
  'recommended_procedure': ProcessRecommended ? 1 : 0,
  'rating_procedure': ProcessRatingScore,
  'title': ExperienceTitle,
  'info': ExperienceInfo,
  }
  if (Previewtype1 === true) {
  type = 'Experience';
  response = await saveNewExperience(type, array);
  }
  if (Previewtype2 === true) {
  type = 'Video';
  response = await saveNewExperience(type, array);
  }
  if (Previewtype3 === true) {
  type = 'AfterBefore';
  response = await saveNewExperience(type, array);
  }
  if (Previewtype4 === true) {
  type = 'Testimony';
  response = await saveNewExperience(type, array);
  }
  console.log("3->", response);
  if (response === "successful") {
  setmessage("publicado!");
  setsaving(false);
  }
  }
  */



  return (
    <View style={styles.wrap}>
      <View style={styles.upper}>
        <TouchableOpacity style={{ ...styles.btnUpper, backgroundColor: newExperience ? "#D1D1D1" : color_white }}
          onPress={() => setnewExperience(false)}>
          <Icon name='book-outline' width={20} height={20} fill={newExperience ? color_grey_half : color_black} />
          <Text style={{ ...styles.btnUpperText, color: newExperience ? color_grey_half : color_black }}>Mis publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.btnUpper, backgroundColor: newExperience ? color_white : "#D1D1D1" }}
          onPress={() => setnewExperience(true)}>
          <Icon name='edit-2-outline' width={20} height={20} fill={newExperience ? color_black : color_grey_half} />
          <Text style={{ ...styles.btnUpperText, color: newExperience ? color_black : color_grey_half }}>Publicar</Text>
        </TouchableOpacity>
      </View>

      {Load && <ActivityIndicator size="large" color={color_primary} />}
      {!Load && newExperience === false && <MyShares data={experiencesList} goToScreen={props.goToScreen} />}
      {!Load && newExperience === true && <NewShare page={Page} setPage={setPage} experiencesAdd={experiencesAdd} proceduresPerformed={proceduresPerformed} />}

      {/*
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          </View>
        </Modal>
      */}
    </View>
  )
}
export default React.memo(ProfileShares);
const styles = StyleSheet.create({
  wrap: {

  },
  upper: {
    backgroundColor: color_primary,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnUpper: {
    backgroundColor: color_white,
    padding: 8,
    width: "45%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnUpperText: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  body: {
    backgroundColor: color_white,
  },



  //new
  title: {
    textAlign: "center",
    fontSize: 14,
    color: "#00AFE8"
  },
  group: {
    paddingBottom: 40,
  },
  pageFour: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 150,
    height: 120,
    margin: 5
  },
  previewActive: {
    backgroundColor: "#00AFE8",
    position: "absolute",
    zIndex: 99,
    borderRadius: 15,
    padding: 2,
    right: 5,
  },
  previewImage: {
    width: null,
    height: null,
    resizeMode: "center",
    flex: 1
  },
  previewText: {
    textAlign: "center",
    fontSize: 12,
    color: "#555"
  },
  btnSave: {
    backgroundColor: "red",
    alignSelf: "center"
  },
  btnSaveText: {

  }
})









const NewShare = (props) => {
  // page={Page}
  // setPage={setPage}
  // experiencesAdd={experiencesAdd}
  const [procedureSelected, setprocedureSelected] = useState(null);
  const [previewType, setpreviewType] = useState(1);
  const [MedicRecommended, setMedicRecommended] = useState(false);
  const [ProcessRecommended, setProcessRecommended] = useState(false);
  const [ExperienceTitle, setExperienceTitle] = useState("");
  const [ExperienceInfo, setExperienceInfo] = useState("");
  function GetRatingMedic(v) { console.log("1 GetRatingMedic: ", v) }
  function GetRatingProcess(v) { console.log("2 GetRatingProcess: ", v) }



  return (
    <View style={styles.body}>





      <View style={{
        borderBottomColor: color_grey_half,
        borderBottomWidth:0.5,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
      }}>




        <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }}>
          {props.page > 1 &&
            <TouchableOpacity onPress={() => props.setPage(props.page - 1)}>
              <Icon name={"arrow-ios-back-outline"} width={30} height={30} fill={color_primary} />
            </TouchableOpacity>
          }
        </View>





        <View style={{ width: "70%", flexDirection: "column" }}>
          {props.page === 1 && <Text style={styles.title}>Selecciona tu procedimiento realizado</Text>}
          {props.page === 2 && <Text style={styles.title}>Valídanos</Text>}
          {props.page === 3 && <Text style={styles.title}>Cuéntanos</Text>}
          {props.page === 4 && <Text style={styles.title}>Elige un modo de previsualización</Text>}
          <View style={{ paddingVertical:5, width: "40%",alignSelf:"center", flexDirection: "row", justifyContent:"space-around" }}>
            <Icon name={props.page=== 1 ?"radio-button-on":"radio-button-off-outline"} width={15} height={15} fill={color_primary} />
            <Icon name={props.page=== 2 ?"radio-button-on":"radio-button-off-outline"} width={15} height={15} fill={color_primary} />
            <Icon name={props.page=== 3 ?"radio-button-on":"radio-button-off-outline"} width={15} height={15} fill={color_primary} />
            <Icon name={props.page=== 4 ?"radio-button-on":"radio-button-off-outline"} width={15} height={15} fill={color_primary} />
          </View>
        </View>
        <View style={{ width: "15%", justifyContent: "center", alignItems: "center" }}>
          {procedureSelected !== null && props.page < 4 &&
            <TouchableOpacity onPress={() => props.setPage(props.page + 1)}>
              <Icon name={"arrow-ios-forward-outline"} width={30} height={30} fill={color_primary} />
            </TouchableOpacity>
          }
        </View>
      </View>



























      {props.page === 1 &&
        <View>
          {procedureSelected !== null &&
            <View style={{}}>
              <View style={{
                backgroundColor: color_white,
                marginHorizontal: 15,
                marginVertical: 10,
                padding: 8,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>

                <Text>{procedureSelected.anesthesiologist}</Text>
                <Text>{procedureSelected.created_at}</Text>
                <Text>{procedureSelected.date}</Text>
                <Text>{procedureSelected.hour_end}</Text>
                <Text>{procedureSelected.hour_init}</Text>

                {/*
            
              <Text>{procedureSelected.id}</Text>
              <Text>{procedureSelected.id_category}</Text>
              <Text>{procedureSelected.id_client}</Text>
              <Text>{procedureSelected.id_medic}</Text>
              <Text>{procedureSelected.id_subcategory}</Text>
              <Text>{procedureSelected.id_valoration}</Text>
              <Text>{procedureSelected.id_valoration_scheduled}</Text>
              <Text>{procedureSelected.update_at}</Text>
              */}

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                  }}
                  onPress={() => setprocedureSelected(null)}>
                  <Icon name={"trash-2-outline"} width={30} height={30} fill={"#E74C3C"} />
                </TouchableOpacity>
              </View>
            </View>
          }

          {procedureSelected === null && props.proceduresPerformed.data.map((i, key) => {
            return (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "yellow",
                  borderBottomColor: color_grey_half,
                  borderBottomWidth: 0.5
                }}

                key={key} onPress={() => setprocedureSelected(i)}>
                <Text>{i.anesthesiologist}</Text>
                <Text>{i.created_at}</Text>
                <Text>{i.date}</Text>
                <Text>{i.hour_end}</Text>
                <Text>{i.hour_init}</Text>
                <Text>{i.id}</Text>
                <Text>{i.id_category}</Text>
                <Text>{i.id_client}</Text>
                <Text>{i.id_medic}</Text>
                <Text>{i.id_subcategory}</Text>
                <Text>{i.id_valoration}</Text>
                <Text>{i.id_valoration_scheduled}</Text>
                <Text>{i.update_at}</Text>
              </TouchableOpacity>
            )
          })
          }
        </View>
      }





      {props.page === 2 &&
        <View>
          <View style={{ justifyContent: "center", padding: 10, marginBottom: 10, borderBottomColor: "#00AFE8", borderBottomWidth: 0.5, width: "100%", flexDirection: "row" }}>
            <Text style={{ lineHeight: 35, fontSize: 14, width: "70%" }}>Recomendarias a el médico?</Text>
            <View style={{ width: "30%", flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setMedicRecommended(true)}>
                <Text style={{ backgroundColor: MedicRecommended == true ? "#00AFE8" : "#ccc", marginHorizontal: 4, width: 30, height: 30, fontWeight: "bold", color: "white", textTransform: "uppercase", lineHeight: 28, textAlign: "center", borderRadius: 20 }}>si</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMedicRecommended(false)}>
                <Text style={{ backgroundColor: MedicRecommended == false ? "#00AFE8" : "#ccc", marginHorizontal: 4, width: 30, height: 30, fontWeight: "bold", color: "white", textTransform: "uppercase", lineHeight: 28, textAlign: "center", borderRadius: 20 }}>no</Text>
              </TouchableOpacity>
            </View>
          </View>
          {MedicRecommended === true &&
            <View style={{ justifyContent: "center", padding: 10, marginBottom: 10, borderBottomColor: "#00AFE8", borderBottomWidth: 0.5, width: "100%", flexDirection: "row" }}>
              <RatingSimple getValueRating={GetRatingMedic} />
            </View>}
          <View style={{ justifyContent: "center", padding: 10, marginBottom: 10, borderBottomColor: "#00AFE8", borderBottomWidth: 0.5, width: "100%", flexDirection: "row" }}>
            <Text style={{ lineHeight: 35, fontSize: 14, width: "70%" }}>Recomendarias el tratamiento?</Text>
            <View style={{ width: "30%", flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setProcessRecommended(true)}>
                <Text style={{ backgroundColor: ProcessRecommended == true ? "#00AFE8" : "#ccc", marginHorizontal: 4, width: 30, height: 30, fontWeight: "bold", color: "white", textTransform: "uppercase", lineHeight: 28, textAlign: "center", borderRadius: 20 }}>si</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setProcessRecommended(false)}>
                <Text style={{ backgroundColor: ProcessRecommended == false ? "#00AFE8" : "#ccc", marginHorizontal: 4, width: 30, height: 30, fontWeight: "bold", color: "white", textTransform: "uppercase", lineHeight: 28, textAlign: "center", borderRadius: 20 }}>no</Text>
              </TouchableOpacity>
            </View>
          </View>
          {ProcessRecommended === true &&
            <View style={{ justifyContent: "center", padding: 10, marginBottom: 10, borderBottomColor: "#00AFE8", borderBottomWidth: 0.5, width: "100%", flexDirection: "row" }}>
              <RatingSimple getValueRating={GetRatingProcess} />
            </View>}
          <TouchableOpacity style={styles.btnPrimarySmall} onPress={() => props.setPage(3)}>
            <Text style={styles.textPrimary}>next</Text>
          </TouchableOpacity>
        </View>
      }

      {props.page === 3 &&
        <View>
          <View style={{ borderBottomColor: "#00AFE8", borderBottomWidth: 0.5, marginTop: 10, width: "100%", flexDirection: "column" }}>
            <Text style={{ left: 10 }}>Agregale un titulo a tu experiencia</Text>
            <TextInput style={{ color: "#333333" }} onChangeText={setExperienceTitle} value={ExperienceTitle} placeholder="title" />
          </View>
          <View style={{ borderBottomColor: "#00AFE8", borderBottomWidth: 0.5, marginTop: 10, width: "100%", flexDirection: "column" }}>
            <Text style={{ left: 10 }}>Cuentanos tu experiencia</Text>
            <TextInput multiline={true} style={{ color: "#333333" }} onChangeText={setExperienceInfo} value={ExperienceInfo} placeholder="information ...." />
          </View>
          <TouchableOpacity style={styles.btnPrimarySmall} onPress={() => setStep(4)}>
            <Text style={styles.textPrimary}>next</Text>
          </TouchableOpacity>
        </View>
      }


      {props.page === 4 &&
        <View style={styles.group}>
          <View style={styles.pageFour}>
            <TouchableOpacity onPress={() => setpreviewType(1)} style={styles.preview}>
              {previewType === 1 &&
                <View style={styles.previewActive}>
                  <Icon name='checkmark-circle-outline' fill='white' width={25} height={25} />
                </View>
              }
              <Image source={require('../../../images/default.png')} style={styles.previewImage} />
              <Text style={styles.previewText}>default</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setpreviewType(2)} style={styles.preview}>
              {previewType === 2 &&
                <View style={styles.previewActive}>
                  <Icon name='checkmark-circle-outline' fill='white' width={25} height={25} />
                </View>
              }
              <Image source={require('../../../images/video.png')} style={styles.previewImage} />
              <Text style={styles.previewText}>video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setpreviewType(3)} style={styles.preview}>
              {previewType === 3 &&
                <View style={styles.previewActive}>
                  <Icon name='checkmark-circle-outline' fill='white' width={25} height={25} />
                </View>}
              <Image source={require('../../../images/antesdespues.png')} style={styles.previewImage} />
              <Text style={styles.previewText}>antes & despues</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setpreviewType(4)} style={styles.preview}>
              {previewType === 4 &&
                <View style={styles.previewActive}>
                  <Icon name='checkmark-circle-outline' fill='white' width={25} height={25} />
                </View>}
              <Image source={require('../../../images/testimony.png')} style={styles.previewImage} />
              <Text style={styles.previewText}>testimonio</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnSave} onPress={() => sendExperiense()}>
            <Text style={styles.btnSaveText}>go</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}










const MyShares = (props) => {
  return (
    <View style={{ ...styles.body, paddingTop: 10 }}>
      {props.data.Videos &&
        props.data.Videos.map((i, key) => {
          const Data = <View style={{ backgroundColor: "red", padding: 15 }}></View>
          return (
            <CardShare key={key}
              goToScreen={props.goToScreen}
              date={i.created_at}
              userName={i.name}
              userSurname={i.surname}
              userImg={`${file_server1}/img/wellezy/users/${i.img}`}
              body={Data}
            />)
        })
      }

      {props.data.AfterBefore &&
        props.data.AfterBefore.map((i, key) => {
          const [state, setState] = useState({ scrollEnabled: true })
          const onMoveStart = () => { setState({ scrollEnabled: false }); }
          const onMoveEnd = () => { setState({ scrollEnabled: true }); }
          const Data = <View style={{ flexDirection: "column", padding: 15 }}>
            <Text>{i.nameprocedure}</Text>
            <View style={{ marginTop: 10, overflow: "hidden", alignContent: "center", alignItems: "center" }}>
              <Compare initial={windowWidth / 2} draggerWidth={50} width={windowWidth - 20} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd}>
                <Before>
                  <Image source={{ uri: i.before }} style={{ width: windowWidth - 20, height: windowWidth / 2 }} />
                </Before>
                <After>
                  <Image source={{ uri: i.after }} style={{ width: windowWidth - 20, height: windowWidth / 2 }} />
                </After>
                <DefaultDragger />
              </Compare>
            </View>
          </View>
          return (
            <CardShare key={key}
              goToScreen={props.goToScreen}
              date={i.created_at}
              userName={i.name}
              userSurname={i.surname}
              userImg={`${file_server1}/img/wellezy/users/${i.img}`}
              body={Data}
            />)
        })
      }

      {props.data.Experiences &&
        props.data.Experiences.map((i, key) => {
          const [ViewDescription, setViewDescription] = useState(false);
          const [open, setopen] = useState(false);
          const [position, setposition] = useState(0);
          const [zoom, setzoom] = useState(null);
          const carrusel = [
            { type: "Before", img: i.imgBefore1 },
            { type: "After", img: i.imgAfter1 },
            { type: "Before", img: i.imgBefore2 },
            { type: "After", img: i.imgAfter2 },
            { type: "Before", img: i.imgBefore3 },
            { type: "After", img: i.imgAfter3 },
            { type: "Before", img: i.imgBefore4 },
            { type: "After", img: i.imgAfter4 },
          ]
          function page(v) {
            let _page = position + v
            console.log("_page:", v)
            if (_page < 0) {
              setposition(0)
              setzoom(carrusel[0])
            }
            else {
              if (_page > 7) {
                setposition(7)
                setzoom(carrusel[7])
              }
              else {
                setposition(_page)
                setzoom(carrusel[_page])
              }
            }
          }
          const Data = <View style={{ padding: 15 }}>
            <Text>{i.title}</Text>
            <Text style={{ textAlign: "justify" }}>{
              ViewDescription === false ? i.testimony.length > 110 ? ((i.testimony.substring(0, 110 - 3)) + '...') : i.testimony : i.testimony
            }
            </Text>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", borderColor: color_grey_half, borderWidth: 1, paddingHorizontal: 5, borderRadius: 8 }}
              onPress={() => setViewDescription(!ViewDescription)}
            >
              <Text>{ViewDescription ? "ver menos" : "ver mas"}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <ScrollView horizontal={true}>
                {carrusel.map((i, key) => {
                  return (
                    <TouchableOpacity
                      onPress={() => [setopen(true), setzoom(i)]}
                      style={{
                        marginHorizontal: 2,
                        width: 80,
                        height: 80,
                        overflow: "hidden",
                        borderRadius: 8
                      }}>
                      <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: i.img }} />
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            <Modal animationType="slide" transparent={true} visible={open}>
              {zoom !== null &&
                <View style={{ backgroundColor: "rgba(0,0,0,0.8)", position: "absolute", width: "100%", height: "100%", flex: 1 }}>
                  <View style={{ flexDirection: "row", backgroundColor: "black", paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20 }}>
                    <TouchableOpacity onPress={() => page(-1)} style={{ width: "10%" }}><Icon name="arrow-ios-back-outline" fill={color_white} width={30} height={30} /></TouchableOpacity>
                    <Text style={{ width: "70%", textAlign: "center", color: color_white, lineHeight: 25 }}>{zoom.type} ( {position + 1}/8 )</Text>
                    <TouchableOpacity onPress={() => page(+1)} style={{ width: "10%" }} ><Icon name="arrow-ios-forward-outline" fill={color_white} width={30} height={30} /></TouchableOpacity>
                    <TouchableOpacity style={{ width: "10%" }} onPress={() => setopen(false)}>
                      <Icon name={"close"} width={30} height={30} fill={color_white} />
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: zoom.img }} style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain"
                  }} />
                </View>
              }
            </Modal>
          </View>
          return (
            <CardShare key={key}
              goToScreen={props.goToScreen}
              date={i.created_at}
              userName={i.name}
              userSurname={i.surname}
              userImg={`${file_server1}/img/wellezy/users/${i.img}`}
              body={Data}
            />)
        })
      }

      {props.data.Testimonials &&
        props.data.Testimonials.map((i, key) => {
          const [open, setopen] = useState(false);
          const Data = <View style={{ flexDirection: "column", padding: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{i.title}</Text>
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => props.goToScreen("Process", { id: i.id_procedure })}>
              <Text style={{ color: color_primary }}>* {i.procedure}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => props.goToScreen("MedicsView", { id: i.id_medic })}>
              <Text style={{ color: color_primary }}>* douglas matos</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, textAlign: "justify" }}>{i.testimony}</Text>
            <TouchableOpacity onPress={() => setopen(!open)}>
              <Text>{open ? "ver menos" : "ver mas"}</Text>
            </TouchableOpacity>
            {/* 
        "recommended_procedure": 1,
        "rating_procedure": 5,
        "recommended_doctor": 1,
        "rating_medic": 5, */}
          </View>
          return (
            <CardShare key={key}
              goToScreen={props.goToScreen}
              date={i.created_at}
              userName={i.name}
              userSurname={i.surname}
              userImg={`${file_server1}/img/wellezy/users/${i.img}`}
              body={Data}
            />)
        })
      }
    </View>
  )
}