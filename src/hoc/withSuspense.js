import React from 'react'
import PreloaderLine from '../components/Common/Preloader/PreloaderLine/PreloaderLine'

export const withSuspense = (Component) => {
   return (props) => {
      return (
         <React.Suspense fallback={< PreloaderLine />}>
            <Component {...props} />
         </React.Suspense>
      )
   }
}