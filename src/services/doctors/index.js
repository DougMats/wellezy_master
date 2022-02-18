import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const DOCTORS = () => ({



  doctorsList: async (leng, stars, type, text, page) => {
    let res
    console.log("list doctors? --->", base_url(serverCrm, `doctors/${leng}/${stars}/${type}/${text}?page=${page}`));
    await axios.get(base_url(serverCrm, `doctors/${leng}/${stars}/${type}/${text}?page=${page}`))
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
        // return false
      })
    return res;
  },



  thisDoctor: async (id, leng) => {
    let res
    console.log("this doctor ", base_url(serverCrm, `doctorsInfo/${id}/${leng}`))
    await axios.get(base_url(serverCrm, `doctorsInfo/${id}/${leng}`))
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
        // return false
      })
    return res;
  },


  MedicGetQualified: async (id_medic, id_client) => {
    let res
    await axios.get(base_url(serverCrm, `getDoctorQualified/${id_medic}/${id_client}`))
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
        // return false
      })
    return res;
  },






  sendMedicsRating: async (NewRegister) => {

    console.log("link 1", base_url(serverCrm, `doctorsRating`))
    await axios.post(base_url(serverCrm, `doctorsRating`), NewRegister) .then(function (response) {
      console.log("respuesta 1",response.data)
    })
   .catch(() => { console.log("error 1 sendMedicsRating")})

   console.log("link 2", base_url(serverCrm, `doctorsRatingSave`))
   await axios.post(base_url(serverCrm, `doctorsRatingSave`), NewRegister) .then(function (response) {
    console.log("respuesta 2",response.data)
   })
   .catch(() => { console.log("error 2 sendMedicsRating")})
   
   
  }

});

export default DOCTORS;