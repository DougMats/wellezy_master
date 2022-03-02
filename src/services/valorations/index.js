import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'
const VALORATIONS = () => ({




  //listar las valoraciones por el id del medico
  valorationsList: async (len, id, text, filter, order, page) => {
    let res =[]
    console.log("___valorationsList____",base_url(serverCrm, `wellezy/med/get/valorations/${len}/${id}/${text}/${filter}/${order}?page=${page}`))
    await axios.get(base_url(serverCrm, `wellezy/med/get/valorations/${len}/${id}/${text}/${filter}/${order}?page=${page}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },




  //traer la informacion general de esta valoracion
  getThisValoration: async (len, id) => {
    let res
    //console.log("getThisValoration --->", base_url(serverCrm, `wellezy/med/get/this/valoration/${len}/${id}`))
    await axios.get(base_url(serverCrm, `wellezy/med/get/this/valoration/${len}/${id}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },






  newValorationscheduled: async (data) =>{
    let res
    console.log("newValorationscheduled -----------", base_url(serverCrm, `new/valoration/scheduled`))
    await axios.post(base_url(serverCrm, `new/valoration/scheduled`),data).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },





  updateStateValoration: async (id, state) =>{
    let res
    console.log("...",id)
    console.log("...",state)
    await axios.get(base_url(serverCrm, `update/valoration/state/${id}/${state}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },










  // getValorationWhenProcessed: async (id) => {
  //   let res
  //   console.log(base_url(serverCrm, `get/valoration/processed/${id}`))
  //   await axios.get(base_url(serverCrm, `get/valoration/processed/${id}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return res;
  // },





  // getValorationScheduled: async (id) =>{
  //   let res
  //   console.log(base_url(serverCrm, `get/valoration/processed/${id}`))
  //   await axios.get(base_url(serverCrm, `get/valoration/processed/${id}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return res;
  // },




  // getValorationWhenCarriedOut: async (id) => {
  //   let res
  //   console.log(base_url(serverCrm, `get/valoration/carried_out/${id}`))
  //   await axios.get(base_url(serverCrm, `get/valoration/carried_out/${id}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return res;
  // },



  // getClientHC: async (id_client) => {
  //   let res
  //   console.log(base_url(serverCrm, `clients/history/clinic/${id_client}`))
  //   await axios.get(base_url(serverCrm, `clients/history/clinic/${id_client}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return res;
  // },



  // getImgsValoration: async (id) => {
  //   let res
  //   console.log(base_url(serverCrm, `get/images/valoration/${id}`))
  //   await axios.get(base_url(serverCrm, `get/images/valoration/${id}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return res;
  // },














  








});

export default VALORATIONS;