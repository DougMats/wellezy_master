import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const CARTSHOP = () => ({

  insertcartshop: async (data) => {
    let res
    console.log(" ____url: ", base_url(serverCrm, 'insert/cart/shop'))

    console.log("____data: ", data)
    await axios.post(base_url(serverCrm, 'insert/cart/shop'), data)
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },


  getCartShop: async (id) => {
    let res
    console.log("getCartShop link ---> ",base_url(serverCrm, `get/cart/shop/${id}`))
    await axios.get(base_url(serverCrm, `get/cart/shop/${id}`))
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },


  deletedSelectes: async (data) => {
    let res
    console.log("link: ---->", base_url(serverCrm, 'delete/items/selectes/in/cart/shop'))
    console.log("data:----->", data)
    await axios.post(base_url(serverCrm, 'delete/items/selectes/in/cart/shop'), data)
      .then(function (response) {
        res = response.data
      })
      .catch((error) => {
        console.log("error: ", error.data)
        return false
      })
    return res;
  },


  savePayment: async (data) => {
    let res
    console.log("savePayment link--->", base_url(serverCrm, 'save/payment'))
    console.log("savePayment data -->", data)

    await axios.post(base_url(serverCrm, 'save/payment'), data)
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
export default CARTSHOP;