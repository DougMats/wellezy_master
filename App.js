import * as React from 'react';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducers from './src/reducers/index'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserProvider';
import CartGuiProvider from './contexts/CartGuiProvider';
//basics
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login.js';
import Search from './src/screens/Search.js';
import Register from './src/screens/Register';
import Forgot from './src/screens/Forgot';
import Dashboard from './src/screens/Dashboard.js'
import NotNetwork from './src/screens/NotNetwork';
//formularios
import SimpleForm from './src/screens/forms/SimpleForm.js'
import HistoryClinicForm from './src/screens/forms/HistoryClinicForm.js'
import UploadPictures from './src/screens/forms/UploadPictures.js'
//medicos
import MedicsList from './src/screens/medics/MedicsList.js'
import MedicsView from './src/screens/medics/MedicsView.js'
import Profile from './src/screens/profile/Profile';
import DashboardFly from './src/screens/vuelos/DashboardFly.js'
import Configurations from './src/screens/configurations/Configurations.js'
import Procedures from './src/screens/procedures/Procedures.js'
import Process from './src/screens/process/Process.js'
import DashboardServices from './src/screens/additionalServices/DashboardServices.js'
import NurseView from './src/screens/additionalServices/View/NurseView.js'
import SpecialView from './src/screens/additionalServices/View/SpecialView.js';
import DriversView from './src/screens/additionalServices/View/DriversView.js'
import HomeRecovery from './src/screens/additionalServices/View/HomeRecoveryView.js'
import HotelsView from './src/screens/additionalServices/View/HotelsView.js'
import Room from './src/screens/additionalServices/View/Room.js'
import Reservation from './src/screens/forms/Reservation.js'
import Sala from './src/screens/meet/Sala.js'
import Meet from './src/screens/meet/Meet.js'
import ClinicList from './src/screens/clinics/ClinicList.js'
import ClinicView from './src/screens/clinics/ClinicView.js'
import ValorationManager from './src/screens/valorations/ValorationManager.js'
import CreateProfileNurse from './src/screens/createProfile/Nurse.js'
import CreateProfileDriver from './src/screens/createProfile/Driver.js'
import PurchaseOrder from './src/screens/payments/PurchaseOrder.js'
import PackageDescription from './src/screens/payments/PackageDescription.js'
import PaymentCart from './src/screens/payments/PaymentCart.js'
import CheckOut from './src/screens/payments/CheckOut.js'
import MethodPay from './src/screens/payments/MethodPay.js'
import PayToCard from './src/screens/payments/PayToCard.js'
import PayToPayPal from './src/screens/payments/PayToPayPal.js'
import PaymentSummary from './src/screens/payments/PaymentSummary.js'
import ManageOrders from './src/screens/payments/ManageOrders.js'


import ValorationsList from './src/screens/valorations/valorationsList.js'

import ValorationView from './src/screens/valorations/ValorationView.js'






// Quotation.js
// QuotationList.js
// QuotationView.js
//import MethodPay from './src/screens/payments/MethodPay.js'
//import MethodPay from './src/screens/payments/MethodPay.js'
//import MethodPay from './src/screens/payments/MethodPay.js'

//SolicitudNew from medic
// import HotelsRoomView from './src/screens/additionalServices/View/HotelsRoomView.js'
// import SimpleForm from './src/screens/forms/SimpleForm.js';
// import SpecialAll from './src/screens/specials/SpecialAll.js';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Provider store={createStore(Reducers)}>
        <UserProvider>
          <CartGuiProvider >
            <Stack.Navigator headerMode={'none'}>
              <Stack.Screen headerMode={'none'} name="Home" component={Home} />
              <Stack.Screen headerMode={'none'} name="Splash" component={Splash} />
              <Stack.Screen headerMode={'none'} name="Login" component={Login} />
              <Stack.Screen headerMode={'none'} name="Register" component={Register} />
              <Stack.Screen headerMode={'none'} name="Forgot" component={Forgot} />
              <Stack.Screen headerMode={'none'} name="Dashboard" component={Dashboard} />
              <Stack.Screen headerMode={'none'} name="Profile" component={Profile} />
              <Stack.Screen headerMode={'none'} name="Procedures" component={Procedures} />
              <Stack.Screen headerMode={'none'} name="Process" component={Process} />
              <Stack.Screen headerMode={'none'} name="NotNetwork" component={NotNetwork} />
              <Stack.Screen headerMode={'none'} name="DashboardServices" component={DashboardServices} />
              <Stack.Screen headerMode={'none'} name="NurseView" component={NurseView} />
              <Stack.Screen headerMode={'none'} name="SpecialView" component={SpecialView} />
              <Stack.Screen headerMode={'none'} name="DriversView" component={DriversView} />
              <Stack.Screen headerMode={'none'} name="HotelsView" component={HotelsView} />
              <Stack.Screen headerMode={'none'} name="Room" component={Room} />
              <Stack.Screen headerMode={'none'} name='Reservation' component={Reservation} />
              <Stack.Screen headerMode={'none'} name="MedicsView" component={MedicsView} />
              <Stack.Screen headerMode={'none'} name="MedicsList" component={MedicsList} />
              <Stack.Screen headerMode={'none'} name="SimpleForm" component={SimpleForm} />
              <Stack.Screen headerMode={'none'} name="HistoryClinicForm" component={HistoryClinicForm} />
              <Stack.Screen headerMode={'none'} name="UploadPictures" component={UploadPictures} />
              <Stack.Screen headerMode={'none'} name="ClinicList" component={ClinicList} />
              <Stack.Screen headerMode={'none'} name="ClinicView" component={ClinicView} />
              <Stack.Screen headerMode={'none'} name="Sala" component={Sala} />
              <Stack.Screen headerMode={'none'} name="Meet" component={Meet} />
              <Stack.Screen headerMode={'none'} name="DashboardFly" component={DashboardFly} />
              <Stack.Screen headerMode={'none'} name="Configurations" component={Configurations} />
              <Stack.Screen headerMode={'none'} name="ValorationManager" component={ValorationManager} />
              <Stack.Screen headerMode={'none'} name="HomeRecovery" component={HomeRecovery} />
              <Stack.Screen headerMode={'none'} name="CreateProfileNurse" component={CreateProfileNurse} />
              <Stack.Screen headerMode={'none'} name="CreateProfileDriver" component={CreateProfileDriver} />
              <Stack.Screen headerMode={'none'} name="PurchaseOrder" component={PurchaseOrder} />
              <Stack.Screen headerMode={'none'} name="PackageDescription" component={PackageDescription} />
              <Stack.Screen headerMode={'none'} name="PaymentCart" component={PaymentCart} />
              <Stack.Screen headerMode={'none'} name="CheckOut" component={CheckOut} />
              <Stack.Screen headerMode={'none'} name="MethodPay" component={MethodPay} />
              <Stack.Screen headerMode={'none'} name="PayToCard" component={PayToCard} />
              <Stack.Screen headerMode={'none'} name="PayToPayPal" component={PayToPayPal} />
              <Stack.Screen headerMode={'none'} name="PaymentSummary" component={PaymentSummary} />
              <Stack.Screen headerMode={'none'} name="ManageOrders" component={ManageOrders} />
              <Stack.Screen headerMode={'none'} name="Search" component={Search} />
              <Stack.Screen headerMode={'none'} name="ValorationsList" component={ValorationsList} />
              <Stack.Screen headerMode={'none'} name="ValorationView" component={ValorationView} />
             
              
             
             
              {/* 
            <Stack.Screen headerMode={'none'} name="HotelsRoomView" component={HotelsRoomView} />
            <Stack.Screen headerMode={'none'} name="Medics" component={Medics} />
            <Stack.Screen headerMode={'none'} name="Clinics" component={Clinics} />
            <Stack.Screen headerMode={'none'} name="SpecialAll" component={SpecialAll} />
            */}
            </Stack.Navigator>
          </CartGuiProvider>
        </UserProvider>
      </Provider>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;

