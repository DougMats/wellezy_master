import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const SERVICES = () => ({

  servicesList: async (leng) => {
    let res
    console.log("servicesList ->", base_url(serverCrm, `wellezy/service/list/${leng}`))
    await axios.get(base_url(serverCrm, `wellezy/service/list/${leng}`))
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
       // return false
      })
    return res;
  },



  getRoles: async (leng) =>{
    let res
    //console.log("roles --> ", base_url(serverCrm, `get/roles/userServices/${leng}`))
     await axios.get(base_url(serverCrm, `get/roles/userServices/${leng}`))
     .then(function (response) {
       res = response.data
     })
     .catch(() => {
      // return false
     })
    return res;
  },


  updateNewRol: async (data) =>{
      let res
      // console.log("link ->", base_url(serverCrm,`update/userservice/type`))
      // console.log("data ->", data)
      await axios.post(base_url(serverCrm,`update/userservice/type`), data).then(function (response) {
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



  getProfile: async (type, id) =>{
    let res
    // console.log("*** TYPE: ", type)
    // console.log("*** ID: ", id)
    // console.log("link --> ",base_url(serverCrm, `get/profile/service/${type}/${id}`))
     await axios.get(base_url(serverCrm, `get/profile/service/${type}/${id}`))
     .then(function (response) {
       res = response.data
     })
     .catch(() => {
      // return false
     })
    return res;
  }





});

export default SERVICES;