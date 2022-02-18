import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const NURSES = () => ({

  nursesList: async (leng, premium, stars, search, page) => {
    let res
    console.log("..... all nurses: ", base_url(serverCrm, `get/nurses/list/${leng}/${premium}/${stars}/${search}?page=${page}`));
    await axios.get(base_url(serverCrm, `get/nurses/list/${leng}/${premium}/${stars}/${search}?page=${page}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },


  getThisNurse: async (id, leng) => {
    let res
    console.log("getThisNurse:______ ", base_url(serverCrm, `get/nurse/${id}/${leng}`))
    await axios.get(base_url(serverCrm, `get/nurse/${id}/${leng}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },



  create: async (data) => {
    let res
    await axios.post(base_url(serverCrm, `nurse/create/new`), data).then(function (response) {
      res = response.data
      console.log("insert nurse?", response.data)
    })
      .catch(function (error) { msj = error.data })
      .then(function () { });
    return res;
  },


  nursesByMedic: async (id, lenguage, premium, stars, text, page) => {
    let res
    console.log("my nurses::", base_url(serverCrm, `get/medic/nurses/list/${id}/${lenguage}/${premium}/${stars}/${text}?page=${page}`))
    await axios.get(base_url(serverCrm, `get/medic/nurses/list/${id}/${lenguage}/${premium}/${stars}/${text}?page=${page}`)).then(function (response) {
      res = response.data
    }).catch(() => {
      return false
    })
    return res;
  },


  delete: async (data) => {
    let res
    console.log("send ", data)
    console.log("delete nurse", base_url(serverCrm, `delete/nurse`))
    await axios.post(base_url(serverCrm, `delete/nurse`),data).then(function (response) {
      res = response.data
    }).catch((error) => {
      console.log("error", error.data)
      res = error.data
    })
    return res
  },


  update: async (data) =>{
    let res
    console.log("update nurse -----> ", base_url(serverCrm, `update/nurse`))

   // {"adress": "111", "age": 18, "basedOn": 0, "city": "Buga", "city_id": "2289", "country": "Colombia", "country_id": "COL", "created_at": "2021-11-30 12:50:33", "description": "111", "distrito": "Valle", "gender": 1, "id": 34, "id_doctor": 1, "img": "58490494-WHR.png", "name": "11", "rating": 0, "recommended": 0, "stars": 0, "status": 1, "surname": "1", "title": "11rrrrrr", "type": "standard", "updated_at": "2021-11-30 12:50:33"}

    await axios.post(base_url(serverCrm, `update/nurse`),data).then(function (response) {
      res = response.data
    }).catch((error) => {
      console.log("error", error.data)
      res = error.data
    })
    return res



  }

  //______________________________
  // getThisNurse: async (id, lenguage, premium, stars, text, page) => {
  // let res
  // console.log("my nurses::", base_url(serverCrm, `get/medic/nurses/list/${id}/${lenguage}/${premium}/${stars}/${text}?page=${page}`))
  // await axios.get(base_url(serverCrm, `get/medic/nurses/list/${id}/${lenguage}/${premium}/${stars}/${text}?page=${page}`)).then(function (response) {
  //   res = response.data
  // }).catch(() => {
  //   return false
  // })
  // return res;
  // },
});

export default NURSES;