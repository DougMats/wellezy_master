import React from 'react'
import UserContext from '../../../contexts/UserContext'
import ProfileClient from './ProfileClient';
import ProfileMedic from './ProfileMedic';
function Profile(props) {
  const { userDetails, setUserDetails } = React.useContext(UserContext);
  if (userDetails.rol === "client") { return <ProfileClient {...props} /> }
  if (userDetails.rol === "medic") { return <ProfileMedic  {...props} /> }
  if (userDetails.rol === "client") { return <ProfileClient {...props} /> }
}
export default Profile;