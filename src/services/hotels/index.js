import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const HOTELS = () => ({

  hotelsList: async (leng, premium, stars, text, page) => {
    let res
    console.log("*** hotels ->", base_url(serverCrm, `wellezy/list/hotels/${leng}/${premium}/${stars}/${text}?page=${page}`))
    await axios.get(base_url(serverCrm, `wellezy/list/hotels/${leng}/${premium}/${stars}/${text}?page=${page}`))
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
        return false
      })
    return res;
  },




  hotelInfo: async (id, leng) => {
    let res
    console.log("*** hotels ->", base_url(serverCrm, `wellezy/get/hotel/${id}/${leng}`))
    await axios.get(base_url(serverCrm, `wellezy/get/hotel/${id}/${leng}`))
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
        return false
      })
    return res;
  },


  // roomsList: async (id, leng, text, page) => {
  //   let res
  //   //console.log("rooms ->", base_url(serverCrm, `v2/wellezy/service/hotels/room/${id}/${leng}/${text}?page=${page}`))
  //   await axios.get(base_url(serverCrm, `v2/wellezy/service/hotels/room/${id}/${leng}/${text}?page=${page}`))
  //     .then(function (response) {
  //       res = response.data
  //     })
  //     .catch(() => {
  //      // return false
  //     })
  //   return res;
  // },



  // roomsImages: async (id, leng) => {
  //   let res
  //   //console.log("roomsImages ->", base_url(serverCrm, `v3/wellezy/service/hotels/room/images/${id}/${leng}`))
  //   await axios.get(base_url(serverCrm, `v3/wellezy/service/hotels/room/images/${id}/${leng}`))
  //     .then(function (response) {
  //       res = response.data
  //     })
  //     .catch(() => {
  //      // return false
  //     })
  //   return res;
  // },



  // roomsServices: async (id, leng) => {
  //   let res
  //   //console.log("roomsServices ->", base_url(serverCrm, `v4/wellezy/service/hotels/room/services/${id}/${leng}`))
  //   await axios.get(base_url(serverCrm, `v4/wellezy/service/hotels/room/services/${id}/${leng}`))
  //     .then(function (response) {
  //       res = response.data
  //     })
  //     .catch(() => {
  //      // return false
  //     })
  //   return res;
  // },



});

export default HOTELS;