import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, Image, TouchableOpacity, StyleSheet, Button, Dimensions, Animated } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../../../contexts/UserContext'
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import About from '../About';
import { InitialsName } from '../Logic.js';
import { file_server1 } from '../../../Env.js';
import {
  color_star,
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
  color_screen
} from '../../styles/Colors.js'





import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Menu(props) {
  const WIDTH = props.width;
  const { userDetails, setUserDetails } = useContext(UserContext)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeWidth = useRef(new Animated.Value(WIDTH)).current;
  const [AboutModal, setAboutModal] = useState(false);

  function closet() {
    fadeOut()
    small()
    setTimeout(() => {
      props.action(false);
    }, 1000);
  }

  const logOut = async () => {
    console.log("good bye")
    try {
      await AsyncStorage.removeItem('@Passport');
      setUserDetails({
        id: null,
        name: null,
        surname: null,
        rol: null,
        email: null,
        language: null,
        password: null,
        phone: null,
        photo_profile: null
      })

      props.action(false);
      props.goToScreen("Home")
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (props.show === true) {
      fadeIn();
      big();
    }
  }, [props.show]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const big = () => {
    Animated.timing(fadeWidth, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const small = () => {
    Animated.timing(fadeWidth, {
      toValue: WIDTH,
      duration: 500,
      useNativeDriver: false
    }).start();
  };


  function Go(screen) {
    closet()
    setTimeout(() => {
      props.goToScreen(screen)
    }, 500);
  }


  return (
    <View style={[styles.wrapper, { display: props.show === true ? "flex" : "none" }]}>
      <Animated.View style={[styles.wrap, { width: WIDTH, transform: [{ translateX: fadeWidth }] }]}>
        <ScrollView>
        
        
          <LinearGradient colors={[color_secondary, color_primary]} style={styles.head}>
           
            <TouchableOpacity onPress={() => closet()} style={{ position: "absolute", zIndex: 999, top: 20, right: 10 }}>
              <Icon name='close-outline' fill={"white"} width={30} height={30} />
            </TouchableOpacity>




            <View style={[styles.avatar, { width: WIDTH / 3, height: WIDTH / 3, borderRadius: WIDTH / 2 }]}>
              {userDetails.photo_profile !== "" &&
                <Image
                  style={styles.img}
                  source={{ uri: `${file_server1}/img/wellezy/users/${userDetails.photo_profile}` }}
                />
              }

              {userDetails.photo_profile === "" &&
                <Text style={{
                  textTransform: "uppercase",
                  backgroundColor: color_star,
                  width: WIDTH / 2,
                  height: WIDTH / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  lineHeight: 130,
                  fontSize: 70,
                  fontWeight: "bold",
                }} >
                  {InitialsName(userDetails.name, userDetails.surname)}
                </Text>
              }
            </View>

            <Text style={styles.name}>{userDetails.surname} {userDetails.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center"}}>
            <Icon name='email-outline' fill={color_white} width={18} height={18} />
              <Text style={styles.email}>{userDetails.email}</Text>
            </View>
          </LinearGradient>




          <View style={{ paddingBottom: 40 }}>

            <TouchableOpacity
              onPress={() => Go("Profile")}
              style={styles.opt}>
              <Icon name='person-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Mi Perfil</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='bell-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Notificaciones</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => Go("ClinicList")}
              style={styles.opt}>
              <Icon name='video-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Clinic List</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Go("Sala")}
              style={styles.opt}>
              <Icon name='video-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Video llamada</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='folder-add-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Mis Valoraciones</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='shopping-cart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Carrito de compras</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => Go("MedicsList")}
              style={styles.opt}>
              <Icon name='activity-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Lista de Médicos</Text>
            </TouchableOpacity>
            {/* 
            <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='heart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Mis Favoritos</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='keypad-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Procedimientos</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => Go("DashboardFly")}
              style={styles.opt}>
              <Icon name='briefcase-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Vuelos</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='calendar-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Mis recervaciones</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => Go("DashboardServices")}
              style={styles.opt}>
              <Icon name='bookmark-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Servicios</Text>
            </TouchableOpacity>


            {/* 
            <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='gift-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Ofertas / especiales</Text>
            </TouchableOpacity> */}


            {/* <TouchableOpacity
              onPress={() => Go("Configurations")}
              style={styles.opt}>
              <Icon name='settings-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Configuraciones</Text>
            </TouchableOpacity> */}





            {/* <TouchableOpacity
              style={styles.opt} onPress={() => setAboutModal()}>
              <Icon name='question-mark-circle-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Acerca de</Text>
            </TouchableOpacity> */}



            <TouchableOpacity
              style={styles.opt} onPress={() => Go("PurchaseOrder")}>
              <Icon name='shopping-cart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Orden de compra</Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={styles.opt} onPress={() => Go("PaymentCart")}>
              <Icon name='shopping-cart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Payment Cart</Text>
            </TouchableOpacity>




            




            <TouchableOpacity
              style={styles.opt} onPress={() => logOut()}>
              <Icon name='power-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.optText}>Cerrar Sesión</Text>
            </TouchableOpacity>


          </View>
        </ScrollView>
      </Animated.View>

      <About
        open={AboutModal}
        close={setAboutModal}
      />

      <TouchableWithoutFeedback onPress={() => closet()}>
        <Animated.View style={[styles.back, { opacity: fadeAnim }]}></Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: windowWidth,
    height: windowHeight,
    position: "absolute",
    zIndex: 999999,
    flex: 1,
    top: 0,
    right: 0,
  },
  wrap: {
    backgroundColor: color_white,
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    flexDirection: "column",
    height: "100%",
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver",
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: color_white,
    overflow: "hidden",
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  name: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    color: color_white,
  },
  email: {
    lineHeight:15,
    marginLeft:5,
    color: color_white,
    fontSize: 14,
  },
  opt: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: color_grey_light,
    flexDirection: "row",
    alignItems: "center"
  },
  optText: {
    marginLeft: 15,
    fontWeight: "400",
    fontSize: 14,
    color: color_grey_dark
  },
  back: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
  }
});

export default Menu;