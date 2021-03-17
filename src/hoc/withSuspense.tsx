import React from 'react'
import PreloaderLine from '../components/Common/Preloader/PreloaderLine/PreloaderLine'

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
   return (props: WCP) => {
      return (
         <React.Suspense fallback={< PreloaderLine />}>
            <WrappedComponent {...props} />
         </React.Suspense>
      )
   }
}