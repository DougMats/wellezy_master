import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Image, TouchableOpacity, Button, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTranslation } from 'react-i18next';
import ScoreStars from '../../../stars/ScoreStars.js';
import { file_server1 } from '../../../../../Env'
import { nurses } from '../../../../services/connection.js';
import {
  color_primary,
  color_fifth,
  color_white,
  color_black,
  color_grey_half,
  color_transparent,
  color_star,
  color_grey_light,
  color_grey_dark
} from '../../../../styles/Colors.js';

function CardNurse(props) {
  const { t, i18n } = useTranslation();
  const [viewDescription, setviewDescription] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [Load, setLoad] = useState(false);
  const [successful, setsuccessful] = useState(false);


  async function Delete(data) {
    setLoad(true)
    let send = {
      id: data.id
    }
    const res = await nurses.delete(send)

    if (res === true) {
      setLoad(false);
      setsuccessful(true);
    }
  }

  useEffect(() => {
    if (successful === true) {
      setTimeout(() => {
        setdeleting(false);
        setsuccessful(false);
        AnimateOpacity()
      }, 3000);
    }
  }, [successful]);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const MARGIN = useRef(new Animated.Value(12)).current;

  const AnimateOpacity = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();

    Animated.timing(MARGIN, {
      toValue: -150,
      duration: 1000
    }).start();


  };






  return (
    <Animated.View style={{ ...styles.wrap, opacity: fadeAnim, marginBottom: MARGIN }}>




      <Icon
        name={props.data.status === 1 ? 'eye-outline' : 'eye-off-outline'}
        fill={color_grey_light}
        width={20}
        height={20}
        style={{
          position:"absolute",
          top: 2,
          left:5
        }}
      />







      <View style={styles.head}>
        <View style={styles.wrapperL}>
          <TouchableOpacity onPress={() => props.goToScreen("NurseView", props.data)} style={styles.wrapperLBTB}><Icon name='eye-outline' fill={color_fifth} width={25} height={25} /></TouchableOpacity>
          <TouchableOpacity onPress={() => props.goToEdit(props.data)} style={styles.wrapperLBTB}><Icon name='edit-outline' fill={color_fifth} width={25} height={25} /></TouchableOpacity>
          <TouchableOpacity onPress={() => setdeleting(true)} style={styles.wrapperLBTB}><Icon name='trash-2-outline' fill={color_fifth} width={25} height={25} /></TouchableOpacity>
        </View>
        <View style={styles.wrapperR}>
          <View style={styles.body}>
            <View style={styles.wrapL}>
              {
                props.data.type === 'premium' &&
                <View style={styles.type}>
                  <Icon name='award' fill={color_fifth} width={20} height={20} style={{ right: 5, top: 0 }} />
                  <Text style={styles.typeText}>Premium</Text>
                </View>
              }
              <Image
                style={[styles.img, {
                  borderWidth: props.data.type === 'premium' ? 4 : 0,
                  borderColor: props.data.type === 'premium' ? color_primary : color_transparent
                }]}
                source={{ uri: `${file_server1}/img/wellezy/nurses/${props.data.img}` }}
              />
            </View>
            <View style={styles.wrapR}>
              <Text style={styles.name}>{props.data.title}. {props.data.name} {props.data.surname}</Text>
              <Text style={styles.address}>
                {props.data.city} - {props.data.country}.</Text>
              <View style={{ flexDirection: "row" }}>
                <Icon name="smiling-face-outline" width={25} height={25} fill={color_fifth} />
                <Text style={{ lineHeight: 25, fontSize: 12, marginLeft: 5 }}>{props.data.recommended} personas recomiendan</Text>
              </View>
              <ScoreStars stars={props.data.stars} size={25} color={color_star} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.foot}>






        <Text style={[styles.description]}>
          {viewDescription === true ?
            props.data.description
            :
            props.data.description.length > 105 ?
              ((props.data.description.substring(0, 105 - 3)) + '...')
              :
              props.data.description
          }
        </Text>
        {
          props.data.description.length > 105 &&
          <TouchableOpacity
            style={styles.btnFoot}
            onPress={() => setviewDescription(!viewDescription)}>
            <Text style={styles.btnFootText}>{viewDescription === true ? 'ver menos' : 'ver más'}</Text>
          </TouchableOpacity>
        }
      </View>
      <Modal animationType="slide" transparent={true} visible={deleting}>
        <View style={styles.modal}>
          {!Load && !successful &&
            <TouchableOpacity onPress={() => setdeleting(false)} style={{ alignSelf: "flex-end", marginRight: 20, marginBottom: 10 }}>
              <Icon name='close-circle-outline' width={30} height={30} fill={color_white} />
            </TouchableOpacity>
          }
          <View style={styles.card}>
            {Load === true &&
              <View style={{ paddingVertical: 20, alignItems: "center" }}>
                <ActivityIndicator color={color_primary} size={40} />
                <Text style={{ color: color_primary, marginTop: 10 }}>Eliminando...</Text>
              </View>
            }
            {successful === true &&
              <View style={{ paddingVertical: 20, alignItems: "center" }}>
                <Icon name='checkmark-circle-outline' width={60} height={60} fill={color_primary} />
                <Text style={{ color: color_primary, marginTop: 10 }}>Eliminado exitosamente.</Text>
              </View>
            }
            {!Load && !successful &&
              <>
                <View style={styles.cardHead}>
                  <Icon name='alert-triangle-outline' width={60} height={60} fill="#E74C3C" />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardText1}>Desea eliminar a </Text>
                  <Text style={styles.cardText2}>{props.data.name} {props.data.surname}?</Text>
                </View>
                <View style={styles.cardFoot}>
                  <TouchableOpacity onPress={() => setdeleting(false)} style={{ backgroundColor: "#EAFAF1", borderColor: "green", ...styles.cardFootBTN }}><Text style={styles.cardFootBTNText}>no, cancelar</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => Delete(props.data)} style={{ backgroundColor: "#FDEDEC", borderColor: "#E74C3C", ...styles.cardFootBTN }}><Text style={styles.cardFootBTNText}>si, Eliminar</Text></TouchableOpacity>
                </View>
              </>
            }
          </View>
        </View>
      </Modal>
    </Animated.View>
  )
}

export default React.memo(CardNurse)

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    alignContent: "center",
    alignItems: "center"
  },
  card: {
    overflow: "hidden",
    backgroundColor: color_white,
    width: "90%",
    borderRadius: 10,
    alignItems: "center"
  },
  cardHead: {
    paddingTop: 10
  },
  cardBody: {
    paddingVertical: 10
  },

  cardText1: {
    textAlign: "center",
    fontSize: 14
  },
  cardText2: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold"
  },
  cardFoot: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopColor: "silver",
    borderTopWidth: 0.5,
  },
  cardFootBTN: {
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 12,
  },
  cardFootBTNText: {
    fontSize: 16,
    color: color_grey_dark,
    textTransform: "uppercase"
  },



  wrap: {
    height: null,
    backgroundColor: color_white,
    flexDirection: "column",
    width: "90%",
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 12,
    shadowColor: color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  head: {
    flexDirection: "row",
    width: "100%"
  },
  
  wrapperL: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    backgroundColor: color_fifth,
    justifyContent: "space-around",
    position: "absolute",
    zIndex: 999,
    top: 0,
    right: 0,
    padding: 5
  },
  wrapperLBTB: {
    backgroundColor: color_white,
    borderColor: color_grey_light,
    borderWidth: 0.5,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginBottom: 2
  },


  wrapperR: {
    flexDirection: "column",
    width: "85%",
    minHeight: 120//"100%",
  },
  body: {
    flexDirection: "row"
  },
  wrapL: {
    flexDirection: "column",
    width: "40%",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: "cover"
  },
  type: {
    position: "absolute",
    zIndex: 999,
    bottom: 5,
    height: 25,
    backgroundColor: color_white,
    flexDirection: "row",
    borderColor: color_fifth,
    borderWidth: 2,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  typeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: color_fifth,
    lineHeight: 20
  },
  wrapR: {
    width: "60%",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "column"
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase"
  },
  address: {
    fontSize: 14,
  },
  foot: {
    borderTopColor: color_grey_light,
    borderTopWidth: 0.4,
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  description: {
    margin: 2,
    fontSize: 14,
    textAlign: "justify"
  },
  btnFoot: {
    marginTop: 0,
    marginBottom: 10,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    borderColor: color_grey_half,
    borderWidth: 0.5
  },
  btnFootText: {
    textAlign: "center",
    fontSize: 12,
    color: color_grey_half
  }
});