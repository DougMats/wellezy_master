import React from 'react'
import UserContext from '../../contexts/UserContext'
import DashboardMedic from './dashboards/DashboardMedic.js';
import DashboardClient from './dashboards/DashboardClient.js';
import DashboardService from './dashboards/DashboardService.js';

function Dashboard(props) {

  // function bisiesto(year) {
  //   let res = "";
  //   if (Number.isInteger(year)) {
  //     if (year.toString().length === 4) {
  //       if (year%4==0&&year%100!=0) { res = "Si"}
  //       else if (year%400==0){res = "Si";}  
  //       else {res = "No"} 
  //       console.log(`${year}: ${res} es bisiesto`)
  //     }
  //     else {
  //       console.log(`(${year}) ERROR: cantidad de digitos no permitida`);
  //     }
  //   }
  //   else {
  //     console.log(`(${year}) ERROR:tipo de datos no permitido`);
  //   }
  // }
  // bisiesto('abcd');
  // bisiesto(123);
  // bisiesto(1900);
  // bisiesto(2000);
  // bisiesto(2001);
  // bisiesto(2004);
  // bisiesto(2100);
  // $iteración = 3; $a = 1; $b = 0; $fibonacci = 0; for($i = 0; $i < $i; $i++){ $fibonacci = $a + $b; $a = $b ; $b = $fibonacci; echo $fibonacci; }

  const { userDetails, setUserDetails } = React.useContext(UserContext);
  if (userDetails.rol === "medic") { return (<DashboardMedic {...props} />) }
  if (userDetails.rol === "client") { return (<DashboardClient {...props} />) }
  if (userDetails.rol === "service") { return (<DashboardService {...props} />) }
  else { return (<></>) }
}
export default Dashboard;
