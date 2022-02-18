import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const MEETS = () => ({






  // async function checkCodeValoration(code) {
  //   let check
  //   console.log()
  //   await axios.get(base_url(serverCrm, `check/valoration/code/${code}`)).then(function (response) {
  //     check = response.data
  //   })
  //     .catch(function (error) { console.log("?", error) })
  //     .then(function () { });
  //   return check;
  // }

  // async function getTotalInfoValoration(code) {
  //   let info
  //   console.log("getTotalInfoValoration");
  //   console.log(base_url(serverCrm, `get/total/info/valoration/${code}`));
  //   await axios.get(base_url(serverCrm, `get/total/info/valoration/${code}`)).then(function (response) {
  //     info = response.data
  //   })
  //     .catch(function (error) { console.log("?", error) })
  //     .then(function () { });
  //   return info;
  // }

  

  checkCodeValoration: async (code) => {
    let res
    console.log("checkCodeValoration: ",base_url(serverCrm, `check/valoration/code/${code}`))
    await axios.get(base_url(serverCrm, `check/valoration/code/${code}`)).then(function (response) {
      res = response.data
    })
      .catch((error) => {
        console.log("checkCodeValoration error: ", error.data)
        return false
      })
    return  res;
  },


  getTotalInfoValoration: async (code) => {
    let res
    await axios.get(base_url(serverCrm, `get/total/info/valoration/${code}`)).then(function (response) {
      res = response.data
    })
      .catch((error) => {
        console.log("getTotalInfoValoration error: ", error.data)
        return false
      })
    return  res;
  },



});

export default MEETS;