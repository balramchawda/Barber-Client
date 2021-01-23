import 'rxjs'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import app from './app'
import admin ,{ adminEpic  } from './admin/duck'
import user ,{ userEpic  } from './user/duck'

// Bundling Epics
const rootEpic = combineEpics(adminEpic,userEpic)

// Creating Bundled Epic
const epicMiddleware = createEpicMiddleware()

// Define Middleware
const middleware = [thunk, promise, epicMiddleware]

// Define Reducers
const reducers = combineReducers({
  admin,
  user,
  app,
  form: formReducer
})

// Create Store
const store_new = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)
epicMiddleware.run(rootEpic)
export default store_new
