import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'

const NOTIFICATIONS = () => ({

  create: async (data) => {
    let res
    await axios.get(base_url(serverCrm, 'create/notifications'), data)
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },

  getNews: async (lang, id, rol) => {
    let res
    console.log("********************************************************************************")
    console.log("nuevas notificaciones: ", base_url(serverCrm, `notifications/news/${lang}/${rol}/${id}`))
    await axios.get(base_url(serverCrm, `notifications/news/${lang}/${rol}/${id}`))
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },

  updateToRead: async (id) => {
    let res
    console.log("UpdateToRead link: ", base_url(serverCrm, `notifications/update/to/read/${id}`))
    await axios.get(base_url(serverCrm, `notifications/update/to/read/${id}`))
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  }

});

export default NOTIFICATIONS;