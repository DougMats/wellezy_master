import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../../contexts/UserContext'
import RequestPermission from '../../permission';
import Splash from './Splash'
import Login from './Login'
import Dashboard from './Dashboard';
import { useTranslation } from 'react-i18next';

function Home(props) {
  const [isSplashing, setIsSplashing] = useState(true)
  const { setUserDetails } = useContext(UserContext)
  const userDetails = useContext(UserContext)
  const { t, i18n } = useTranslation();

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

  useEffect(() => {
    if (Platform.OS === 'android') {
      RequestPermission().then(_ => {
        console.log('requested!');
      });
    }
    _retrieveData()
    change()
    console.log("___ home ___")
  }, [])

  if (isSplashing) {
    setTimeout(() => {
      setIsSplashing(false)
    }, 3000)
    return <Splash />
  }

console.log("* * *")
console.log("userDetails: ")
console.log(userDetails)
console.log("***")




  function change() {
    console.log(" CHANGE CHANGE CHANGE CHANGE CHANGE CHANGE CHANGE CHANGE ")
    if (userDetails.userDetails.email !== null) {
      const lng = userDetails.userDetails.language
      i18n.changeLanguage(lng);
      console.log("___________- idioma cambiado")
    }
  }




  if (isSplashing === false) {
    if (userDetails.userDetails.email === null) {
      return <Login {...props} />
    }
    else {
      if (userDetails.userDetails.email !== null) {
        return (
          <Dashboard {...props} />
        )
      }
    }
  }
}
export default Home;