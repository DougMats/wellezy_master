import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const SEARCH = () => ({

  getAll: async (text) => {
    let res
    //console.log(base_url(serverCrm, `getAllResultFromGlobalQuery/${text}`))
    await axios.get(base_url(serverCrm, `getAllResultFromGlobalQuery/${text}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res;
  }



});

export default SEARCH;