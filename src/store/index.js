import {createStore, combineReducers} from 'redux'
import servicesReducer from './services/reducer'

// import amountReducer from './amount/reducer'
// import themeReducer from './theme/reducer'

const reducers = combineReducers({
  servicesReducer,
    // amountReducer,
    // themeReducer
})

const store = createStore(reducers)

export default store;