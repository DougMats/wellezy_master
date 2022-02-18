import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const LOCATIONS = () => ({



GetPaises: async (leng) => {
    let res
    console.log("paises ---->", base_url(serverCrm, `paises/${leng}`))
    await axios.get(base_url(serverCrm, `paises/${leng}`))
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },

  GetCiudades: async (leng) => {
    let res
    console.log("ciudades ------>", base_url(serverCrm, `ciudades/${leng}`))
    await axios.get(base_url(serverCrm, `ciudades/${leng}`))
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },

});

export default LOCATIONS;