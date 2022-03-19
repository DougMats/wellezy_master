import React, { useState, useEffect } from 'react'
import UserContext from './UserContext'

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    id: null,
    name: null,
    surname: null,
    photo_profile: null,
    email: null,
    rol: null,
    phone: null,
    password: null,
    language: null,
  })

  const _retrieveData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
      if (value && value.token !== undefined) {
        console.log("quien coño es este value? ", value)
        setUserDetails(value)
        return value
      }
    } catch (error) { /* . . . */ }
  };

  setInterval(() => {
    _retrieveData()
  }, 2000)

  const obj = { userDetails, setUserDetails}

  return (
    <UserContext.Provider value={obj}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider