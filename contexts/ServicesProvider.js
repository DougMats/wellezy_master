import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'
import { useTranslation } from 'react-i18next';
import { services } from '../src/services/connection.js'


const UserProvider = ({ children }) => {
  const [ourServices, setourServices] = useState([])
  const { t, i18n } = useTranslation();

  const _retrieveData = async () => {
    try {
      const res = await services.servicesList(i18n.language)
      console.log("provider services list______________:", res)
      //setourServices(res)
      // const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
      // if (value && value.token !== undefined) {
      //   console.log("quien coño es este value? ", value)
      //   setourServices(value)
      //   return value
      //}
    } catch (error) { /* . . . */ }
  };

  useEffect(()=>{
    _retrieveData()
  },{})

  const obj = { ourServices, setourServices }

  return (
    <UserContext.Provider value={obj}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider