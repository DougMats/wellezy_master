import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const PROFILE = () => ({

  getProfile: async (id, rol) => {
    let res
    console.log("getProfile ---> ", base_url(serverCrm, `get/usuario/profile/${id}/${rol}`))
    await axios.get(base_url(serverCrm, `get/usuario/profile/${id}/${rol}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },




  getNotificationsClients: async (id) => {
    let res
    console.log("getNotificationsClients: ---> " ,base_url(serverCrm, `valoration/scheduled/${id}`))
    await axios.get(base_url(serverCrm, `valoration/scheduled/${id}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },


  
  updateProfile: async (e, data) =>{
    let res
    console.log("*** update profile: ", base_url(serverCrm, `update/profile/${e}`))
    // console.log("*-* update profile data: ", data)
    await axios.put(base_url(serverCrm, `update/profile/${e}`), data).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },





  // async function MyValorationScheduled(id_client) {
  //   let msj
  //   await axios.get(base_url(serverCrm, `valoration/scheduled/${id_client}`)).then(function (response) {
  //     msj = response.data;
  //   })
  //     .catch(function (error) { msj = error.data })
  //     .then(function () { })
  //   console.log("MyValorationScheduled: ", msj)
  //   return msj;
  // }




  mySharedExperiences: async (id, language) => {
    let res
    console.log("mySharedExperiences --->", base_url(serverCrm, `mySharedExperiences/${id}/${language}`))
    await axios.get(base_url(serverCrm, `mySharedExperiences/${id}/${language}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },



  MyProceduresPerformed: async (id, filter) => {
    let res
    await axios.get(base_url(serverCrm, `get/procedures/performed/by/${filter}/${id}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },





});

export default PROFILE;