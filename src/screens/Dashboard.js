import React from 'react'
import UserContext from '../../contexts/UserContext'
import DashboardMedic from './DashboardMedic.js';
import DashboardClient from './DashboardClient.js';
import DashboardService from './DashboardService.js';

function Dashboard(props) {
  const { userDetails, setUserDetails } = React.useContext(UserContext);
  //console.log(".......session: ", userDetails)
  if (userDetails.rol === "medic") { return (<DashboardMedic {...props} />) }
  if (userDetails.rol === "client") { return (<DashboardClient {...props} />) }
  if (userDetails.rol === "service") { return (<DashboardService {...props} />) }
  else{return (<></>) }
}
export default Dashboard;
