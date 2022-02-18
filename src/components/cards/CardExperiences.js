import React, { useState, useEffect } from 'react'
import { Modal, Linking, View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native-gesture-handler'
import ScoreStars from '../stars/ScoreStars.js'
import { extractDate } from '../Logic.js'
import { file_server1 } from '../../../Env.js'
import Compare, { Before, After, DefaultDragger, Dragger } from 'react-native-before-after-slider-v2';
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
} from '../../styles/Colors.js'
import VALORATIONS from '../../services/valorations/index.js'


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


function CardExperiences(props) {
  const { t, i18n } = useTranslation();
  const [ViewMore, setViewMore] = useState(false);
  const [comparison, setcomparison] = useState(false);
  const [position, setposition] = useState(0);
  const comparisonList2 = [
    { "group": 0, "imgB": props.data.imgBefore1, "imgA": props.data.imgAfter1 },
    { "group": 1, "imgB": props.data.imgBefore2, "imgA": props.data.imgAfter2 },
    { "group": 2, "imgB": props.data.imgBefore3, "imgA": props.data.imgAfter3 },
    { "group": 3, "imgB": props.data.imgBefore4, "imgA": props.data.imgAfter4 }
  ]

  const comparisonList = [
    { "group": 0, "imgB": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS79i9lenjaGSqwGRZ0c8bAwZ1k3sW6KhQ3RFGhF9-hAxnDPOIwvI0Ir9hBhurQgfvBg10&usqp=CAU', "imgA": 'https://as01.epimg.net/meristation/imagenes/2021/03/29/noticias/1617015274_359458_1617015305_noticia_normal.jpg' },
    { "group": 1, "imgB": 'https://ichef.bbci.co.uk/news/640/cpsprodpb/15F60/production/_103225998_sunset3.jpg', "imgA": 'https:\/\/cdn.pixabay.com\/photo\/2015\/04\/23\/22\/00\/tree-736885__340.jpg' },
    { "group": 2, "imgB": 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Nelumno_nucifera_open_flower_-_botanic_garden_adelaide.jpg/1200px-Nelumno_nucifera_open_flower_-_botanic_garden_adelaide.jpg', "imgA": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbnG9hl3h7p4J7rjEsKC5-UwSwa5EEKHahdg4SPny8UTW2wm_kMJkQ2H-63LLKT84sZ0c&usqp=CAU' },
    { "group": 3, "imgB": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvjevivFri4EOplc1HqxiJJtg4TDIPvE9ancVM3EtV4NXOvrXnPH_kpxlY38j9NHi3uaM&usqp=CAU', "imgA": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTde3UONDDzdsIkxxQ77OodQS-R5-SAt5Gqvqf1807ww7qpm7ut-oO8XcG5e73P33E7bxg&usqp=CAU' }
  ]


  const [state, setState] = useState({ scrollEnabled: true })
  const onMoveStart = () => {
    setState({ scrollEnabled: false });
  }
  const onMoveEnd = () => {
    setState({ scrollEnabled: true });
  }




  function goToMedic() {
    const data = { id: props.data.id_medic }
    props.goToScreen("MedicsView", data)
  }






  function setpositionPage(value) {
    let page = position + value
    if (page <= -1) { setposition(0) }
    else {
      if (page >= 3) { setposition(3) }
      else {
        setposition(page)
      }
    }
  }

function closeModal (){
  setcomparison(false),
  setposition(0)
}

  return (
    <View style={{
      backgroundColor: "#FFF",
      width: "90%",
      marginVertical: 5,
      borderRadius: 12,
      overflow: "hidden"
    }}>
      <View style={{
        padding: 10,
        flexDirection: "row",
        borderBottomColor: color_grey_light,
        borderBottomWidth: 0.5,
      }}>
        <View style={{ width: "25%", alignItems: "center" }}>
          <Image source={{ uri: `${file_server1}/img/wellezy/users/${props.data.img_client}` }}
            style={{
              width: 80,
              height: 80,
              flex: 1,
              resizeMode: "center"
            }} />
        </View>
        <View style={{ width: "75%", paddingLeft: 15, flexDirection: "column" }}>
          <Text style={{ fontSize: 14, textTransform: "capitalize" }}>{props.data.name_client} {props.data.surname_client}</Text>
          <TouchableOpacity
            onPress={() => goToMedic()}>
            <Text style={{ fontSize: 14, textTransform: "capitalize", color: color_primary }}>{props.data.title_medic}. {props.data.name_medic} {props.data.surname_medic}</Text>
          </TouchableOpacity>
          {props.data.recommended_doctor === 1 &&
            <Icon name="smiling-face-outline" width={30} height={30} fill={color_fifth} />
          }
          <View style={{ flexDirection: "row" }}>
            <ScoreStars stars={props.data.rating_medic} size={22} color={color_primary} />
          </View>
          {/* 
          {props.data.recommended_procedure === 1 &&
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column" }}>
                <Text>{props.data.rating_procedure}</Text>
              </View>
            </View>
          } */}
        </View>
      </View>

      <View
        style={{
          padding: 20,
        }}>
        <Text
          style={{
            color: color_fifth,
            fontWeight: "bold"
          }}>{props.data.title}</Text>
        <Text
          style={{
            color: "#777",
            textAlign: "justify",
            fontSize: 14
          }}
        >{ViewMore === true ? props.data.testimony : props.data.testimony.length > 155 ? ((props.data.testimony.substring(0, 155 - 3)) + '...') : props.data.testimony}</Text>
        <TouchableOpacity onPress={() => setViewMore(!ViewMore)}
          style={{
            marginTop: 5,
            alignSelf: "flex-end",
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: color_grey_half
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: 12,
              color: color_grey_half
            }}>{!ViewMore ? t("seeMore") : t("seeLess")}</Text>
        </TouchableOpacity>
      </View>

      <View style={{display:"none"}}>
        <ScrollView horizontal>
          {
            comparisonList.map((i, key) => {
              return (
                <TouchableOpacity key={key}
                  onPress={() => [
                    setcomparison(true),
                    setposition(i.group)
                  ]}
                  style={{ flexDirection: "row", marginHorizontal: 2 }}>
                  <Image source={{ uri: i.imgB }} style={{ width: 60, height: 60, resizeMode: "cover", backgroundColor: "silver" }} />
                  <Image source={{ uri: i.imgA }} style={{ width: 60, height: 60, resizeMode: "cover", backgroundColor: "silver" }} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={comparison}>
          <Comparison
            position={position}
            before={comparisonList[position].imgB}
            after={comparisonList[position].imgA}
            setpositionPage={setpositionPage}
            closeModal={closeModal}
          />
          {/* <View style={styles.modalWrap}>
            {position > 0 &&
              <TouchableOpacity onPress={() => [setpositionPage(-1)]}
                style={{ ...styles.modalBTNSides, left: 0 }}>
                <Icon name={"arrow-ios-back-outline"} width={30} height={30} fill={color_white} />
              </TouchableOpacity>
            }
            {position < 3 &&
              <TouchableOpacity onPress={() => [setpositionPage(+1)]}
                style={{ ...styles.modalBTNSides, right: 0, }}>
                <Icon name={"arrow-ios-forward-outline"} width={30} height={30} fill={color_white} />
              </TouchableOpacity>
            }
            <View style={{ backgroundColor: "red", marginTop: 20, overflow: "hidden", alignContent: "center", alignItems: "center" }}>
              <Compare
                initial={deviceWidth / 2}
                draggerWidth={50}
                width={deviceWidth - 20}
                onMoveStart={onMoveStart}
                onMoveEnd={onMoveEnd}>
                <Before>
                  <Image source={{ uri: comparisonList[position].imgB }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
                </Before>
                <After>
                  <Image source={{ uri: comparisonList[position].imgA }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
                </After>
                <DefaultDragger />
              </Compare>
            </View>
            <View style={styles.modalFoot}>
              <Text style={styles.modalFootText}>comparacion ({position + 1}/4)</Text>
              <TouchableOpacity onPress={() => [setcomparison(false), setposition(0)]}>
                <Icon name={"close"} width={30} height={30} fill={color_white} />
              </TouchableOpacity>
            </View>
          </View> */}
        </Modal>
      </View>

      <View
        style={{
          borderTopColor: color_grey_light,
          borderTopWidth: 0.5,
          padding: 10,
          marginTop:-5
        }}>
        <Text style={{
          alignSelf: "flex-start",
          color: color_grey_light
        }}>{extractDate(props.data.created_at, 0)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  modalWrap: {
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 999,
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  modalBTNSides: {
    zIndex: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    position: "absolute",
    bottom: 60,
    height: "100%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  modalFoot: {
    backgroundColor: "black",
    width: "100%",
    height: 60,
    bottom: 0,
    position: "absolute",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  modalFootText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 30,
    textTransform: "capitalize"
  }
});
export default CardExperiences;






const Comparison = ({ position, before, after, setpositionPage, closeModal }) => {



  // position={position}
  // before={comparisonList[position].imgB}
  // after={comparisonList[position].imgA}


  return (
    <View style={styles.modalWrap}>

        
  {position > 0 &&
    <TouchableOpacity onPress={() => [setpositionPage(-1)]}
      style={{ ...styles.modalBTNSides, left: 0 }}>
      <Icon name={"arrow-ios-back-outline"} width={30} height={30} fill={color_white} />
    </TouchableOpacity>
  }
  {position < 3 &&
    <TouchableOpacity onPress={() => [setpositionPage(+1)]}
      style={{ ...styles.modalBTNSides, right: 0, }}>
      <Icon name={"arrow-ios-forward-outline"} width={30} height={30} fill={color_white} />
    </TouchableOpacity>
  }



  {/* 

  <View style={{ backgroundColor: "red", marginTop: 20, overflow: "hidden", alignContent: "center", alignItems: "center" }}>
    <Compare
      initial={deviceWidth / 2}
      draggerWidth={50}
      width={deviceWidth - 20}
      onMoveStart={onMoveStart}
      onMoveEnd={onMoveEnd}>
      <Before>
        <Image source={{ uri: comparisonList[position].imgB }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
      </Before>
      <After>
        <Image source={{ uri: comparisonList[position].imgA }} style={{ width: deviceWidth - 20, height: deviceWidth / 2 }} />
      </After>
      <DefaultDragger />
    </Compare>
  </View>


 */}


<View style={styles.modalFoot}>
    <Text style={styles.modalFootText}>comparacion ({position + 1}/4)</Text>
    <TouchableOpacity onPress={() => closeModal()
      //[setcomparison(false), setposition(0)]
    }>
      <Icon name={"close"} width={30} height={30} fill={color_white} />
    </TouchableOpacity>
  </View>


    </View>
  )
}









{/* 
  // const [Load, setLoad] = useState(false);
  // const [Fullscreen, setFullscreen] = useState(false);
  // const [imagenScreen, setimagenScreen] = useState("");
  // const { navigation } = props;
  // function Names() {
  //   // const NameA = props.data.name.split(" ");
  //   // const NameB = props.data.surname.split(" ");
  //   // return NameA[0] + " " + NameB[0];
  // }
  // function fecha() {
  //   // const date = props.data.date.split(" ");
  //   // const fecha = date[0];
  //   // const order = fecha.split("-");
  //   // const fechaOrder = order[2] + "/" + order[1] + "/" + order[0];
  //   // //const hora = date[1];
  //   // return fechaOrder;
  // }
  // function fullscreenImg(data, position) {
  //   // setimagenScreen(data)
  //   // setposition(position)
  //   // setFullscreen(true)
  // }
  // function setImgPosition(e) {
  //   //setposition(position + e)
  // }
  // useEffect(() => {
  //   // if (position === 1) { setimagenScreen(props.data.imgBefore1) }
  //   // if (position === 2) { setimagenScreen(props.data.imgAfter1) }
  //   // if (position === 3) { setimagenScreen(props.data.imgBefore2) }
  //   // if (position === 4) { setimagenScreen(props.data.imgAfter2) }
  //   // if (position === 5) { setimagenScreen(props.data.imgBefore3) }
  //   // if (position === 6) { setimagenScreen(props.data.imgAfter3) }
  //   // if (position === 7) { setimagenScreen(props.data.imgBefore4) }
  //   // if (position === 8) { setimagenScreen(props.data.imgAfter4) }
  // }, [position]);
  /*
  "id": 1,
  "status": 1,
  "code": "234",
  "id_procedure": 9,
  "title": "ww",
  "testimony": "dqefeqf",
  "recommended_doctor": 1,
  "rating_medic": 4,
  "recommended_procedure": 1,
  "rating_procedure": 5,
  "imgBefore1": "",
  "imgBefore2": "",
  "imgBefore3": "",
  "imgBefore4": "",
  "imgAfter1": "",
  "imgAfter2": "",
  "imgAfter3": "",
  "imgAfter4": "",
  "created_at": "2021-07-26 10:26:39",
  "updated_at": "2021-07-26 10:26:39",
  "id_medic": 1,
  "name_medic": "daniel andres",
  "surname_medic": "correa posada",
  "id_client": 1,
  "img_client": "default-user.png",
  "name _client": "angie katherine",
  "surname_client": "acosta henao"
  */}