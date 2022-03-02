import axios from 'axios'
import { serverCrm, base_url } from '../../../Env'


const PROCESS = () => ({


  List: async (leng, text) => {
    let res
        console.log("process List ---->", base_url(serverCrm, `all/categories/${leng}/${text}`))
    await axios.get(base_url(serverCrm, `all/categories/${leng}/${text}`)).then(function (response) {
      res = response.data
    })
      .catch((error) => {
        console.log("error process list", error.data)
        res =  false
      })

    return  res;
  },



  

  ListGroup: async (leng) => {
    let res
    console.log(base_url(serverCrm, `categories/${leng}`))
    await axios.get(base_url(serverCrm, `categories/${leng}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return  res;
  },




  


  ProcessGet: async (id, leng) => {
    let res
    console.log("ProcessGet: ",base_url(serverCrm, `categories/${id}/${leng}`))
    await axios.get(base_url(serverCrm, `categories/${id}/${leng}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return  res;
  },





  processFavorite: async (user, id) => {
    let res
    console.log("favorite?: ", base_url(serverCrm,`getQualifiedProcedure/${id}/${user}`))
    await axios.get(base_url(serverCrm,`getQualifiedProcedure/${id}/${user}`)).then(function (response) {
      res = response.data
    })
      .catch(() => {
        return false
      })
    return  res;
  },



ServicesFavoriteAdd: async ( user, id) =>{
  let res
  await axios.post(base_url(serverCrm,`favorites/create/${user}/${id}`)).then(function (response) {
    res = response.data
  })
    .catch(() => {
      return false
    })
  return res;
},


ServicesFavoriteAdd: async (user, id) =>{
  let res
  await axios.delete(base_url(serverCrm,`favorites/delete/${user}/${id}`)).then(function (response) {
    res = response.data
  })
    .catch(() => {
      return false
    })
  return res;
}









    // console.log(base_url(serverCrm, `getQualifiedProcedure/${procedure}/${user}`))
    // await axios.get(base_url(serverCrm, `getQualifiedProcedure/${procedure}/${user}`)).then(function (response) {
    //   Qualified = response.data
    // })
    //   .catch(function (error) { console.log("Qualified?", error) })
    // //    .then(function () { });
    // console.log("Qualified", Qualified)
    // return Qualified;








  // async function ProcessGet(id, language) {
  //   let Services
  //   console.log("consultando aun procedimiento")
  //   console.log(base_url(serverCrm, `categories/${id}/${language}`))
  //   await axios.get(base_url(serverCrm, `categories/${id}/${language}`)).then(function (response) {
  //     Services = response.data
  //   })
  //     .catch(function (error) { console.log("?", error) })
  //   //    .then(function () { });
  //   return Services;
  // }
  



// async function GetThisServicesFavorite(user, procedure) {
//   let Qualified
//   console.log("Q->?: ", user, procedure)
//   console.log("consultando a un procedimiento")
//   console.log(base_url(serverCrm, `getQualifiedProcedure/${procedure}/${user}`))
//   await axios.get(base_url(serverCrm, `getQualifiedProcedure/${procedure}/${user}`)).then(function (response) {
//     Qualified = response.data
//   })
//     .catch(function (error) { console.log("Qualified?", error) })
//   //    .then(function () { });
//   console.log("Qualified", Qualified)
//   return Qualified;
// }












});

export default PROCESS;