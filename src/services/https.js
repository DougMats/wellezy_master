import Toast from 'react-native-simple-toast';
import { serverCrm, base_url } from '../../Env'
import axios from 'axios'
import { ActivityIndicatorBase } from 'react-native';



/* -- servicios, procedimientos, favoritos, agregar y eliminar -- */
async function ProcessGet(id, language) {
  let Services
  console.log("consultando aun procedimiento")
  console.log(base_url(serverCrm, `categories/${id}/${language}`))
  await axios.get(base_url(serverCrm, `categories/${id}/${language}`)).then(function (response) {
    Services = response.data
  })
    .catch(function (error) { console.log("?", error) })
  //    .then(function () { });
  return Services;
}


/* -- servicios, procedimientos, favoritos, agregar y eliminar -- */
async function ServicesGet(language) {
  let Services
  await axios.get(base_url(serverCrm, `categories/${language}`)).then(function (response) {
    Services = response.data
  })
    .catch(function (error) { console.log("?", error) })
  //    .then(function () { });
  return Services;
}


async function ServicesFavorite(language, user) {
  let ServicesFavorite
  console.log("servicios favoritos")
  console.log(base_url(serverCrm, `favorites/${user}/${language}`));
  console.log("_______________________")

  await axios.get(base_url(serverCrm, `favorites/${user}/${language}`)).then(function (response) {
    ServicesFavorite = response.data
  })
    .catch(function (error) {
      console.log("????", error);
      console.log("????", error.data)
    })
  //    .then(function () { });
  return ServicesFavorite;
}

async function ServicesFavoriteAdd(item, user) {
  let msj
  console.log("item", item);
  console.log("user", user);
  await axios.post(base_url(serverCrm, `favorites/create/${user}/${item}`)).then(function (response) {
    console.log("like me!")
    msj = response.data
  })
    .catch(function (error) { msj = error.data })
  //    .then(function () { });
  console.log("add F-> ", msj)
  return msj;
}

async function ServicesFavoriteDel(item, user) {
  console.log("item", item);
  console.log("user", user);
  let msj
  await axios.delete(base_url(serverCrm, `favorites/delete/${user}/${item}`)).then(function (response) {
    msj = response.data
  })
    .catch(function (error) { msj = error })
  //    .then(function () { });
  console.log("trash del-> ", msj)
  return msj
}

/* -- medicos / doctores, listado, informacion de cada uno -- */
async function MedicsGet(searchText, language) {
  let MedicList
  console.log("_____descargando los medicos de wellezy")
  console.log(base_url(serverCrm, `doctors/${searchText}/${language}`))
  await axios.get(base_url(serverCrm, `doctors/${searchText}/${language}`)).then(function (response) {
    MedicList = response.data
  })
    .catch(function (error) {
      console.log("get medics??", error);
    })
  //    .then(function () { });
  console.log("antes de retornar: ", MedicList)
  return MedicList
}

// async function MedicGetTotalInfo($id, $language) {
//   let MedicInfo
//   await axios.get(base_url(serverCrm, `doctorsInfo/${$id}/${$language}`)).then(function (response) {
//     MedicInfo = response.data
//   })
//     .catch(function (error) {
//       console.log("???", error);
//     })
//   //    .then(function () { });
//   return MedicInfo;
// }

// async function MedicGetQualified(id_medic, id_client) {
//   let Qualified
//   await axios.get(base_url(serverCrm, `getDoctorQualified/${id_medic}/${id_client}`)).then(function (response) {
//     Qualified = response.data
//   })
//     .catch(function (error) { console.log("Qualified?", error) })
//   //    .then(function () { });
//   return Qualified;
// }

// async function sendMedicsRating(NewRegister) {
//   await axios.post(base_url(serverCrm, `doctorsRating`), NewRegister).then(function (response) {
//     console.log("proceso exitoso")
//   })
//     .catch(function (error) {
//       console.log("error")
//       console.log(error.response.data)
//     })
//   //    .then(function () { });
//   await axios.post(base_url(serverCrm, `doctorsRatingSave`), NewRegister).then(function (response) {
//     console.log("proceso exitoso")
//   })
//     .catch(function (error) {
//       console.log("error")
//       console.log(error.response.data)
//     })
//   //    .then(function () { });
// }

// desde el usuario, ver perfil, actualizar datos, ver y registrar experiencias
async function getMyProfile(id, len) {
  let MyProfile
  console.log("id ", id);
  console.log("len ", len);
  console.log(base_url(serverCrm, `myProfileMed/${id}/${len}`));
  await axios.get(base_url(serverCrm, `myProfileMed/${id}/${len}`)).then(function (response) {
    MyProfile = response.data
  })
    .catch(function (error) { console.log("?perfil user", error) })
  //    .then(function () { });
  //console.log("yo->", MyProfile);
  return MyProfile;
}

async function updateMyProfile(array) {
  let msj
  console.log(base_url(serverCrm, `updateMyProfileMed'`));
  //console.log("array",array)
  await axios.post(base_url(serverCrm, `updateMyProfileMed`), array).then(function (response) {
    //console.log("like me!")
    msj = response.data
  })
    .catch(function (error) { msj = error.data })
  //    .then(function () { });
  console.log("se guardo??? ", msj)
  return msj;
}

// tratamientos realizados
async function MyProceduresPerformed(id, language) {
  let list = [
    { "id": 1, "codeProcess": 3, "name": "Tatto Removal", "date": "18-05-2021" },
    { "id": 2, "codeProcess": 234, "name": "mamaria 43", "date": "16-05-2021" },
    { "id": 1, "codeProcess": 3, "name": "Tatto Removal", "date": "18-05-2021" },
    { "id": 2, "codeProcess": 234, "name": "mamaria 43", "date": "16-05-2021" }
  ]
  return list;
}

async function saveNewExperience(type, array) {
  console.log("saving experience ")
  console.log("array: ", array)
  console.log("type ", type)
  let msj;
  await axios.post(base_url(serverCrm, `saveExperience${type}`), array).then(function (response) {
    msj = response.data
  })
    .catch(function (error) { msj = error.data })
  //    .then(function () { });
  console.log("returng....", msj);
  return msj;
}


async function mySharedExperiences(id, language) {
  let msj
  await axios.get(base_url(serverCrm, `mySharedExperiences/${id}/${language}`)).then(function (response) {
    msj = response.data
  })
    .catch(function (error) { msj = error.data })
  //    .then(function () { });
  return msj;
}

async function GetThisServicesFavorite(user, procedure) {
  let Qualified
  console.log("Q->?: ", user, procedure)
  console.log("consultando a un procedimiento")
  console.log(base_url(serverCrm, `getQualifiedProcedure/${procedure}/${user}`))
  await axios.get(base_url(serverCrm, `getQualifiedProcedure/${procedure}/${user}`)).then(function (response) {
    Qualified = response.data
  })
    .catch(function (error) { console.log("Qualified?", error) })
  //    .then(function () { });
  console.log("Qualified", Qualified)
  return Qualified;
}



async function SimpleFormulario(data) {
  let msj
  console.log("SimpleFormulario: ", data)
  await axios.post(base_url(serverCrm, `wellezy/cotization/create`), data).then(function (response) {
    console.log("like me!")
    msj = response.data
  })
    .catch(function (error) { msj = error.data })
  //    .then(function () { });
  console.log("SF-> ", msj)
  return msj;
}



async function MyValorationScheduled(id_client) {
  let msj
  await axios.get(base_url(serverCrm, `valoration/scheduled/${id_client}`)).then(function (response) {
    msj = response.data;
  })
    .catch(function (error) { msj = error.data })
    .then(function () { })
  console.log("MyValorationScheduled: ", msj)
  return msj;
}




async function clientCreateHC(data) {
  let msj
  console.log("clientCreateHC: ", data)
  console.log(base_url(serverCrm, `clients/history/clinic`))

  await axios.post(base_url(serverCrm, `clients/history/clinic`), data).then(function (response) {
    console.log("like me!")
    msj = response.data
  })
    .catch(function (error) { msj = error.data })
  //    .then(function () { });
  console.log("HC-> ", msj)
  return msj;
}




// async function getServicesList(leng) {
//   let ServicesList
//   await axios.get(base_url(serverCrm, `wellezy/service/list/${leng}`)).then(function (response) {
//     ServicesList = response.data
//   })
//     .catch(function (error) { console.log("?", error) })
//   //    .then(function () { });
//   return ServicesList;
// }



// async function getServicesListHotels(leng, premium, stars, text, page) {
//   let ServicesList

//   // https://pdtclientsolutions.com/wellezy/api/wellezy/service/hotels/en/null/null/null?page=2
//   // https://pdtclientsolutions.com/wellezy/api/wellezy/service/hotels/en/null/null?page=2

//   console.log("__________",base_url(serverCrm, `wellezy/service/hotels/${leng}/${premium}/${stars}/${text}?page=${page}`))

//   await axios.get(base_url(serverCrm, `wellezy/service/hotels/${leng}/${premium}/${stars}/${text}?page=${page}`)).then(function (response) {
//     ServicesList = response.data
//   })
//     .catch(function (error) { console.log("?", error) })
//   return ServicesList;
// }
















async function getServicesListDrivers(leng) {
  let ServicesList
  await axios.get(base_url(serverCrm, `wellezy/service/drivers`)).then(function (response) {
    ServicesList = response.data
  })
    .catch(function (error) { console.log("?", error) })
  //    .then(function () { });
  // console.log("->Drivers: ",ServicesList)
  return ServicesList;
}




async function getDriverVehicles(id, len) {
  let DiverVehicles
  await axios.get(base_url(serverCrm, `wellezy/service/driver/${id}/${len}`)).then(function (response) {
    DiverVehicles = response.data
  })
    .catch(function (error) { console.log("?", error) })
  //    .then(function () { });
  // console.log("->Drivers: ",DiverVehicles)
  return DiverVehicles;
}

// async function GetClinics(text, len) {
//   let clinics
//   await axios.get(base_url(serverCrm, `clinics/${text}/${len}`)).then(function (response) {
//     clinics = response.data;
//   })
//     .catch(function (error) {
//       clinics = error;
//       console.log("get clinics?", error);
//     })
//   //    .then(function () { });
//   //console.log('clinics ->', clinics);
//   return clinics;
// }





async function GetPaises() {
  let paises
  await axios.get(base_url(serverCrm, `paises`)).then(function (response) {
    paises = response.data;
  })
    .catch(function (error) {
      paises = error;
      console.log("?", error);
    })
  //    .then(function () { });
  //console.log('paises ->', paises);
  return paises;
}


async function GetCiudades() {
  let ciudades
  await axios.get(base_url(serverCrm, `ciudades`)).then(function (response) {
    ciudades = response.data;
  })
    .catch(function (error) {
      ciudades = error;
      console.log("?", error);
    })
  //    .then(function () { });
  //console.log('ciudades ->', ciudades);
  return ciudades;
}





async function GetClinicsByCountry(id, leng) {
  console.log("country", id)
  let res
  await axios.get(base_url(serverCrm, `clinicByCountry/${id}/${leng}`)).then(function (response) {
    res = response.data;
  })
    .catch(function (error) {
      res = error;
      console.log("?", error);
    })
  //    .then(function () { });
  console.log('by contry res ->', res);
  return res;
}





async function GetClinicsByCity(id, leng) {
  let res
  await axios.get(base_url(serverCrm, `clinicByCity/${id}/${leng}`)).then(function (response) {
    res = response.data;
  })
    .catch(function (error) {
      res = error;
      console.log("?", error);
    })
  //    .then(function () { });
  console.log('by contry res ->', res);
  return res;
}





export {
  // getServicesList,
  // getServicesListHotels,
  getServicesListDrivers,

  ServicesGet,
  // MedicGetTotalInfo,
  ServicesFavorite,
  ServicesFavoriteAdd,
  ServicesFavoriteDel,
  ProcessGet,
  MedicsGet,
  //sendMedicsRating,
  //  getMedicsRating,
  //MedicGetQualified,

  getMyProfile,
  updateMyProfile,
  MyProceduresPerformed,
  saveNewExperience,
  mySharedExperiences,
  GetThisServicesFavorite,
  SimpleFormulario,
  clientCreateHC,
  MyValorationScheduled,
  getDriverVehicles,
  //GetClinics,

  GetPaises, GetCiudades,
  GetClinicsByCountry,
  GetClinicsByCity
};