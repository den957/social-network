import './App.css';
import React, { useEffect, useState } from 'react'
import Aside from './components/Aside/Aside'
import ProfileContainer from './components/Profile/Profile'
import Messages from './components/Messages/Messages'
import Users from './components/Users/Users'
import Login from './components/Login/Login';
import SettingsContact from './components/Settings/SettingsContact'
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { initializeTC } from './redux/app.reducer';
import Preloader from './components/Common/Preloader/Preloader';
import ModalStatus from './components/modals/ModalStatus/ModalStatus';
import UsersAll from './components/Users/UsersAll';
import Header from './components/Header/Header';
import { MetaTags } from 'react-meta-tags'
import { ReactTitle } from 'react-meta-tags'



export const App = (props) => {
  useEffect(() => {
    props.initializeTC()
  })
  const [modalStatus, editModalStatus] = useState(false)
  if (!props.initializer) {
    return (
      <div class='preloader__AppWrapper'>
        <div class='preloader__AppBlock'>
          <Preloader />
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <ReactTitle title={'page'} />
        <MetaTags>
          <meta charset='UTF-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </MetaTags>
        <div class='wrapper'>
          <Header />
          <div class='main'>
            <div class='container'>
              <div class='main__row'>
                <div class='main__aside'>
                  <Aside />
                </div>
                <div class='main__content'>
                  <Route path={'/'} render={() => <Redirect to={'/profile'} />} />
                  <Route path={'/profile/:userId?'} render={() => <ProfileContainer editModalStatus={editModalStatus} modalStatus={modalStatus} />} />
                  <Route path={'/messages'} render={() => <Messages />} />
                  <Route exact path={'/users'} render={() => <Users />} />
                  <Route path={'/settings'} render={() => <SettingsContact />} />
                  <Route path={'/login'} render={() => <Login />} />
                  <Route path={'/users/all'} render={() => <UsersAll />} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalStatus && <ModalStatus modalStatus={modalStatus} editModalStatus={editModalStatus} />}
      </>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    initializeTC: () => { dispatch(initializeTC()) }
  }
}
const mapStateToProps = (state) => {
  return {
    initializer: state.app.initializer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
