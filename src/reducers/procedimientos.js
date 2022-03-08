

import React,{useState} from 'react';
import {procedimientos} from '../services/connection'
import { useTranslation } from 'react-i18next';
import { getClosestNodeParentByTag } from 'react-native-render-html';



export default function index(){

  //const { t, i18n } = useTranslation();



async function getData(){
  // const data = await procedimientos.List("en", null)
  // return data
  return []
}



const datasglobal = getData()
//console.log("_____________datasglobal",datasglobal)

const datas =[{name:"name jajaja"}, "","plastia", "otroplastia", "mas plastia"];
return datas
}