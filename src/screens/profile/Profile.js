import React, { useState, useContext, useEffect } from 'react'
import { RefreshControl, Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import UserContext from '../../../contexts/UserContext'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage'
import { Icon } from 'react-native-eva-icons';
import IconSvg from '../../svg/icon_svg.js';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
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
} from '../../styles/Colors'
import { profile, notifications } from '../../services/connection.js';
import { file_server1 } from '../../../Env'
import Head from './components/Head.js'
import HorizontalMenu from './components/HorizontalMenu.js'

import ProfileInfo from './pages/ProfileInfo.js';
import ProfileConfig from './pages/ProfileConfig.js';
import ProfileNotifications from './pages/ProfileNotifications.js';

import ProfileFavorites from './pages/ProfileFavorites.js';
import ProfileShares from './pages/ProfileShares.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fixed = (Dimensions.get('window').width / 2) - 50;

function Profile(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [Page, setPage] = useState(1);
  const [editing, setediting] = useState(false);
  const [saveEditing, setsaveEditing] = useState(true);

  const [colorStickerMenu, setcolorStickerMenu] = useState(color_primary);
  const [data, setdata] = useState(null);
  const [notificationsList, setnotificationsList] = useState([]);

  const HorizontalMenuClient = [
    { value: 1, icon: 'person', counter: 0 },
    { value: 2, icon: 'bell', counter: notificationsList.filter(obj => obj.view === 0).length },
    { value: 3, icon: 'settings', counter: 0 },
    // { value: 2, icon: 'settings-outline', counter: 0 },
    // { value: 3, icon: 'message-circle-outline', counter: 0 },
    // { value: 4, icon: 'folder-add-outline', counter: 0 },
    // { value: 5, icon: 'bell', counter: notificationsList.filter(obj => obj.view === 0).length },
    // { value: 6, icon: 'heart', counter: 10 }
  ]

  const HorizontalMenuMedic = [
    { value: 1, icon: 'person', counter: 0 },
    { value: 2, icon: 'bell', counter: 0 },
    { value: 3, icon: 'settings', counter: 0 },
    // { value: 2,  icon: 'activity', counter: 0 },
    // { value: 3,  icon: 'folder-add-outline', counter: 0 },
    // { value: 6,  icon: 'settings-outline', counter: 0 }
  ];
  const [HorizontalMenuList, setHorizontalMenuList] = useState([]);

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    get()
    if (userDetails.rol === "client") { setHorizontalMenuList(HorizontalMenuClient) }
    else if (userDetails.rol === "medic") { setHorizontalMenuList(HorizontalMenuMedic) }
  }, [randomCode]);

  async function get() {
    setLoad(true)
    const res = await profile.getProfile(userDetails.id, userDetails.rol)
    setdata(res)
    const noti = await notifications.GetNews(i18n.language, userDetails.id, userDetails.rol)
    setnotificationsList(noti)
    setLoad(false)
  }






  function updateData(e){

  }


  async function getUpdateData(event) {
    //updateData(event)
    // const obj = {
    // }
    // let e = data.img !== userDetails.photo_profile ? true : false
    // const res = await profile.updateProfile(e, data)
  }



  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color_screen }}>
      <ScrollView
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        refreshControl={
          <RefreshControl
            refreshing={Load}
            onRefresh={get}
          />
        }
        onScroll={event => {
          const y = event.nativeEvent.contentOffset.y;
          if (y >= windowWidth / 1.3) { setcolorStickerMenu(color_secondary) }
          else { setcolorStickerMenu(color_primary) }
        }}
      >
        {editing ?
          <StatusBar backgroundColor={color_primary} barStyle='light-content' /> :
          <Head
            user={userDetails}
            color_primary={color_primary}
            color_secondary={color_secondary}
            color_white={color_white}
            back={props.navigation.goBack}
            setvertical={setvertical}
          />
        }
        {!Load &&
          <HorizontalMenu
            colorActive={color_white}
            colorDisabled={color_white_a}
            Page={Page}
            setPage={setPage}
            list={HorizontalMenuList}
            maxWidth={windowWidth}
          />
        }
        {!Load && Page === 1 && <ProfileInfo data={data} editing={editing}
        setsaveEditing={setsaveEditing}
        updateData={updateData}
        goToScreen={goToScreen} />}


        {/* {!Load && Page === 2 && <ProfileNotifications goToScreen={goToScreen} />}
        {!Load && Page === 3 && <ProfileConfig goToScreen={goToScreen} />} */}
      </ScrollView>

      {/* {props.data !== data ?
          <TouchableOpacity style={{ ...styles.btnUp, backgroundColor: color_fifth }} onPress={()=>props.updateData(data)}>
            <IconSvg name={"checkmark-circle-2-outline"} width={20} height={20} fill={color_white} />
            <Text style={{...styles.btnUpText, color: color_white}}>save</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => props.setediting(!props.editing)}
            style={{ ...styles.btnUp, backgroundColor: color_white }}>
            <IconSvg name={props.editing ? "close-outline" : "settings"} width={20} height={20} fill={color_grey_dark} />
            {!props.editing &&
              <Text
                style={{...styles.btnUpText, color: color_grey_dark}}>editar perfil</Text>}
          </TouchableOpacity>
        } */}




      




      {Page === 1 &&  
      <>
      {saveEditing ?
       <TouchableOpacity onPress={() => getUpdateData(true)}
        style={{
          position: "absolute",
          width:"60%",
          bottom: 20,
          zIndex: 999,
          alignSelf: "center",
          backgroundColor: color_fifth,
          borderRadius: 20,
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon name={"save-outline"} width={25} height={25} fill={color_white} />
        <Text style={{
           marginLeft: 5,
           fontWeight:"700",
           fontSize: 14,
           textTransform: "capitalize",
           color: color_white
        }}>Guardar Cambios</Text>
      </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => setediting(!editing)} style={{ backgroundColor: color_fifth, position: "absolute", zIndex: 999, alignSelf: "flex-end", width: 60, height: 60, borderRadius: 60, bottom: 20, right: 20, justifyContent: "center", alignItems: "center" }}>
          <Icon name={editing ? "close" : "edit"} width={30} height={30} fill={color_white} />
        </TouchableOpacity>
      }
      </>
}




      {vertical === true &&
        <MenuVertical
          width={280}
          show={vertical}
          action={setvertical}
          goToScreen={goToScreen}
        />
      }
    </SafeAreaView>
  )
}

export default Profile;

/*
*S/E => "Sin Expereiencia" -> "Pero disponoble para aprender"


Technical skills:
Programming Languages and Concepts.
Web: HTML/ HTML5 , CSS/CSS3, JavaScript, Bootstrap, ReactJS, JSON
Database Analysis & Design.
Application Servers.
Source Control and Build Tools: GITHUB, SourceTree
Project Management: S/E 
Software Design Tools: Adobe PhotoShop, Adobe Illustrator, Adobe XD, CorelDraw
CMS: WordPress (Divi)
 



    Programming Languages and Concepts: Core Java (5 yrs), Spring Boot (3 yrs), Servlets (5 yrs), Microservices (5 yrs), Rest Services (5 yrs), Swagger (3 yrs), JUnit (Mockito/Power Mock) (5 yrs), JNDI, JDBC, JSR 168/286 Portlet API, IBM Portlet API and SQL.
    Web: HTML (5 yrs), CSS/CSS3 (5 yrs), Java Script (4 yrs), AJAX (2 yrs), jQuery (5 yrs), JSON (2 yrs), Bootstrap (3 yrs) and Angular 8 (1 yrs)
    Database Analysis & Design: MySQL Server (5 yrs), IBM DB2 (2 yrs), Postgres (3 yrs), MongoDB (2 yrs)
    Application Servers: WebSphere Application Server, Oracle WebLogic Server (1 yrs), Liferay Server (3 yrs), Apache Tomcat (2 yrs)


  

 

 

 


*/