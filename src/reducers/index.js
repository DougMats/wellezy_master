import {combineReducers} from 'redux'
import superheroresReducers from './superheroesReducers.js'
import procedimientos from './procedimientos.js'


console.log("se crea el reducer")

export default combineReducers({
  //clave. nombre del estado
  //superheroes:()=>[procedimientos]
  //clave valor


  procedimientos:procedimientos,
  superheroes: superheroresReducers
}) 