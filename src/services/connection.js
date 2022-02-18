import PROCESS from './process'
const procedimientos = PROCESS()

import VUELOS from './vuelos'
const vuelos = VUELOS()

import SERVICES from './services'
const services = SERVICES()

import HOTELS from './hotels'
const hotels = HOTELS()

import SPECIALS from './doctorSpecials'
const specials = SPECIALS()

import NURSES from './nurses'
const nurses = NURSES()

import HOMERECOVERY from './homeRecovery'
const homeRecovery = HOMERECOVERY()

import DOCTORS from './doctors'
const doctors = DOCTORS()

import DRIVERS from './drivers'
const drivers = DRIVERS()

import FORMS from './forms'
const formularios = FORMS()

import MEETS from './meets'
const meets = MEETS()

import CLINICS from './clinics'
const clinics = CLINICS()

import LOCATIONS from './locations'
const locations = LOCATIONS()

import VALORATIONS from './valorations'
const valorations = VALORATIONS()

import PROFILE from './profile'
const profile = PROFILE()



import SEARCH from './search'
const search = SEARCH()


import CARTSHOP from './cartShop'
const cartShop =CARTSHOP()

export {
  procedimientos,
  vuelos,
  services,
  hotels,
  specials,
  nurses,
  homeRecovery,
  drivers,
  doctors,
  formularios,
  meets,
  clinics,
  locations,
  valorations,
  profile,
  search,
  cartShop
};