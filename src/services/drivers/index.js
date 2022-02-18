import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const DRIVERS = () => ({


  driverList: async (leng, premium, stars, search, page) => {
    let res
    console.log("lista de drivers: ___________", base_url(serverCrm, `wellezy/service/drivers/${leng}/${premium}/${stars}/${search}?page=${page}`))
    await axios.get(base_url(serverCrm, `wellezy/service/drivers/${leng}/${premium}/${stars}/${search}?page=${page}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return  res;
  },





  getDriverVehicles: async (id, leng) => {
    let res
    console.log("lista de vehiculos: ___________", base_url(serverCrm, `wellezy/service/driver/vehicles/${id}/${leng}`))
    await axios.get(base_url(serverCrm,`wellezy/service/driver/vehicles/${id}/${leng}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return  res;
  }






// async function getDriverVehicles(id, len) {
//   let DiverVehicles
//   await axios.get(base_url(serverCrm, `wellezy/service/driver/${id}/${len}`)).then(function (response) {
//     DiverVehicles = response.data
//   })
//     .catch(function (error) { console.log("?", error) })
//   //    .then(function () { });
//   // console.log("->Drivers: ",DiverVehicles)
//   return DiverVehicles;
// }








});

export default DRIVERS;