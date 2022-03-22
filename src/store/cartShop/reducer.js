// import React from 'react'
// import {services} from '../../services/connection.js';
// import { useTranslation } from 'react-i18next';
// const { t, i18n } = useTranslation();


const initialState = {
  list: [],
}
 


// async function getList(lan){
//   const res = await services.servicesList(i18n.language)
// }



export default (state = initialState, action) => {

//   console.log("________aqui se consultan los servicios")
// const res = getList()
// console.log(res) 
// console.log("reducer default")
// //   if (action.type === "GET_SERVICES_LIST") {
// //     return {
// //         ...state,
// //         amount: state.amount + action.payload
// //     }
// // }

  return state;
};



export const selectCurrentAmount = (state) =>{
  return state.servicesReducer;
 }