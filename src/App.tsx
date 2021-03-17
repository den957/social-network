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
import Header from './components/Header/HeaderContainer';
import { withSuspense } from './hoc/withSuspense';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppReducerType } from './redux/store';

const ProfileContainerLazy = React.lazy(() => { return import('./components/Profile/ProfileContainer') })
const UsersContainerLazy = React.lazy(() => { return import('./components/Users/UsersContainer') })
const LoginContainerLazy = React.lazy(() => { return import('./components/Login/Login') })
const UsersAllContainerLazy = React.lazy(() => { return import('./components/Users/UsersAll/UsersAllContainer') })

type PropsType = MapStateToProps & MapDispatchToProps
type MapDispatchToProps = {
  initializeTC: () => void
}
type MapStateToProps = {
  initializer: boolean
}
type OwnPropsType = {
  modalStatus: boolean,
  editModalStatus: (text: boolean) => void
}
export const App: React.FC<PropsType> = ({ initializer, initializeTC }) => {
  useEffect(() => {
    initializeTC()
  })
  const [modalStatus, editModalStatus] = useState<boolean>(false)
  if (!initializer) {
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
                  <Route path={'/profile/:userId?'} render={withSuspense(() => <ProfileContainerLazy editModalStatus={editModalStatus} />)} />
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
        {modalStatus && <ModalStatus editModalStatus={editModalStatus} />}
      </>
    )
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>): MapDispatchToProps => {
  return {
    initializeTC: () => { dispatch(initializeTC()) }
  }
}
const mapStateToProps = (state: AppReducerType): MapStateToProps => {
  return {
    initializer: state.app.initializer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
