import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import authReducer from './auth.reducer'
import { reducer as formReducer } from 'redux-form'
import usersReducer from './users.reducer'
import profileReducer from './profile.reducer'
import appReducer from './app.reducer'
import loginReducer from './login.reducer'
import messageReducer from './message.reducer'

export const reducers = combineReducers({
   auth: authReducer,
   users: usersReducer,
   profile: profileReducer,
   app: appReducer,
   dialogs: messageReducer,
   form: formReducer.plugin({
      login: loginReducer
   })
})
type ReducersType = typeof reducers
export type AppReducerType = ReturnType<ReducersType>

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store