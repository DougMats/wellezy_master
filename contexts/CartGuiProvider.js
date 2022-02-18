import React, { useState } from 'react'
import CartGuiContext from './CartGuiContext'


const CartGuiProvider = ({ children }) => {
  
  const nurse_booking =  {
    introduced : false,
    scheduled : false,
    showModal : false
  }

  const driver_booking = {
    introduced : false,
    scheduled : false,
    showModal : false
  }

  const house_booking = {
    introduced : false,
    scheduled : false,
    showModal : false
  }


  const medical_booking = {
    introduced : false,
    scheduled : false,
    showModal : false
		}

  const [ cartGuiStates, setCartGuiStates ] = useState({
    medical_booking,
		nurse_booking,
		driver_booking,
		house_booking,
  })

  
  const obj = { cartGuiStates , setCartGuiStates}
  

  return (
    <CartGuiContext.Provider value={obj}>
      {children}
    </CartGuiContext.Provider>
  )
}

export default CartGuiProvider