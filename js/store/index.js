import { createStore } from 'redux'
import reducer from './reducer'
// import thunk from 'redux-thunk'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

// const enhancer = composeEnhancers(applyMiddleware(thunk))
// const store = createStore(reducer,
//      enhancer)
// export default store


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(reducer)
export default store