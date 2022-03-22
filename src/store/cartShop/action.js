const getList =(lan)=>{
  return{
    type:"GET_SERVICES_LIST",
    payload: lan,
  }
}

export {getList};