import React, { useState, useContext, useEffect } from 'react'
import { RefreshControl, Image, SafeAreaView, ScrollView, Text, View, Modal, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
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

import Menu from '../../components/generic/Menu';

import HorizontalMenu from './components/HorizontalMenu.js'
import ProfileInfo from './pages/ProfileInfo.js';
import ProfileConfig from './pages/ProfileConfig.js';
import ProfileNotifications from './pages/ProfileNotifications.js';
import ProfileFavorites from './pages/ProfileFavorites.js';
import ProfileShares from './pages/ProfileShares.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fixed = windowWidth / 12;

function Profile(props) {
  const { t, i18n } = useTranslation();
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [vertical, setvertical] = useState(false);
  const [Load, setLoad] = useState(true);
  const [Page, setPage] = useState(1);
  const [editing, setediting] = useState(false);
  const [saveEditing, setsaveEditing] = useState(false);
  const [colorStickerMenu, setcolorStickerMenu] = useState(color_primary);
  const [data, setdata] = useState(null);
  const [notificationsList, setnotificationsList] = useState([]);
  const [modal, setmodal] = useState(false);
  const [mmsg, setmmsg] = useState("");

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
  const [dataPacket, setdataPacket] = useState(null);


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    get()
    if (userDetails.rol === "client") { setHorizontalMenuList(HorizontalMenuClient) }
    else if (userDetails.rol === "medic") { setHorizontalMenuList(HorizontalMenuMedic) }
  }, [randomCode]);

  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setmodal(false)
        setmmsg("")
      }, 5000);
    }
  }, [modal]);

  async function get() {
    setLoad(true)
    const res = await profile.getProfile(userDetails.id, userDetails.rol)
    setdata(res)
    const noti = await notifications.GetNews(i18n.language, userDetails.id, userDetails.rol)
    setnotificationsList(noti)
    setLoad(false)
  }

  async function updateData() {
    let e = dataPacket.img !== data.img ? true : false
    dataPacket.rol = userDetails.rol
    const res = await profile.updateProfile(e, dataPacket)
    if (res) {
      setmodal(true)
      setmmsg("para visualizar los datos debes volver a iniciar session.")
      get()
      setediting(false)
      setsaveEditing(false)
    }
    else {
      console.log("updateData() -> error: ", res)
    }
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

        {!Load && Page === 1 &&
          <ProfileInfo
            fixed={fixed}
            rol={userDetails.rol}
            data={data}
            editing={editing}
            setsaveEditing={setsaveEditing}
            updateData={updateData}
            goToScreen={goToScreen}
            getData={setdataPacket}
          />
        }




        {!Load && Page === 2 &&
          <ProfileNotifications
            goToScreen={goToScreen}
          />
        }

{!Load && Page === 3 &&
          <ProfileConfig
            data={data}
            goToScreen={goToScreen}
          />
        }





        {/*
          1157-41709.jpg profile daniel correa
        
          {!Load && Page === 3 && <ProfileConfig goToScreen={goToScreen} />}
        */}
      </ScrollView>





      <Menu
        props={props}
        option={1}
        alert={0}
      />


      {Page === 1 &&
        <>
          {
            saveEditing &&
            <TouchableOpacity onPress={() => updateData()} style={{ position: "absolute", width: "60%", bottom: 65, zIndex: 999, alignSelf: "center", backgroundColor: color_fifth, borderRadius: 20, flexDirection: "row", paddingHorizontal: 20, paddingVertical: 10, justifyContent: "center", alignItems: "center" }}>
              <Icon name={"save-outline"} width={25} height={25} fill={color_white} />
              <Text style={{ marginLeft: 5, fontWeight: "700", fontSize: 14, textTransform: "capitalize", color: color_white }}>Guardar Cambios</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => setediting(!editing)} style={{ backgroundColor: color_fifth, position: "absolute", zIndex: 999, alignSelf: "flex-end", width: fixed * 1.5, height: fixed * 1.5, borderRadius: fixed * 1.5, bottom: 65, right: 20, justifyContent: "center", alignItems: "center" }}>
            <Icon name={editing ? "close" : "edit"} width={30} height={30} fill={color_white} />
          </TouchableOpacity>
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

      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.25)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: color_white,
            width: "80%",
            flexDirection: "column",
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 20,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}>
            <Text>{mmsg}</Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default Profile;