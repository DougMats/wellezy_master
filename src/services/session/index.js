import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const SESSION = () => ({

  login: async (data) => {
    let res
    await axios.post(base_url(serverCrm, `wellezy/auth`), data).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  },

  register: async (data) => {
    let res
    await axios.post(base_url(serverCrm, `wellezy/register`), data)
      .then(function (response) {
        res = response.data
      })
      .catch(() => {
        return false
      })
    return res;
  },



});

export default SESSION;