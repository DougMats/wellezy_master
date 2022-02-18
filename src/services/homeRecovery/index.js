import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const HOMERECOVERY = () => ({



  //todas las casas de recuperacion
  AllHomeRecovery: async (len, premium, stars, text, page) => {
    let res
    console.log("HR *** 1")
    console.log("AllHomeRecovery ----> ",base_url(serverCrm, `homeRecovery/all/${len}/${premium}/${stars}/${text}?page=${page}`))
    await axios.get(base_url(serverCrm, `homeRecovery/all/${len}/${premium}/${stars}/${text}?page=${page}`)).then(function (response) {
      res = response.data
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    return res;
  },



//filtran con el id del medico
  myList: async (id, len, premium, stars, text, page) => {
    let res
    console.log("HR *** 2")
    console.log(base_url(serverCrm, `myHomerecovery/${id}/${len}/${premium}/${stars}/${text}?page=${page}`))
    await axios.get(base_url(serverCrm, `myHomerecovery/${id}/${len}/${premium}/${stars}/${text}?page=${page}`)).then(function (response) {
      res = response.data
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    return res;
  },



// obtiene la informacion completa de home_recovery.
  getHomeRecovery: async (id, len) => {
    let res
    console.log("HR *** 3")
    console.log(base_url(serverCrm, `get/Homerecovery/${id}/${len}`))
    await axios.get(base_url(serverCrm, `get/Homerecovery/${id}/${len}`)).then(function (response) {
      res = response.data
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    return res;
  },








  // //mis casas de reposo (soy medico)
  // AllMyHome: async (id, len) => {
  //   let res
  //   await axios.get(base_url(serverCrm, `myHomerecovery/list/${id}/${len}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(function (error) { msj = error.data })
  //     .then(function () { });
  //   return res;
  // },

  
  //crear home recorery
  create: async (data) => {
    let res
    await axios.post(base_url(serverCrm, `homerecovery/create`), data).then(function (response) {
      res = response.data
      console.log("insert?", response.data)
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    return res;
  },


  // //select rooms by home recovery
  // room: async (id, len) => {
  //   let res
  //   await axios.get(base_url(serverCrm, `homerecovery/getRooms/${id}/${len}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(function (error) { res = error.data })
  //     .then(function () { });
  //   return res;
  // },


  // createRoom: async (data) => {
  //   let res
  //   await axios.post(base_url(serverCrm, `homerecovery/createRoom`), data).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(function (error) { msj = error.data })
  //     .then(function () { });
  //   return res;
  // },


  // updateHome: async (data) => {
  //   let res
  //   await axios.post(base_url(serverCrm, `update/homerecovery/home`), data).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(function (error) { msj = error.data })
  //     .then(function () { });
  //   return res;
  // },


  // updateRoom: async (data) => {
  //   let res
  //   await axios.post(base_url(serverCrm, `update/homerecovery/room`), data).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(function (error) { msj = error.data })
  //     .then(function () { });
  //   return res;
  // },

});
export default HOMERECOVERY;