import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const CLINICS = () => ({

  

  GetClinics: async (leng, premium, stars, search, page) => {
    let res
    console.log("get all clinics ---->", base_url(serverCrm, `get/clinics/list/${leng}/${premium}/${stars}/${search}?page=${page}`))
    await axios.get(base_url(serverCrm, `get/clinics/list/${leng}/${premium}/${stars}/${search}?page=${page}`))
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },




  // GetClinics: async (leng, premium, stars, search, page) => {
  //   let res
  //   try {
  //   await axios.get(base_url(serverCrm, `get/clinics/list/${leng}/${premium}/${stars}/${search}?page=${page}`)).then(function (response) {
  //     res = response.data
  //   })

  //   } catch (error) {
      
  //     console.log("error: ", error.data)
  //     res  = error.data
  //   }
  //   return  res;
  // },



  //GetClinics, GetPaises, GetCiudades, GetClinicsByCountry, GetClinicsByCity

  // async function GetClinics(text, len) {
  //   let clinics
  //   await axios.get(base_url(serverCrm, `clinics/${text}/${len}`)).then(function (response) {
  //     clinics = response.data;
  //   })
  //     .catch(function (error) {
  //       clinics = error;
  //       console.log("get clinics?", error);
  //     })
  //   //    .then(function () { });
  //   //console.log('clinics ->', clinics);
  //   return clinics;
  // }








  // nursesList: async (leng, premium, stars, search, page) => {
  //   let res
  //   console.log("..... all nurses: ", base_url(serverCrm, `get/nurses/list/${leng}/${premium}/${stars}/${search}?page=${page}`));
  //   await axios.get(base_url(serverCrm, `get/nurses/list/${leng}/${premium}/${stars}/${search}?page=${page}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return  res;
  // },

  // getThisNurse: async (id, leng) => {
  //   let res
  //   console.log("getThisNurse:______ ",base_url(serverCrm, `get/nurse/${id}/${leng}`))
  //   await axios.get(base_url(serverCrm, `get/nurse/${id}/${leng}`)).then(function (response) {
  //     res = response.data
  //   })
  //     .catch(() => {
  //       return false
  //     })
  //   return  res;
  // },


});

export default CLINICS;