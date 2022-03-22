import React, { useState, useRef, useEffect, useContext } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../../contexts/UserContext'
import RequestPermission from '../../permission';
import Splash from './Splash'
import Login from './Login'
import Dashboard from './Dashboard';
import { useTranslation } from 'react-i18next';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';


//functions https
import { services } from '../services/connection'



//actions from store
import {connect} from 'react-redux'
import  { getList } from '../store/services/action'



// const mapStateToProps = (state) => {
//     return {
//         list : state.servicesReducer.list,
//     }
// }






function Home({ getList, props }) {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isSplashing, setIsSplashing] = useState(true)
  const { setUserDetails } = useContext(UserContext)
  const userDetails = useContext(UserContext)

  const { t, i18n } = useTranslation();


  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible !== "active") {
      console.log("se salio, colgar llamada", appStateVisible) //userDetails.name, 
      JitsiMeet.endCall();
    } else {
      console.log("*** in the app ", appStateVisible)
    }
  }, [appStateVisible]);



  const _retrieveData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
      if (value) {
        setUserDetails(value)
        setTimeout(() => {
          setIsSplashing(false)
        }, 1000)
        return value
      } else {
        setTimeout(() => {
          setIsSplashing(false)
        }, 3000)
      }
    } catch (error) { }
  };

  function change() {
    if (userDetails.userDetails.email !== null) {
      const lng = userDetails.userDetails.language
      i18n.changeLanguage(lng);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      RequestPermission().then(_ => {
        console.log('RequestPermission!');
      });
    }
    _retrieveData()
    change()
  }, [])





  async function  loadReducer(){
    
    const listServices = await services.servicesList(i18n.language)
    getList(listServices)
  }





  if (isSplashing) {
    setTimeout(() => {
      setIsSplashing(false)
    }, 3000)
    return <Splash />
  }


  if (isSplashing === false) {
    if (userDetails.userDetails.email === null) {
      return <Login {...props} />
    }
    else {
      if (userDetails.userDetails.email !== null) {
        loadReducer()
        return (
          <Dashboard {...props} />
        )
      }
    }
  }
}


//export default Home;
export default connect(null, {getList})(Home);