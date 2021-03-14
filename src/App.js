import React, { useEffect, useState } from 'react'
import s from './App.module.css';
import Aside from './components/Aside/Aside'
import Messages from './components/Messages/Messages'
import Settings from './components/Settings/Settings'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { initializeTC } from './redux/app.reducer';
import Preloader from './components/Common/Preloader/Preloader';
import ModalStatus from './components/modals/ModalStatus/ModalStatus';
import Header from './components/Header/Header';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainerLazy = React.lazy(() => { return import('./components/Profile/Profile') })
const UsersContainerLazy = React.lazy(() => { return import('./components/Users/UsersContainer') })
const LoginContainerLazy = React.lazy(() => { return import('./components/Login/Login') })
const UsersAllContainerLazy = React.lazy(() => { return import('./components/Users/UsersAll/UsersAllContainer') })

export const App = (props) => {
  useEffect(() => {
    props.initializeTC()
  })
  const [modalStatus, editModalStatus] = useState(false)
  if (!props.initializer) {
    return (
      <div className={s.preloader__AppWrapper}>
        <div className={s.preloader__AppBlock}>
          <Preloader />
        </div>
      </div>
    )
  }
  else {
    return (
      <>
        <div className={s.wrapper}>
          <Header />
          <div className={s.main}>
            <div className={s.container}>
              <div className={s.main__row}>
                <div className={s.main__aside}>
                  <Aside />
                </div>
                <div className={s.main__content}>
                  <Route path={'/profile/:userId?'} render={withSuspense(() => { return <ProfileContainerLazy editModalStatus={editModalStatus} modalStatus={modalStatus} /> })} />
                  <Route path={'/messages'} render={() => <Messages />} />
                  <Route exact path={'/users'} render={withSuspense(UsersContainerLazy)} />
                  <Route path={'/settings'} render={() => <Settings />} />
                  <Route path={'/login'} render={withSuspense(LoginContainerLazy)} />
                  <Route path={'/users/all'} render={withSuspense(UsersAllContainerLazy)} />
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
