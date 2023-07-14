import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppHeader />
     <div className='main-content'>
     <AppSidebar />
        <AppContent />
     </div>
      
        
        <AppFooter />
      
    </div>
  )
}

export default DefaultLayout
