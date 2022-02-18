import React, { useState } from 'react'
import CarsContext from './CarsContext'


const CarsProvider = ({ children }) => {
  
  
  const [ CarsDetail, setCarsDetail ] = useState({
      name : "HOLA"
  })


  
const obj = { ...CarsDetail , setCarsDetail }
  

  return (
    <CarsContext.Provider value={obj}>
      {children}
    </CarsContext.Provider>
  )
}

export default CarsProvider