const getList =(newList)=>{
  return{
    type:"GET_SERVICES_LIST",
    payload: newList,
  }
}

export {getList};