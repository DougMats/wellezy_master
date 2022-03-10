import React, { useState, useRef, useContext, useEffect } from 'react';
import { ScrollView, View, Text, TouchableWithoutFeedback, Image, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../../../contexts/UserContext'
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import About from '../About';
import { InitialsName } from '../Logic.js';
import { file_server1 } from '../../../Env.js';
import { color_primary, color_secondary, color_white, color_grey_half } from '../../styles/Colors.js'
import styles from '../../styles/styles.js'
import IconSvg from '../../cvg/icon_svg.js'

function Menu(props) {
  const WIDTH = props.width;
  const { userDetails, setUserDetails } = useContext(UserContext)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeWidth = useRef(new Animated.Value(WIDTH)).current;
  const [AboutModal, setAboutModal] = useState(false);

  const rol = userDetails.rol



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

  function Go(screen, data) {
    closet()
    setTimeout(() => {
      props.goToScreen(screen, data)
    }, 500);
  }


  return (
    <View style={[styles.sidebar, { display: props.show === true ? "flex" : "none" }]}>
      <Animated.View style={[styles.sidebarContained, { width: WIDTH, transform: [{ translateX: fadeWidth }] }]}>
        <ScrollView scrollEventThrottle={16}>
          <LinearGradient colors={[color_secondary, color_primary]} style={styles.sidebarHead}>
            <TouchableOpacity onPress={() => closet()} style={styles.sidebarHeadBtnUp}>
              <Icon name='close-outline' fill={"white"} width={30} height={30} />
            </TouchableOpacity>

            <View style={[styles.sidebarHeadAvatar, { width: WIDTH / 3, height: WIDTH / 3, borderRadius: WIDTH / 2 }]}>
              {userDetails.photo_profile !== "" &&
                <Image
                  style={styles.sidebarHeadAvatarImg}
                  source={{ uri: `${file_server1}/img/wellezy/users/${userDetails.photo_profile}` }}
                />
              }

              {userDetails.photo_profile === "" &&
                <Text style={{ ...styles.sidebarHeadTitle, width: WIDTH / 2, height: WIDTH / 2 }}>
                  {InitialsName(userDetails.name, userDetails.surname)}
                </Text>
              }

            </View>
            <Text style={styles.sidebarHeadName}>{userDetails.surname} {userDetails.name}</Text>
            <View style={styles.sidebarHeadEmailWrap}>
              <Icon name='email-outline' fill={color_white} width={18} height={18} />
              <Text style={styles.sidebarHeadEmail}>{userDetails.email}</Text>
            </View>

            {/* <Text>{rol}</Text> */}

          </LinearGradient>
          <View style={styles.sidebarBody}>
            <TouchableOpacity
              onPress={() => Go("Profile", 1)}
              style={styles.sidebarbodyLabel}>
              <Icon name='person-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Mi Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Go("ClinicList", null)}
              style={styles.sidebarbodyLabel}>
              <Icon name='video-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Clinic List</Text>
            </TouchableOpacity>





            {rol === "medic" &&
              <TouchableOpacity
                style={styles.sidebarbodyLabel} onPress={() => Go("ManageOrders", null)}>
                <Icon name='list-outline' fill={color_grey_half} width={30} height={30} />
                <Text style={styles.sidebarbodyLabelText}>Manage Orders</Text>
              </TouchableOpacity>
            }








            <TouchableOpacity
              onPress={() => Go("Sala", null)}
              style={styles.sidebarbodyLabel}>
              <Icon name='video-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Video llamada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Go("MedicsList", null)}
              style={styles.sidebarbodyLabel}>
              <Icon name='activity-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Lista de Médicos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Go("DashboardFly", null)}
              style={styles.sidebarbodyLabel}>
              <Icon name='briefcase-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Vuelos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Go("DashboardServices", null)}
              style={styles.sidebarbodyLabel}>
              <Icon name='bookmark-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarbodyLabel} onPress={() => Go("PurchaseOrder", null)}>
              <Icon name='shopping-cart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Orden de compra</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarbodyLabel} onPress={() => Go("PaymentCart", null)}>
              <Icon name='shopping-cart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Payment Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarbodyLabel} onPress={() => logOut()}>
              <IconSvg name='power-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Cerrar Sesión</Text>
            </TouchableOpacity>









            {/* <TouchableOpacity
              onPress={() => Go("text", null)}
              style={styles.sidebarbodyLabel}>
              <Icon name='bell-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Notificaciones</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.sidebarbodyLabel}>
              <Icon name='folder-add-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Mis Valoraciones</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.sidebarbodyLabel}>
              <Icon name='shopping-cart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Carrito de compras</Text>
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.sidebarbodyLabel}>
              <Icon name='heart-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Mis Favoritos</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.sidebarbodyLabel}>
              <Icon name='keypad-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Procedimientos</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.sidebarbodyLabel}>
              <Icon name='calendar-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Mis recervaciones</Text>
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.sidebarbodyLabel}>
              <Icon name='gift-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Ofertas / especiales</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => Go("Configurations")}
              style={styles.sidebarbodyLabel}>
              <Icon name='settings-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Configuraciones</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={styles.sidebarbodyLabel} onPress={() => setAboutModal()}>
              <Icon name='question-mark-circle-outline' fill={color_grey_half} width={30} height={30} />
              <Text style={styles.sidebarbodyLabelText}>Acerca de</Text>
            </TouchableOpacity>
            <About open={AboutModal} close={setAboutModal}/> */}


          </View>
        </ScrollView>
      </Animated.View>


      <TouchableWithoutFeedback onPress={() => closet()}>
        <Animated.View style={[styles.sidebarBack, { opacity: fadeAnim }]}></Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Menu;