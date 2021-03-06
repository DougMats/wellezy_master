import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Animated, View, Text, TouchableOpacity, Button } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import IconSVG from '../../svg/icon_svg'
import UserContext from '../../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage'
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
  color_transparent
} from '../../styles/Colors'

function Menu(props) {
  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const { userDetails } = React.useContext(UserContext);
  const IconSize = 28
  const activeColor = "rgba(0,175,232,0.1)"

  function goToScreen(screen) {
    props.props.navigation.navigate(screen, { randomCode: Math.random() })
  }

  function goToScreenSala(screen, e) {
    setOption(e)
    let key_conference = ""
    props.props.navigation.navigate(screen, { randomCode: Math.random(), key_conference })
  }

  const alert = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(alert, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
    setShow(true);
  };

  return (
    <View style={styles.wrap}>
      {/* 
      <TouchableOpacity onPress={() => { goToScreen("Reservation") }}
        style={[styles.opt, { width: props.option === 1 ? null : 40, backgroundColor: props.option === 1 ? activeColor : color_transparent }]}>
        <Icon name='home-outline' width={IconSize} height={IconSize} fill={color_primary} />
        <Text style={styles.text}>Reservation</Text>
      </TouchableOpacity> 
 */}

      <TouchableOpacity onPress={() => { goToScreen("Dashboard") }}
        style={[styles.opt, { width: props.option === 1 ? null : 40, backgroundColor: props.option === 1 ? activeColor : color_transparent }]}>
        <Icon name='home-outline' width={IconSize} height={IconSize} fill={color_primary} />
        <Text style={styles.text}>home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { goToScreen("Profile") }}
        style={[styles.opt, { width: props.option === 2 ? null : 40, backgroundColor: props.option === 2 ? activeColor : color_transparent }]}>
        <Icon name='person-outline' width={IconSize} height={IconSize} fill={color_primary} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { goToScreen("DashboardServices") }}
        style={[styles.opt, { width: props.option === 3 ? null : 40, backgroundColor: props.option === 3 ? activeColor : color_transparent }]}>
        {props.alert === 3 &&
          <Animated.View style={{
            transform: [{ translateX: alert }],
            position: "absolute",
            zIndex: 9,
            top: 5,
            left: 5,
          }}>
            <Icon name='alert-circle' width={20} height={20} fill={"red"} />
          </Animated.View>
        }
        <Icon name='briefcase-outline' width={IconSize} height={IconSize} fill={color_primary} />
        <Text style={styles.text}>Services</Text>
      </TouchableOpacity>


      



      {userDetails.rol === "client" &&
        <TouchableOpacity onPress={() => { goToScreen("MedicsList") }}
          style={[styles.opt, { width: props.option === 4 ? null : 40, backgroundColor: props.option === 4 ? activeColor : color_transparent }]}>
          <IconSVG name='medic' width={IconSize} height={IconSize} fill={color_primary} />
          <Text style={styles.text}>M??dicos</Text>
        </TouchableOpacity>
      }


{/* 
      {userDetails.rol === "client" &&
        <TouchableOpacity onPress={() => { goToScreen("ClinicList") }}
          style={[styles.opt, { width: props.option === 4 ? null : 40, backgroundColor: props.option === 4 ? activeColor : color_transparent }]}>
          <Icon name='activity-outline' width={IconSize} height={IconSize} fill={color_primary} />
          <Text style={styles.text}>Cl??nicas</Text>
        </TouchableOpacity>
      } */}




      {userDetails.rol !== "service" &&
        <TouchableOpacity onPress={() => { goToScreen("Sala") }}
          style={[styles.opt, { width: props.option === 5 ? null : 40, backgroundColor: props.option === 5 ? activeColor : color_transparent }]}>
          {props.alert === 5 &&
            <Animated.View style={{
              transform: [{ translateX: alert }],
              position: "absolute",
              zIndex: 9,
              top: 5,
              left: 5,
            }}>
              <Icon name='alert-circle' width={10} height={10} fill={"red"} />
            </Animated.View>
          }
          <Icon name='video-outline' width={IconSize} height={IconSize} fill={color_primary} />
          <Text style={styles.text}>Meet</Text>
        </TouchableOpacity>
      }
    </View>
  )




}
export default Menu;
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: color_white,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
  },

  opt: {
    height: 40,
    borderRadius: 40,
    margin: 2,
    flexDirection: "row",
    padding: 5,
    overflow: "hidden"
  },
  text: {
    textTransform: "capitalize",
    lineHeight: 30,
    fontWeight: "700",
    fontSize: 16,
    marginHorizontal: 8,
    color: color_primary
  }
})