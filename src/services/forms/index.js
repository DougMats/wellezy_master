import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const FORMS = () => ({

  SimpleFormulario: async (data) => {
    let res
   // console.log("SimpleFormulario link: ", base_url(serverCrm, `wellezy/cotization/create`))
   // console.log("SimpleFormulario data: ", data)
    await axios.post(base_url(serverCrm, `wellezy/cotization/create`), data)
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        res = error.data
        console.log("error")
        return false
      })
    console.log("res:", res)
    return res;
  },





  saveHistoryClinic: async (data) => {
    console.log("data: ", data)
    console.log(base_url(serverCrm, `clients/history/clinic`))
    await axios.post(base_url(serverCrm, `clients/history/clinic`), data)
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        res = error.data
        console.log("error")
        return false
      })
    return res;
  },



  getHistoryClinic: async (client, id) =>{
    let res
    console.log(base_url(serverCrm, `clients/history/clinic/${client}/${id}`))
    await axios.get(base_url(serverCrm, `clients/history/clinic/${client}/${id}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return res
  }


});

export default FORMS;