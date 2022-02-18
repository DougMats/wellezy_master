import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'

const SPECIALS = () => ({

  //crear
  specialCreate: async (data) => {
    let res
    await axios.post(base_url(serverCrm,`create/special`),data).then(function (response) {
      res = response.data
    })
      .catch((error) => {
        console.log("error specialsListAll ", error.data)
        res = false
      })
    return res;
  },



//devuelve todos los resultados
  specialsListAll: async (leng) => {
    let res
    await axios.get(base_url(serverCrm, `get/all/special/list/${leng}`)).then(function (response) {
      res = response.data
    })
      .catch((error) => {
        console.log("error specialsListAll ", error.data)
        res = false
      })
    return res;
  },






  

//devuelve todos los resultados paginados de 10 en 10, se puede filtrar por nombre
  specialsList: async (leng, text, page) => {
    let res
    console.log("?")
    console.log(base_url(serverCrm, `get/special/list/${leng}/${text}?page=${page}`))
    await axios.get(base_url(serverCrm, `get/special/list/${leng}/${text}?page=${page}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },







//devuelve los items que conforman la oferta especial, recibe el id de la oferta
  getItems: async (leng, id) => {
    let res
    await axios.get(base_url(serverCrm, `get/special/items/${leng}/${id}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },








// //devuelve todas las ofertas segun el medico, paginadas de 10 en 10, se puede filtrar por nombre 
//   ListByMedic: async (id, leng, search, page) => {
//     let res
//     console.log("ListByMedic ", id, "-------->", base_url(serverCrm, `get/special/list/${id}/${leng}/${search}?page=${page}`))
//     await axios.get(base_url(serverCrm, `get/special/list/medic/${id}/${leng}/${search}?page=${page}`)).then(function (response) {
//       res = response.data
//     })
//       .catch(() => {
//         return false
//       })
//     return res;
//   }





});

export default SPECIALS;